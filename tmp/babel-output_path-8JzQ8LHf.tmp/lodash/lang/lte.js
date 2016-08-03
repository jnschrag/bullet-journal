define("lodash/lang/lte", ["exports"], function (exports) {
  /**
   * Checks if `value` is less than or equal to `other`.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
   * @example
   *
   * _.lte(1, 3);
   * // => true
   *
   * _.lte(3, 3);
   * // => true
   *
   * _.lte(3, 1);
   * // => false
   */
  "use strict";

  function lte(value, other) {
    return value <= other;
  }

  exports["default"] = lte;
});