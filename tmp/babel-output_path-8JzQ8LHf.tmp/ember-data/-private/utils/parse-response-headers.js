define('ember-data/-private/utils/parse-response-headers', ['exports', 'ember-data/-private/system/empty-object'], function (exports, _emberDataPrivateSystemEmptyObject) {
  'use strict';

  exports['default'] = parseResponseHeaders;

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var CLRF = '\r\n';
  function parseResponseHeaders(headersString) {
    var headers = new _emberDataPrivateSystemEmptyObject['default']();

    if (!headersString) {
      return headers;
    }

    var headerPairs = headersString.split(CLRF);

    headerPairs.forEach(function (header) {
      var _header$split = header.split(':');

      var _header$split2 = _toArray(_header$split);

      var field = _header$split2[0];

      var value = _header$split2.slice(1);

      field = field.trim();
      value = value.join(':').trim();

      if (value) {
        headers[field] = value;
      }
    });

    return headers;
  }
});