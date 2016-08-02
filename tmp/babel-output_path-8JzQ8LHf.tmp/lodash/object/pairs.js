define('lodash/object/pairs', ['exports', 'lodash/object/keys', 'lodash/internal/toObject'], function (exports, _lodashObjectKeys, _lodashInternalToObject) {
  'use strict';

  /**
   * Creates a two dimensional array of the key-value pairs for `object`,
   * e.g. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'barney': 36, 'fred': 40 });
   * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
   */
  function pairs(object) {
    object = (0, _lodashInternalToObject['default'])(object);

    var index = -1,
        props = (0, _lodashObjectKeys['default'])(object),
        length = props.length,
        result = Array(length);

    while (++index < length) {
      var key = props[index];
      result[index] = [key, object[key]];
    }
    return result;
  }

  exports['default'] = pairs;
});