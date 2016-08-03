define('ember-data/-private/core', ['exports', 'ember', 'ember-data/version'], function (exports, _ember, _emberDataVersion) {
  'use strict';

  /**
    @module ember-data
  */

  /**
    All Ember Data methods and functions are defined inside of this namespace.
  
    @class DS
    @static
  */

  /**
    @property VERSION
    @type String
    @static
  */
  var DS = _ember['default'].Namespace.create({
    VERSION: _emberDataVersion['default'],
    name: "DS"
  });

  if (_ember['default'].libraries) {
    _ember['default'].libraries.registerCoreLibrary('Ember Data', DS.VERSION);
  }

  exports['default'] = DS;
});