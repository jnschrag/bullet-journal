define('bullet/app', ['exports', 'ember', 'bullet/resolver', 'ember-load-initializers', 'bullet/config/environment'], function (exports, _ember, _bulletResolver, _emberLoadInitializers, _bulletConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _bulletConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _bulletConfigEnvironment['default'].podModulePrefix,
    Resolver: _bulletResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _bulletConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});