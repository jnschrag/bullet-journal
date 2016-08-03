define('lodash/internal/getData', ['exports', 'lodash/internal/metaMap', 'lodash/utility/noop'], function (exports, _lodashInternalMetaMap, _lodashUtilityNoop) {
  'use strict';

  /**
   * Gets metadata for `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {*} Returns the metadata for `func`.
   */
  var getData = !_lodashInternalMetaMap['default'] ? _lodashUtilityNoop['default'] : function (func) {
    return _lodashInternalMetaMap['default'].get(func);
  };

  exports['default'] = getData;
});