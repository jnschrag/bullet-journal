define('ember-inflector/lib/helpers/pluralize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _emberInflectorLibUtilsMakeHelper) {
  'use strict';

  /**
   *
   * If you have Ember Inflector (such as if Ember Data is present),
   * pluralize a word. For example, turn "ox" into "oxen".
   *
   * Example:
   *
   * {{pluralize count myProperty}}
   * {{pluralize 1 "oxen"}}
   * {{pluralize myProperty}}
   * {{pluralize "ox"}}
   *
   * @for Ember.HTMLBars.helpers
   * @method pluralize
   * @param {Number|Property} [count] count of objects
   * @param {String|Property} word word to pluralize
  */
  exports['default'] = (0, _emberInflectorLibUtilsMakeHelper['default'])(function (params) {
    var count = undefined,
        word = undefined;

    if (params.length === 1) {
      word = params[0];
      return (0, _emberInflector.pluralize)(word);
    } else {
      count = params[0];
      word = params[1];

      if (parseFloat(count) !== 1) {
        word = (0, _emberInflector.pluralize)(word);
      }

      return count + " " + word;
    }
  });
});