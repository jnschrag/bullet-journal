define('lodash/array/slice', ['exports', 'lodash/internal/baseSlice', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseSlice, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates a slice of `array` from `start` up to, but not including, `end`.
   *
   * **Note:** This method is used instead of `Array#slice` to support node
   * lists in IE < 9 and to ensure dense arrays are returned.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function slice(array, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (end && typeof end != 'number' && (0, _lodashInternalIsIterateeCall['default'])(array, start, end)) {
      start = 0;
      end = length;
    }
    return (0, _lodashInternalBaseSlice['default'])(array, start, end);
  }

  exports['default'] = slice;
});