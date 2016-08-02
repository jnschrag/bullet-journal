define('lodash/internal/baseIsEqual', ['exports', 'lodash/internal/baseIsEqualDeep', 'lodash/lang/isObject', 'lodash/internal/isObjectLike'], function (exports, _lodashInternalBaseIsEqualDeep, _lodashLangIsObject, _lodashInternalIsObjectLike) {
  'use strict';

  /**
   * The base implementation of `_.isEqual` without support for `this` binding
   * `customizer` functions.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !(0, _lodashLangIsObject['default'])(value) && !(0, _lodashInternalIsObjectLike['default'])(other)) {
      return value !== value && other !== other;
    }
    return (0, _lodashInternalBaseIsEqualDeep['default'])(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
  }

  exports['default'] = baseIsEqual;
});