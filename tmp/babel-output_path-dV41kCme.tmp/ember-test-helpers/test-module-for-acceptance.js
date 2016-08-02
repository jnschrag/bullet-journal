define('ember-test-helpers/test-module-for-acceptance', ['exports', 'ember-test-helpers/abstract-test-module', 'ember', 'ember-test-helpers/test-context'], function (exports, _emberTestHelpersAbstractTestModule, _ember, _emberTestHelpersTestContext) {
  'use strict';

  exports['default'] = _emberTestHelpersAbstractTestModule['default'].extend({
    setupContext: function setupContext() {
      this._super({ application: this.createApplication() });
    },

    teardownContext: function teardownContext() {
      _ember['default'].run(function () {
        (0, _emberTestHelpersTestContext.getContext)().application.destroy();
      });

      this._super();
    },

    createApplication: function createApplication() {
      var _callbacks = this.callbacks;
      var Application = _callbacks.Application;
      var config = _callbacks.config;

      var application = undefined;

      _ember['default'].run(function () {
        application = Application.create(config);
        application.setupForTesting();
        application.injectTestHelpers();
      });

      return application;
    }
  });
});