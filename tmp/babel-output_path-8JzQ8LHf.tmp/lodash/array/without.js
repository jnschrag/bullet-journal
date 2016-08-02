define('lodash/array/without', ['exports', 'lodash/internal/baseDifference', 'lodash/internal/isArrayLike', 'lodash/function/restParam'], function (exports, _lodashInternalBaseDifference, _lodashInternalIsArrayLike, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an array excluding all provided values using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to filter.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.without([1, 2, 1, 3], 1, 2);
   * // => [3]
   */
  var without = (0, _lodashFunctionRestParam['default'])(function (array, values) {
    return (0, _lodashInternalIsArrayLike['default'])(array) ? (0, _lodashInternalBaseDifference['default'])(array, values) : [];
  });

  exports['default'] = without;
});