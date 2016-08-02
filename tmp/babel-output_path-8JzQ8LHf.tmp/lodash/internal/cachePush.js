define('lodash/internal/cachePush', ['exports', 'lodash/lang/isObject'], function (exports, _lodashLangIsObject) {
  'use strict';

  /**
   * Adds `value` to the cache.
   *
   * @private
   * @name push
   * @memberOf SetCache
   * @param {*} value The value to cache.
   */
  function cachePush(value) {
    var data = this.data;
    if (typeof value == 'string' || (0, _lodashLangIsObject['default'])(value)) {
      data.set.add(value);
    } else {
      data.hash[value] = true;
    }
  }

  exports['default'] = cachePush;
});