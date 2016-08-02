define('emberfire/utils/to-promise', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = function (fn, context, _args, errorMsg) {
    var args = _args || [];
    return new _ember['default'].RSVP.Promise(function (resolve, reject) {
      var callback = function callback(error) {
        if (error) {
          if (errorMsg && typeof error === 'object') {
            error.location = errorMsg;
          }
          reject(error);
        } else {
          resolve();
        }
      };
      args.push(callback);
      fn.apply(context, args);
    });
  };
});