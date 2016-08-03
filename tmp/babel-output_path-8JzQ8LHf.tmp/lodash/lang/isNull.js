define("lodash/lang/isNull", ["exports"], function (exports) {
  /**
   * Checks if `value` is `null`.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(void 0);
   * // => false
   */
  "use strict";

  function isNull(value) {
    return value === null;
  }

  exports["default"] = isNull;
});