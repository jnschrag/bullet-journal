define('lodash/internal/baseMerge', ['exports', 'lodash/internal/arrayEach', 'lodash/internal/baseMergeDeep', 'lodash/lang/isArray', 'lodash/internal/isArrayLike', 'lodash/lang/isObject', 'lodash/internal/isObjectLike', 'lodash/lang/isTypedArray', 'lodash/object/keys'], function (exports, _lodashInternalArrayEach, _lodashInternalBaseMergeDeep, _lodashLangIsArray, _lodashInternalIsArrayLike, _lodashLangIsObject, _lodashInternalIsObjectLike, _lodashLangIsTypedArray, _lodashObjectKeys) {
  'use strict';

  /**
   * The base implementation of `_.merge` without support for argument juggling,
   * multiple sources, and `this` binding `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates values with source counterparts.
   * @returns {Object} Returns `object`.
   */
  function baseMerge(object, source, customizer, stackA, stackB) {
    if (!(0, _lodashLangIsObject['default'])(object)) {
      return object;
    }
    var isSrcArr = (0, _lodashInternalIsArrayLike['default'])(source) && ((0, _lodashLangIsArray['default'])(source) || (0, _lodashLangIsTypedArray['default'])(source)),
        props = isSrcArr ? undefined : (0, _lodashObjectKeys['default'])(source);

    (0, _lodashInternalArrayEach['default'])(props || source, function (srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if ((0, _lodashInternalIsObjectLike['default'])(srcValue)) {
        stackA || (stackA = []);
        stackB || (stackB = []);
        (0, _lodashInternalBaseMergeDeep['default'])(object, source, key, baseMerge, customizer, stackA, stackB);
      } else {
        var value = object[key],
            result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
            isCommon = result === undefined;

        if (isCommon) {
          result = srcValue;
        }
        if ((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result ? result !== value : value === value))) {
          object[key] = result;
        }
      }
    });
    return object;
  }

  exports['default'] = baseMerge;
});