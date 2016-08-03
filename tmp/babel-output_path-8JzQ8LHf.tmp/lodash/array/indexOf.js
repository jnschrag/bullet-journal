define('lodash/array/indexOf', ['exports', 'lodash/internal/baseIndexOf', 'lodash/internal/binaryIndex'], function (exports, _lodashInternalBaseIndexOf, _lodashInternalBinaryIndex) {
  'use strict';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons. If `fromIndex` is negative, it's used as the offset
   * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
   * performs a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // using `fromIndex`
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   *
   * // performing a binary search
   * _.indexOf([1, 1, 2, 2], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;
    if (!length) {
      return -1;
    }
    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
    } else if (fromIndex) {
      var index = (0, _lodashInternalBinaryIndex['default'])(array, value);
      if (index < length && (value === value ? value === array[index] : array[index] !== array[index])) {
        return index;
      }
      return -1;
    }
    return (0, _lodashInternalBaseIndexOf['default'])(array, value, fromIndex || 0);
  }

  exports['default'] = indexOf;
});