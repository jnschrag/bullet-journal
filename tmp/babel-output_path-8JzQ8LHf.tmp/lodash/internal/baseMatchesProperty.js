define('lodash/internal/baseMatchesProperty', ['exports', 'lodash/internal/baseGet', 'lodash/internal/baseIsEqual', 'lodash/internal/baseSlice', 'lodash/lang/isArray', 'lodash/internal/isKey', 'lodash/internal/isStrictComparable', 'lodash/array/last', 'lodash/internal/toObject', 'lodash/internal/toPath'], function (exports, _lodashInternalBaseGet, _lodashInternalBaseIsEqual, _lodashInternalBaseSlice, _lodashLangIsArray, _lodashInternalIsKey, _lodashInternalIsStrictComparable, _lodashArrayLast, _lodashInternalToObject, _lodashInternalToPath) {
  'use strict';

  /**
   * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to compare.
   * @returns {Function} Returns the new function.
   */
  function baseMatchesProperty(path, srcValue) {
    var isArr = (0, _lodashLangIsArray['default'])(path),
        isCommon = (0, _lodashInternalIsKey['default'])(path) && (0, _lodashInternalIsStrictComparable['default'])(srcValue),
        pathKey = path + '';

    path = (0, _lodashInternalToPath['default'])(path);
    return function (object) {
      if (object == null) {
        return false;
      }
      var key = pathKey;
      object = (0, _lodashInternalToObject['default'])(object);
      if ((isArr || !isCommon) && !(key in object)) {
        object = path.length == 1 ? object : (0, _lodashInternalBaseGet['default'])(object, (0, _lodashInternalBaseSlice['default'])(path, 0, -1));
        if (object == null) {
          return false;
        }
        key = (0, _lodashArrayLast['default'])(path);
        object = (0, _lodashInternalToObject['default'])(object);
      }
      return object[key] === srcValue ? srcValue !== undefined || key in object : (0, _lodashInternalBaseIsEqual['default'])(srcValue, object[key], undefined, true);
    };
  }

  exports['default'] = baseMatchesProperty;
});