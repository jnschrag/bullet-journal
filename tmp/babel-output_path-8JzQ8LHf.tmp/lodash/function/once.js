define('lodash/function/once', ['exports', 'lodash/function/before'], function (exports, _lodashFunctionBefore) {
  'use strict';

  /**
   * Creates a function that is restricted to invoking `func` once. Repeat calls
   * to the function return the value of the first call. The `func` is invoked
   * with the `this` binding and arguments of the created function.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // `initialize` invokes `createApplication` once
   */
  function once(func) {
    return (0, _lodashFunctionBefore['default'])(2, func);
  }

  exports['default'] = once;
});