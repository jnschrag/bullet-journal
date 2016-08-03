define('lodash/internal/createObjectMapper', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseForOwn'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseForOwn) {
  'use strict';

  /**
   * Creates a function for `_.mapKeys` or `_.mapValues`.
   *
   * @private
   * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
   * @returns {Function} Returns the new map function.
   */
  function createObjectMapper(isMapKeys) {
    return function (object, iteratee, thisArg) {
      var result = {};
      iteratee = (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 3);

      (0, _lodashInternalBaseForOwn['default'])(object, function (value, key, object) {
        var mapped = iteratee(value, key, object);
        key = isMapKeys ? mapped : key;
        value = isMapKeys ? value : mapped;
        result[key] = value;
      });
      return result;
    };
  }

  exports['default'] = createObjectMapper;
});