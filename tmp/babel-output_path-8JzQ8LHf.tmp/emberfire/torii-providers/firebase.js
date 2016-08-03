define('emberfire/torii-providers/firebase', ['exports', 'ember', 'emberfire/mixins/waitable'], function (exports, _ember, _emberfireMixinsWaitable) {
  'use strict';

  exports['default'] = _ember['default'].Object.extend(_emberfireMixinsWaitable['default'], {
    firebaseApp: _ember['default'].inject.service(),

    open: function open(options) {
      var providerId = options.provider;
      var reject = _ember['default'].RSVP.reject;

      if (!providerId) {
        return reject(new Error('`provider` must be supplied'));
      }

      var auth = this.get('firebaseApp').auth();

      switch (providerId) {
        case 'password':
          if (!options.email || !options.password) {
            return this.waitFor_(reject(new Error('`email` and `password` must be supplied')));
          }

          return this.waitFor_(auth.signInWithEmailAndPassword(options.email, options.password));

        case 'custom':
          if (!options.token) {
            return this.waitFor_(reject(new Error('A token must be supplied')));
          }

          return this.waitFor_(auth.signInWithCustomToken(options.token));

        case 'anonymous':
          return this.waitFor_(auth.signInAnonymously());

        // oauth providers e.g. 'twitter'
        default:
          var ProviderClass = this.container.lookupFactory('firebase-auth-provider:' + providerId);
          if (!ProviderClass) {
            return this.waitFor_(reject(new Error('Unknown provider')));
          }

          var provider = new ProviderClass();

          if (options.settings && options.settings.scope) {
            options.settings.scope.split(',').forEach(function (s) {
              return provider.addScope(s);
            });
          }

          if (options.redirect === true) {
            // promise will never resolve unless there is an error (due to redirect)
            return this.waitFor_(auth.signInWithRedirect(provider));
          }
          return this.waitFor_(auth.signInWithPopup(provider));
      }
    },

    /**
     * Wraps a promise in test waiters.
     *
     * @param {!Promise} promise
     * @return {!Promise}
     */
    waitFor_: function waitFor_(promise) {
      var _this = this;

      this._incrementWaiters();
      return promise.then(function (result) {
        _this._decrementWaiters();
        if (result.user) {
          return result.user;
        }
        return result;
      })['catch'](function (err) {
        _this._decrementWaiters();
        return _ember['default'].RSVP.reject(err);
      });
    }
  });
});