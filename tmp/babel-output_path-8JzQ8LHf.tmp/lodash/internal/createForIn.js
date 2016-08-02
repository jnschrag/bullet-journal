define('lodash/internal/createForIn', ['exports', 'lodash/internal/bindCallback', 'lodash/object/keysIn'], function (exports, _lodashInternalBindCallback, _lodashObjectKeysIn) {
  'use strict';

  /**
   * Creates a function for `_.forIn` or `_.forInRight`.
   *
   * @private
   * @param {Function} objectFunc The function to iterate over an object.
   * @returns {Function} Returns the new each function.
   */
  function createForIn(objectFunc) {
    return function (object, iteratee, thisArg) {
      if (typeof iteratee != 'function' || thisArg !== undefined) {
        iteratee = (0, _lodashInternalBindCallback['default'])(iteratee, thisArg, 3);
      }
      return objectFunc(object, iteratee, _lodashObjectKeysIn['default']);
    };
  }

  exports['default'] = createForIn;
});