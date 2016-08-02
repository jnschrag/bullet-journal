define('lodash/array/xor', ['exports', 'lodash/internal/arrayPush', 'lodash/internal/baseDifference', 'lodash/internal/baseUniq', 'lodash/internal/isArrayLike'], function (exports, _lodashInternalArrayPush, _lodashInternalBaseDifference, _lodashInternalBaseUniq, _lodashInternalIsArrayLike) {
  'use strict';

  /**
   * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
   * of the provided arrays.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of values.
   * @example
   *
   * _.xor([1, 2], [4, 2]);
   * // => [1, 4]
   */
  function xor() {
    var index = -1,
        length = arguments.length;

    while (++index < length) {
      var array = arguments[index];
      if ((0, _lodashInternalIsArrayLike['default'])(array)) {
        var result = result ? (0, _lodashInternalArrayPush['default'])((0, _lodashInternalBaseDifference['default'])(result, array), (0, _lodashInternalBaseDifference['default'])(array, result)) : array;
      }
    }
    return result ? (0, _lodashInternalBaseUniq['default'])(result) : [];
  }

  exports['default'] = xor;
});