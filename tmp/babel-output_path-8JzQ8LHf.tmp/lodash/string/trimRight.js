define('lodash/string/trimRight', ['exports', 'lodash/internal/baseToString', 'lodash/internal/charsRightIndex', 'lodash/internal/isIterateeCall', 'lodash/internal/trimmedRightIndex'], function (exports, _lodashInternalBaseToString, _lodashInternalCharsRightIndex, _lodashInternalIsIterateeCall, _lodashInternalTrimmedRightIndex) {
  'use strict';

  /**
   * Removes trailing whitespace or specified characters from `string`.
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
   * _.trimRight('  abc  ');
   * // => '  abc'
   *
   * _.trimRight('-_-abc-_-', '_-');
   * // => '-_-abc'
   */
  function trimRight(string, chars, guard) {
    var value = string;
    string = (0, _lodashInternalBaseToString['default'])(string);
    if (!string) {
      return string;
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(value, chars, guard) : chars == null) {
      return string.slice(0, (0, _lodashInternalTrimmedRightIndex['default'])(string) + 1);
    }
    return string.slice(0, (0, _lodashInternalCharsRightIndex['default'])(string, chars + '') + 1);
  }

  exports['default'] = trimRight;
});