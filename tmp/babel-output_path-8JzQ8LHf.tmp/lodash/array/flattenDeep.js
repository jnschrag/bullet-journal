define('lodash/array/flattenDeep', ['exports', 'lodash/internal/baseFlatten'], function (exports, _lodashInternalBaseFlatten) {
  'use strict';

  /**
   * Recursively flattens a nested array.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to recursively flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flattenDeep([1, [2, 3, [4]]]);
   * // => [1, 2, 3, 4]
   */
  function flattenDeep(array) {
    var length = array ? array.length : 0;
    return length ? (0, _lodashInternalBaseFlatten['default'])(array, true) : [];
  }

  exports['default'] = flattenDeep;
});