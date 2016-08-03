define('ember-data/-private/system/references/belongs-to', ['exports', 'ember-data/model', 'ember', 'ember-data/-private/system/references/reference', 'ember-data/-private/features', 'ember-data/-private/debug'], function (exports, _emberDataModel, _ember, _emberDataPrivateSystemReferencesReference, _emberDataPrivateFeatures, _emberDataPrivateDebug) {
  'use strict';

  var BelongsToReference = function BelongsToReference(store, parentInternalModel, belongsToRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.belongsToRelationship = belongsToRelationship;
    this.type = belongsToRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  BelongsToReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  BelongsToReference.prototype.constructor = BelongsToReference;
  BelongsToReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  BelongsToReference.prototype.remoteType = function () {
    if (this.belongsToRelationship.link) {
      return "link";
    }

    return "id";
  };

  BelongsToReference.prototype.id = function () {
    var inverseRecord = this.belongsToRelationship.inverseRecord;
    return inverseRecord && inverseRecord.id;
  };

  BelongsToReference.prototype.link = function () {
    return this.belongsToRelationship.link;
  };

  BelongsToReference.prototype.meta = function () {
    return this.belongsToRelationship.meta;
  };

  BelongsToReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (data) {
      var record;

      if (data instanceof _emberDataModel['default']) {
        if (false) {
          (0, _emberDataPrivateDebug.deprecate)("BelongsToReference#push(DS.Model) is deprecated. Update relationship via `model.set('relationshipName', value)` instead.", false, {
            id: 'ds.references.belongs-to.push-record',
            until: '3.0'
          });
        }
        record = data;
      } else {
        record = _this.store.push(data);
      }

      (0, _emberDataPrivateDebug.assertPolymorphicType)(_this.internalModel, _this.belongsToRelationship.relationshipMeta, record._internalModel);

      _this.belongsToRelationship.setCanonicalRecord(record._internalModel);

      return record;
    });
  };

  BelongsToReference.prototype.value = function () {
    var inverseRecord = this.belongsToRelationship.inverseRecord;

    if (inverseRecord && inverseRecord.record) {
      return inverseRecord.record;
    }

    return null;
  };

  BelongsToReference.prototype.load = function () {
    var _this2 = this;

    if (this.remoteType() === "id") {
      return this.belongsToRelationship.getRecord();
    }

    if (this.remoteType() === "link") {
      return this.belongsToRelationship.findLink().then(function (internalModel) {
        return _this2.value();
      });
    }
  };

  BelongsToReference.prototype.reload = function () {
    var _this3 = this;

    return this.belongsToRelationship.reload().then(function (internalModel) {
      return _this3.value();
    });
  };

  exports['default'] = BelongsToReference;
});