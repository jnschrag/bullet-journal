define("ember-data/-private/system/references/reference", ["exports"], function (exports) {
  "use strict";

  var Reference = function Reference(store, internalModel) {
    this.store = store;
    this.internalModel = internalModel;
  };

  Reference.prototype = {
    constructor: Reference
  };

  exports["default"] = Reference;
});