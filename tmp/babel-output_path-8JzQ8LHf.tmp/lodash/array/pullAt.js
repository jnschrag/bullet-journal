define('lodash/array/pullAt', ['exports', 'lodash/internal/baseAt', 'lodash/internal/baseCompareAscending', 'lodash/internal/baseFlatten', 'lodash/internal/basePullAt', 'lodash/function/restParam'], function (exports, _lodashInternalBaseAt, _lodashInternalBaseCompareAscending, _lodashInternalBaseFlatten, _lodashInternalBasePullAt, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Removes elements from `array` corresponding to the given indexes and returns
   * an array of the removed elements. Indexes may be specified as an array of
   * indexes or as individual arguments.
   *
   * **Note:** Unlike `_.at`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...(number|number[])} [indexes] The indexes of elements to remove,
   *  specified as individual indexes or arrays of indexes.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [5, 10, 15, 20];
   * var evens = _.pullAt(array, 1, 3);
   *
   * console.log(array);
   * // => [5, 15]
   *
   * console.log(evens);
   * // => [10, 20]
   */
  var pullAt = (0, _lodashFunctionRestParam['default'])(function (array, indexes) {
    indexes = (0, _lodashInternalBaseFlatten['default'])(indexes);

    var result = (0, _lodashInternalBaseAt['default'])(array, indexes);
    (0, _lodashInternalBasePullAt['default'])(array, indexes.sort(_lodashInternalBaseCompareAscending['default']));
    return result;
  });

  exports['default'] = pullAt;
});