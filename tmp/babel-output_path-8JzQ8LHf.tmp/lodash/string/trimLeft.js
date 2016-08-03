define('lodash/string/trimLeft', ['exports', 'lodash/internal/baseToString', 'lodash/internal/charsLeftIndex', 'lodash/internal/isIterateeCall', 'lodash/internal/trimmedLeftIndex'], function (exports, _lodashInternalBaseToString, _lodashInternalCharsLeftIndex, _lodashInternalIsIterateeCall, _lodashInternalTrimmedLeftIndex) {
  'use strict';

  /**
   * Removes leading whitespace or specified characters from `string`.
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
   * _.trimLeft('  abc  ');
   * // => 'abc  '
   *
   * _.trimLeft('-_-abc-_-', '_-');
   * // => 'abc-_-'
   */
  function trimLeft(string, chars, guard) {
    var value = string;
    string = (0, _lodashInternalBaseToString['default'])(string);
    if (!string) {
      return string;
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(value, chars, guard) : chars == null) {
      return string.slice((0, _lodashInternalTrimmedLeftIndex['default'])(string));
    }
    return string.slice((0, _lodashInternalCharsLeftIndex['default'])(string, chars + ''));
  }

  exports['default'] = trimLeft;
});