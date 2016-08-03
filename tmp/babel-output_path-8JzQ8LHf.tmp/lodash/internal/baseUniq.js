define('lodash/internal/baseUniq', ['exports', 'lodash/internal/baseIndexOf', 'lodash/internal/cacheIndexOf', 'lodash/internal/createCache'], function (exports, _lodashInternalBaseIndexOf, _lodashInternalCacheIndexOf, _lodashInternalCreateCache) {
  'use strict';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * The base implementation of `_.uniq` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee) {
    var index = -1,
        indexOf = _lodashInternalBaseIndexOf['default'],
        length = array.length,
        isCommon = true,
        isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
        seen = isLarge ? (0, _lodashInternalCreateCache['default'])() : null,
        result = [];

    if (seen) {
      indexOf = _lodashInternalCacheIndexOf['default'];
      isCommon = false;
    } else {
      isLarge = false;
      seen = iteratee ? [] : result;
    }
    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (isCommon && value === value) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (indexOf(seen, computed, 0) < 0) {
        if (iteratee || isLarge) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  exports['default'] = baseUniq;
});