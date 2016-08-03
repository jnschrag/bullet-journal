define('lodash/date', ['exports', 'lodash/date/now'], function (exports, _lodashDateNow) {
  'use strict';

  exports['default'] = {
    'now': _lodashDateNow['default']
  };
});