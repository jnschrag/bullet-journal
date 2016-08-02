define('lodash/internal/createFind', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseFind', 'lodash/internal/baseFindIndex', 'lodash/lang/isArray'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseFind, _lodashInternalBaseFindIndex, _lodashLangIsArray) {
  'use strict';

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new find function.
   */
  function createFind(eachFunc, fromRight) {
    return function (collection, predicate, thisArg) {
      predicate = (0, _lodashInternalBaseCallback['default'])(predicate, thisArg, 3);
      if ((0, _lodashLangIsArray['default'])(collection)) {
        var index = (0, _lodashInternalBaseFindIndex['default'])(collection, predicate, fromRight);
        return index > -1 ? collection[index] : undefined;
      }
      return (0, _lodashInternalBaseFind['default'])(collection, predicate, eachFunc);
    };
  }

  exports['default'] = createFind;
});