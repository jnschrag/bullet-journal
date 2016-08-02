define('ember-ajax/ajax-request', ['exports', 'ember', 'ember-ajax/mixins/ajax-request'], function (exports, _ember, _emberAjaxMixinsAjaxRequest) {
  'use strict';

  exports['default'] = _ember['default'].Object.extend(_emberAjaxMixinsAjaxRequest['default']);
});