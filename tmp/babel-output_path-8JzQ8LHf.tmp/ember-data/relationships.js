define("ember-data/relationships", ["exports", "ember-data/-private/system/relationships/belongs-to", "ember-data/-private/system/relationships/has-many"], function (exports, _emberDataPrivateSystemRelationshipsBelongsTo, _emberDataPrivateSystemRelationshipsHasMany) {
  /**
    @module ember-data
  */

  "use strict";

  exports.belongsTo = _emberDataPrivateSystemRelationshipsBelongsTo["default"];
  exports.hasMany = _emberDataPrivateSystemRelationshipsHasMany["default"];
});