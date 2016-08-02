define("ember-data/-private/adapters", ["exports", "ember-data/adapters/json-api", "ember-data/adapters/rest"], function (exports, _emberDataAdaptersJsonApi, _emberDataAdaptersRest) {
  /**
    @module ember-data
  */

  "use strict";

  exports.JSONAPIAdapter = _emberDataAdaptersJsonApi["default"];
  exports.RESTAdapter = _emberDataAdaptersRest["default"];
});