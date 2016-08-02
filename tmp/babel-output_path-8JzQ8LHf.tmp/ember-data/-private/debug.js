define('ember-data/-private/debug', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.assert = assert;
  exports.debug = debug;
  exports.deprecate = deprecate;
  exports.info = info;
  exports.runInDebug = runInDebug;
  exports.warn = warn;
  exports.debugSeal = debugSeal;
  exports.assertPolymorphicType = assertPolymorphicType;

  function assert() {
    return _ember['default'].assert.apply(_ember['default'], arguments);
  }

  function debug() {
    return _ember['default'].debug.apply(_ember['default'], arguments);
  }

  function deprecate() {
    return _ember['default'].deprecate.apply(_ember['default'], arguments);
  }

  function info() {
    return _ember['default'].info.apply(_ember['default'], arguments);
  }

  function runInDebug() {
    return _ember['default'].runInDebug.apply(_ember['default'], arguments);
  }

  function warn() {
    return _ember['default'].warn.apply(_ember['default'], arguments);
  }

  function debugSeal() {
    return _ember['default'].debugSeal.apply(_ember['default'], arguments);
  }

  function checkPolymorphic(typeClass, addedRecord) {
    if (typeClass.__isMixin) {
      //TODO Need to do this in order to support mixins, should convert to public api
      //once it exists in Ember
      return typeClass.__mixin.detect(addedRecord.type.PrototypeMixin);
    }
    if (_ember['default'].MODEL_FACTORY_INJECTIONS) {
      typeClass = typeClass.superclass;
    }
    return typeClass.detect(addedRecord.type);
  }

  /**
    Assert that `addedRecord` has a valid type so it can be added to the
    relationship of the `record`.
  
    The assert basically checks if the `addedRecord` can be added to the
    relationship (specified via `relationshipMeta`) of the `record`.
  
    This utility should only be used internally, as both record parameters must
    be an InternalModel and the `relationshipMeta` needs to be the meta
    information about the relationship, retrieved via
    `record.relationshipFor(key)`.
  
    @method assertPolymorphicType
    @param {InternalModel} record
    @param {RelationshipMeta} relationshipMeta retrieved via
           `record.relationshipFor(key)`
    @param {InternalModel} addedRecord record which
           should be added/set for the relationship
  */

  function assertPolymorphicType(record, relationshipMeta, addedRecord) {
    var addedType = addedRecord.type.modelName;
    var recordType = record.type.modelName;
    var key = relationshipMeta.key;
    var typeClass = record.store.modelFor(relationshipMeta.type);

    var assertionMessage = 'You cannot add a record of type \'' + addedType + '\' to the \'' + recordType + '.' + key + '\' relationship (only \'' + typeClass.modelName + '\' allowed)';

    assert(assertionMessage, checkPolymorphic(typeClass, addedRecord));
  }
});