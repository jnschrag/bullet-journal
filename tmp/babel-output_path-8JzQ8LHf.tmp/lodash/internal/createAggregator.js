define('lodash/internal/createAggregator', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseEach', 'lodash/lang/isArray'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseEach, _lodashLangIsArray) {
  'use strict';

  /**
   * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
   *
   * @private
   * @param {Function} setter The function to set keys and values of the accumulator object.
   * @param {Function} [initializer] The function to initialize the accumulator object.
   * @returns {Function} Returns the new aggregator function.
   */
  function createAggregator(setter, initializer) {
    return function (collection, iteratee, thisArg) {
      var result = initializer ? initializer() : {};
      iteratee = (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 3);

      if ((0, _lodashLangIsArray['default'])(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          setter(result, value, iteratee(value, index, collection), collection);
        }
      } else {
        (0, _lodashInternalBaseEach['default'])(collection, function (value, key, collection) {
          setter(result, value, iteratee(value, key, collection), collection);
        });
      }
      return result;
    };
  }

  exports['default'] = createAggregator;
});