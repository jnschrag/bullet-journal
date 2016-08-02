define('bullet/tests/helpers/resolver', ['exports', 'bullet/resolver', 'bullet/config/environment'], function (exports, _bulletResolver, _bulletConfigEnvironment) {

  var resolver = _bulletResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _bulletConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _bulletConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});