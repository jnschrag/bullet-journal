define("ember-data/-private/system/store/finders", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/store/common", "ember-data/-private/system/store/serializer-response", "ember-data/-private/system/store/serializers"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemStoreCommon, _emberDataPrivateSystemStoreSerializerResponse, _emberDataPrivateSystemStoreSerializers) {
  "use strict";

  exports._find = _find;
  exports._findMany = _findMany;
  exports._findHasMany = _findHasMany;
  exports._findBelongsTo = _findBelongsTo;
  exports._findAll = _findAll;
  exports._query = _query;
  exports._queryRecord = _queryRecord;

  var Promise = _ember["default"].RSVP.Promise;

  function payloadIsNotBlank(adapterPayload) {
    if (Array.isArray(adapterPayload)) {
      return true;
    } else {
      return Object.keys(adapterPayload || {}).length;
    }
  }

  function _find(adapter, store, typeClass, id, internalModel, options) {
    var snapshot = internalModel.createSnapshot(options);
    var promise = adapter.findRecord(store, typeClass, id, snapshot);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, internalModel.type.modelName);
    var label = "DS: Handle Adapter#findRecord of " + typeClass + " with id: " + id;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findRecord` request for a " + typeClass.modelName + " with id " + id + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, id, 'findRecord');
        (0, _emberDataPrivateDebug.assert)('Ember Data expected the primary data returned from a `findRecord` response to be an object but instead it found an array.', !Array.isArray(payload.data));
        //TODO Optimize
        var record = store.push(payload);
        return record._internalModel;
      });
    }, function (error) {
      internalModel.notFound();
      if (internalModel.isEmpty()) {
        internalModel.unloadRecord();
      }

      throw error;
    }, "DS: Extract payload of '" + typeClass + "'");
  }

  function _findMany(adapter, store, typeClass, ids, internalModels) {
    var snapshots = _ember["default"].A(internalModels).invoke('createSnapshot');
    var promise = adapter.findMany(store, typeClass, ids, snapshots);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, typeClass.modelName);
    var label = "DS: Handle Adapter#findMany of " + typeClass;

    if (promise === undefined) {
      throw new Error('adapter.findMany returned undefined, this was very likely a mistake');
    }

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findMany` request for " + typeClass.modelName + " records with ids " + ids + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findMany');
        //TODO Optimize, no need to materialize here
        var records = store.push(payload);
        var internalModels = new Array(records.length);

        for (var i = 0; i < records.length; i++) {
          internalModels[i] = records[i]._internalModel;
        }

        return internalModels;
      });
    }, null, "DS: Extract payload of " + typeClass);
  }

  function _findHasMany(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var typeClass = store.modelFor(relationship.type);
    var promise = adapter.findHasMany(store, snapshot, link, relationship);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findHasMany of " + internalModel + " : " + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findHasMany` request for a " + internalModel.modelName + "'s `" + relationship.key + "` relationship, using link " + link + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findHasMany');
        //TODO Use a non record creating push
        var records = store.push(payload);
        var recordArray = records.map(function (record) {
          return record._internalModel;
        });
        recordArray.meta = payload.meta;
        return recordArray;
      });
    }, null, "DS: Extract payload of " + internalModel + " : hasMany " + relationship.type);
  }

  function _findBelongsTo(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var typeClass = store.modelFor(relationship.type);
    var promise = adapter.findBelongsTo(store, snapshot, link, relationship);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findBelongsTo of " + internalModel + " : " + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findBelongsTo');

        if (!payload.data) {
          return null;
        }

        //TODO Optimize
        var record = store.push(payload);
        return record._internalModel;
      });
    }, null, "DS: Extract payload of " + internalModel + " : " + relationship.type);
  }

  function _findAll(adapter, store, typeClass, sinceToken, options) {
    var modelName = typeClass.modelName;
    var recordArray = store.peekAll(modelName);
    var snapshotArray = recordArray.createSnapshot(options);
    var promise = adapter.findAll(store, typeClass, sinceToken, snapshotArray);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#findAll of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findAll` request for " + typeClass.modelName + " records, but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findAll');
        //TODO Optimize
        store.push(payload);
      });

      store.didUpdateAll(typeClass);
      return store.peekAll(modelName);
    }, null, "DS: Extract payload of findAll " + typeClass);
  }

  function _query(adapter, store, typeClass, query, recordArray) {
    var modelName = typeClass.modelName;
    var promise = adapter.query(store, typeClass, query, recordArray);

    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#query of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var records, payload;
      store._adapterRun(function () {
        payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'query');
        //TODO Optimize
        records = store.push(payload);
      });

      (0, _emberDataPrivateDebug.assert)('The response to store.query is expected to be an array but it was a single record. Please wrap your response in an array or use `store.queryRecord` to query for a single record.', Array.isArray(records));
      recordArray.loadRecords(records, payload);
      return recordArray;
    }, null, "DS: Extract payload of query " + typeClass);
  }

  function _queryRecord(adapter, store, typeClass, query) {
    var modelName = typeClass.modelName;
    var promise = adapter.queryRecord(store, typeClass, query);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#queryRecord of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var record;
      store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'queryRecord');

        (0, _emberDataPrivateDebug.assert)("Expected the primary data returned by the serializer for a `queryRecord` response to be a single object or null but instead it was an array.", !Array.isArray(payload.data), {
          id: 'ds.store.queryRecord-array-response'
        });

        //TODO Optimize
        record = store.push(payload);
      });

      return record;
    }, null, "DS: Extract payload of queryRecord " + typeClass);
  }
});