define('ember-cli-app-version/initializer-factory', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = initializerFactory;

  var classify = _ember['default'].String.classify;

  function initializerFactory(name, version) {
    var registered = false;

    return function () {
      if (!registered && name && version) {
        var appName = classify(name);
        _ember['default'].libraries.register(appName, version);
        registered = true;
      }
    };
  }
});