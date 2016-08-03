define('lodash/internal/toObject', ['exports', 'lodash/lang/isObject'], function (exports, _lodashLangIsObject) {
  'use strict';

  /**
   * Converts `value` to an object if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Object} Returns the object.
   */
  function toObject(value) {
    return (0, _lodashLangIsObject['default'])(value) ? value : Object(value);
  }

  exports['default'] = toObject;
});