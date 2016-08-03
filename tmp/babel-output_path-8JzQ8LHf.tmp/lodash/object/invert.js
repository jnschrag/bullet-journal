define('lodash/object/invert', ['exports', 'lodash/internal/isIterateeCall', 'lodash/object/keys'], function (exports, _lodashInternalIsIterateeCall, _lodashObjectKeys) {
  'use strict';

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Creates an object composed of the inverted keys and values of `object`.
   * If `object` contains duplicate values, subsequent values overwrite property
   * assignments of previous values unless `multiValue` is `true`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to invert.
   * @param {boolean} [multiValue] Allow multiple values per key.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   *
   * // with `multiValue`
   * _.invert(object, true);
   * // => { '1': ['a', 'c'], '2': ['b'] }
   */
  function invert(object, multiValue, guard) {
    if (guard && (0, _lodashInternalIsIterateeCall['default'])(object, multiValue, guard)) {
      multiValue = undefined;
    }
    var index = -1,
        props = (0, _lodashObjectKeys['default'])(object),
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index],
          value = object[key];

      if (multiValue) {
        if (hasOwnProperty.call(result, value)) {
          result[value].push(key);
        } else {
          result[value] = [key];
        }
      } else {
        result[value] = key;
      }
    }
    return result;
  }

  exports['default'] = invert;
});