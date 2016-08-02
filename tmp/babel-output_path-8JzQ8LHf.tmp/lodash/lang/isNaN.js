define('lodash/lang/isNaN', ['exports', 'lodash/lang/isNumber'], function (exports, _lodashLangIsNumber) {
  'use strict';

  /**
   * Checks if `value` is `NaN`.
   *
   * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
   * which returns `true` for `undefined` and other non-numeric values.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
    return (0, _lodashLangIsNumber['default'])(value) && value != +value;
  }

  exports['default'] = isNaN;
});