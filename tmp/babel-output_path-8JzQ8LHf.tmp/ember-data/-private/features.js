define('ember-data/-private/features', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = isEnabled;

  function isEnabled() {
    var _Ember$FEATURES;

    return (_Ember$FEATURES = _ember['default'].FEATURES).isEnabled.apply(_Ember$FEATURES, arguments);
  }
});