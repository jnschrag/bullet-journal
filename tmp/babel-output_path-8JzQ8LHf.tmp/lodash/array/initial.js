define('lodash/array/initial', ['exports', 'lodash/array/dropRight'], function (exports, _lodashArrayDropRight) {
  'use strict';

  /**
   * Gets all but the last element of `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   */
  function initial(array) {
    return (0, _lodashArrayDropRight['default'])(array, 1);
  }

  exports['default'] = initial;
});