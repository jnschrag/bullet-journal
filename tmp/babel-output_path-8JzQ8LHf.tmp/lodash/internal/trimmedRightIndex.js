define('lodash/internal/trimmedRightIndex', ['exports', 'lodash/internal/isSpace'], function (exports, _lodashInternalIsSpace) {
  'use strict';

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && (0, _lodashInternalIsSpace['default'])(string.charCodeAt(index))) {}
    return index;
  }

  exports['default'] = trimmedRightIndex;
});