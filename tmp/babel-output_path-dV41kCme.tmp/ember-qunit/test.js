define('ember-qunit/test', ['exports', 'ember-qunit/test-wrapper', 'qunit'], function (exports, _emberQunitTestWrapper, _qunit) {
  'use strict';

  exports['default'] = test;

  function test() /* testName, expected, callback, async */{
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; ++_key) {
      args[_key] = arguments[_key];
    }
    args.unshift(_qunit.test);
    _emberQunitTestWrapper['default'].apply(null, args);
  }
});