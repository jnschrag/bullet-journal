define('ember-ajax/raw', ['exports', 'ember-ajax/ajax-request'], function (exports, _emberAjaxAjaxRequest) {
  'use strict';

  exports['default'] = raw;

  /**
   * Same as `request` except it resolves an object with
   *
   *   {response, textStatus, jqXHR}
   *
   * Useful if you need access to the jqXHR object for headers, etc.
   *
   * @public
   */
  function raw() {
    var ajax = new _emberAjaxAjaxRequest['default']();
    return ajax.raw.apply(ajax, arguments);
  }
});