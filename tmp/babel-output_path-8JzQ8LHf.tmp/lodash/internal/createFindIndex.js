define('lodash/internal/createFindIndex', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseFindIndex'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseFindIndex) {
  'use strict';

  /**
   * Creates a `_.findIndex` or `_.findLastIndex` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new find function.
   */
  function createFindIndex(fromRight) {
    return function (array, predicate, thisArg) {
      if (!(array && array.length)) {
        return -1;
      }
      predicate = (0, _lodashInternalBaseCallback['default'])(predicate, thisArg, 3);
      return (0, _lodashInternalBaseFindIndex['default'])(array, predicate, fromRight);
    };
  }

  exports['default'] = createFindIndex;
});