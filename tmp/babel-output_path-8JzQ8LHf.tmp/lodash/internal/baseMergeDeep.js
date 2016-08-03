define('lodash/internal/baseMergeDeep', ['exports', 'lodash/internal/arrayCopy', 'lodash/lang/isArguments', 'lodash/lang/isArray', 'lodash/internal/isArrayLike', 'lodash/lang/isPlainObject', 'lodash/lang/isTypedArray', 'lodash/lang/toPlainObject'], function (exports, _lodashInternalArrayCopy, _lodashLangIsArguments, _lodashLangIsArray, _lodashInternalIsArrayLike, _lodashLangIsPlainObject, _lodashLangIsTypedArray, _lodashLangToPlainObject) {
  'use strict';

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates values with source counterparts.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
    var length = stackA.length,
        srcValue = source[key];

    while (length--) {
      if (stackA[length] == srcValue) {
        object[key] = stackB[length];
        return;
      }
    }
    var value = object[key],
        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isCommon = result === undefined;

    if (isCommon) {
      result = srcValue;
      if ((0, _lodashInternalIsArrayLike['default'])(srcValue) && ((0, _lodashLangIsArray['default'])(srcValue) || (0, _lodashLangIsTypedArray['default'])(srcValue))) {
        result = (0, _lodashLangIsArray['default'])(value) ? value : (0, _lodashInternalIsArrayLike['default'])(value) ? (0, _lodashInternalArrayCopy['default'])(value) : [];
      } else if ((0, _lodashLangIsPlainObject['default'])(srcValue) || (0, _lodashLangIsArguments['default'])(srcValue)) {
        result = (0, _lodashLangIsArguments['default'])(value) ? (0, _lodashLangToPlainObject['default'])(value) : (0, _lodashLangIsPlainObject['default'])(value) ? value : {};
      } else {
        isCommon = false;
      }
    }
    // Add the source value to the stack of traversed objects and associate
    // it with its merged value.
    stackA.push(srcValue);
    stackB.push(result);

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
    } else if (result === result ? result !== value : value === value) {
      object[key] = result;
    }
  }

  exports['default'] = baseMergeDeep;
});