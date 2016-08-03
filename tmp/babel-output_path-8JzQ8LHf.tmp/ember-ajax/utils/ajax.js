define('ember-ajax/utils/ajax', ['exports', 'ember', 'ember-ajax/utils/is-fastboot'], function (exports, _ember, _emberAjaxUtilsIsFastboot) {
  /* global najax */
  'use strict';

  var $ = _ember['default'].$;

  exports['default'] = _emberAjaxUtilsIsFastboot['default'] ? najax : $.ajax;
});