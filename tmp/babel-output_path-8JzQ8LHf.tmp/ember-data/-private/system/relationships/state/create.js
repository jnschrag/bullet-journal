define("ember-data/-private/system/relationships/state/create", ["exports", "ember", "ember-data/-private/system/relationships/state/has-many", "ember-data/-private/system/relationships/state/belongs-to", "ember-data/-private/system/empty-object"], function (exports, _ember, _emberDataPrivateSystemRelationshipsStateHasMany, _emberDataPrivateSystemRelationshipsStateBelongsTo, _emberDataPrivateSystemEmptyObject) {
  "use strict";

  exports["default"] = Relationships;

  var get = _ember["default"].get;

  function shouldFindInverse(relationshipMeta) {
    var options = relationshipMeta.options;
    return !(options && options.inverse === null);
  }

  function createRelationshipFor(record, relationshipMeta, store) {
    var inverseKey = undefined;
    var inverse = null;
    if (shouldFindInverse(relationshipMeta)) {
      inverse = record.type.inverseFor(relationshipMeta.key, store);
    }

    if (inverse) {
      inverseKey = inverse.name;
    }

    if (relationshipMeta.kind === 'hasMany') {
      return new _emberDataPrivateSystemRelationshipsStateHasMany["default"](store, record, inverseKey, relationshipMeta);
    } else {
      return new _emberDataPrivateSystemRelationshipsStateBelongsTo["default"](store, record, inverseKey, relationshipMeta);
    }
  }
  function Relationships(record) {
    this.record = record;
    this.initializedRelationships = new _emberDataPrivateSystemEmptyObject["default"]();
  }

  Relationships.prototype.has = function (key) {
    return !!this.initializedRelationships[key];
  };

  Relationships.prototype.get = function (key) {
    var relationships = this.initializedRelationships;
    var relationshipsByName = get(this.record.type, 'relationshipsByName');
    if (!relationships[key] && relationshipsByName.get(key)) {
      relationships[key] = createRelationshipFor(this.record, relationshipsByName.get(key), this.record.store);
    }
    return relationships[key];
  };
});