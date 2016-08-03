define('lodash/internal/createBindWrapper', ['exports', 'lodash/internal/createCtorWrapper', 'lodash/internal/root'], function (exports, _lodashInternalCreateCtorWrapper, _lodashInternalRoot) {
  'use strict';

  /**
   * Creates a function that wraps `func` and invokes it with the `this`
   * binding of `thisArg`.
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new bound function.
   */
  function createBindWrapper(func, thisArg) {
    var Ctor = (0, _lodashInternalCreateCtorWrapper['default'])(func);

    function wrapper() {
      var fn = this && this !== _lodashInternalRoot['default'] && this instanceof wrapper ? Ctor : func;
      return fn.apply(thisArg, arguments);
    }
    return wrapper;
  }

  exports['default'] = createBindWrapper;
});