define('lodash/internal/getNative', ['exports', 'lodash/lang/isNative'], function (exports, _lodashLangIsNative) {
  'use strict';

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = object == null ? undefined : object[key];
    return (0, _lodashLangIsNative['default'])(value) ? value : undefined;
  }

  exports['default'] = getNative;
});