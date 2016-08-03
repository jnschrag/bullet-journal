var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

export default InternalModel;

import Ember from 'ember';
import { assert } from "ember-data/-private/debug";
import RootState from "ember-data/-private/system/model/states";
import Relationships from "ember-data/-private/system/relationships/state/create";
import Snapshot from "ember-data/-private/system/snapshot";
import EmptyObject from "ember-data/-private/system/empty-object";

import { getOwner } from 'ember-data/-private/utils';

import { RecordReference, BelongsToReference, HasManyReference } from "ember-data/-private/system/references";

var Promise = Ember.RSVP.Promise;
var get = Ember.get;
var set = Ember.set;
var copy = Ember.copy;
var assign = Ember.assign || Ember.merge;

var _extractPivotNameCache = new EmptyObject();
var _splitOnDotCache = new EmptyObject();

function splitOnDot(name) {
  return _splitOnDotCache[name] || (_splitOnDotCache[name] = name.split('.'));
}

function extractPivotName(name) {
  return _extractPivotNameCache[name] || (_extractPivotNameCache[name] = splitOnDot(name)[0]);
}

function retrieveFromCurrentState(key) {
  return function () {
    return get(this.currentState, key);
  };
}

var guid = 0;
/*
  `InternalModel` is the Model class that we use internally inside Ember Data to represent models.
  Internal ED methods should only deal with `InternalModel` objects. It is a fast, plain Javascript class.

  We expose `DS.Model` to application code, by materializing a `DS.Model` from `InternalModel` lazily, as
  a performance optimization.

  `InternalModel` should never be exposed to application code. At the boundaries of the system, in places
  like `find`, `push`, etc. we convert between Models and InternalModels.

  We need to make sure that the properties from `InternalModel` are correctly exposed/proxied on `Model`
  if they are needed.

  @private
  @class InternalModel
*/
function InternalModel(type, id, store, _, data) {
  this.type = type;
  this.id = id;
  this.store = store;
  this._data = data || new EmptyObject();
  this.modelName = type.modelName;
  this.dataHasInitialized = false;
  //Look into making this lazy
  this._deferredTriggers = [];
  this._attributes = new EmptyObject();
  this._inFlightAttributes = new EmptyObject();
  this._relationships = new Relationships(this);
  this._recordArrays = undefined;
  this.currentState = RootState.empty;
  this.recordReference = new RecordReference(store, this);
  this.references = {};
  this.isReloading = false;
  this.isError = false;
  this.error = null;
  this.__ember_meta__ = null;
  this[Ember.GUID_KEY] = guid++ + 'internal-model';
  /*
    implicit relationships are relationship which have not been declared but the inverse side exists on
    another record somewhere
    For example if there was
     ```app/models/comment.js
    import DS from 'ember-data';
     export default DS.Model.extend({
      name: DS.attr()
    })
    ```
     but there is also
     ```app/models/post.js
    import DS from 'ember-data';
     export default DS.Model.extend({
      name: DS.attr(),
      comments: DS.hasMany('comment')
    })
    ```
     would have a implicit post relationship in order to be do things like remove ourselves from the post
    when we are deleted
  */
  this._implicitRelationships = new EmptyObject();
}

