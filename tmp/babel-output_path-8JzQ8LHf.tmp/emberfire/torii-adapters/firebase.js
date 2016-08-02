define('emberfire/torii-adapters/firebase', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Object.extend({
    firebaseApp: _ember['default'].inject.service(),

    /**
     * Extacts session information from authentication response
     *
     * @param {!firebase.User} user
     * @return {Promise}
     */
    open: function open(user) {
      return _ember['default'].RSVP.resolve({
        provider: this.extractProviderId_(user),
        uid: user.uid,
        currentUser: user
      });
    },

    /**
     * Restore existing authenticated session
     *
     * @return {Promise}
     */
    fetch: function fetch() {
      var _this = this;

      return this.fetchAuthState_().then(function (user) {
        if (!user) {
          return _this.fetchRedirectState_();
        }
        return user;
      }).then(function (user) {
        if (!user) {
          return _ember['default'].RSVP.reject(new Error('No session available'));
        }
        return _this.open(user);
      })['catch'](function (err) {
        return _ember['default'].RSVP.reject(err);
      });
    },

    /**
     * Fetches the redirect user, if any.
     *
     * @return {!Promise<?firebase.User>}
     * @private
     */
    fetchRedirectState_: function fetchRedirectState_() {
      var auth = this.get('firebaseApp').auth();
      return auth.getRedirectResult().then(function (result) {
        return result.user;
      });
    },

    /**
     * Promisifies the first value of onAuthStateChanged
     *
     * @return {!Promise<?firebase.User>}
     * @private
     */
    fetchAuthState_: function fetchAuthState_() {
      var _this2 = this;

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var auth = _this2.get('firebaseApp').auth();
        var unsub = auth.onAuthStateChanged(function (user) {
          unsub();
          resolve(user);
        }, function (err) {
          unsub();
          reject(err);
        });
      });
    },

    /**
     * Close existing authenticated session
     *
     * @return {Promise}
     */
    close: function close() {
      return this.get('firebaseApp').auth().signOut();
    },

    /**
     * Extracts the provider id from the firebase user
     *
     * @param {!firebase.User} user
     * @private
     */
    extractProviderId_: function extractProviderId_(user) {
      if (user.isAnonymous) {
        return 'anonymous';
      }

      if (user.providerData && user.providerData.length) {
        return user.providerData[0].providerId;
      }

      return 'custom';
    }
  });
});