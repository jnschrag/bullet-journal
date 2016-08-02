define('lodash/internal/toIterable', ['exports', 'lodash/internal/isArrayLike', 'lodash/lang/isObject', 'lodash/object/values'], function (exports, _lodashInternalIsArrayLike, _lodashLangIsObject, _lodashObjectValues) {
  'use strict';

  /**
   * Converts `value` to an array-like object if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array|Object} Returns the array-like object.
   */
  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!(0, _lodashInternalIsArrayLike['default'])(value)) {
      return (0, _lodashObjectValues['default'])(value);
    }
    return (0, _lodashLangIsObject['default'])(value) ? value : Object(value);
  }

  exports['default'] = toIterable;
});