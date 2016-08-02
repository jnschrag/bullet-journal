define('lodash/internal/createFindKey', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseFind'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseFind) {
  'use strict';

  /**
   * Creates a `_.findKey` or `_.findLastKey` function.
   *
   * @private
   * @param {Function} objectFunc The function to iterate over an object.
   * @returns {Function} Returns the new find function.
   */
  function createFindKey(objectFunc) {
    return function (object, predicate, thisArg) {
      predicate = (0, _lodashInternalBaseCallback['default'])(predicate, thisArg, 3);
      return (0, _lodashInternalBaseFind['default'])(object, predicate, objectFunc, true);
    };
  }

  exports['default'] = createFindKey;
});