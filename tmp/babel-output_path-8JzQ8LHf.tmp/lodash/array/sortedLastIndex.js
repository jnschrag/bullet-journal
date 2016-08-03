define('lodash/array/sortedLastIndex', ['exports', 'lodash/internal/createSortedIndex'], function (exports, _lodashInternalCreateSortedIndex) {
  'use strict';

  /**
   * This method is like `_.sortedIndex` except that it returns the highest
   * index at which `value` should be inserted into `array` in order to
   * maintain its sort order.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedLastIndex([4, 4, 5, 5], 5);
   * // => 4
   */
  var sortedLastIndex = (0, _lodashInternalCreateSortedIndex['default'])(true);

  exports['default'] = sortedLastIndex;
});