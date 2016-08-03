define('lodash/internal/createForOwn', ['exports', 'lodash/internal/bindCallback'], function (exports, _lodashInternalBindCallback) {
  'use strict';

  /**
   * Creates a function for `_.forOwn` or `_.forOwnRight`.
   *
   * @private
   * @param {Function} objectFunc The function to iterate over an object.
   * @returns {Function} Returns the new each function.
   */
  function createForOwn(objectFunc) {
    return function (object, iteratee, thisArg) {
      if (typeof iteratee != 'function' || thisArg !== undefined) {
        iteratee = (0, _lodashInternalBindCallback['default'])(iteratee, thisArg, 3);
      }
      return objectFunc(object, iteratee);
    };
  }

  exports['default'] = createForOwn;
});