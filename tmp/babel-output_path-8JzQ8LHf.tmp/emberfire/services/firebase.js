define('emberfire/services/firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  var DEFAULT_NAME = '[EmberFire default app]';

  exports.DEFAULT_NAME = DEFAULT_NAME;
  exports['default'] = {
    create: function create(application) {
      var config = application.container.lookupFactory('config:environment');
      if (!config || typeof config.firebase !== 'object') {
        throw new Error('Please set the `firebase` property in your environment config.');
      }

      var app = undefined;

      try {
        app = _firebase['default'].app(DEFAULT_NAME);
      } catch (e) {
        app = _firebase['default'].initializeApp(config.firebase, DEFAULT_NAME);
      }

      return app.database().ref();
    },

    config: null,
    isServiceFactory: true
  };
});