define('lodash/array/unzip', ['exports', 'lodash/internal/arrayFilter', 'lodash/internal/arrayMap', 'lodash/internal/baseProperty', 'lodash/internal/isArrayLike'], function (exports, _lodashInternalArrayFilter, _lodashInternalArrayMap, _lodashInternalBaseProperty, _lodashInternalIsArrayLike) {
  'use strict';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * This method is like `_.zip` except that it accepts an array of grouped
   * elements and creates an array regrouping the elements to their pre-zip
   * configuration.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array of grouped elements to process.
   * @returns {Array} Returns the new array of regrouped elements.
   * @example
   *
   * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   *
   * _.unzip(zipped);
   * // => [['fred', 'barney'], [30, 40], [true, false]]
   */
  function unzip(array) {
    if (!(array && array.length)) {
      return [];
    }
    var index = -1,
        length = 0;

    array = (0, _lodashInternalArrayFilter['default'])(array, function (group) {
      if ((0, _lodashInternalIsArrayLike['default'])(group)) {
        length = nativeMax(group.length, length);
        return true;
      }
    });
    var result = Array(length);
    while (++index < length) {
      result[index] = (0, _lodashInternalArrayMap['default'])(array, (0, _lodashInternalBaseProperty['default'])(index));
    }
    return result;
  }

  exports['default'] = unzip;
});