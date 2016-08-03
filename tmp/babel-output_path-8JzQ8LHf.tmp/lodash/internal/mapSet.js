define('lodash/internal/mapSet', ['exports'], function (exports) {
  /**
   * Sets `value` to `key` of the cache.
   *
   * @private
   * @name set
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to cache.
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache object.
   */
  'use strict';

  function mapSet(key, value) {
    if (key != '__proto__') {
      this.__data__[key] = value;
    }
    return this;
  }

  exports['default'] = mapSet;
});