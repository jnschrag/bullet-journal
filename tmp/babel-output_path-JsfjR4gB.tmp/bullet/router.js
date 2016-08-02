define('bullet/router', ['exports', 'ember', 'bullet/config/environment'], function (exports, _ember, _bulletConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _bulletConfigEnvironment['default'].locationType,
    rootURL: _bulletConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});