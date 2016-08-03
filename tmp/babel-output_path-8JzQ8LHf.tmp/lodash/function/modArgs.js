define('lodash/function/modArgs', ['exports', 'lodash/internal/arrayEvery', 'lodash/internal/baseFlatten', 'lodash/internal/baseIsFunction', 'lodash/function/restParam'], function (exports, _lodashInternalArrayEvery, _lodashInternalBaseFlatten, _lodashInternalBaseIsFunction, _lodashFunctionRestParam) {
  'use strict';

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Creates a function that runs each argument through a corresponding
   * transform function.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to wrap.
   * @param {...(Function|Function[])} [transforms] The functions to transform
   * arguments, specified as individual functions or arrays of functions.
   * @returns {Function} Returns the new function.
   * @example
   *
   * function doubled(n) {
   *   return n * 2;
   * }
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var modded = _.modArgs(function(x, y) {
   *   return [x, y];
   * }, square, doubled);
   *
   * modded(1, 2);
   * // => [1, 4]
   *
   * modded(5, 10);
   * // => [25, 20]
   */
  var modArgs = (0, _lodashFunctionRestParam['default'])(function (func, transforms) {
    transforms = (0, _lodashInternalBaseFlatten['default'])(transforms);
    if (typeof func != 'function' || !(0, _lodashInternalArrayEvery['default'])(transforms, _lodashInternalBaseIsFunction['default'])) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = transforms.length;
    return (0, _lodashFunctionRestParam['default'])(function (args) {
      var index = nativeMin(args.length, length);
      while (index--) {
        args[index] = transforms[index](args[index]);
      }
      return func.apply(this, args);
    });
  });

  exports['default'] = modArgs;
});