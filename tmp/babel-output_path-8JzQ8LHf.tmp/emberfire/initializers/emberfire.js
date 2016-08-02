define('emberfire/initializers/emberfire', ['exports', 'ember', 'ember-data', 'firebase', 'emberfire/adapters/firebase', 'emberfire/serializers/firebase', 'lodash/collection/forEach'], function (exports, _ember, _emberData, _firebase, _emberfireAdaptersFirebase, _emberfireSerializersFirebase, _lodashCollectionForEach) {
  'use strict';

  var VERSION = '2.0.1';

  if (_ember['default'].libraries) {
    if (_firebase['default'].SDK_VERSION) {
      _ember['default'].libraries.registerCoreLibrary('Firebase', _firebase['default'].SDK_VERSION);
    }

    _ember['default'].libraries.registerCoreLibrary('EmberFire', VERSION);
  }

  exports['default'] = {
    name: 'emberfire',
    before: 'ember-data',
    initialize: function initialize() {

      // To support Ember versions below 2.1.0 as well.
      // See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity
      var application = arguments[1] || arguments[0];

      application.register('adapter:-firebase', _emberfireAdaptersFirebase['default']);
      application.register('serializer:-firebase', _emberfireSerializersFirebase['default']);

      var providerSettings = { instantiate: false, singleton: false };
      application.register('firebase-auth-provider:twitter', _firebase['default'].auth.TwitterAuthProvider, providerSettings);
      application.register('firebase-auth-provider:facebook', _firebase['default'].auth.FacebookAuthProvider, providerSettings);
      application.register('firebase-auth-provider:github', _firebase['default'].auth.GithubAuthProvider, providerSettings);
      application.register('firebase-auth-provider:google', _firebase['default'].auth.GoogleAuthProvider, providerSettings);

      // Monkeypatch the store until ED gives us a good way to listen to push events
      if (!_emberData['default'].Store.prototype._emberfirePatched) {
        _emberData['default'].Store.reopen({
          _emberfirePatched: true,

          push: function push() {
            var _this = this;

            var result = this._super.apply(this, arguments);
            var records = result;

            if (!_ember['default'].isArray(result)) {
              records = [result];
            }

            (0, _lodashCollectionForEach['default'])(records, function (record) {
              var modelName = record.constructor.modelName;
              var adapter = _this.adapterFor(modelName);
              if (adapter.recordWasPushed) {
                adapter.recordWasPushed(_this, modelName, record);
              }
            });

            return result;
          },

          recordWillUnload: function recordWillUnload(record) {
            var adapter = this.adapterFor(record.constructor.modelName);
            if (adapter.recordWillUnload) {
              adapter.recordWillUnload(this, record);
            }
          },

          recordWillDelete: function recordWillDelete(record) {
            var adapter = this.adapterFor(record.constructor.modelName);
            if (adapter.recordWillDelete) {
              adapter.recordWillDelete(this, record);
            }
          }
        });
      }

      if (!_emberData['default'].Model.prototype._emberfirePatched) {
        _emberData['default'].Model.reopen({
          _emberfirePatched: true,

          unloadRecord: function unloadRecord() {
            this.store.recordWillUnload(this);
            return this._super();
          },

          deleteRecord: function deleteRecord() {
            this.store.recordWillDelete(this);
            this._super();
          },

          ref: function ref() {
            var adapter = this.store.adapterFor(this.constructor.modelName);
            if (adapter._getAbsoluteRef) {
              return adapter._getAbsoluteRef(this);
            }
          }
        });
      }

      if (!_emberData['default'].AdapterPopulatedRecordArray.prototype._emberfirePatched) {
        _emberData['default'].AdapterPopulatedRecordArray.reopen({
          _emberfirePatched: true,

          willDestroy: function willDestroy() {
            if (this.__firebaseCleanup) {
              this.__firebaseCleanup();
            }
            return this._super();
          }
        });
      }

      _emberData['default'].FirebaseAdapter = _emberfireAdaptersFirebase['default'];
      _emberData['default'].FirebaseSerializer = _emberfireSerializersFirebase['default'];
    }
  };
});