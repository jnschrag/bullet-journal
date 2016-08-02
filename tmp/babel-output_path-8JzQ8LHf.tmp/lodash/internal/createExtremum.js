define('lodash/internal/createExtremum', ['exports', 'lodash/internal/arrayExtremum', 'lodash/internal/baseCallback', 'lodash/internal/baseExtremum', 'lodash/lang/isArray', 'lodash/internal/isIterateeCall', 'lodash/internal/toIterable'], function (exports, _lodashInternalArrayExtremum, _lodashInternalBaseCallback, _lodashInternalBaseExtremum, _lodashLangIsArray, _lodashInternalIsIterateeCall, _lodashInternalToIterable) {
  'use strict';

  /**
   * Creates a `_.max` or `_.min` function.
   *
   * @private
   * @param {Function} comparator The function used to compare values.
   * @param {*} exValue The initial extremum value.
   * @returns {Function} Returns the new extremum function.
   */
  function createExtremum(comparator, exValue) {
    return function (collection, iteratee, thisArg) {
      if (thisArg && (0, _lodashInternalIsIterateeCall['default'])(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      iteratee = (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 3);
      if (iteratee.length == 1) {
        collection = (0, _lodashLangIsArray['default'])(collection) ? collection : (0, _lodashInternalToIterable['default'])(collection);
        var result = (0, _lodashInternalArrayExtremum['default'])(collection, iteratee, comparator, exValue);
        if (!(collection.length && result === exValue)) {
          return result;
        }
      }
      return (0, _lodashInternalBaseExtremum['default'])(collection, iteratee, comparator, exValue);
    };
  }

  exports['default'] = createExtremum;
});