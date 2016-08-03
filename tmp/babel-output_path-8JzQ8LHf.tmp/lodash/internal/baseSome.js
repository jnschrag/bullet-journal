define('lodash/internal/baseSome', ['exports', 'lodash/internal/baseEach'], function (exports, _lodashInternalBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.some` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function baseSome(collection, predicate) {
    var result;

    (0, _lodashInternalBaseEach['default'])(collection, function (value, index, collection) {
      result = predicate(value, index, collection);
      return !result;
    });
    return !!result;
  }

  exports['default'] = baseSome;
});