define('lodash/string/capitalize', ['exports', 'lodash/internal/baseToString'], function (exports, _lodashInternalBaseToString) {
  'use strict';

  /**
   * Capitalizes the first character of `string`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to capitalize.
   * @returns {string} Returns the capitalized string.
   * @example
   *
   * _.capitalize('fred');
   * // => 'Fred'
   */
  function capitalize(string) {
    string = (0, _lodashInternalBaseToString['default'])(string);
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  }

  exports['default'] = capitalize;
});