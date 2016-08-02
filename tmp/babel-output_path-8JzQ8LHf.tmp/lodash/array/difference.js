define('lodash/array/difference', ['exports', 'lodash/internal/baseDifference', 'lodash/internal/baseFlatten', 'lodash/internal/isArrayLike', 'lodash/internal/isObjectLike', 'lodash/function/restParam'], function (exports, _lodashInternalBaseDifference, _lodashInternalBaseFlatten, _lodashInternalIsArrayLike, _lodashInternalIsObjectLike, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an array of unique `array` values not included in the other
   * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3], [4, 2]);
   * // => [1, 3]
   */
  var difference = (0, _lodashFunctionRestParam['default'])(function (array, values) {
    return (0, _lodashInternalIsObjectLike['default'])(array) && (0, _lodashInternalIsArrayLike['default'])(array) ? (0, _lodashInternalBaseDifference['default'])(array, (0, _lodashInternalBaseFlatten['default'])(values, false, true)) : [];
  });

  exports['default'] = difference;
});