define('ember-inflector/lib/ext/string', ['exports', 'ember', 'ember-inflector/lib/system/string'], function (exports, _ember, _emberInflectorLibSystemString) {
  'use strict';

  if (_ember['default'].EXTEND_PROTOTYPES === true || _ember['default'].EXTEND_PROTOTYPES.String) {
    /**
      See {{#crossLink "Ember.String/pluralize"}}{{/crossLink}}
       @method pluralize
      @for String
    */
    String.prototype.pluralize = function () {
      return (0, _emberInflectorLibSystemString.pluralize)(this);
    };

    /**
      See {{#crossLink "Ember.String/singularize"}}{{/crossLink}}
       @method singularize
      @for String
    */
    String.prototype.singularize = function () {
      return (0, _emberInflectorLibSystemString.singularize)(this);
    };
  }
});