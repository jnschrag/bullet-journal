define('lodash/internal/createForEach', ['exports', 'lodash/internal/bindCallback', 'lodash/lang/isArray'], function (exports, _lodashInternalBindCallback, _lodashLangIsArray) {
  'use strict';

  /**
   * Creates a function for `_.forEach` or `_.forEachRight`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over an array.
   * @param {Function} eachFunc The function to iterate over a collection.
   * @returns {Function} Returns the new each function.
   */
  function createForEach(arrayFunc, eachFunc) {
    return function (collection, iteratee, thisArg) {
      return typeof iteratee == 'function' && thisArg === undefined && (0, _lodashLangIsArray['default'])(collection) ? arrayFunc(collection, iteratee) : eachFunc(collection, (0, _lodashInternalBindCallback['default'])(iteratee, thisArg, 3));
    };
  }

  exports['default'] = createForEach;
});