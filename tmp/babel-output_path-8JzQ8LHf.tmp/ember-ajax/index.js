define('ember-ajax/index', ['exports', 'ember-ajax/request'], function (exports, _emberAjaxRequest) {
  'use strict';

  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxRequest['default'];
    }
  });
});