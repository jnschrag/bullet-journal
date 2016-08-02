import Ember from 'ember';
import RecordArray from "ember-data/-private/system/record-arrays/record-array";
import cloneNull from "ember-data/-private/system/clone-null";
import isEnabled from 'ember-data/-private/features';

/**
  @module ember-data
*/

var get = Ember.get;

/**
  Represents an ordered list of records whose order and membership is
  determined by the adapter. For example, a query sent to the adapter
  may trigger a search on the server, whose results would be loaded
  into an instance of the `AdapterPopulatedRecordArray`.

  @class AdapterPopulatedRecordArray
  @namespace DS
  @extends DS.RecordArray
*/
export default RecordArray.extend({
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
    var internalModels = Ember.A(records).mapBy('_internalModel');
    this.setProperties({
      content: Ember.A(internalModels),
      isLoaded: true,
      isUpdating: false,
      meta: cloneNull(payload.meta)
    });

    if (true) {
      this.set('links', cloneNull(payload.links));
    }

    internalModels.forEach(function (record) {
      _this.manager.recordArraysForRecord(record).add(_this);
    });

    // TODO: should triggering didLoad event be the last action of the runLoop?
    Ember.run.once(this, 'trigger', 'didLoad');
  }
});