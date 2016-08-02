define('ember-data/-private/transforms/boolean', ['exports', 'ember', 'ember-data/transform', 'ember-data/-private/features'], function (exports, _ember, _emberDataTransform, _emberDataPrivateFeatures) {
  'use strict';

  var isNone = _ember['default'].isNone;

  /**
    The `DS.BooleanTransform` class is used to serialize and deserialize
    boolean attributes on Ember Data record objects. This transform is
    used when `boolean` is passed as the type parameter to the
    [DS.attr](../../data#method_attr) function.
  
    Usage
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      isAdmin: DS.attr('boolean'),
      name: DS.attr('string'),
      email: DS.attr('string')
    });
    ```
  
    @class BooleanTransform
    @extends DS.Transform
    @namespace DS
   */
  exports['default'] = _emberDataTransform['default'].extend({
    deserialize: function deserialize(serialized, options) {
      var type = typeof serialized;

      if (true) {
        if (isNone(serialized) && options.allowNull === true) {
          return null;
        }
      }

      if (type === "boolean") {
        return serialized;
      } else if (type === "string") {
        return serialized.match(/^true$|^t$|^1$/i) !== null;
      } else if (type === "number") {
        return serialized === 1;
      } else {
        return false;
      }
    },

    serialize: function serialize(deserialized, options) {
      if (true) {
        if (isNone(deserialized) && options.allowNull === true) {
          return null;
        }
      }

      return Boolean(deserialized);
    }
  });
});