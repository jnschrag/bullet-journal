define('lodash/internal/createBaseEach', ['exports', 'lodash/internal/getLength', 'lodash/internal/isLength', 'lodash/internal/toObject'], function (exports, _lodashInternalGetLength, _lodashInternalIsLength, _lodashInternalToObject) {
  'use strict';

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      var length = collection ? (0, _lodashInternalGetLength['default'])(collection) : 0;
      if (!(0, _lodashInternalIsLength['default'])(length)) {
        return eachFunc(collection, iteratee);
      }
      var index = fromRight ? length : -1,
          iterable = (0, _lodashInternalToObject['default'])(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  exports['default'] = createBaseEach;
});