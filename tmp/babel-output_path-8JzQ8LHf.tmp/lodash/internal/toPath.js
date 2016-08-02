define('lodash/internal/toPath', ['exports', 'lodash/internal/baseToString', 'lodash/lang/isArray'], function (exports, _lodashInternalBaseToString, _lodashLangIsArray) {
  'use strict';

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `value` to property path array if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array} Returns the property path array.
   */
  function toPath(value) {
    if ((0, _lodashLangIsArray['default'])(value)) {
      return value;
    }
    var result = [];
    (0, _lodashInternalBaseToString['default'])(value).replace(rePropName, function (match, number, quote, string) {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  }

  exports['default'] = toPath;
});