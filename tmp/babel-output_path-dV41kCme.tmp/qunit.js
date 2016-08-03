define("qunit", ["exports"], function (exports) {
  /* globals test:true */

  "use strict";

  var _module = QUnit.module;
  exports.module = _module;
  var test = QUnit.test;
  exports.test = test;
  var skip = QUnit.skip;
  exports.skip = skip;
  var only = QUnit.only;

  exports.only = only;
  exports["default"] = QUnit;
});