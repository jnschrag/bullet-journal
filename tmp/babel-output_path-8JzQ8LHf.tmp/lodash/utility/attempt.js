define('lodash/utility/attempt', ['exports', 'lodash/lang/isError', 'lodash/function/restParam'], function (exports, _lodashLangIsError, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Attempts to invoke `func`, returning either the result or the caught error
   * object. Any additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Function} func The function to attempt.
   * @returns {*} Returns the `func` result or error object.
   * @example
   *
   * // avoid throwing errors for invalid selectors
   * var elements = _.attempt(function(selector) {
   *   return document.querySelectorAll(selector);
   * }, '>_>');
   *
   * if (_.isError(elements)) {
   *   elements = [];
   * }
   */
  var attempt = (0, _lodashFunctionRestParam['default'])(function (func, args) {
    try {
      return func.apply(undefined, args);
    } catch (e) {
      return (0, _lodashLangIsError['default'])(e) ? e : new Error(e);
    }
  });

  exports['default'] = attempt;
});