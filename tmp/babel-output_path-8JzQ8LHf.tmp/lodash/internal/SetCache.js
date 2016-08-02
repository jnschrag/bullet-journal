define('lodash/internal/SetCache', ['exports', 'lodash/internal/cachePush', 'lodash/internal/getNative', 'lodash/internal/root'], function (exports, _lodashInternalCachePush, _lodashInternalGetNative, _lodashInternalRoot) {
  'use strict';

  /** Native method references. */
  var Set = (0, _lodashInternalGetNative['default'])(_lodashInternalRoot['default'], 'Set');

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = (0, _lodashInternalGetNative['default'])(Object, 'create');

  /**
   *
   * Creates a cache object to store unique values.
   *
   * @private
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var length = values ? values.length : 0;

    this.data = { 'hash': nativeCreate(null), 'set': new Set() };
    while (length--) {
      this.push(values[length]);
    }
  }

  // Add functions to the `Set` cache.
  SetCache.prototype.push = _lodashInternalCachePush['default'];

  exports['default'] = SetCache;
});