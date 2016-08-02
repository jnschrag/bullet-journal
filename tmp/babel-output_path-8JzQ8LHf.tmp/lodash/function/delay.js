define('lodash/function/delay', ['exports', 'lodash/internal/baseDelay', 'lodash/function/restParam'], function (exports, _lodashInternalBaseDelay, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Invokes `func` after `wait` milliseconds. Any additional arguments are
   * provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {...*} [args] The arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) {
   *   console.log(text);
   * }, 1000, 'later');
   * // => logs 'later' after one second
   */
  var delay = (0, _lodashFunctionRestParam['default'])(function (func, wait, args) {
    return (0, _lodashInternalBaseDelay['default'])(func, wait, args);
  });

  exports['default'] = delay;
});