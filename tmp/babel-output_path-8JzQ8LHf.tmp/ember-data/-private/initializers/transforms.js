define('ember-data/-private/initializers/transforms', ['exports', 'ember-data/-private/transforms'], function (exports, _emberDataPrivateTransforms) {
  'use strict';

  exports['default'] = initializeTransforms;

  /**
    Configures a registry for use with Ember-Data
    transforms.
  
    @method initializeTransforms
    @param {Ember.Registry} registry
  */
  function initializeTransforms(registry) {
    registry.register('transform:boolean', _emberDataPrivateTransforms.BooleanTransform);
    registry.register('transform:date', _emberDataPrivateTransforms.DateTransform);
    registry.register('transform:number', _emberDataPrivateTransforms.NumberTransform);
    registry.register('transform:string', _emberDataPrivateTransforms.StringTransform);
  }
});