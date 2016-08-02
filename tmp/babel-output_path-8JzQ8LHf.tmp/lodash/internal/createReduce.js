define('lodash/internal/createReduce', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseReduce', 'lodash/lang/isArray'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseReduce, _lodashLangIsArray) {
  'use strict';

  /**
   * Creates a function for `_.reduce` or `_.reduceRight`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over an array.
   * @param {Function} eachFunc The function to iterate over a collection.
   * @returns {Function} Returns the new each function.
   */
  function createReduce(arrayFunc, eachFunc) {
    return function (collection, iteratee, accumulator, thisArg) {
      var initFromArray = arguments.length < 3;
      return typeof iteratee == 'function' && thisArg === undefined && (0, _lodashLangIsArray['default'])(collection) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : (0, _lodashInternalBaseReduce['default'])(collection, (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
    };
  }

  exports['default'] = createReduce;
});