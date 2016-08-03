define('lodash/array/fill', ['exports', 'lodash/internal/baseFill', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseFill, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Fills elements of `array` with `value` from `start` up to, but not
   * including, `end`.
   *
   * **Note:** This method mutates `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to fill.
   * @param {*} value The value to fill `array` with.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [1, 2, 3];
   *
   * _.fill(array, 'a');
   * console.log(array);
   * // => ['a', 'a', 'a']
   *
   * _.fill(Array(3), 2);
   * // => [2, 2, 2]
   *
   * _.fill([4, 6, 8], '*', 1, 2);
   * // => [4, '*', 8]
   */
  function fill(array, value, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (start && typeof start != 'number' && (0, _lodashInternalIsIterateeCall['default'])(array, value, start)) {
      start = 0;
      end = length;
    }
    return (0, _lodashInternalBaseFill['default'])(array, value, start, end);
  }

  exports['default'] = fill;
});