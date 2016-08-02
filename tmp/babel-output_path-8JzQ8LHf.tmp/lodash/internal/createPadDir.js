define('lodash/internal/createPadDir', ['exports', 'lodash/internal/baseToString', 'lodash/internal/createPadding'], function (exports, _lodashInternalBaseToString, _lodashInternalCreatePadding) {
  'use strict';

  /**
   * Creates a function for `_.padLeft` or `_.padRight`.
   *
   * @private
   * @param {boolean} [fromRight] Specify padding from the right.
   * @returns {Function} Returns the new pad function.
   */
  function createPadDir(fromRight) {
    return function (string, length, chars) {
      string = (0, _lodashInternalBaseToString['default'])(string);
      return (fromRight ? string : '') + (0, _lodashInternalCreatePadding['default'])(string, length, chars) + (fromRight ? '' : string);
    };
  }

  exports['default'] = createPadDir;
});