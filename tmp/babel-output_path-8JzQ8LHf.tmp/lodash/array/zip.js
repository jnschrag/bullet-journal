define('lodash/array/zip', ['exports', 'lodash/function/restParam', 'lodash/array/unzip'], function (exports, _lodashFunctionRestParam, _lodashArrayUnzip) {
  'use strict';

  /**
   * Creates an array of grouped elements, the first of which contains the first
   * elements of the given arrays, the second of which contains the second elements
   * of the given arrays, and so on.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to process.
   * @returns {Array} Returns the new array of grouped elements.
   * @example
   *
   * _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   */
  var zip = (0, _lodashFunctionRestParam['default'])(_lodashArrayUnzip['default']);

  exports['default'] = zip;
});