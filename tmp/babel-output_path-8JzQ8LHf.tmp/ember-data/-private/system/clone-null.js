define("ember-data/-private/system/clone-null", ["exports", "ember-data/-private/system/empty-object"], function (exports, _emberDataPrivateSystemEmptyObject) {
  "use strict";

  exports["default"] = cloneNull;

  function cloneNull(source) {
    var clone = new _emberDataPrivateSystemEmptyObject["default"]();
    for (var key in source) {
      clone[key] = source[key];
    }
    return clone;
  }
});