define('lodash/internal/baseToString', ['exports'], function (exports) {
  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  'use strict';

  function baseToString(value) {
    return value == null ? '' : value + '';
  }

  exports['default'] = baseToString;
});