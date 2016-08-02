define('ember-qunit/module-for-component', ['exports', 'ember-qunit/qunit-module', 'ember-test-helpers'], function (exports, _emberQunitQunitModule, _emberTestHelpers) {
  'use strict';

  exports['default'] = moduleForComponent;

  function moduleForComponent(name, description, callbacks) {
    (0, _emberQunitQunitModule.createModule)(_emberTestHelpers.TestModuleForComponent, name, description, callbacks);
  }
});