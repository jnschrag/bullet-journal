define('lodash/internal/trimmedLeftIndex', ['exports', 'lodash/internal/isSpace'], function (exports, _lodashInternalIsSpace) {
  'use strict';

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && (0, _lodashInternalIsSpace['default'])(string.charCodeAt(index))) {}
    return index;
  }

  exports['default'] = trimmedLeftIndex;
});