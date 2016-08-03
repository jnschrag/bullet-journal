define('lodash/internal/basePropertyDeep', ['exports', 'lodash/internal/baseGet', 'lodash/internal/toPath'], function (exports, _lodashInternalBaseGet, _lodashInternalToPath) {
  'use strict';

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new function.
   */
  function basePropertyDeep(path) {
    var pathKey = path + '';
    path = (0, _lodashInternalToPath['default'])(path);
    return function (object) {
      return (0, _lodashInternalBaseGet['default'])(object, path, pathKey);
    };
  }

  exports['default'] = basePropertyDeep;
});