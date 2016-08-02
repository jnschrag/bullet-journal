define('lodash/internal/createSortedIndex', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/binaryIndex', 'lodash/internal/binaryIndexBy'], function (exports, _lodashInternalBaseCallback, _lodashInternalBinaryIndex, _lodashInternalBinaryIndexBy) {
  'use strict';

  /**
   * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
   *
   * @private
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {Function} Returns the new index function.
   */
  function createSortedIndex(retHighest) {
    return function (array, value, iteratee, thisArg) {
      return iteratee == null ? (0, _lodashInternalBinaryIndex['default'])(array, value, retHighest) : (0, _lodashInternalBinaryIndexBy['default'])(array, value, (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 1), retHighest);
    };
  }

  exports['default'] = createSortedIndex;
});