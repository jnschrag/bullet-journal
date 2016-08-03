define('ember-data/-private/system/normalize-model-name', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = normalizeModelName;

  /**
    All modelNames are dasherized internally. Changing this function may
    require changes to other normalization hooks (such as typeForRoot).
    @method normalizeModelName
    @public
    @param {String} modelName
    @return {String} if the adapter can generate one, an ID
    @for DS
  */
  function normalizeModelName(modelName) {
    return _ember['default'].String.dasherize(modelName);
  }
});