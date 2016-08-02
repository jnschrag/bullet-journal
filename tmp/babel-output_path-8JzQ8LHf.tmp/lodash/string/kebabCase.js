define('lodash/string/kebabCase', ['exports', 'lodash/internal/createCompounder'], function (exports, _lodashInternalCreateCompounder) {
  'use strict';

  /**
   * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the kebab cased string.
   * @example
   *
   * _.kebabCase('Foo Bar');
   * // => 'foo-bar'
   *
   * _.kebabCase('fooBar');
   * // => 'foo-bar'
   *
   * _.kebabCase('__foo_bar__');
   * // => 'foo-bar'
   */
  var kebabCase = (0, _lodashInternalCreateCompounder['default'])(function (result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
  });

  exports['default'] = kebabCase;
});