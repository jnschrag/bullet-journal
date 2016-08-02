define('lodash/object/set', ['exports', 'lodash/internal/isIndex', 'lodash/internal/isKey', 'lodash/lang/isObject', 'lodash/internal/toPath'], function (exports, _lodashInternalIsIndex, _lodashInternalIsKey, _lodashLangIsObject, _lodashInternalToPath) {
  'use strict';

  /**
   * Sets the property value of `path` on `object`. If a portion of `path`
   * does not exist it's created.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to augment.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, 'x[0].y.z', 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    if (object == null) {
      return object;
    }
    var pathKey = path + '';
    path = object[pathKey] != null || (0, _lodashInternalIsKey['default'])(path, object) ? [pathKey] : (0, _lodashInternalToPath['default'])(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = path[index];
      if ((0, _lodashLangIsObject['default'])(nested)) {
        if (index == lastIndex) {
          nested[key] = value;
        } else if (nested[key] == null) {
          nested[key] = (0, _lodashInternalIsIndex['default'])(path[index + 1]) ? [] : {};
        }
      }
      nested = nested[key];
    }
    return object;
  }

  exports['default'] = set;
});