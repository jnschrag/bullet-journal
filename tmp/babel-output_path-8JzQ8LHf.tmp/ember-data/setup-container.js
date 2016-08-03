define('ember-data/setup-container', ['exports', 'ember-data/-private/initializers/store', 'ember-data/-private/initializers/transforms', 'ember-data/-private/initializers/store-injections', 'ember-data/-private/initializers/data-adapter'], function (exports, _emberDataPrivateInitializersStore, _emberDataPrivateInitializersTransforms, _emberDataPrivateInitializersStoreInjections, _emberDataPrivateInitializersDataAdapter) {
  'use strict';

  exports['default'] = setupContainer;

  function setupContainer(application) {
    (0, _emberDataPrivateInitializersDataAdapter['default'])(application);
    (0, _emberDataPrivateInitializersTransforms['default'])(application);
    (0, _emberDataPrivateInitializersStoreInjections['default'])(application);
    (0, _emberDataPrivateInitializersStore['default'])(application);
  }
});