define("ember-data/-private/system/model", ["exports", "ember-data/-private/system/model/model", "ember-data/attr", "ember-data/-private/system/model/states", "ember-data/-private/system/model/errors"], function (exports, _emberDataPrivateSystemModelModel, _emberDataAttr, _emberDataPrivateSystemModelStates, _emberDataPrivateSystemModelErrors) {
  /**
    @module ember-data
  */

  "use strict";

  exports.RootState = _emberDataPrivateSystemModelStates["default"];
  exports.attr = _emberDataAttr["default"];
  exports.Errors = _emberDataPrivateSystemModelErrors["default"];
  exports["default"] = _emberDataPrivateSystemModelModel["default"];
});