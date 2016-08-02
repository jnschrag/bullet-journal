define('lodash/collection/forEachRight', ['exports', 'lodash/internal/arrayEachRight', 'lodash/internal/baseEachRight', 'lodash/internal/createForEach'], function (exports, _lodashInternalArrayEachRight, _lodashInternalBaseEachRight, _lodashInternalCreateForEach) {
  'use strict';

  /**
   * This method is like `_.forEach` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @alias eachRight
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2]).forEachRight(function(n) {
   *   console.log(n);
   * }).value();
   * // => logs each value from right to left and returns the array
   */
  var forEachRight = (0, _lodashInternalCreateForEach['default'])(_lodashInternalArrayEachRight['default'], _lodashInternalBaseEachRight['default']);

  exports['default'] = forEachRight;
});