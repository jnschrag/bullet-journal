define('ember-inflector/lib/system/string', ['exports', 'ember-inflector/lib/system/inflector'], function (exports, _emberInflectorLibSystemInflector) {
  'use strict';

  function pluralize(word) {
    return _emberInflectorLibSystemInflector['default'].inflector.pluralize(word);
  }

  function singularize(word) {
    return _emberInflectorLibSystemInflector['default'].inflector.singularize(word);
  }

  exports.pluralize = pluralize;
  exports.singularize = singularize;
});