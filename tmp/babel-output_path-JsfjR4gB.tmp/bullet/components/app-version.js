define('bullet/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'bullet/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _bulletConfigEnvironment) {

  var name = _bulletConfigEnvironment['default'].APP.name;
  var version = _bulletConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});