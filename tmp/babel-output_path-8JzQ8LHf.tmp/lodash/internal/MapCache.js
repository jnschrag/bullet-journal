define('lodash/internal/MapCache', ['exports', 'lodash/internal/mapDelete', 'lodash/internal/mapGet', 'lodash/internal/mapHas', 'lodash/internal/mapSet'], function (exports, _lodashInternalMapDelete, _lodashInternalMapGet, _lodashInternalMapHas, _lodashInternalMapSet) {
  'use strict';

  /**
   * Creates a cache object to store key/value pairs.
   *
   * @private
   * @static
   * @name Cache
   * @memberOf _.memoize
   */
  function MapCache() {
    this.__data__ = {};
  }

  // Add functions to the `Map` cache.
  MapCache.prototype['delete'] = _lodashInternalMapDelete['default'];
  MapCache.prototype.get = _lodashInternalMapGet['default'];
  MapCache.prototype.has = _lodashInternalMapHas['default'];
  MapCache.prototype.set = _lodashInternalMapSet['default'];

  exports['default'] = MapCache;
});