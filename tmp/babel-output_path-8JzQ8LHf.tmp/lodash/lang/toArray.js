define('lodash/lang/toArray', ['exports', 'lodash/internal/arrayCopy', 'lodash/internal/getLength', 'lodash/internal/isLength', 'lodash/object/values'], function (exports, _lodashInternalArrayCopy, _lodashInternalGetLength, _lodashInternalIsLength, _lodashObjectValues) {
  'use strict';

  /**
   * Converts `value` to an array.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * (function() {
   *   return _.toArray(arguments).slice(1);
   * }(1, 2, 3));
   * // => [2, 3]
   */
  function toArray(value) {
    var length = value ? (0, _lodashInternalGetLength['default'])(value) : 0;
    if (!(0, _lodashInternalIsLength['default'])(length)) {
      return (0, _lodashObjectValues['default'])(value);
    }
    if (!length) {
      return [];
    }
    return (0, _lodashInternalArrayCopy['default'])(value);
  }

  exports['default'] = toArray;
});