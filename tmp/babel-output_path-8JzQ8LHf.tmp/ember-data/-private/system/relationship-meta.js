define('ember-data/-private/system/relationship-meta', ['exports', 'ember-inflector', 'ember-data/-private/system/normalize-model-name'], function (exports, _emberInflector, _emberDataPrivateSystemNormalizeModelName) {
  'use strict';

  exports.typeForRelationshipMeta = typeForRelationshipMeta;
  exports.relationshipFromMeta = relationshipFromMeta;

  function typeForRelationshipMeta(meta) {
    var modelName;

    modelName = meta.type || meta.key;
    if (meta.kind === 'hasMany') {
      modelName = (0, _emberInflector.singularize)((0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName));
    }
    return modelName;
  }

  function relationshipFromMeta(meta) {
    return {
      key: meta.key,
      kind: meta.kind,
      type: typeForRelationshipMeta(meta),
      options: meta.options,
      parentType: meta.parentType,
      isRelationship: true
    };
  }
});