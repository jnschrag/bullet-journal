define('ember-cli-test-loader/test-support/index', ['exports'], function (exports) {
  /* globals requirejs, require */
  "use strict";

  exports.addModuleIncludeMatcher = addModuleIncludeMatcher;
  exports.addModuleExcludeMatcher = addModuleExcludeMatcher;
  exports['default'] = TestLoader;
  var moduleIncludeMatchers = [];
  var moduleExcludeMatchers = [];

  function addModuleIncludeMatcher(fn) {
    moduleIncludeMatchers.push(fn);
  }

  ;

  function addModuleExcludeMatcher(fn) {
    moduleExcludeMatchers.push(fn);
  }

  ;

  function checkMatchers(matchers, moduleName) {
    var matcher;

    for (var i = 0, l = matchers.length; i < l; i++) {
      matcher = matchers[i];

      if (matcher(moduleName)) {
        return true;
      }
    }

    return false;
  }

  function TestLoader() {
    this._didLogMissingUnsee = false;
  }

  ;

  TestLoader.prototype = {
    shouldLoadModule: function shouldLoadModule(moduleName) {
      return moduleName.match(/[-_]test$/);
    },

    listModules: function listModules() {
      return Object.keys(requirejs.entries);
    },

    listTestModules: function listTestModules() {
      var moduleNames = this.listModules();
      var testModules = [];
      var moduleName;

      for (var i = 0; i < moduleNames.length; i++) {
        moduleName = moduleNames[i];

        if (checkMatchers(moduleExcludeMatchers, moduleName)) {
          continue;
        }

        if (checkMatchers(moduleIncludeMatchers, moduleName) || this.shouldLoadModule(moduleName)) {
          testModules.push(moduleName);
        }
      }

      return testModules;
    },

    loadModules: function loadModules() {
      var testModules = this.listTestModules();
      var testModule;

      for (var i = 0; i < testModules.length; i++) {
        testModule = testModules[i];
        this.require(testModule);
        this.unsee(testModule);
      }
    }
  };

  TestLoader.prototype.require = function (moduleName) {
    try {
      require(moduleName);
    } catch (e) {
      this.moduleLoadFailure(moduleName, e);
    }
  };

  TestLoader.prototype.unsee = function (moduleName) {
    if (typeof require.unsee === 'function') {
      require.unsee(moduleName);
    } else if (!this._didLogMissingUnsee) {
      this._didLogMissingUnsee = true;
      if (typeof console !== 'undefined') {
        console.warn('unable to require.unsee, please upgrade loader.js to >= v3.3.0');
      }
    }
  };

  TestLoader.prototype.moduleLoadFailure = function (moduleName, error) {
    console.error('Error loading: ' + moduleName, error.stack);
  };

  TestLoader.load = function () {
    new TestLoader().loadModules();
  };
});