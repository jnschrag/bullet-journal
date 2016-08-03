define("ember-data/-private/system/record-arrays/adapter-populated-record-array", ["exports", "ember", "ember-data/-private/system/record-arrays/record-array", "ember-data/-private/system/clone-null", "ember-data/-private/features"], function (exports, _ember, _emberDataPrivateSystemRecordArraysRecordArray, _emberDataPrivateSystemCloneNull, _emberDataPrivateFeatures) {
  "use strict";

  /**
    @module ember-data
  */

  var get = _ember["default"].get;

  /**
    Represents an ordered list of records whose order and membership is
    determined by the adapter. For example, a query sent to the adapter
    may trigger a search on the server, whose results would be loaded
    into an instance of the `AdapterPopulatedRecordArray`.
  
    @class AdapterPopulatedRecordArray
    @namespace DS
    @extends DS.RecordArray
  */
  exports["default"] = _emberDataPrivateSystemRecordArraysRecordArray["default"].extend({
    query: null,

    replace: function replace() {
      var type = get(this, 'type').toString();
      throw new Error("The result of a server query (on " + type + ") is immutable.");
    },

    _update: function _update() {
      var store = get(this, 'store');
      var modelName = get(this, 'type.modelName');
      var query = get(this, 'query');

      return store._query(modelName, query, this);
    },

    /**
      @method loadRecords
      @param {Array} records
      @param {Object} payload normalized payload
      @private
    */
    loadRecords: function loadRecords(records, payload) {
      var _this = this;

      //TODO Optimize
      var internalModels = _ember["default"].A(records).mapBy('_internalModel');
      this.setProperties({
        content: _ember["default"].A(internalModels),
        isLoaded: true,
        isUpdating: false,
        meta: (0, _emberDataPrivateSystemCloneNull["default"])(payload.meta)
      });

      if (true) {
        this.set('links', (0, _emberDataPrivateSystemCloneNull["default"])(payload.links));
      }

      internalModels.forEach(function (record) {
        _this.manager.recordArraysForRecord(record).add(_this);
      });

      // TODO: should triggering didLoad event be the last action of the runLoop?
      _ember["default"].run.once(this, 'trigger', 'didLoad');
    }
  });
});