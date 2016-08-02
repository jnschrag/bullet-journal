define("lodash/utility/noop", ["exports"], function (exports) {
  /**
   * A no-operation function that returns `undefined` regardless of the
   * arguments it receives.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.noop(object) === undefined;
   * // => true
   */
  "use strict";

  function noop() {
    // No operation performed.
  }

  exports["default"] = noop;
});