InternalModel.prototype = {
  isEmpty: retrieveFromCurrentState('isEmpty'),
  isLoading: retrieveFromCurrentState('isLoading'),
  isLoaded: retrieveFromCurrentState('isLoaded'),
  hasDirtyAttributes: retrieveFromCurrentState('hasDirtyAttributes'),
  isSaving: retrieveFromCurrentState('isSaving'),
  isDeleted: retrieveFromCurrentState('isDeleted'),
  isNew: retrieveFromCurrentState('isNew'),
  isValid: retrieveFromCurrentState('isValid'),
  dirtyType: retrieveFromCurrentState('dirtyType'),

  constructor: InternalModel,
  materializeRecord: function materializeRecord() {
    assert("Materialized " + this.modelName + " record with id:" + this.id + "more than once", this.record === null || this.record === undefined);

    // lookupFactory should really return an object that creates
    // instances with the injections applied
    var createOptions = {
      store: this.store,
      _internalModel: this,
      id: this.id,
      currentState: get(this, 'currentState'),
      isError: this.isError,
      adapterError: this.error
    };

    if (Ember.setOwner) {
      // ensure that `Ember.getOwner(this)` works inside a model instance
      Ember.setOwner(createOptions, getOwner(this.store));
    } else {
      createOptions.container = this.store.container;
    }

    this.record = this.type._create(createOptions);

    this._triggerDeferredTriggers();
  },

  recordObjectWillDestroy: function recordObjectWillDestroy() {
    this.record = null;
  },

  deleteRecord: function deleteRecord() {
    this.send('deleteRecord');
  },

  save: function save(options) {
    var promiseLabel = "DS: Model#save " + this;
    var resolver = Ember.RSVP.defer(promiseLabel);

    this.store.scheduleSave(this, resolver, options);
    return resolver.promise;
  },

  startedReloading: function startedReloading() {
    this.isReloading = true;
    if (this.record) {
      set(this.record, 'isReloading', true);
    }
  },

  finishedReloading: function finishedReloading() {
    this.isReloading = false;
    if (this.record) {
      set(this.record, 'isReloading', false);
    }
  },

  reload: function reload() {
    this.startedReloading();
    var record = this;
    var promiseLabel = "DS: Model#reload of " + this;
    return new Promise(function (resolve) {
      record.send('reloadRecord', resolve);
    }, promiseLabel).then(function () {
      record.didCleanError();
      return record;
    }, function (error) {
      record.didError(error);
      throw error;
    }, "DS: Model#reload complete, update flags")["finally"](function () {
      record.finishedReloading();
      record.updateRecordArrays();
    });
  },

  getRecord: function getRecord() {
    if (!this.record) {
      this.materializeRecord();
    }
    return this.record;
  },

  unloadRecord: function unloadRecord() {
    this.send('unloadRecord');
  },

  eachRelationship: function eachRelationship(callback, binding) {
    return this.type.eachRelationship(callback, binding);
  },

  eachAttribute: function eachAttribute(callback, binding) {
    return this.type.eachAttribute(callback, binding);
  },

  inverseFor: function inverseFor(key) {
    return this.type.inverseFor(key);
  },

  setupData: function setupData(data) {
    var changedKeys = this._changedKeys(data.attributes);
    assign(this._data, data.attributes);
    this.pushedData();
    if (this.record) {
      this.record._notifyProperties(changedKeys);
    }
    this.didInitalizeData();
  },

  becameReady: function becameReady() {
    Ember.run.schedule('actions', this.store.recordArrayManager, this.store.recordArrayManager.recordWasLoaded, this);
  },

  didInitalizeData: function didInitalizeData() {
    if (!this.dataHasInitialized) {
      this.becameReady();
      this.dataHasInitialized = true;
    }
  },

  destroy: function destroy() {
    if (this.record) {
      return this.record.destroy();
    }
  },

  /*
    @method createSnapshot
    @private
  */
  createSnapshot: function createSnapshot(options) {
    return new Snapshot(this, options);
  },

  /*
    @method loadingData
    @private
    @param {Promise} promise
  */
  loadingData: function loadingData(promise) {
    this.send('loadingData', promise);
  },

  /*
    @method loadedData
    @private
  */
  loadedData: function loadedData() {
    this.send('loadedData');
    this.didInitalizeData();
  },

  /*
    @method notFound
    @private
  */
  notFound: function notFound() {
    this.send('notFound');
  },

  /*
    @method pushedData
    @private
  */
  pushedData: function pushedData() {
    this.send('pushedData');
  },

  flushChangedAttributes: function flushChangedAttributes() {
    this._inFlightAttributes = this._attributes;
    this._attributes = new EmptyObject();
  },

  hasChangedAttributes: function hasChangedAttributes() {
    return Object.keys(this._attributes).length > 0;
  },

  /*
    Checks if the attributes which are considered as changed are still
    different to the state which is acknowledged by the server.
     This method is needed when data for the internal model is pushed and the
    pushed data might acknowledge dirty attributes as confirmed.
     @method updateChangedAttributes
    @private
   */
  updateChangedAttributes: function updateChangedAttributes() {
    var changedAttributes = this.changedAttributes();
    var changedAttributeNames = Object.keys(changedAttributes);

    for (var i = 0, _length = changedAttributeNames.length; i < _length; i++) {
      var attribute = changedAttributeNames[i];

      var _changedAttributes$attribute = _slicedToArray(changedAttributes[attribute], 2);

      var oldData = _changedAttributes$attribute[0];
      var newData = _changedAttributes$attribute[1];

      if (oldData === newData) {
        delete this._attributes[attribute];
      }
    }
  },

  /*
    Returns an object, whose keys are changed properties, and value is an
    [oldProp, newProp] array.
     @method changedAttributes
    @private
  */
  changedAttributes: function changedAttributes() {
    var oldData = this._data;
    var currentData = this._attributes;
    var inFlightData = this._inFlightAttributes;
    var newData = assign(copy(inFlightData), currentData);
    var diffData = new EmptyObject();

    var newDataKeys = Object.keys(newData);

    for (var i = 0, _length2 = newDataKeys.length; i < _length2; i++) {
      var key = newDataKeys[i];
      diffData[key] = [oldData[key], newData[key]];
    }

    return diffData;
  },

  /*
    @method adapterWillCommit
    @private
  */
  adapterWillCommit: function adapterWillCommit() {
    this.send('willCommit');
  },

  /*
    @method adapterDidDirty
    @private
  */
  adapterDidDirty: function adapterDidDirty() {
    this.send('becomeDirty');
    this.updateRecordArraysLater();
  },

  /*
    @method send
    @private
    @param {String} name
    @param {Object} context
  */
  send: function send(name, context) {
    var currentState = get(this, 'currentState');

    if (!currentState[name]) {
      this._unhandledEvent(currentState, name, context);
    }

    return currentState[name](this, context);
  },

  notifyHasManyAdded: function notifyHasManyAdded(key, record, idx) {
    if (this.record) {
      this.record.notifyHasManyAdded(key, record, idx);
    }
  },

  notifyHasManyRemoved: function notifyHasManyRemoved(key, record, idx) {
    if (this.record) {
      this.record.notifyHasManyRemoved(key, record, idx);
    }
  },

  notifyBelongsToChanged: function notifyBelongsToChanged(key, record) {
    if (this.record) {
      this.record.notifyBelongsToChanged(key, record);
    }
  },

  notifyPropertyChange: function notifyPropertyChange(key) {
    if (this.record) {
      this.record.notifyPropertyChange(key);
    }
  },

  rollbackAttributes: function rollbackAttributes() {
    var dirtyKeys = Object.keys(this._attributes);

    this._attributes = new EmptyObject();

    if (get(this, 'isError')) {
      this._inFlightAttributes = new EmptyObject();
      this.didCleanError();
    }

    //Eventually rollback will always work for relationships
    //For now we support it only out of deleted state, because we
    //have an explicit way of knowing when the server acked the relationship change
    if (this.isDeleted()) {
      //TODO: Should probably move this to the state machine somehow
      this.becameReady();
    }

    if (this.isNew()) {
      this.clearRelationships();
    }

    if (this.isValid()) {
      this._inFlightAttributes = new EmptyObject();
    }

    this.send('rolledBack');

    this.record._notifyProperties(dirtyKeys);
  },
  /*
    @method transitionTo
    @private
    @param {String} name
  */
  transitionTo: function transitionTo(name) {
    // POSSIBLE TODO: Remove this code and replace with
    // always having direct reference to state objects

    var pivotName = extractPivotName(name);
    var currentState = get(this, 'currentState');
    var state = currentState;

    do {
      if (state.exit) {
        state.exit(this);
      }
      state = state.parentState;
    } while (!state.hasOwnProperty(pivotName));

    var path = splitOnDot(name);
    var setups = [];
    var enters = [];
    var i, l;

    for (i = 0, l = path.length; i < l; i++) {
      state = state[path[i]];

      if (state.enter) {
        enters.push(state);
      }
      if (state.setup) {
        setups.push(state);
      }
    }

    for (i = 0, l = enters.length; i < l; i++) {
      enters[i].enter(this);
    }

    set(this, 'currentState', state);
    //TODO Consider whether this is the best approach for keeping these two in sync
    if (this.record) {
      set(this.record, 'currentState', state);
    }

    for (i = 0, l = setups.length; i < l; i++) {
      setups[i].setup(this);
    }

    this.updateRecordArraysLater();
  },

  _unhandledEvent: function _unhandledEvent(state, name, context) {
    var errorMessage = "Attempted to handle event `" + name + "` ";
    errorMessage += "on " + String(this) + " while in state ";
    errorMessage += state.stateName + ". ";

    if (context !== undefined) {
      errorMessage += "Called with " + Ember.inspect(context) + ".";
    }

    throw new Ember.Error(errorMessage);
  },

  triggerLater: function triggerLater() {
    var length = arguments.length;
    var args = new Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = arguments[i];
    }

    if (this._deferredTriggers.push(args) !== 1) {
      return;
    }
    Ember.run.scheduleOnce('actions', this, '_triggerDeferredTriggers');
  },

  _triggerDeferredTriggers: function _triggerDeferredTriggers() {
    //TODO: Before 1.0 we want to remove all the events that happen on the pre materialized record,
    //but for now, we queue up all the events triggered before the record was materialized, and flush
    //them once we have the record
    if (!this.record) {
      return;
    }
    for (var i = 0, l = this._deferredTriggers.length; i < l; i++) {
      this.record.trigger.apply(this.record, this._deferredTriggers[i]);
    }

    this._deferredTriggers.length = 0;
  },
  /*
    @method clearRelationships
    @private
  */
  clearRelationships: function clearRelationships() {
    var _this = this;

    this.eachRelationship(function (name, relationship) {
      if (_this._relationships.has(name)) {
        var rel = _this._relationships.get(name);
        rel.clear();
        rel.destroy();
      }
    });
    Object.keys(this._implicitRelationships).forEach(function (key) {
      _this._implicitRelationships[key].clear();
      _this._implicitRelationships[key].destroy();
    });
  },

  /*
    When a find request is triggered on the store, the user can optionally pass in
    attributes and relationships to be preloaded. These are meant to behave as if they
    came back from the server, except the user obtained them out of band and is informing
    the store of their existence. The most common use case is for supporting client side
    nested URLs, such as `/posts/1/comments/2` so the user can do
    `store.findRecord('comment', 2, { preload: { post: 1 } })` without having to fetch the post.
     Preloaded data can be attributes and relationships passed in either as IDs or as actual
    models.
     @method _preloadData
    @private
    @param {Object} preload
  */
  _preloadData: function _preloadData(preload) {
    var _this2 = this;

    //TODO(Igor) consider the polymorphic case
    Object.keys(preload).forEach(function (key) {
      var preloadValue = get(preload, key);
      var relationshipMeta = _this2.type.metaForProperty(key);
      if (relationshipMeta.isRelationship) {
        _this2._preloadRelationship(key, preloadValue);
      } else {
        _this2._data[key] = preloadValue;
      }
    });
  },

  _preloadRelationship: function _preloadRelationship(key, preloadValue) {
    var relationshipMeta = this.type.metaForProperty(key);
    var type = relationshipMeta.type;
    if (relationshipMeta.kind === 'hasMany') {
      this._preloadHasMany(key, preloadValue, type);
    } else {
      this._preloadBelongsTo(key, preloadValue, type);
    }
  },

  _preloadHasMany: function _preloadHasMany(key, preloadValue, type) {
    assert("You need to pass in an array to set a hasMany property on a record", Array.isArray(preloadValue));
    var recordsToSet = new Array(preloadValue.length);

    for (var i = 0; i < preloadValue.length; i++) {
      var recordToPush = preloadValue[i];
      recordsToSet[i] = this._convertStringOrNumberIntoInternalModel(recordToPush, type);
    }

    //We use the pathway of setting the hasMany as if it came from the adapter
    //because the user told us that they know this relationships exists already
    this._relationships.get(key).updateRecordsFromAdapter(recordsToSet);
  },

  _preloadBelongsTo: function _preloadBelongsTo(key, preloadValue, type) {
    var recordToSet = this._convertStringOrNumberIntoInternalModel(preloadValue, type);

    //We use the pathway of setting the hasMany as if it came from the adapter
    //because the user told us that they know this relationships exists already
    this._relationships.get(key).setRecord(recordToSet);
  },

  _convertStringOrNumberIntoInternalModel: function _convertStringOrNumberIntoInternalModel(value, type) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.store._internalModelForId(type, value);
    }
    if (value._internalModel) {
      return value._internalModel;
    }
    return value;
  },

  /*
    @method updateRecordArrays
    @private
  */
  updateRecordArrays: function updateRecordArrays() {
    this._updatingRecordArraysLater = false;
    this.store.dataWasUpdated(this.type, this);
  },

  setId: function setId(id) {
    assert('A record\'s id cannot be changed once it is in the loaded state', this.id === null || this.id === id || this.isNew());
    this.id = id;
    if (this.record.get('id') !== id) {
      this.record.set('id', id);
    }
  },

  didError: function didError(error) {
    this.error = error;
    this.isError = true;

    if (this.record) {
      this.record.setProperties({
        isError: true,
        adapterError: error
      });
    }
  },

  didCleanError: function didCleanError() {
    this.error = null;
    this.isError = false;

    if (this.record) {
      this.record.setProperties({
        isError: false,
        adapterError: null
      });
    }
  },
  /*
    If the adapter did not return a hash in response to a commit,
    merge the changed attributes and relationships into the existing
    saved data.
     @method adapterDidCommit
  */
  adapterDidCommit: function adapterDidCommit(data) {
    if (data) {
      data = data.attributes;
    }

    this.didCleanError();
    var changedKeys = this._changedKeys(data);

    assign(this._data, this._inFlightAttributes);
    if (data) {
      assign(this._data, data);
    }

    this._inFlightAttributes = new EmptyObject();

    this.send('didCommit');
    this.updateRecordArraysLater();

    if (!data) {
      return;
    }

    this.record._notifyProperties(changedKeys);
  },

  /*
    @method updateRecordArraysLater
    @private
  */
  updateRecordArraysLater: function updateRecordArraysLater() {
    // quick hack (something like this could be pushed into run.once
    if (this._updatingRecordArraysLater) {
      return;
    }
    this._updatingRecordArraysLater = true;
    Ember.run.schedule('actions', this, this.updateRecordArrays);
  },

  addErrorMessageToAttribute: function addErrorMessageToAttribute(attribute, message) {
    var record = this.getRecord();
    get(record, 'errors')._add(attribute, message);
  },

  removeErrorMessageFromAttribute: function removeErrorMessageFromAttribute(attribute) {
    var record = this.getRecord();
    get(record, 'errors')._remove(attribute);
  },

  clearErrorMessages: function clearErrorMessages() {
    var record = this.getRecord();
    get(record, 'errors')._clear();
  },

  hasErrors: function hasErrors() {
    var record = this.getRecord();
    var errors = get(record, 'errors');

    return !Ember.isEmpty(errors);
  },

  // FOR USE DURING COMMIT PROCESS

  /*
    @method adapterDidInvalidate
    @private
  */
  adapterDidInvalidate: function adapterDidInvalidate(errors) {
    var attribute;

    for (attribute in errors) {
      if (errors.hasOwnProperty(attribute)) {
        this.addErrorMessageToAttribute(attribute, errors[attribute]);
      }
    }

    this.send('becameInvalid');

    this._saveWasRejected();
  },

  /*
    @method adapterDidError
    @private
  */
  adapterDidError: function adapterDidError(error) {
    this.send('becameError');
    this.didError(error);
    this._saveWasRejected();
  },

  _saveWasRejected: function _saveWasRejected() {
    var keys = Object.keys(this._inFlightAttributes);
    for (var i = 0; i < keys.length; i++) {
      if (this._attributes[keys[i]] === undefined) {
        this._attributes[keys[i]] = this._inFlightAttributes[keys[i]];
      }
    }
    this._inFlightAttributes = new EmptyObject();
  },

  /*
    Ember Data has 3 buckets for storing the value of an attribute on an internalModel.
     `_data` holds all of the attributes that have been acknowledged by
    a backend via the adapter. When rollbackAttributes is called on a model all
    attributes will revert to the record's state in `_data`.
     `_attributes` holds any change the user has made to an attribute
    that has not been acknowledged by the adapter. Any values in
    `_attributes` are have priority over values in `_data`.
     `_inFlightAttributes`. When a record is being synced with the
    backend the values in `_attributes` are copied to
    `_inFlightAttributes`. This way if the backend acknowledges the
    save but does not return the new state Ember Data can copy the
    values from `_inFlightAttributes` to `_data`. Without having to
    worry about changes made to `_attributes` while the save was
    happenign.
      Changed keys builds a list of all of the values that may have been
    changed by the backend after a successful save.
     It does this by iterating over each key, value pair in the payload
    returned from the server after a save. If the `key` is found in
    `_attributes` then the user has a local changed to the attribute
    that has not been synced with the server and the key is not
    included in the list of changed keys.
  
    If the value, for a key differs from the value in what Ember Data
    believes to be the truth about the backend state (A merger of the
    `_data` and `_inFlightAttributes` objects where
    `_inFlightAttributes` has priority) then that means the backend
    has updated the value and the key is added to the list of changed
    keys.
     @method _changedKeys
    @private
  */
  _changedKeys: function _changedKeys(updates) {
    var changedKeys = [];

    if (updates) {
      var original, i, value, key;
      var keys = Object.keys(updates);
      var length = keys.length;

      original = assign(new EmptyObject(), this._data);
      original = assign(original, this._inFlightAttributes);

      for (i = 0; i < length; i++) {
        key = keys[i];
        value = updates[key];

        // A value in _attributes means the user has a local change to
        // this attributes. We never override this value when merging
        // updates from the backend so we should not sent a change
        // notification if the server value differs from the original.
        if (this._attributes[key] !== undefined) {
          continue;
        }

        if (!Ember.isEqual(original[key], value)) {
          changedKeys.push(key);
        }
      }
    }

    return changedKeys;
  },

  toString: function toString() {
    if (this.record) {
      return this.record.toString();
    } else {
      return "<" + this.modelName + ":" + this.id + ">";
    }
  },

  referenceFor: function referenceFor(type, name) {
    var reference = this.references[name];

    if (!reference) {
      var relationship = this._relationships.get(name);

      if (type === "belongsTo") {
        reference = new BelongsToReference(this.store, this, relationship);
      } else if (type === "hasMany") {
        reference = new HasManyReference(this.store, this, relationship);
      }

      this.references[name] = reference;
    }

    return reference;
  }
};