define('lodash/string/padRight', ['exports', 'lodash/internal/createPadDir'], function (exports, _lodashInternalCreatePadDir) {
  'use strict';

  /**
   * Pads `string` on the right side if it's shorter than `length`. Padding
   * characters are truncated if they exceed `length`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.padRight('abc', 6);
   * // => 'abc   '
   *
   * _.padRight('abc', 6, '_-');
   * // => 'abc_-_'
   *
   * _.padRight('abc', 3);
   * // => 'abc'
   */
  var padRight = (0, _lodashInternalCreatePadDir['default'])(true);

  exports['default'] = padRight;
});