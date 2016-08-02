define('lodash/utility/method', ['exports', 'lodash/internal/invokePath', 'lodash/function/restParam'], function (exports, _lodashInternalInvokePath, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates a function that invokes the method at `path` on a given object.
   * Any additional arguments are provided to the invoked method.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Array|string} path The path of the method to invoke.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': { 'c': _.constant(2) } } },
   *   { 'a': { 'b': { 'c': _.constant(1) } } }
   * ];
   *
   * _.map(objects, _.method('a.b.c'));
   * // => [2, 1]
   *
   * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
   * // => [1, 2]
   */
  var method = (0, _lodashFunctionRestParam['default'])(function (path, args) {
    return function (object) {
      return (0, _lodashInternalInvokePath['default'])(object, path, args);
    };
  });

  exports['default'] = method;
});