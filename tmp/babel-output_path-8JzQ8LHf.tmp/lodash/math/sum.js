define('lodash/math/sum', ['exports', 'lodash/internal/arraySum', 'lodash/internal/baseCallback', 'lodash/internal/baseSum', 'lodash/lang/isArray', 'lodash/internal/isIterateeCall', 'lodash/internal/toIterable'], function (exports, _lodashInternalArraySum, _lodashInternalBaseCallback, _lodashInternalBaseSum, _lodashLangIsArray, _lodashInternalIsIterateeCall, _lodashInternalToIterable) {
  'use strict';

  /**
   * Gets the sum of the values in `collection`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 6]);
   * // => 10
   *
   * _.sum({ 'a': 4, 'b': 6 });
   * // => 10
   *
   * var objects = [
   *   { 'n': 4 },
   *   { 'n': 6 }
   * ];
   *
   * _.sum(objects, function(object) {
   *   return object.n;
   * });
   * // => 10
   *
   * // using the `_.property` callback shorthand
   * _.sum(objects, 'n');
   * // => 10
   */
  function sum(collection, iteratee, thisArg) {
    if (thisArg && (0, _lodashInternalIsIterateeCall['default'])(collection, iteratee, thisArg)) {
      iteratee = undefined;
    }
    iteratee = (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 3);
    return iteratee.length == 1 ? (0, _lodashInternalArraySum['default'])((0, _lodashLangIsArray['default'])(collection) ? collection : (0, _lodashInternalToIterable['default'])(collection), iteratee) : (0, _lodashInternalBaseSum['default'])(collection, iteratee);
  }

  exports['default'] = sum;
});