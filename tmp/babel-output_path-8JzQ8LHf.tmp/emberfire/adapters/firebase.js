define('emberfire/adapters/firebase', ['exports', 'ember', 'ember-data', 'emberfire/mixins/waitable', 'emberfire/utils/to-promise', 'lodash/object/assign', 'lodash/collection/forEach', 'lodash/collection/filter', 'lodash/collection/map', 'lodash/collection/includes', 'lodash/array/indexOf', 'lodash/collection/find'], function (exports, _ember, _emberData, _emberfireMixinsWaitable, _emberfireUtilsToPromise, _lodashObjectAssign, _lodashCollectionForEach, _lodashCollectionFilter, _lodashCollectionMap, _lodashCollectionIncludes, _lodashArrayIndexOf, _lodashCollectionFind) {
  'use strict';

  var Promise = _ember['default'].RSVP.Promise;

  var uniq = function uniq(arr) {
    var ret = _ember['default'].A();

    arr.forEach(function (k) {
      if ((0, _lodashArrayIndexOf['default'])(ret, k) < 0) {
        ret.push(k);
      }
    });

    return ret;
  };

  /**
   * The Firebase adapter allows your store to communicate with the Firebase
   * realtime service. To use the adapter in your app, extend DS.FirebaseAdapter
   * and customize the endpoint to point to the Firebase URL where you want this
   * data to be stored.
   *
   * The adapter will automatically communicate with Firebase to persist your
   * records as neccessary. Importantly, the adapter will also update the store
   * in realtime when changes are made to the Firebase by other clients or
   * otherwise.
   */
  exports['default'] = _emberData['default'].Adapter.extend(_emberfireMixinsWaitable['default'], {
    firebase: _ember['default'].inject.service(),
    defaultSerializer: '-firebase',

    /**
     * Endpoint paths can be customized by setting the Firebase property on the
     * adapter:
     *
     * ```js
     * DS.FirebaseAdapter.extend({
     *   firebase: new Firebase('https://<my-firebase>.firebaseio.com/')
     * });
     * ```
     *
     * Requests for `App.Post` now target `https://<my-firebase>.firebaseio.com/posts`.
     *
     * @property firebase
     * @type {Firebase}
     * @constructor
     */
    init: function init() {
      this._super.apply(this, arguments);

      var ref = this.get('firebase');
      if (!ref) {
        throw new Error('Please set the `firebase` property in the environment config.');
      }
      // If provided Firebase reference was a query (eg: limits), make it a ref.
      this._ref = ref;
      // Keep track of what types `.findAll()` has been called for
      this._findAllMapForType = {};
      // Keep a cache to check modified relationships against
      this._recordCacheForType = {};
      // Used to batch records into the store
      this._queue = [];
    },

    /**
     * Uses push() to generate chronologically ordered unique IDs.
     *
     * @return {String}
     */
    generateIdForRecord: function generateIdForRecord() {
      return this._getKey(this._ref.push());
    },

    /**
     * Use the Firebase DataSnapshot's key as the record id
     *
     * @param {Object} snapshot - A Firebase snapshot
     * @param {Object} payload - The payload that will be pushed into the store
     * @return {Object} payload
     */
    _assignIdToPayload: function _assignIdToPayload(snapshot) {
      var payload = snapshot.val();
      if (payload !== null && typeof payload === 'object' && typeof payload.id === 'undefined') {
        payload.id = this._getKey(snapshot);
      }
      return payload;
    },

    /**
     * Called by the store to retrieve the JSON for a given type and ID. The
     * method will return a promise which will resolve when the value is
     * successfully fetched from Firebase.
     *
     * Additionally, from this point on, the object's value in the store will
     * also be automatically updated whenever the remote value changes.
     */
    findRecord: function findRecord(store, typeClass, id) {
      var _this = this;

      var ref = this._getCollectionRef(typeClass, id);

      var log = 'DS: FirebaseAdapter#findRecord ' + typeClass.modelName + ' to ' + ref.toString();

      return this._fetch(ref, log).then(function (snapshot) {
        var payload = _this._assignIdToPayload(snapshot);
        _this._updateRecordCacheForType(typeClass, payload, store);
        if (payload === null) {
          var error = new Error('no record was found at ' + ref.toString());
          error.recordId = id;
          throw error;
        }

        return payload;
      });
    },

    /**
     * Promise interface for once('value') that also handle test waiters.
     *
     * @param  {Firebase} ref
     * @param  {String} log
     * @return {Promise<DataSnapshot>}
     * @private
     */
    _fetch: function _fetch(ref, log) {
      var _this2 = this;

      this._incrementWaiters();
      return new Promise(function (resolve, reject) {

        ref.once('value', function (snapshot) {
          _this2._decrementWaiters();
          _ember['default'].run(null, resolve, snapshot);
        }, function (err) {
          _this2._decrementWaiters();
          _ember['default'].run(null, reject, err);
        });
      }, log);
    },

    recordWasPushed: function recordWasPushed(store, modelName, record) {
      if (!record.__listening) {
        var typeClass = store.modelFor(modelName);
        this.listenForChanges(store, typeClass, record);
      }
    },

    recordWillUnload: function recordWillUnload(store, record) {
      if (record.__listening) {
        this.stopListening(store, record.constructor, record);
      }
    },

    recordWillDelete: function recordWillDelete(store, record) {
      var _this3 = this;

      record.eachRelationship(function (key, relationship) {
        if (relationship.kind === 'belongsTo') {
          var parentRecord = record.get(relationship.key);
          var inverseKey = record.inverseFor(relationship.key);
          if (inverseKey && parentRecord.get('id')) {
            var parentRef = _this3._getCollectionRef(inverseKey.type, parentRecord.get('id'));
            _this3._removeHasManyRecord(store, parentRef, inverseKey.name, record.constructor, record.id);
          }
        }
      });
    },

    listenForChanges: function listenForChanges(store, typeClass, record) {
      var _this4 = this;

      // embedded records will get their changes from parent listeners
      if (!this.isRecordEmbedded(record)) {
        record.__listening = true;
        var ref = this._getCollectionRef(typeClass, record.id);
        var called = false;
        ref.on('value', function (snapshot) {
          if (called) {
            _ember['default'].run(function () {
              _this4._handleChildValue(store, typeClass, snapshot);
            });
          }
          called = true;
        }, function (error) {
          _ember['default'].Logger.error(error);
        });
      }
    },

    stopListening: function stopListening(store, typeClass, record) {
      if (record.__listening) {
        var ref = this._getCollectionRef(typeClass, record.id);
        ref.off('value');
        record.__listening = false;
      }
    },

    /**
     * Called by the store to retrieve the JSON for all of the records for a
     * given type. The method will return a promise which will resolve when the
     * value is successfully fetched from Firebase.
     *
     * Additionally, from this point on, any records of this type that are added,
     * removed or modified from Firebase will automatically be reflected in the
     * store.
     */
    findAll: function findAll(store, typeClass) {
      var _this5 = this;

      var ref = this._getCollectionRef(typeClass);

      var log = 'DS: FirebaseAdapter#findAll ' + typeClass.modelName + ' to ' + ref.toString();

      return this._fetch(ref, log).then(function (snapshot) {
        if (!_this5._findAllHasEventsForType(typeClass)) {
          _this5._findAllAddEventListeners(store, typeClass, ref);
        }
        var results = [];
        snapshot.forEach(function (childSnapshot) {
          var payload = _this5._assignIdToPayload(childSnapshot);
          _this5._updateRecordCacheForType(typeClass, payload, store);
          results.push(payload);
        });

        return results;
      });
    },

    query: function query(store, typeClass, _query, recordArray) {
      var _this6 = this;

      var ref = this._getCollectionRef(typeClass);
      var modelName = typeClass.modelName;

      ref = this.applyQueryToRef(ref, _query);

      ref.on('child_added', _ember['default'].run.bind(this, function (snapshot) {
        var record = store.peekRecord(modelName, this._getKey(snapshot));

        if (!record || !record.__listening) {
          var payload = this._assignIdToPayload(snapshot);
          var normalizedData = store.normalize(typeClass.modelName, payload);
          this._updateRecordCacheForType(typeClass, payload, store);
          record = store.push(normalizedData);
        }

        if (record) {
          recordArray.get('content').addObject(record._internalModel);
        }
      }));

      // `child_changed` is already handled by the record's
      // value listener after a store.push. `child_moved` is
      // a much less common case because it relates to priority

      ref.on('child_removed', _ember['default'].run.bind(this, function (snapshot) {
        var record = store.peekRecord(modelName, this._getKey(snapshot));
        if (record) {
          recordArray.get('content').removeObject(record._internalModel);
        }
      }));

      // clean up event handlers when the array is being destroyed
      // so that future firebase events wont keep trying to use a
      // destroyed store/serializer
      recordArray.__firebaseCleanup = function () {
        ref.off('child_added');
        ref.off('child_removed');
      };

      var log = 'DS: FirebaseAdapter#query ' + modelName + ' with ' + _query;

      return this._fetch(ref, log).then(function (snapshot) {
        if (!_this6._findAllHasEventsForType(typeClass)) {
          _this6._findAllAddEventListeners(store, typeClass, ref);
        }
        var results = [];
        snapshot.forEach(function (childSnapshot) {
          var payload = _this6._assignIdToPayload(childSnapshot);
          _this6._updateRecordCacheForType(typeClass, payload, store);
          results.push(payload);
        });
        return results;
      });
    },

    applyQueryToRef: function applyQueryToRef(ref, query) {

      if (!query.orderBy) {
        query.orderBy = '_key';
      }

      if (query.orderBy === '_key') {
        ref = ref.orderByKey();
      } else if (query.orderBy === '_value') {
        ref = ref.orderByValue();
      } else if (query.orderBy === '_priority') {
        ref = ref.orderByPriority();
      } else {
        ref = ref.orderByChild(query.orderBy);
      }

      ['limitToFirst', 'limitToLast', 'startAt', 'endAt', 'equalTo'].forEach(function (key) {
        if (query[key] || query[key] === '' || query[key] === false) {
          ref = ref[key](query[key]);
        }
      });

      return ref;
    },

    /**
     * Keep track of what types `.findAll()` has been called for
     * so duplicate listeners aren't added
     */
    _findAllMapForType: undefined,

    /**
     * Determine if the current type is already listening for children events
     */
    _findAllHasEventsForType: function _findAllHasEventsForType(typeClass) {
      return !_ember['default'].isNone(this._findAllMapForType[typeClass.modelName]);
    },

    /**
     * After `.findAll()` is called on a modelName, continue to listen for
     * `child_added`, `child_removed`, and `child_changed`
     */
    _findAllAddEventListeners: function _findAllAddEventListeners(store, typeClass, ref) {
      var modelName = typeClass.modelName;
      this._findAllMapForType[modelName] = true;

      ref.on('child_added', _ember['default'].run.bind(this, function (snapshot) {
        if (!store.hasRecordForId(modelName, this._getKey(snapshot))) {
          this._handleChildValue(store, typeClass, snapshot);
        }
      }));
    },

    /**
     * Push a new child record into the store
     */
    _handleChildValue: function _handleChildValue(store, typeClass, snapshot) {
      // No idea why we need this, we are already turning off the callback by
      // calling ref.off in recordWillUnload. Something is fishy here
      if (store.isDestroying) {
        return;
      }
      var value = snapshot.val();
      if (value === null) {
        var id = this._getKey(snapshot);
        var record = store.peekRecord(typeClass.modelName, id);
        // TODO: refactor using ED
        if (!record.get('isDeleted')) {
          record.deleteRecord();
        }
      } else {
        var payload = this._assignIdToPayload(snapshot);

        this._enqueue(function FirebaseAdapter$enqueueStorePush() {
          if (!store.isDestroying) {
            var normalizedData = store.normalize(typeClass.modelName, payload);
            store.push(normalizedData);
          }
        });
      }
    },

    /**
     * `createRecord` is an alias for `updateRecord` because calling \
     * `ref.set()` would wipe out any existing relationships
     */
    createRecord: function createRecord(store, typeClass, snapshot) {
      var _this7 = this;

      return this.updateRecord(store, typeClass, snapshot).then(function () {
        _this7.listenForChanges(store, typeClass, snapshot.record);
      });
    },

    /**
     * Called by the store when a record is created/updated via the `save`
     * method on a model record instance.
     *
     * The `updateRecord` method serializes the record and performs an `update()`
     * at the the Firebase location and a `.set()` at any relationship locations
     * The method will return a promise which will be resolved when the data and
     * any relationships have been successfully saved to Firebase.
     *
     * We take an optional record reference, in order for this method to be usable
     * for saving nested records as well.
     */
    updateRecord: function updateRecord(store, typeClass, snapshot) {
      var _this8 = this;

      var recordRef = this._getAbsoluteRef(snapshot.record);
      var recordCache = this._getRecordCache(typeClass, snapshot.id);
      var pathPieces = recordRef.path.toString().split('/');
      var lastPiece = pathPieces[pathPieces.length - 1];
      var serializedRecord = snapshot.serialize({
        includeId: lastPiece !== snapshot.id // record has no firebase `key` in path
      });
      var serializer = store.serializerFor(typeClass.modelName);

      return new Promise(function (resolve, reject) {
        var relationshipsToSave = [];
        // first we remove all relationships data from the serialized record, we backup the
        // removed data so that we can save it at a later stage.
        snapshot.record.eachRelationship(function (key, relationship) {
          var relationshipKey = serializer.keyForRelationship(key);
          var data = serializedRecord[relationshipKey];
          var isEmbedded = _this8.isRelationshipEmbedded(store, typeClass.modelName, relationship);
          var hasMany = relationship.kind === 'hasMany';
          if (hasMany || isEmbedded) {
            if (!_ember['default'].isNone(data)) {
              relationshipsToSave.push({
                data: data,
                relationship: relationship,
                isEmbedded: isEmbedded,
                hasMany: hasMany
              });
            }
            delete serializedRecord[relationshipKey];
          }
        });
        var reportError = function reportError(errors) {
          var error = new Error('Some errors were encountered while saving ' + typeClass + ' ' + snapshot.id);
          error.errors = errors;
          reject(error);
        };
        _this8._updateRecord(recordRef, serializedRecord).then(function () {
          // and now we construct the list of promise to save relationships.
          var savedRelationships = relationshipsToSave.map(function (relationshipToSave) {
            var data = relationshipToSave.data;
            var relationship = relationshipToSave.relationship;
            if (relationshipToSave.hasMany) {
              return _this8._saveHasManyRelationship(store, typeClass, relationship, data, recordRef, recordCache);
            } else {
              // embedded belongsTo, we need to fill in the informations.
              if (relationshipToSave.isEmbedded) {
                return _this8._saveEmbeddedBelongsToRecord(store, typeClass, relationship, data, recordRef);
              }
            }
          });
          return _ember['default'].RSVP.allSettled(savedRelationships);
        })['catch'](function (e) {
          reportError([e]);
        }).then(function (results) {
          var rejected = _ember['default'].A(results).filterBy('state', 'rejected');
          if (rejected.length !== 0) {
            reportError(rejected.mapBy('reason').toArray());
          } else {
            resolve();
          }
        });
      }, 'DS: FirebaseAdapter#updateRecord ' + typeClass + ' to ' + recordRef.toString());
    },

    /**
     * Update a single record without caring for the relationships
     * @param  {Firebase} recordRef
     * @param  {Object} serializedRecord
     * @return {Promise}
     */
    _updateRecord: function _updateRecord(recordRef, serializedRecord) {
      return (0, _emberfireUtilsToPromise['default'])(recordRef.update, recordRef, [serializedRecord]);
    },

    /**
     * Call _saveHasManyRelationshipRecord on each record in the relationship
     * and then resolve once they have all settled
     */
    _saveHasManyRelationship: function _saveHasManyRelationship(store, typeClass, relationship, ids, recordRef, recordCache) {
      var _this9 = this;

      if (!_ember['default'].isArray(ids)) {
        throw new Error('hasMany relationships must must be an array');
      }
      var idsCache = _ember['default'].A(recordCache[relationship.key]);
      var dirtyRecords = [];

      // Added
      var addedRecords = (0, _lodashCollectionFilter['default'])(ids, function (id) {
        return !idsCache.contains(id);
      });

      // Dirty
      dirtyRecords = (0, _lodashCollectionFilter['default'])(ids, function (id) {
        var relatedModelName = relationship.type;
        return store.hasRecordForId(relatedModelName, id) && store.peekRecord(relatedModelName, id).get('hasDirtyAttributes') === true;
      });

      dirtyRecords = (0, _lodashCollectionMap['default'])(uniq(dirtyRecords.concat(addedRecords)), function (id) {
        return _this9._saveHasManyRecord(store, typeClass, relationship, recordRef, id);
      });

      // Removed
      var removedRecords = (0, _lodashCollectionFilter['default'])(idsCache, function (id) {
        return !(0, _lodashCollectionIncludes['default'])(ids, id);
      });

      removedRecords = (0, _lodashCollectionMap['default'])(removedRecords, function (id) {
        return _this9._removeHasManyRecord(store, recordRef, relationship.key, typeClass, id);
      });
      // Combine all the saved records
      var savedRecords = dirtyRecords.concat(removedRecords);
      // Wait for all the updates to finish
      return _ember['default'].RSVP.allSettled(savedRecords).then(function (savedRecords) {
        var rejected = _ember['default'].A(_ember['default'].A(savedRecords).filterBy('state', 'rejected'));
        if (rejected.get('length') === 0) {
          // Update the cache
          recordCache[relationship.key] = ids;
          return savedRecords;
        } else {
          var error = new Error('Some errors were encountered while saving a hasMany relationship ' + relationship.parentType + ' -> ' + relationship.type);
          error.errors = _ember['default'].A(rejected).mapBy('reason');
          throw error;
        }
      });
    },

    /**
     * If the relationship is `async: true`, create a child ref
     * named with the record id and set the value to true
      * If the relationship is `embedded: true`, create a child ref
     * named with the record id and update the value to the serialized
     * version of the record
     */
    _saveHasManyRecord: function _saveHasManyRecord(store, typeClass, relationship, parentRef, id) {
      var serializer = store.serializerFor(typeClass.modelName);
      var ref = this._getRelationshipRef(parentRef, serializer.keyForRelationship(relationship.key), id);
      var record = store.peekRecord(relationship.type, id);
      var isEmbedded = this.isRelationshipEmbedded(store, typeClass.modelName, relationship);
      if (isEmbedded) {
        return record.save();
      }

      return (0, _emberfireUtilsToPromise['default'])(ref.set, ref, [true]);
    },

    /**
     * Determine from the serializer if the relationship is embedded via the
     * serializer's `attrs` hash.
     *
     * @return {Boolean}              Is the relationship embedded?
     */
    isRelationshipEmbedded: function isRelationshipEmbedded(store, modelName, relationship) {
      var serializer = store.serializerFor(modelName);
      return serializer.hasDeserializeRecordsOption(relationship.key);
    },

    /**
     * Determine from if the record is embedded via implicit relationships.
     *
     * @return {Boolean}              Is the relationship embedded?
     */
    isRecordEmbedded: function isRecordEmbedded(record) {
      if (record._internalModel) {
        record = record._internalModel;
      }

      var found = this.getFirstEmbeddingParent(record);

      return !!found;
    },

    /**
     * Remove a relationship
     */
    _removeHasManyRecord: function _removeHasManyRecord(store, parentRef, key, typeClass, id) {
      var relationshipKey = store.serializerFor(typeClass.modelName).keyForRelationship(key);
      var ref = this._getRelationshipRef(parentRef, relationshipKey, id);
      return (0, _emberfireUtilsToPromise['default'])(ref.remove, ref, [], ref.toString());
    },

    /**
     * Save an embedded belongsTo record and set its internal firebase ref
     *
     * @return {Promise<DS.Model>}
     */
    _saveEmbeddedBelongsToRecord: function _saveEmbeddedBelongsToRecord(store, typeClass, relationship, id, parentRef) {
      var record = store.peekRecord(relationship.type, id);
      if (record) {
        return record.save();
      }
      return _ember['default'].RSVP.Promise.reject(new Error('Unable to find record with id ' + id + ' from embedded relationship: ' + JSON.stringify(relationship)));
    },

    /**
     * Called by the store when a record is deleted.
     */
    deleteRecord: function deleteRecord(store, typeClass, snapshot) {
      var ref = this._getAbsoluteRef(snapshot.record);
      ref.off('value');
      return (0, _emberfireUtilsToPromise['default'])(ref.remove, ref);
    },

    /**
     * Determines a path fo a given type
     */
    pathForType: function pathForType(modelName) {
      var camelized = _ember['default'].String.camelize(modelName);
      return _ember['default'].String.pluralize(camelized);
    },

    /**
     * Return a Firebase reference for a given modelName and optional ID.
     */
    _getCollectionRef: function _getCollectionRef(typeClass, id) {
      var ref = this._ref;
      if (typeClass) {
        ref = ref.child(this.pathForType(typeClass.modelName));
      }
      if (id) {
        ref = ref.child(id);
      }
      return ref;
    },

    /**
     * Returns a Firebase reference for a record taking into account if the record is embedded
     *
     * @param  {DS.Model} record
     * @return {Firebase}
     */
    _getAbsoluteRef: function _getAbsoluteRef(record) {
      if (record._internalModel) {
        record = record._internalModel;
      }

      var embeddingParent = this.getFirstEmbeddingParent(record);

      if (embeddingParent) {
        var parent = embeddingParent.record;
        var relationship = embeddingParent.relationship;

        var embeddedKey = parent.store.serializerFor(parent.modelName).keyForRelationship(relationship.key);
        var recordRef = this._getAbsoluteRef(parent).child(embeddedKey);

        if (relationship.kind === 'hasMany') {
          recordRef = recordRef.child(record.id);
        }
        return recordRef;
      }

      return this._getCollectionRef(record.type, record.id);
    },

    /**
     * Returns the parent record and relationship where any embedding is detected
     *
     * @param  {DS.InternalModel} internalModel
     * @return {Object}
     */
    getFirstEmbeddingParent: function getFirstEmbeddingParent(internalModel) {
      var _this10 = this;

      var relationships = (0, _lodashObjectAssign['default'])({}, internalModel._implicitRelationships, internalModel._relationships.initializedRelationships);

      var embeddingParentRel = (0, _lodashCollectionFind['default'])(relationships, function (rel) {
        var members = rel.members.toArray();
        var parent = members[0];

        if (!parent || !rel.inverseKey) {
          return false;
        }

        var parentRel = parent._relationships.get(rel.inverseKey);
        return _this10.isRelationshipEmbedded(_this10.store, parent.type.modelName, parentRel.relationshipMeta);
      });

      if (embeddingParentRel) {
        var parent = embeddingParentRel.members.toArray()[0];
        var parentKey = embeddingParentRel.inverseKey;
        var parentRel = parent._relationships.get(parentKey).relationshipMeta;
        return { record: parent, relationship: parentRel };
      }
    },

    /**
     * Return a Firebase reference based on a relationship key and record id
     */
    _getRelationshipRef: function _getRelationshipRef(ref, key, id) {
      return ref.child(key).child(id);
    },

    /**
     * The amount of time (ms) before the _queue is flushed
     */
    _queueFlushDelay: 1000 / 60, // 60fps

    /**
     * Called after the first item is pushed into the _queue
     */
    _queueScheduleFlush: function _queueScheduleFlush() {
      _ember['default'].run.later(this, this._queueFlush, this._queueFlushDelay);
    },

    /**
     * Call each function in the _queue and the reset the _queue
     */
    _queueFlush: function _queueFlush() {
      (0, _lodashCollectionForEach['default'])(this._queue, function FirebaseAdapter$flushQueueItem(queueItem) {
        var fn = queueItem[0];
        var args = queueItem[1];
        fn.apply(null, args);
      });
      this._queue.length = 0;
    },

    /**
     * Push a new function into the _queue and then schedule a
     * flush if the item is the first to be pushed
     */
    _enqueue: function _enqueue(callback, args) {
      //Only do the queueing if we scheduled a delay
      if (this._queueFlushDelay) {
        var length = this._queue.push([callback, args]);
        if (length === 1) {
          this._queueScheduleFlush();
        }
      } else {
        callback.apply(null, args);
      }
    },

    /**
     * A cache of hasMany relationships that can be used to
     * diff against new relationships when a model is saved
     */
    _recordCacheForType: undefined,

    /**
     * _updateHasManyCacheForType
     */
    _updateRecordCacheForType: function _updateRecordCacheForType(typeClass, payload, store) {
      if (!payload) {
        return;
      }
      var id = payload.id;
      var cache = this._getRecordCache(typeClass, id);
      var serializer = store.serializerFor(typeClass.modelName);
      // Only cache relationships for now
      typeClass.eachRelationship(function (key, relationship) {
        if (relationship.kind === 'hasMany') {
          var ids = payload[serializer.keyForRelationship(key)];
          cache[key] = !_ember['default'].isNone(ids) ? _ember['default'].A(Object.keys(ids)) : _ember['default'].A();
        }
      });
    },

    /**
     * Get or create the cache for a record
     */
    _getRecordCache: function _getRecordCache(typeClass, id) {
      var modelName = typeClass.modelName;
      var cache = this._recordCacheForType;
      cache[modelName] = cache[modelName] || {};
      cache[modelName][id] = cache[modelName][id] || {};
      return cache[modelName][id];
    },

    /**
     * A utility for retrieving the key name of a Firebase ref or
     * DataSnapshot. This is backwards-compatible with `name()`
     * from Firebase 1.x.x and `key()` from Firebase 2.0.0+. Once
     * support for Firebase 1.x.x is dropped in EmberFire, this
     * helper can be removed.
     */
    _getKey: function _getKey(refOrSnapshot) {
      var key;
      if (typeof refOrSnapshot.key === 'function') {
        key = refOrSnapshot.key();
      } else if (typeof refOrSnapshot.key === 'string') {
        key = refOrSnapshot.key;
      } else {
        key = refOrSnapshot.name();
      }
      return key;
    },

    /**
     * We don't need background reloading, because firebase!
     */
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
      return false;
    }
  });
});