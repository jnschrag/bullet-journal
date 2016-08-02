define('lodash/function/defer', ['exports', 'lodash/internal/baseDelay', 'lodash/function/restParam'], function (exports, _lodashInternalBaseDelay, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // logs 'deferred' after one or more milliseconds
   */
  var defer = (0, _lodashFunctionRestParam['default'])(function (func, args) {
    return (0, _lodashInternalBaseDelay['default'])(func, 1, args);
  });

  exports['default'] = defer;
});