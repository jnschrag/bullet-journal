define('lodash/utility/methodOf', ['exports', 'lodash/internal/invokePath', 'lodash/function/restParam'], function (exports, _lodashInternalInvokePath, _lodashFunctionRestParam) {
  'use strict';

  /**
   * The opposite of `_.method`; this method creates a function that invokes
   * the method at a given path on `object`. Any additional arguments are
   * provided to the invoked method.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} object The object to query.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var array = _.times(3, _.constant),
   *     object = { 'a': array, 'b': array, 'c': array };
   *
   * _.map(['a[2]', 'c[0]'], _.methodOf(object));
   * // => [2, 0]
   *
   * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
   * // => [2, 0]
   */
  var methodOf = (0, _lodashFunctionRestParam['default'])(function (object, args) {
    return function (path) {
      return (0, _lodashInternalInvokePath['default'])(object, path, args);
    };
  });

  exports['default'] = methodOf;
});