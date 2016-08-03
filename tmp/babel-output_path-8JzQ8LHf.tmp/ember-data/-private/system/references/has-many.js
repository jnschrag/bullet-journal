define('ember-data/-private/system/references/has-many', ['exports', 'ember', 'ember-data/-private/system/references/reference', 'ember-data/-private/debug', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateSystemReferencesReference, _emberDataPrivateDebug, _emberDataPrivateFeatures) {
  'use strict';

  var get = _ember['default'].get;

  var HasManyReference = function HasManyReference(store, parentInternalModel, hasManyRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.hasManyRelationship = hasManyRelationship;
    this.type = hasManyRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  HasManyReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  HasManyReference.prototype.constructor = HasManyReference;
  HasManyReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  HasManyReference.prototype.remoteType = function () {
    if (this.hasManyRelationship.link) {
      return "link";
    }

    return "ids";
  };

  HasManyReference.prototype.link = function () {
    return this.hasManyRelationship.link;
  };

  HasManyReference.prototype.ids = function () {
    var members = this.hasManyRelationship.members;
    var ids = members.toArray().map(function (internalModel) {
      return internalModel.id;
    });

    return ids;
  };

  HasManyReference.prototype.meta = function () {
    return this.hasManyRelationship.manyArray.meta;
  };

  HasManyReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (payload) {
      var array = payload;

      if (false) {
        (0, _emberDataPrivateDebug.deprecate)("HasManyReference#push(array) is deprecated. Push a JSON-API document instead.", !Array.isArray(payload), {
          id: 'ds.references.has-many.push-array',
          until: '3.0'
        });
      }

      var useLegacyArrayPush = true;
      if (typeof payload === "object" && payload.data) {
        array = payload.data;
        useLegacyArrayPush = array.length && array[0].data;

        if (false) {
          (0, _emberDataPrivateDebug.deprecate)("HasManyReference#push() expects a valid JSON-API document.", !useLegacyArrayPush, {
            id: 'ds.references.has-many.push-invalid-json-api',
            until: '3.0'
          });
        }
      }

      if (!false) {
        useLegacyArrayPush = true;
      }

      var internalModels = undefined;
      if (useLegacyArrayPush) {
        internalModels = array.map(function (obj) {
          var record = _this.store.push(obj);

          (0, _emberDataPrivateDebug.runInDebug)(function () {
            var relationshipMeta = _this.hasManyRelationship.relationshipMeta;
            (0, _emberDataPrivateDebug.assertPolymorphicType)(_this.internalModel, relationshipMeta, record._internalModel);
          });

          return record._internalModel;
        });
      } else {
        var records = _this.store.push(payload);
        internalModels = _ember['default'].A(records).mapBy('_internalModel');

        (0, _emberDataPrivateDebug.runInDebug)(function () {
          internalModels.forEach(function (internalModel) {
            var relationshipMeta = _this.hasManyRelationship.relationshipMeta;
            (0, _emberDataPrivateDebug.assertPolymorphicType)(_this.internalModel, relationshipMeta, internalModel);
          });
        });
      }

      _this.hasManyRelationship.computeChanges(internalModels);

      return _this.hasManyRelationship.manyArray;
    });
  };

  HasManyReference.prototype._isLoaded = function () {
    var hasData = get(this.hasManyRelationship, 'hasData');
    if (!hasData) {
      return false;
    }

    var members = this.hasManyRelationship.members.toArray();
    var isEveryLoaded = members.every(function (internalModel) {
      return internalModel.isLoaded() === true;
    });

    return isEveryLoaded;
  };

  HasManyReference.prototype.value = function () {
    if (this._isLoaded()) {
      return this.hasManyRelationship.manyArray;
    }

    return null;
  };

  HasManyReference.prototype.load = function () {
    if (!this._isLoaded()) {
      return this.hasManyRelationship.getRecords();
    }

    var manyArray = this.hasManyRelationship.manyArray;
    return _ember['default'].RSVP.resolve(manyArray);
  };

  HasManyReference.prototype.reload = function () {
    return this.hasManyRelationship.reload();
  };

  exports['default'] = HasManyReference;
});