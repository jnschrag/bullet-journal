define('lodash/internal/compareAscending', ['exports', 'lodash/internal/baseCompareAscending'], function (exports, _lodashInternalBaseCompareAscending) {
  'use strict';

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return (0, _lodashInternalBaseCompareAscending['default'])(object.criteria, other.criteria) || object.index - other.index;
  }

  exports['default'] = compareAscending;
});