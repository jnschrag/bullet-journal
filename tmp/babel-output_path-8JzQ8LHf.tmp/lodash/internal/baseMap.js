define('lodash/internal/baseMap', ['exports', 'lodash/internal/baseEach', 'lodash/internal/isArrayLike'], function (exports, _lodashInternalBaseEach, _lodashInternalIsArrayLike) {
  'use strict';

  /**
   * The base implementation of `_.map` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = (0, _lodashInternalIsArrayLike['default'])(collection) ? Array(collection.length) : [];

    (0, _lodashInternalBaseEach['default'])(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  exports['default'] = baseMap;
});