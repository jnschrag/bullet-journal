define('lodash/array/flatten', ['exports', 'lodash/internal/baseFlatten', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseFlatten, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Flattens a nested array. If `isDeep` is `true` the array is recursively
   * flattened, otherwise it's only flattened a single level.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to flatten.
   * @param {boolean} [isDeep] Specify a deep flatten.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, 3, [4]]]);
   * // => [1, 2, 3, [4]]
   *
   * // using `isDeep`
   * _.flatten([1, [2, 3, [4]]], true);
   * // => [1, 2, 3, 4]
   */
  function flatten(array, isDeep, guard) {
    var length = array ? array.length : 0;
    if (guard && (0, _lodashInternalIsIterateeCall['default'])(array, isDeep, guard)) {
      isDeep = false;
    }
    return length ? (0, _lodashInternalBaseFlatten['default'])(array, isDeep) : [];
  }

  exports['default'] = flatten;
});