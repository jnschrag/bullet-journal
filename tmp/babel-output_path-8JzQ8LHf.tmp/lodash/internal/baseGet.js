define('lodash/internal/baseGet', ['exports', 'lodash/internal/toObject'], function (exports, _lodashInternalToObject) {
  'use strict';

  /**
   * The base implementation of `get` without support for string paths
   * and default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path of the property to get.
   * @param {string} [pathKey] The key representation of path.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path, pathKey) {
    if (object == null) {
      return;
    }
    if (pathKey !== undefined && pathKey in (0, _lodashInternalToObject['default'])(object)) {
      path = [pathKey];
    }
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[path[index++]];
    }
    return index && index == length ? object : undefined;
  }

  exports['default'] = baseGet;
});