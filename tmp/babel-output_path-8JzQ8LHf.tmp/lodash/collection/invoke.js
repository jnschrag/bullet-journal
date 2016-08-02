define('lodash/collection/invoke', ['exports', 'lodash/internal/baseEach', 'lodash/internal/invokePath', 'lodash/internal/isArrayLike', 'lodash/internal/isKey', 'lodash/function/restParam'], function (exports, _lodashInternalBaseEach, _lodashInternalInvokePath, _lodashInternalIsArrayLike, _lodashInternalIsKey, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Invokes the method at `path` of each element in `collection`, returning
   * an array of the results of each invoked method. Any additional arguments
   * are provided to each invoked method. If `methodName` is a function it's
   * invoked for, and `this` bound to, each element in `collection`.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Array|Function|string} path The path of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  var invoke = (0, _lodashFunctionRestParam['default'])(function (collection, path, args) {
    var index = -1,
        isFunc = typeof path == 'function',
        isProp = (0, _lodashInternalIsKey['default'])(path),
        result = (0, _lodashInternalIsArrayLike['default'])(collection) ? Array(collection.length) : [];

    (0, _lodashInternalBaseEach['default'])(collection, function (value) {
      var func = isFunc ? path : isProp && value != null ? value[path] : undefined;
      result[++index] = func ? func.apply(value, args) : (0, _lodashInternalInvokePath['default'])(value, path, args);
    });
    return result;
  });

  exports['default'] = invoke;
});