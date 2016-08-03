define('lodash/internal/createCache', ['exports', 'lodash/internal/SetCache', 'lodash/internal/getNative', 'lodash/internal/root'], function (exports, _lodashInternalSetCache, _lodashInternalGetNative, _lodashInternalRoot) {
  'use strict';

  /** Native method references. */
  var Set = (0, _lodashInternalGetNative['default'])(_lodashInternalRoot['default'], 'Set');

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = (0, _lodashInternalGetNative['default'])(Object, 'create');

  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */
  function createCache(values) {
    return nativeCreate && Set ? new _lodashInternalSetCache['default'](values) : null;
  }

  exports['default'] = createCache;
});