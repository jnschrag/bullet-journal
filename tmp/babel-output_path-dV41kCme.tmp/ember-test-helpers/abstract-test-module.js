define('ember-test-helpers/abstract-test-module', ['exports', 'klassy', 'ember-test-helpers/wait', 'ember-test-helpers/test-context', 'ember'], function (exports, _klassy, _emberTestHelpersWait, _emberTestHelpersTestContext, _ember) {
  'use strict';

  var assign = _ember['default'].assign || _ember['default'].merge;

  exports['default'] = _klassy.Klass.extend({
    init: function init(name, options) {
      this.name = name;
      this.callbacks = options || {};

      this.initSetupSteps();
      this.initTeardownSteps();
    },

    setup: function setup(assert) {
      var _this = this;

      return this.invokeSteps(this.setupSteps, this, assert).then(function () {
        _this.contextualizeCallbacks();
        return _this.invokeSteps(_this.contextualizedSetupSteps, _this.context, assert);
      });
    },

    teardown: function teardown(assert) {
      var _this2 = this;

      return this.invokeSteps(this.contextualizedTeardownSteps, this.context, assert).then(function () {
        return _this2.invokeSteps(_this2.teardownSteps, _this2, assert);
      }).then(function () {
        _this2.cache = null;
        _this2.cachedCalls = null;
      });
    },

    initSetupSteps: function initSetupSteps() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push(this.callbacks.beforeSetup);
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);
      this.setupSteps.push(this.setupAJAXListeners);

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push(this.callbacks.setup);
        delete this.callbacks.setup;
      }
    },

    invokeSteps: function invokeSteps(steps, context, assert) {
      steps = steps.slice();

      function nextStep() {
        var step = steps.shift();
        if (step) {
          // guard against exceptions, for example missing components referenced from needs.
          return new _ember['default'].RSVP.Promise(function (resolve) {
            resolve(step.call(context, assert));
          }).then(nextStep);
        } else {
          return _ember['default'].RSVP.resolve();
        }
      }
      return nextStep();
    },

    contextualizeCallbacks: function contextualizeCallbacks() {},

    initTeardownSteps: function initTeardownSteps() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push(this.callbacks.teardown);
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownTestElements);
      this.teardownSteps.push(this.teardownAJAXListeners);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push(this.callbacks.afterTeardown);
        delete this.callbacks.afterTeardown;
      }
    },

    setupTestElements: function setupTestElements() {
      if (_ember['default'].$('#ember-testing').length === 0) {
        _ember['default'].$('<div id="ember-testing"/>').appendTo(document.body);
      }
    },

    setupContext: function setupContext(options) {
      var config = assign({
        dispatcher: null,
        inject: {}
      }, options);

      (0, _emberTestHelpersTestContext.setContext)(config);
    },

    setupAJAXListeners: function setupAJAXListeners() {
      (0, _emberTestHelpersWait._setupAJAXHooks)();
    },

    teardownAJAXListeners: function teardownAJAXListeners() {
      (0, _emberTestHelpersWait._teardownAJAXHooks)();
    },

    teardownTestElements: function teardownTestElements() {
      _ember['default'].$('#ember-testing').empty();

      // Ember 2.0.0 removed Ember.View as public API, so only do this when
      // Ember.View is present
      if (_ember['default'].View && _ember['default'].View.views) {
        _ember['default'].View.views = {};
      }
    },

    teardownContext: function teardownContext() {
      var context = this.context;
      this.context = undefined;
      (0, _emberTestHelpersTestContext.unsetContext)();

      if (context && context.dispatcher && !context.dispatcher.isDestroyed) {
        _ember['default'].run(function () {
          context.dispatcher.destroy();
        });
      }
    }
  });
});