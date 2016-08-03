define('ember-test-helpers/test-module-for-integration', ['exports', 'ember', 'ember-test-helpers/test-context', 'ember-test-helpers/abstract-test-module', 'ember-test-helpers/test-resolver', 'ember-test-helpers/build-registry', 'ember-test-helpers/has-ember-version', 'ember-test-helpers/-legacy-overrides'], function (exports, _ember, _emberTestHelpersTestContext, _emberTestHelpersAbstractTestModule, _emberTestHelpersTestResolver, _emberTestHelpersBuildRegistry, _emberTestHelpersHasEmberVersion, _emberTestHelpersLegacyOverrides) {
  'use strict';

  var ACTION_KEY = undefined;
  if ((0, _emberTestHelpersHasEmberVersion['default'])(2, 0)) {
    ACTION_KEY = 'actions';
  } else {
    ACTION_KEY = '_actions';
  }

  var getOwner = _ember['default'].getOwner;
  exports['default'] = _emberTestHelpersAbstractTestModule['default'].extend({
    initSetupSteps: function initSetupSteps() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push(this.callbacks.beforeSetup);
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContainer);
      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);
      this.setupSteps.push(this.setupAJAXListeners);
      this.setupSteps.push(this.setupComponentIntegrationTest);

      if (_ember['default'].View && _ember['default'].View.views) {
        this.setupSteps.push(this._aliasViewRegistry);
      }

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push(this.callbacks.setup);
        delete this.callbacks.setup;
      }
    },

    initTeardownSteps: function initTeardownSteps() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push(this.callbacks.teardown);
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownContainer);
      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownAJAXListeners);
      this.teardownSteps.push(this.teardownComponent);

      if (_ember['default'].View && _ember['default'].View.views) {
        this.teardownSteps.push(this._resetViewRegistry);
      }

      this.teardownSteps.push(this.teardownTestElements);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push(this.callbacks.afterTeardown);
        delete this.callbacks.afterTeardown;
      }
    },

    setupContainer: function setupContainer() {
      var resolver = (0, _emberTestHelpersTestResolver.getResolver)();
      var items = (0, _emberTestHelpersBuildRegistry['default'])(resolver);

      this.container = items.container;
      this.registry = items.registry;

      if ((0, _emberTestHelpersHasEmberVersion['default'])(1, 13)) {
        var thingToRegisterWith = this.registry || this.container;
        var router = resolver.resolve('router:main');
        router = router || _ember['default'].Router.extend();
        thingToRegisterWith.register('router:main', router);
      }
    },

    setupContext: function setupContext() {
      var subjectName = this.subjectName;
      var container = this.container;

      var factory = function factory() {
        return container.lookupFactory(subjectName);
      };

      this._super({
        container: this.container,
        registry: this.registry,
        factory: factory,
        register: function register() {
          var target = this.registry || this.container;
          return target.register.apply(target, arguments);
        }
      });

      var context = this.context = (0, _emberTestHelpersTestContext.getContext)();

      if (_ember['default'].setOwner) {
        _ember['default'].setOwner(context, this.container.owner);
      }

      if (_ember['default'].inject) {
        var keys = (Object.keys || _ember['default'].keys)(_ember['default'].inject);
        keys.forEach(function (typeName) {
          context.inject[typeName] = function (name, opts) {
            var alias = opts && opts.as || name;
            _ember['default'].run(function () {
              _ember['default'].set(context, alias, context.container.lookup(typeName + ':' + name));
            });
          };
        });
      }

      // only setup the injection if we are running against a version
      // of Ember that has `-view-registry:main` (Ember >= 1.12)
      if (this.container.lookupFactory('-view-registry:main')) {
        (this.registry || this.container).injection('component', '_viewRegistry', '-view-registry:main');
      }
    },

    setupComponentIntegrationTest: (function () {
      if (!(0, _emberTestHelpersHasEmberVersion['default'])(1, 13)) {
        return _emberTestHelpersLegacyOverrides.preGlimmerSetupIntegrationForComponent;
      } else {
        return function () {
          var module = this;
          var context = this.context;

          this.actionHooks = context[ACTION_KEY] = {};
          context.dispatcher = this.container.lookup('event_dispatcher:main') || _ember['default'].EventDispatcher.create();
          context.dispatcher.setup({}, '#ember-testing');

          var hasRendered = false;
          var OutletView = module.container.lookupFactory('view:-outlet');
          var OutletTemplate = module.container.lookup('template:-outlet');
          var toplevelView = module.component = OutletView.create();
          var hasOutletTemplate = !!OutletTemplate;
          var outletState = {
            render: {
              owner: getOwner ? getOwner(module.container) : undefined,
              into: undefined,
              outlet: 'main',
              name: 'application',
              controller: module.context,
              ViewClass: undefined,
              template: OutletTemplate
            },

            outlets: {}
          };

          var element = document.getElementById('ember-testing');
          var templateId = 0;

          if (hasOutletTemplate) {
            _ember['default'].run(function () {
              toplevelView.setOutletState(outletState);
            });
          }

          context.render = function (template) {
            if (!template) {
              throw new Error("in a component integration test you must pass a template to `render()`");
            }
            if (_ember['default'].isArray(template)) {
              template = template.join('');
            }
            if (typeof template === 'string') {
              template = _ember['default'].Handlebars.compile(template);
            }

            var templateFullName = 'template:-undertest-' + ++templateId;
            this.registry.register(templateFullName, template);
            var stateToRender = {
              owner: getOwner ? getOwner(module.container) : undefined,
              into: undefined,
              outlet: 'main',
              name: 'index',
              controller: module.context,
              ViewClass: undefined,
              template: module.container.lookup(templateFullName),
              outlets: {}
            };

            if (hasOutletTemplate) {
              stateToRender.name = 'index';
              outletState.outlets.main = { render: stateToRender, outlets: {} };
            } else {
              stateToRender.name = 'application';
              outletState = { render: stateToRender, outlets: {} };
            }

            _ember['default'].run(function () {
              toplevelView.setOutletState(outletState);
            });

            if (!hasRendered) {
              _ember['default'].run(module.component, 'appendTo', '#ember-testing');
              hasRendered = true;
            }

            // ensure the element is based on the wrapping toplevel view
            // Ember still wraps the main application template with a
            // normal tagged view
            element = _ember['default'].$('#ember-testing > .ember-view');
          };

          context.$ = function (selector) {
            // emulates Ember internal behavor of `this.$` in a component
            // https://github.com/emberjs/ember.js/blob/v2.5.1/packages/ember-views/lib/views/states/has_element.js#L18
            return selector ? _ember['default'].$(selector, element) : _ember['default'].$(element);
          };

          context.set = function (key, value) {
            var ret = _ember['default'].run(function () {
              return _ember['default'].set(context, key, value);
            });

            if ((0, _emberTestHelpersHasEmberVersion['default'])(2, 0)) {
              return ret;
            }
          };

          context.setProperties = function (hash) {
            var ret = _ember['default'].run(function () {
              return _ember['default'].setProperties(context, hash);
            });

            if ((0, _emberTestHelpersHasEmberVersion['default'])(2, 0)) {
              return ret;
            }
          };

          context.get = function (key) {
            return _ember['default'].get(context, key);
          };

          context.getProperties = function () {
            var args = Array.prototype.slice.call(arguments);
            return _ember['default'].getProperties(context, args);
          };

          context.on = function (actionName, handler) {
            module.actionHooks[actionName] = handler;
          };

          context.send = function (actionName) {
            var hook = module.actionHooks[actionName];
            if (!hook) {
              throw new Error("integration testing template received unexpected action " + actionName);
            }
            hook.apply(module.context, Array.prototype.slice.call(arguments, 1));
          };

          context.clearRender = function () {
            _ember['default'].run(function () {
              toplevelView.setOutletState({
                render: {
                  owner: module.container,
                  into: undefined,
                  outlet: 'main',
                  name: 'application',
                  controller: module.context,
                  ViewClass: undefined,
                  template: undefined
                },
                outlets: {}
              });
            });
          };
        };
      }
    })(),

    teardownComponent: function teardownComponent() {
      var component = this.component;
      if (component) {
        _ember['default'].run(function () {
          component.destroy();
        });
      }
    },

    teardownContainer: function teardownContainer() {
      var container = this.container;
      _ember['default'].run(function () {
        container.destroy();
      });
    },

    // allow arbitrary named factories, like rspec let
    contextualizeCallbacks: function contextualizeCallbacks() {
      var callbacks = this.callbacks;
      var context = this.context;

      this.cache = this.cache || {};
      this.cachedCalls = this.cachedCalls || {};

      var keys = (Object.keys || _ember['default'].keys)(callbacks);
      var keysLength = keys.length;

      if (keysLength) {
        for (var i = 0; i < keysLength; i++) {
          this._contextualizeCallback(context, keys[i], context);
        }
      }
    },

    _contextualizeCallback: function _contextualizeCallback(context, key, callbackContext) {
      var _this = this;
      var callbacks = this.callbacks;
      var factory = context.factory;

      context[key] = function (options) {
        if (_this.cachedCalls[key]) {
          return _this.cache[key];
        }

        var result = callbacks[key].call(callbackContext, options, factory());

        _this.cache[key] = result;
        _this.cachedCalls[key] = true;

        return result;
      };
    },

    _aliasViewRegistry: function _aliasViewRegistry() {
      this._originalGlobalViewRegistry = _ember['default'].View.views;
      var viewRegistry = this.container.lookup('-view-registry:main');

      if (viewRegistry) {
        _ember['default'].View.views = viewRegistry;
      }
    },

    _resetViewRegistry: function _resetViewRegistry() {
      _ember['default'].View.views = this._originalGlobalViewRegistry;
    }
  });
});