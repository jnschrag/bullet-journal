define("ember-data/-private/initializers/store", ["exports", "ember-data/-private/system/store", "ember-data/-private/serializers", "ember-data/-private/adapters"], function (exports, _emberDataPrivateSystemStore, _emberDataPrivateSerializers, _emberDataPrivateAdapters) {
  "use strict";

  exports["default"] = initializeStore;

  function has(applicationOrRegistry, fullName) {
    if (applicationOrRegistry.has) {
      // < 2.1.0
      return applicationOrRegistry.has(fullName);
    } else {
      // 2.1.0+
      return applicationOrRegistry.hasRegistration(fullName);
    }
  }

  /**
    Configures a registry for use with an Ember-Data
    store. Accepts an optional namespace argument.
  
    @method initializeStore
    @param {Ember.Registry} registry
  */
  function initializeStore(registry) {
    // registry.optionsForType for Ember < 2.1.0
    // application.registerOptionsForType for Ember 2.1.0+
    var registerOptionsForType = registry.registerOptionsForType || registry.optionsForType;
    registerOptionsForType.call(registry, 'serializer', { singleton: false });
    registerOptionsForType.call(registry, 'adapter', { singleton: false });

    registry.register('serializer:-default', _emberDataPrivateSerializers.JSONSerializer);
    registry.register('serializer:-rest', _emberDataPrivateSerializers.RESTSerializer);
    registry.register('adapter:-rest', _emberDataPrivateAdapters.RESTAdapter);

    registry.register('adapter:-json-api', _emberDataPrivateAdapters.JSONAPIAdapter);
    registry.register('serializer:-json-api', _emberDataPrivateSerializers.JSONAPISerializer);

    if (!has(registry, 'service:store')) {
      registry.register('service:store', _emberDataPrivateSystemStore["default"]);
    }
  }
});