define('lodash/internal/cacheIndexOf', ['exports', 'lodash/lang/isObject'], function (exports, _lodashLangIsObject) {
  'use strict';

  /**
   * Checks if `value` is in `cache` mimicking the return signature of
   * `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache to search.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var data = cache.data,
        result = typeof value == 'string' || (0, _lodashLangIsObject['default'])(value) ? data.set.has(value) : data.hash[value];

    return result ? 0 : -1;
  }

  exports['default'] = cacheIndexOf;
});