define('ember-data/-private/system/store/container-instance-cache', ['exports', 'ember', 'ember-data/-private/system/empty-object'], function (exports, _ember, _emberDataPrivateSystemEmptyObject) {
  'use strict';

  exports['default'] = ContainerInstanceCache;

  var assign = _ember['default'].assign || _ember['default'].merge;

  /**
   * The `ContainerInstanceCache` serves as a lazy cache for looking up
   * instances of serializers and adapters. It has some additional logic for
   * finding the 'fallback' adapter or serializer.
   *
   * The 'fallback' adapter or serializer is an adapter or serializer that is looked up
   * when the preferred lookup fails. For example, say you try to look up `adapter:post`,
   * but there is no entry (app/adapters/post.js in EmberCLI) for `adapter:post` in the registry.
   *
   * The `fallbacks` array passed will then be used; the first entry in the fallbacks array
   * that exists in the container will then be cached for `adapter:post`. So, the next time you
   * look up `adapter:post`, you'll get the `adapter:application` instance (or whatever the fallback
   * was if `adapter:application` doesn't exist).
   *
   * @private
   * @class ContainerInstanceCache
   *
  */
  function ContainerInstanceCache(owner) {
    this._owner = owner;
    this._cache = new _emberDataPrivateSystemEmptyObject['default']();
  }

  ContainerInstanceCache.prototype = new _emberDataPrivateSystemEmptyObject['default']();

  assign(ContainerInstanceCache.prototype, {
    get: function get(type, preferredKey, fallbacks) {
      var cache = this._cache;
      var preferredLookupKey = type + ':' + preferredKey;

      if (!(preferredLookupKey in cache)) {
        var instance = this.instanceFor(preferredLookupKey) || this._findInstance(type, fallbacks);
        if (instance) {
          cache[preferredLookupKey] = instance;
        }
      }
      return cache[preferredLookupKey];
    },

    _findInstance: function _findInstance(type, fallbacks) {
      for (var i = 0, _length = fallbacks.length; i < _length; i++) {
        var fallback = fallbacks[i];
        var lookupKey = type + ':' + fallback;
        var instance = this.instanceFor(lookupKey);

        if (instance) {
          return instance;
        }
      }
    },

    instanceFor: function instanceFor(key) {
      var cache = this._cache;
      if (!cache[key]) {
        var instance = this._owner.lookup(key);
        if (instance) {
          cache[key] = instance;
        }
      }
      return cache[key];
    },

    destroy: function destroy() {
      var cache = this._cache;
      var cacheEntries = Object.keys(cache);

      for (var i = 0, _length2 = cacheEntries.length; i < _length2; i++) {
        var cacheKey = cacheEntries[i];
        var cacheEntry = cache[cacheKey];
        if (cacheEntry) {
          cacheEntry.destroy();
        }
      }
      this._owner = null;
    },

    constructor: ContainerInstanceCache,

    toString: function toString() {
      return 'ContainerInstanceCache';
    }
  });
});