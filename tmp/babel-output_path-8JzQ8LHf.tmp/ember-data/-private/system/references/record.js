define('ember-data/-private/system/references/record', ['exports', 'ember', 'ember-data/-private/system/references/reference'], function (exports, _ember, _emberDataPrivateSystemReferencesReference) {
  'use strict';

  var RecordReference = function RecordReference(store, internalModel) {
    this._super$constructor(store, internalModel);
    this.type = internalModel.modelName;
    this._id = internalModel.id;
  };

  RecordReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  RecordReference.prototype.constructor = RecordReference;
  RecordReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  RecordReference.prototype.id = function () {
    return this._id;
  };

  RecordReference.prototype.remoteType = function () {
    return 'identity';
  };

  RecordReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (data) {
      var record = _this.store.push(data);
      return record;
    });
  };

  RecordReference.prototype.value = function () {
    return this.internalModel.record;
  };

  RecordReference.prototype.load = function () {
    return this.store.findRecord(this.type, this._id);
  };

  RecordReference.prototype.reload = function () {
    var record = this.value();
    if (record) {
      return record.reload();
    }

    return this.load();
  };

  exports['default'] = RecordReference;
});