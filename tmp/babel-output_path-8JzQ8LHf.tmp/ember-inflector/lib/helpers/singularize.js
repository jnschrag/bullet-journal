define('ember-inflector/lib/helpers/singularize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _emberInflectorLibUtilsMakeHelper) {
  'use strict';

  /**
   *
   * If you have Ember Inflector (such as if Ember Data is present),
   * singularize a word. For example, turn "oxen" into "ox".
   *
   * Example:
   *
   * {{singularize myProperty}}
   * {{singularize "oxen"}}
   *
   * @for Ember.HTMLBars.helpers
   * @method singularize
   * @param {String|Property} word word to singularize
  */
  exports['default'] = (0, _emberInflectorLibUtilsMakeHelper['default'])(function (params) {
    return (0, _emberInflector.singularize)(params[0]);
  });
});