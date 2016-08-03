define('lodash/internal/baseCallback', ['exports', 'lodash/internal/baseMatches', 'lodash/internal/baseMatchesProperty', 'lodash/internal/bindCallback', 'lodash/utility/identity', 'lodash/utility/property'], function (exports, _lodashInternalBaseMatches, _lodashInternalBaseMatchesProperty, _lodashInternalBindCallback, _lodashUtilityIdentity, _lodashUtilityProperty) {
  'use strict';

  /**
   * The base implementation of `_.callback` which supports specifying the
   * number of arguments to provide to `func`.
   *
   * @private
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */
  function baseCallback(func, thisArg, argCount) {
    var type = typeof func;
    if (type == 'function') {
      return thisArg === undefined ? func : (0, _lodashInternalBindCallback['default'])(func, thisArg, argCount);
    }
    if (func == null) {
      return _lodashUtilityIdentity['default'];
    }
    if (type == 'object') {
      return (0, _lodashInternalBaseMatches['default'])(func);
    }
    return thisArg === undefined ? (0, _lodashUtilityProperty['default'])(func) : (0, _lodashInternalBaseMatchesProperty['default'])(func, thisArg);
  }

  exports['default'] = baseCallback;
});