define('ember-qunit', ['exports', 'ember-qunit/module-for', 'ember-qunit/module-for-component', 'ember-qunit/module-for-model', 'ember-qunit/test', 'ember-qunit/only', 'ember-test-helpers'], function (exports, _emberQunitModuleFor, _emberQunitModuleForComponent, _emberQunitModuleForModel, _emberQunitTest, _emberQunitOnly, _emberTestHelpers) {
  'use strict';

  exports.moduleFor = _emberQunitModuleFor['default'];
  exports.moduleForComponent = _emberQunitModuleForComponent['default'];
  exports.moduleForModel = _emberQunitModuleForModel['default'];
  exports.test = _emberQunitTest['default'];
  exports.only = _emberQunitOnly['default'];
  exports.setResolver = _emberTestHelpers.setResolver;
});