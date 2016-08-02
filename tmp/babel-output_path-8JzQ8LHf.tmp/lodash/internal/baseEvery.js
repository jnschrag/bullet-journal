define('lodash/internal/baseEvery', ['exports', 'lodash/internal/baseEach'], function (exports, _lodashInternalBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.every` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true;
    (0, _lodashInternalBaseEach['default'])(collection, function (value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  exports['default'] = baseEvery;
});