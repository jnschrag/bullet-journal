define("lodash/utility/constant", ["exports"], function (exports) {
  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var getter = _.constant(object);
   *
   * getter() === object;
   * // => true
   */
  "use strict";

  function constant(value) {
    return function () {
      return value;
    };
  }

  exports["default"] = constant;
});