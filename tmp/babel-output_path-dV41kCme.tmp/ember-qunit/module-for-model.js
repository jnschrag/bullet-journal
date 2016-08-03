define('ember-qunit/module-for-model', ['exports', 'ember-qunit/qunit-module', 'ember-test-helpers'], function (exports, _emberQunitQunitModule, _emberTestHelpers) {
  'use strict';

  exports['default'] = moduleForModel;

  function moduleForModel(name, description, callbacks) {
    (0, _emberQunitQunitModule.createModule)(_emberTestHelpers.TestModuleForModel, name, description, callbacks);
  }
});