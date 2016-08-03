define('lodash/array/rest', ['exports', 'lodash/array/drop'], function (exports, _lodashArrayDrop) {
  'use strict';

  /**
   * Gets all but the first element of `array`.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.rest([1, 2, 3]);
   * // => [2, 3]
   */
  function rest(array) {
    return (0, _lodashArrayDrop['default'])(array, 1);
  }

  exports['default'] = rest;
});