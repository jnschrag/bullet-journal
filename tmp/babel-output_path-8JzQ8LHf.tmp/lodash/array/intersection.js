define('lodash/array/intersection', ['exports', 'lodash/internal/baseIndexOf', 'lodash/internal/cacheIndexOf', 'lodash/internal/createCache', 'lodash/internal/isArrayLike', 'lodash/function/restParam'], function (exports, _lodashInternalBaseIndexOf, _lodashInternalCacheIndexOf, _lodashInternalCreateCache, _lodashInternalIsArrayLike, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an array of unique values that are included in all of the provided
   * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of shared values.
   * @example
   * _.intersection([1, 2], [4, 2], [2, 1]);
   * // => [2]
   */
  var intersection = (0, _lodashFunctionRestParam['default'])(function (arrays) {
    var othLength = arrays.length,
        othIndex = othLength,
        caches = Array(length),
        indexOf = _lodashInternalBaseIndexOf['default'],
        isCommon = true,
        result = [];

    while (othIndex--) {
      var value = arrays[othIndex] = (0, _lodashInternalIsArrayLike['default'])(value = arrays[othIndex]) ? value : [];
      caches[othIndex] = isCommon && value.length >= 120 ? (0, _lodashInternalCreateCache['default'])(othIndex && value) : null;
    }
    var array = arrays[0],
        index = -1,
        length = array ? array.length : 0,
        seen = caches[0];

    outer: while (++index < length) {
      value = array[index];
      if ((seen ? (0, _lodashInternalCacheIndexOf['default'])(seen, value) : indexOf(result, value, 0)) < 0) {
        var othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if ((cache ? (0, _lodashInternalCacheIndexOf['default'])(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(value);
        }
        result.push(value);
      }
    }
    return result;
  });

  exports['default'] = intersection;
});