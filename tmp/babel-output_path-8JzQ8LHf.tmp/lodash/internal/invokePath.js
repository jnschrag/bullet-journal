define('lodash/internal/invokePath', ['exports', 'lodash/internal/baseGet', 'lodash/internal/baseSlice', 'lodash/internal/isKey', 'lodash/array/last', 'lodash/internal/toPath'], function (exports, _lodashInternalBaseGet, _lodashInternalBaseSlice, _lodashInternalIsKey, _lodashArrayLast, _lodashInternalToPath) {
  'use strict';

  /**
   * Invokes the method at `path` on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the method to invoke.
   * @param {Array} args The arguments to invoke the method with.
   * @returns {*} Returns the result of the invoked method.
   */
  function invokePath(object, path, args) {
    if (object != null && !(0, _lodashInternalIsKey['default'])(path, object)) {
      path = (0, _lodashInternalToPath['default'])(path);
      object = path.length == 1 ? object : (0, _lodashInternalBaseGet['default'])(object, (0, _lodashInternalBaseSlice['default'])(path, 0, -1));
      path = (0, _lodashArrayLast['default'])(path);
    }
    var func = object == null ? object : object[path];
    return func == null ? undefined : func.apply(object, args);
  }

  exports['default'] = invokePath;
});