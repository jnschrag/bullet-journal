define('lodash/array/dropRight', ['exports', 'lodash/internal/baseSlice', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseSlice, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates a slice of `array` with `n` elements dropped from the end.
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
   * _.dropRight([1, 2, 3]);
   * // => [1, 2]
   *
   * _.dropRight([1, 2, 3], 2);
   * // => [1]
   *
   * _.dropRight([1, 2, 3], 5);
   * // => []
   *
   * _.dropRight([1, 2, 3], 0);
   * // => [1, 2, 3]
   */
  function dropRight(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(array, n, guard) : n == null) {
      n = 1;
    }
    n = length - (+n || 0);
    return (0, _lodashInternalBaseSlice['default'])(array, 0, n < 0 ? 0 : n);
  }

  exports['default'] = dropRight;
});