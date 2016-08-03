define("ember-data/-private/system/store/serializers", ["exports"], function (exports) {
  "use strict";

  exports.serializerForAdapter = serializerForAdapter;

  function serializerForAdapter(store, adapter, type) {
    var serializer = adapter.serializer;

    if (serializer === undefined) {
      serializer = store.serializerFor(type);
    }

    if (serializer === null || serializer === undefined) {
      serializer = {
        extract: function extract(store, type, payload) {
          return payload;
        }
      };
    }

    return serializer;
  }
});