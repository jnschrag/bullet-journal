define('lodash/internal/baseSortByOrder', ['exports', 'lodash/internal/arrayMap', 'lodash/internal/baseCallback', 'lodash/internal/baseMap', 'lodash/internal/baseSortBy', 'lodash/internal/compareMultiple'], function (exports, _lodashInternalArrayMap, _lodashInternalBaseCallback, _lodashInternalBaseMap, _lodashInternalBaseSortBy, _lodashInternalCompareMultiple) {
  'use strict';

  /**
   * The base implementation of `_.sortByOrder` without param guards.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {boolean[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseSortByOrder(collection, iteratees, orders) {
    var index = -1;

    iteratees = (0, _lodashInternalArrayMap['default'])(iteratees, function (iteratee) {
      return (0, _lodashInternalBaseCallback['default'])(iteratee);
    });

    var result = (0, _lodashInternalBaseMap['default'])(collection, function (value) {
      var criteria = (0, _lodashInternalArrayMap['default'])(iteratees, function (iteratee) {
        return iteratee(value);
      });
      return { 'criteria': criteria, 'index': ++index, 'value': value };
    });

    return (0, _lodashInternalBaseSortBy['default'])(result, function (object, other) {
      return (0, _lodashInternalCompareMultiple['default'])(object, other, orders);
    });
  }

  exports['default'] = baseSortByOrder;
});