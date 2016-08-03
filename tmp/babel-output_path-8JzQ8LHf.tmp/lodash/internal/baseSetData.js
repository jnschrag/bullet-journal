define('lodash/internal/baseSetData', ['exports', 'lodash/utility/identity', 'lodash/internal/metaMap'], function (exports, _lodashUtilityIdentity, _lodashInternalMetaMap) {
  'use strict';

  /**
   * The base implementation of `setData` without support for hot loop detection.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var baseSetData = !_lodashInternalMetaMap['default'] ? _lodashUtilityIdentity['default'] : function (func, data) {
    _lodashInternalMetaMap['default'].set(func, data);
    return func;
  };

  exports['default'] = baseSetData;
});