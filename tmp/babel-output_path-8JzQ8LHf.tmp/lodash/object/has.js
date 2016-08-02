define('lodash/object/has', ['exports', 'lodash/internal/baseGet', 'lodash/internal/baseSlice', 'lodash/lang/isArguments', 'lodash/lang/isArray', 'lodash/internal/isIndex', 'lodash/internal/isKey', 'lodash/internal/isLength', 'lodash/array/last', 'lodash/internal/toPath'], function (exports, _lodashInternalBaseGet, _lodashInternalBaseSlice, _lodashLangIsArguments, _lodashLangIsArray, _lodashInternalIsIndex, _lodashInternalIsKey, _lodashInternalIsLength, _lodashArrayLast, _lodashInternalToPath) {
  'use strict';

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if `path` is a direct property.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': { 'c': 3 } } };
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b.c');
   * // => true
   *
   * _.has(object, ['a', 'b', 'c']);
   * // => true
   */
  function has(object, path) {
    if (object == null) {
      return false;
    }
    var result = hasOwnProperty.call(object, path);
    if (!result && !(0, _lodashInternalIsKey['default'])(path)) {
      path = (0, _lodashInternalToPath['default'])(path);
      object = path.length == 1 ? object : (0, _lodashInternalBaseGet['default'])(object, (0, _lodashInternalBaseSlice['default'])(path, 0, -1));
      if (object == null) {
        return false;
      }
      path = (0, _lodashArrayLast['default'])(path);
      result = hasOwnProperty.call(object, path);
    }
    return result || (0, _lodashInternalIsLength['default'])(object.length) && (0, _lodashInternalIsIndex['default'])(path, object.length) && ((0, _lodashLangIsArray['default'])(object) || (0, _lodashLangIsArguments['default'])(object));
  }

  exports['default'] = has;
});