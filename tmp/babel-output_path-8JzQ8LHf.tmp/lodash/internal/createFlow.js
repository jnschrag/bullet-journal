define('lodash/internal/createFlow', ['exports', 'lodash/internal/LodashWrapper', 'lodash/internal/getData', 'lodash/internal/getFuncName', 'lodash/lang/isArray', 'lodash/internal/isLaziable'], function (exports, _lodashInternalLodashWrapper, _lodashInternalGetData, _lodashInternalGetFuncName, _lodashLangIsArray, _lodashInternalIsLaziable) {
  'use strict';

  /** Used to compose bitmasks for wrapper metadata. */
  var CURRY_FLAG = 8,
      PARTIAL_FLAG = 32,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a `_.flow` or `_.flowRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new flow function.
   */
  function createFlow(fromRight) {
    return function () {
      var wrapper,
          length = arguments.length,
          index = fromRight ? length : -1,
          leftIndex = 0,
          funcs = Array(length);

      while (fromRight ? index-- : ++index < length) {
        var func = funcs[leftIndex++] = arguments[index];
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (!wrapper && _lodashInternalLodashWrapper['default'].prototype.thru && (0, _lodashInternalGetFuncName['default'])(func) == 'wrapper') {
          wrapper = new _lodashInternalLodashWrapper['default']([], true);
        }
      }
      index = wrapper ? -1 : length;
      while (++index < length) {
        func = funcs[index];

        var funcName = (0, _lodashInternalGetFuncName['default'])(func),
            data = funcName == 'wrapper' ? (0, _lodashInternalGetData['default'])(func) : undefined;

        if (data && (0, _lodashInternalIsLaziable['default'])(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
          wrapper = wrapper[(0, _lodashInternalGetFuncName['default'])(data[0])].apply(wrapper, data[3]);
        } else {
          wrapper = func.length == 1 && (0, _lodashInternalIsLaziable['default'])(func) ? wrapper[funcName]() : wrapper.thru(func);
        }
      }
      return function () {
        var args = arguments,
            value = args[0];

        if (wrapper && args.length == 1 && (0, _lodashLangIsArray['default'])(value) && value.length >= LARGE_ARRAY_SIZE) {
          return wrapper.plant(value).value();
        }
        var index = 0,
            result = length ? funcs[index].apply(this, args) : value;

        while (++index < length) {
          result = funcs[index].call(this, result);
        }
        return result;
      };
    };
  }

  exports['default'] = createFlow;
});