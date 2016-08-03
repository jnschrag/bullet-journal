define('lodash/internal/baseSum', ['exports', 'lodash/internal/baseEach'], function (exports, _lodashInternalBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.sum` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(collection, iteratee) {
    var result = 0;
    (0, _lodashInternalBaseEach['default'])(collection, function (value, index, collection) {
      result += +iteratee(value, index, collection) || 0;
    });
    return result;
  }

  exports['default'] = baseSum;
});