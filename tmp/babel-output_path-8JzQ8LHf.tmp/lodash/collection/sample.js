define('lodash/collection/sample', ['exports', 'lodash/internal/baseRandom', 'lodash/internal/isIterateeCall', 'lodash/lang/toArray', 'lodash/internal/toIterable'], function (exports, _lodashInternalBaseRandom, _lodashInternalIsIterateeCall, _lodashLangToArray, _lodashInternalToIterable) {
  'use strict';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Gets a random element or `n` random elements from a collection.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to sample.
   * @param {number} [n] The number of elements to sample.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {*} Returns the random sample(s).
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   *
   * _.sample([1, 2, 3, 4], 2);
   * // => [3, 1]
   */
  function sample(collection, n, guard) {
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(collection, n, guard) : n == null) {
      collection = (0, _lodashInternalToIterable['default'])(collection);
      var length = collection.length;
      return length > 0 ? collection[(0, _lodashInternalBaseRandom['default'])(0, length - 1)] : undefined;
    }
    var index = -1,
        result = (0, _lodashLangToArray['default'])(collection),
        length = result.length,
        lastIndex = length - 1;

    n = nativeMin(n < 0 ? 0 : +n || 0, length);
    while (++index < n) {
      var rand = (0, _lodashInternalBaseRandom['default'])(index, lastIndex),
          value = result[rand];

      result[rand] = result[index];
      result[index] = value;
    }
    result.length = n;
    return result;
  }

  exports['default'] = sample;
});