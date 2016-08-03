define('lodash/internal/createHybridWrapper', ['exports', 'lodash/internal/arrayCopy', 'lodash/internal/composeArgs', 'lodash/internal/composeArgsRight', 'lodash/internal/createCtorWrapper', 'lodash/internal/isLaziable', 'lodash/internal/reorder', 'lodash/internal/replaceHolders', 'lodash/internal/root', 'lodash/internal/setData'], function (exports, _lodashInternalArrayCopy, _lodashInternalComposeArgs, _lodashInternalComposeArgsRight, _lodashInternalCreateCtorWrapper, _lodashInternalIsLaziable, _lodashInternalReorder, _lodashInternalReplaceHolders, _lodashInternalRoot, _lodashInternalSetData) {
  'use strict';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Creates a function that wraps `func` and invokes it with optional `this`
   * binding of, partial application, and currying.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
   * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & ARY_FLAG,
        isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isCurry = bitmask & CURRY_FLAG,
        isCurryBound = bitmask & CURRY_BOUND_FLAG,
        isCurryRight = bitmask & CURRY_RIGHT_FLAG,
        Ctor = isBindKey ? undefined : (0, _lodashInternalCreateCtorWrapper['default'])(func);

    function wrapper() {
      // Avoid `arguments` object use disqualifying optimizations by
      // converting it to an array before providing it to other functions.
      var length = arguments.length,
          index = length,
          args = Array(length);

      while (index--) {
        args[index] = arguments[index];
      }
      if (partials) {
        args = (0, _lodashInternalComposeArgs['default'])(args, partials, holders);
      }
      if (partialsRight) {
        args = (0, _lodashInternalComposeArgsRight['default'])(args, partialsRight, holdersRight);
      }
      if (isCurry || isCurryRight) {
        var placeholder = wrapper.placeholder,
            argsHolders = (0, _lodashInternalReplaceHolders['default'])(args, placeholder);

        length -= argsHolders.length;
        if (length < arity) {
          var newArgPos = argPos ? (0, _lodashInternalArrayCopy['default'])(argPos) : undefined,
              newArity = nativeMax(arity - length, 0),
              newsHolders = isCurry ? argsHolders : undefined,
              newHoldersRight = isCurry ? undefined : argsHolders,
              newPartials = isCurry ? args : undefined,
              newPartialsRight = isCurry ? undefined : args;

          bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

          if (!isCurryBound) {
            bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
          }
          var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
              result = createHybridWrapper.apply(undefined, newData);

          if ((0, _lodashInternalIsLaziable['default'])(func)) {
            (0, _lodashInternalSetData['default'])(result, newData);
          }
          result.placeholder = placeholder;
          return result;
        }
      }
      var thisBinding = isBind ? thisArg : this,
          fn = isBindKey ? thisBinding[func] : func;

      if (argPos) {
        args = (0, _lodashInternalReorder['default'])(args, argPos);
      }
      if (isAry && ary < args.length) {
        args.length = ary;
      }
      if (this && this !== _lodashInternalRoot['default'] && this instanceof wrapper) {
        fn = Ctor || (0, _lodashInternalCreateCtorWrapper['default'])(func);
      }
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }

  exports['default'] = createHybridWrapper;
});