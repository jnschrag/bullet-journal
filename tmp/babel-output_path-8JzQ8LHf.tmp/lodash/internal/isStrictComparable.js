define('lodash/internal/isStrictComparable', ['exports', 'lodash/lang/isObject'], function (exports, _lodashLangIsObject) {
  'use strict';

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !(0, _lodashLangIsObject['default'])(value);
  }

  exports['default'] = isStrictComparable;
});