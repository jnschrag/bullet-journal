define('lodash/internal/createCurry', ['exports', 'lodash/internal/createWrapper', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalCreateWrapper, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates a `_.curry` or `_.curryRight` function.
   *
   * @private
   * @param {boolean} flag The curry bit flag.
   * @returns {Function} Returns the new curry function.
   */
  function createCurry(flag) {
    function curryFunc(func, arity, guard) {
      if (guard && (0, _lodashInternalIsIterateeCall['default'])(func, arity, guard)) {
        arity = undefined;
      }
      var result = (0, _lodashInternalCreateWrapper['default'])(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryFunc.placeholder;
      return result;
    }
    return curryFunc;
  }

  exports['default'] = createCurry;
});