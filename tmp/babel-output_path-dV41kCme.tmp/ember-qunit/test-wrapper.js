define('ember-qunit/test-wrapper', ['exports', 'ember', 'ember-test-helpers'], function (exports, _ember, _emberTestHelpers) {
  'use strict';

  exports['default'] = testWrapper;

  function testWrapper(qunit /*, testName, expected, callback, async */) {
    var callback;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; ++_key) {
      args[_key - 1] = arguments[_key];
    }

    function wrapper() {
      var context = (0, _emberTestHelpers.getContext)();

      var result = callback.apply(context, arguments);

      function failTestOnPromiseRejection(reason) {
        var message;
        if (reason instanceof Error) {
          message = reason.stack;
          if (reason.message && message.indexOf(reason.message) < 0) {
            // PhantomJS has a `stack` that does not contain the actual
            // exception message.
            message = _ember['default'].inspect(reason) + "\n" + message;
          }
        } else {
          message = _ember['default'].inspect(reason);
        }
        ok(false, message);
      }

      _ember['default'].run(function () {
        QUnit.stop();
        _ember['default'].RSVP.Promise.resolve(result)['catch'](failTestOnPromiseRejection)['finally'](QUnit.start);
      });
    }

    if (args.length === 2) {
      callback = args.splice(1, 1, wrapper)[0];
    } else {
      callback = args.splice(2, 1, wrapper)[0];
    }

    qunit.apply(null, args);
  }
});