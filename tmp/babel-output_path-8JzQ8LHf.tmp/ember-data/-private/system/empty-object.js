define("ember-data/-private/system/empty-object", ["exports"], function (exports) {
  "use strict";

  exports["default"] = EmptyObject;

  // This exists because `Object.create(null)` is absurdly slow compared
  // to `new EmptyObject()`. In either case, you want a null prototype
  // when you're treating the object instances as arbitrary dictionaries
  // and don't want your keys colliding with build-in methods on the
  // default object prototype.
  var proto = Object.create(null, {
    // without this, we will always still end up with (new
    // EmptyObject()).constructor === Object
    constructor: {
      value: undefined,
      enumerable: false,
      writable: true
    }
  });
  function EmptyObject() {}

  EmptyObject.prototype = proto;
});