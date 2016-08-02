define('lodash/internal/baseExtremum', ['exports', 'lodash/internal/baseEach'], function (exports, _lodashInternalBaseEach) {
  'use strict';

  /**
   * Gets the extremum value of `collection` invoking `iteratee` for each value
   * in `collection` to generate the criterion by which the value is ranked.
   * The `iteratee` is invoked with three arguments: (value, index|key, collection).
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} comparator The function used to compare values.
   * @param {*} exValue The initial extremum value.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(collection, iteratee, comparator, exValue) {
    var computed = exValue,
        result = computed;

    (0, _lodashInternalBaseEach['default'])(collection, function (value, index, collection) {
      var current = +iteratee(value, index, collection);
      if (comparator(current, computed) || current === exValue && current === result) {
        computed = current;
        result = value;
      }
    });
    return result;
  }

  exports['default'] = baseExtremum;
});