define('ember-data/-private/system/references', ['exports', 'ember-data/-private/system/references/record', 'ember-data/-private/system/references/belongs-to', 'ember-data/-private/system/references/has-many'], function (exports, _emberDataPrivateSystemReferencesRecord, _emberDataPrivateSystemReferencesBelongsTo, _emberDataPrivateSystemReferencesHasMany) {
  'use strict';

  exports.RecordReference = _emberDataPrivateSystemReferencesRecord['default'];
  exports.BelongsToReference = _emberDataPrivateSystemReferencesBelongsTo['default'];
  exports.HasManyReference = _emberDataPrivateSystemReferencesHasMany['default'];
});