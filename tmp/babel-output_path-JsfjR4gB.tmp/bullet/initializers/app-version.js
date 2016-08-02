define('bullet/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'bullet/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _bulletConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_bulletConfigEnvironment['default'].APP.name, _bulletConfigEnvironment['default'].APP.version)
  };
});