define('lodash/internal/createCompounder', ['exports', 'lodash/string/deburr', 'lodash/string/words'], function (exports, _lodashStringDeburr, _lodashStringWords) {
  'use strict';

  /**
   * Creates a function that produces compound words out of the words in a
   * given string.
   *
   * @private
   * @param {Function} callback The function to combine each word.
   * @returns {Function} Returns the new compounder function.
   */
  function createCompounder(callback) {
    return function (string) {
      var index = -1,
          array = (0, _lodashStringWords['default'])((0, _lodashStringDeburr['default'])(string)),
          length = array.length,
          result = '';

      while (++index < length) {
        result = callback(result, array[index], index);
      }
      return result;
    };
  }

  exports['default'] = createCompounder;
});