define('lodash/chain/wrapperToString', ['exports'], function (exports) {
  /**
   * Produces the result of coercing the unwrapped value to a string.
   *
   * @name toString
   * @memberOf _
   * @category Chain
   * @returns {string} Returns the coerced string value.
   * @example
   *
   * _([1, 2, 3]).toString();
   * // => '1,2,3'
   */
  'use strict';

  function wrapperToString() {
    return this.value() + '';
  }

  exports['default'] = wrapperToString;
});