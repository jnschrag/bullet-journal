define("lodash/utility/identity", ["exports"], function (exports) {
  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.identity(object) === object;
   * // => true
   */
  "use strict";

  function identity(value) {
    return value;
  }

  exports["default"] = identity;
});