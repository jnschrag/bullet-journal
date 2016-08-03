define('ember-ajax/utils/parse-response-headers', ['exports'], function (exports) {
  'use strict';

  exports['default'] = parseResponseHeaders;

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var CLRF = '\r\n';
  function parseResponseHeaders(headersString) {
    var headers = {};

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