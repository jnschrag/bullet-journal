define('ember-data/-private/system/store/common', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports._bind = _bind;
  exports._guard = _guard;
  exports._objectIsAlive = _objectIsAlive;

  var get = _ember['default'].get;

  function _bind(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
      return fn.apply(undefined, args);
    };
  }

  function _guard(promise, test) {
    var guarded = promise['finally'](function () {
      if (!test()) {
        guarded._subscribers.length = 0;
      }
    });

    return guarded;
  }

  function _objectIsAlive(object) {
    return !(get(object, "isDestroyed") || get(object, "isDestroying"));
  }
});