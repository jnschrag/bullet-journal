define('lodash/string/snakeCase', ['exports', 'lodash/internal/createCompounder'], function (exports, _lodashInternalCreateCompounder) {
  'use strict';

  /**
   * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the snake cased string.
   * @example
   *
   * _.snakeCase('Foo Bar');
   * // => 'foo_bar'
   *
   * _.snakeCase('fooBar');
   * // => 'foo_bar'
   *
   * _.snakeCase('--foo-bar');
   * // => 'foo_bar'
   */
  var snakeCase = (0, _lodashInternalCreateCompounder['default'])(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });

  exports['default'] = snakeCase;
});