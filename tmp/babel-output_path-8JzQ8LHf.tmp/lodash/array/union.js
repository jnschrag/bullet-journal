define('lodash/array/union', ['exports', 'lodash/internal/baseFlatten', 'lodash/internal/baseUniq', 'lodash/function/restParam'], function (exports, _lodashInternalBaseFlatten, _lodashInternalBaseUniq, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an array of unique values, in order, from all of the provided arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([1, 2], [4, 2], [2, 1]);
   * // => [1, 2, 4]
   */
  var union = (0, _lodashFunctionRestParam['default'])(function (arrays) {
    return (0, _lodashInternalBaseUniq['default'])((0, _lodashInternalBaseFlatten['default'])(arrays, false, true));
  });

  exports['default'] = union;
});