define('lodash/string/trim', ['exports', 'lodash/internal/baseToString', 'lodash/internal/charsLeftIndex', 'lodash/internal/charsRightIndex', 'lodash/internal/isIterateeCall', 'lodash/internal/trimmedLeftIndex', 'lodash/internal/trimmedRightIndex'], function (exports, _lodashInternalBaseToString, _lodashInternalCharsLeftIndex, _lodashInternalCharsRightIndex, _lodashInternalIsIterateeCall, _lodashInternalTrimmedLeftIndex, _lodashInternalTrimmedRightIndex) {
  'use strict';

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    var value = string;
    string = (0, _lodashInternalBaseToString['default'])(string);
    if (!string) {
      return string;
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(value, chars, guard) : chars == null) {
      return string.slice((0, _lodashInternalTrimmedLeftIndex['default'])(string), (0, _lodashInternalTrimmedRightIndex['default'])(string) + 1);
    }
    chars = chars + '';
    return string.slice((0, _lodashInternalCharsLeftIndex['default'])(string, chars), (0, _lodashInternalCharsRightIndex['default'])(string, chars) + 1);
  }

  exports['default'] = trim;
});