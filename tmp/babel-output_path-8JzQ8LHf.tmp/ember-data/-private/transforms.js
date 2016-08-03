define("ember-data/-private/transforms", ["exports", "ember-data/transform", "ember-data/-private/transforms/number", "ember-data/-private/transforms/date", "ember-data/-private/transforms/string", "ember-data/-private/transforms/boolean"], function (exports, _emberDataTransform, _emberDataPrivateTransformsNumber, _emberDataPrivateTransformsDate, _emberDataPrivateTransformsString, _emberDataPrivateTransformsBoolean) {
  "use strict";

  exports.Transform = _emberDataTransform["default"];
  exports.NumberTransform = _emberDataPrivateTransformsNumber["default"];
  exports.DateTransform = _emberDataPrivateTransformsDate["default"];
  exports.StringTransform = _emberDataPrivateTransformsString["default"];
  exports.BooleanTransform = _emberDataPrivateTransformsBoolean["default"];
});