define('lodash/internal/mapGet', ['exports'], function (exports) {
  /**
   * Gets the cached value for `key`.
   *
   * @private
   * @name get
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the cached value.
   */
  'use strict';

  function mapGet(key) {
    return key == '__proto__' ? undefined : this.__data__[key];
  }

  exports['default'] = mapGet;
});