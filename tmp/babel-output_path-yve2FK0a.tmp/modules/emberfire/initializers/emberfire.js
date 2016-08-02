import Ember from 'ember';
import DS from 'ember-data';
import firebase from 'firebase';
import FirebaseAdapter from '../adapters/firebase';
import FirebaseSerializer from '../serializers/firebase';
import forEach from 'lodash/collection/forEach';

var VERSION = '2.0.1';

if (Ember.libraries) {
  if (firebase.SDK_VERSION) {
    Ember.libraries.registerCoreLibrary('Firebase', firebase.SDK_VERSION);
  }

  Ember.libraries.registerCoreLibrary('EmberFire', VERSION);
}

export default {
  name: 'emberfire',
  before: 'ember-data',
  initialize: function initialize() {

    // To support Ember versions below 2.1.0 as well.
    // See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity
    var application = arguments[1] || arguments[0];

    application.register('adapter:-firebase', FirebaseAdapter);
    application.register('serializer:-firebase', FirebaseSerializer);

    var providerSettings = { instantiate: false, singleton: false };
    application.register('firebase-auth-provider:twitter', firebase.auth.TwitterAuthProvider, providerSettings);
    application.register('firebase-auth-provider:facebook', firebase.auth.FacebookAuthProvider, providerSettings);
    application.register('firebase-auth-provider:github', firebase.auth.GithubAuthProvider, providerSettings);
    application.register('firebase-auth-provider:google', firebase.auth.GoogleAuthProvider, providerSettings);

    // Monkeypatch the store until ED gives us a good way to listen to push events
    if (!DS.Store.prototype._emberfirePatched) {
      DS.Store.reopen({
        _emberfirePatched: true,

        push: function push() {
          var _this = this;

          var result = this._super.apply(this, arguments);
          var records = result;

          if (!Ember.isArray(result)) {
            records = [result];
          }

          forEach(records, function (record) {
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

    if (!DS.Model.prototype._emberfirePatched) {
      DS.Model.reopen({
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

    if (!DS.AdapterPopulatedRecordArray.prototype._emberfirePatched) {
      DS.AdapterPopulatedRecordArray.reopen({
        _emberfirePatched: true,

        willDestroy: function willDestroy() {
          if (this.__firebaseCleanup) {
            this.__firebaseCleanup();
          }
          return this._super();
        }
      });
    }

    DS.FirebaseAdapter = FirebaseAdapter;
    DS.FirebaseSerializer = FirebaseSerializer;
  }
};