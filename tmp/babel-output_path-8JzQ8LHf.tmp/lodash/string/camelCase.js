define('lodash/string/camelCase', ['exports', 'lodash/internal/createCompounder'], function (exports, _lodashInternalCreateCompounder) {
  'use strict';

  /**
   * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the camel cased string.
   * @example
   *
   * _.camelCase('Foo Bar');
   * // => 'fooBar'
   *
   * _.camelCase('--foo-bar');
   * // => 'fooBar'
   *
   * _.camelCase('__foo_bar__');
   * // => 'fooBar'
   */
  var camelCase = (0, _lodashInternalCreateCompounder['default'])(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? word.charAt(0).toUpperCase() + word.slice(1) : word);
  });

  exports['default'] = camelCase;
});