define('lodash/array/takeRight', ['exports', 'lodash/internal/baseSlice', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseSlice, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates a slice of `array` with `n` elements taken from the end.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.takeRight([1, 2, 3]);
   * // => [3]
   *
   * _.takeRight([1, 2, 3], 2);
   * // => [2, 3]
   *
   * _.takeRight([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.takeRight([1, 2, 3], 0);
   * // => []
   */
  function takeRight(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(array, n, guard) : n == null) {
      n = 1;
    }
    n = length - (+n || 0);
    return (0, _lodashInternalBaseSlice['default'])(array, n < 0 ? 0 : n);
  }

  exports['default'] = takeRight;
});