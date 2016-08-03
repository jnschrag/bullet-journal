define('lodash/internal/baseFlatten', ['exports', 'lodash/internal/arrayPush', 'lodash/lang/isArguments', 'lodash/lang/isArray', 'lodash/internal/isArrayLike', 'lodash/internal/isObjectLike'], function (exports, _lodashInternalArrayPush, _lodashLangIsArguments, _lodashLangIsArray, _lodashInternalIsArrayLike, _lodashInternalIsObjectLike) {
  'use strict';

  /**
   * The base implementation of `_.flatten` with added support for restricting
   * flattening and specifying the start index.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} [isDeep] Specify a deep flatten.
   * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, isDeep, isStrict, result) {
    result || (result = []);

    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index];
      if ((0, _lodashInternalIsObjectLike['default'])(value) && (0, _lodashInternalIsArrayLike['default'])(value) && (isStrict || (0, _lodashLangIsArray['default'])(value) || (0, _lodashLangIsArguments['default'])(value))) {
        if (isDeep) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, isDeep, isStrict, result);
        } else {
          (0, _lodashInternalArrayPush['default'])(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  exports['default'] = baseFlatten;
});