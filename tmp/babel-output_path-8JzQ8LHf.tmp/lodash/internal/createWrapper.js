define('lodash/internal/createWrapper', ['exports', 'lodash/internal/baseSetData', 'lodash/internal/createBindWrapper', 'lodash/internal/createHybridWrapper', 'lodash/internal/createPartialWrapper', 'lodash/internal/getData', 'lodash/internal/mergeData', 'lodash/internal/setData'], function (exports, _lodashInternalBaseSetData, _lodashInternalCreateBindWrapper, _lodashInternalCreateHybridWrapper, _lodashInternalCreatePartialWrapper, _lodashInternalGetData, _lodashInternalMergeData, _lodashInternalSetData) {
  'use strict';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags.
   *  The bitmask may be composed of the following flags:
   *     1 - `_.bind`
   *     2 - `_.bindKey`
   *     4 - `_.curry` or `_.curryRight` of a bound function
   *     8 - `_.curry`
   *    16 - `_.curryRight`
   *    32 - `_.partial`
   *    64 - `_.partialRight`
   *   128 - `_.rearg`
   *   256 - `_.ary`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
      partials = holders = undefined;
    }
    length -= holders ? holders.length : 0;
    if (bitmask & PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = undefined;
    }
    var data = isBindKey ? undefined : (0, _lodashInternalGetData['default'])(func),
        newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

    if (data) {
      (0, _lodashInternalMergeData['default'])(newData, data);
      bitmask = newData[1];
      arity = newData[9];
    }
    newData[9] = arity == null ? isBindKey ? 0 : func.length : nativeMax(arity - length, 0) || 0;

    if (bitmask == BIND_FLAG) {
      var result = (0, _lodashInternalCreateBindWrapper['default'])(newData[0], newData[2]);
    } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
      result = _lodashInternalCreatePartialWrapper['default'].apply(undefined, newData);
    } else {
      result = _lodashInternalCreateHybridWrapper['default'].apply(undefined, newData);
    }
    var setter = data ? _lodashInternalBaseSetData['default'] : _lodashInternalSetData['default'];
    return setter(result, newData);
  }

  exports['default'] = createWrapper;
});