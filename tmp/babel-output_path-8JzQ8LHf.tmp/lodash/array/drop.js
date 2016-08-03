define('lodash/array/drop', ['exports', 'lodash/internal/baseSlice', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseSlice, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates a slice of `array` with `n` elements dropped from the beginning.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.drop([1, 2, 3]);
   * // => [2, 3]
   *
   * _.drop([1, 2, 3], 2);
   * // => [3]
   *
   * _.drop([1, 2, 3], 5);
   * // => []
   *
   * _.drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   */
  function drop(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(array, n, guard) : n == null) {
      n = 1;
    }
    return (0, _lodashInternalBaseSlice['default'])(array, n < 0 ? 0 : n);
  }

  exports['default'] = drop;
});