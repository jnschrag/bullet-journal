define('lodash/internal/baseFilter', ['exports', 'lodash/internal/baseEach'], function (exports, _lodashInternalBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.filter` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function baseFilter(collection, predicate) {
    var result = [];
    (0, _lodashInternalBaseEach['default'])(collection, function (value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

  exports['default'] = baseFilter;
});