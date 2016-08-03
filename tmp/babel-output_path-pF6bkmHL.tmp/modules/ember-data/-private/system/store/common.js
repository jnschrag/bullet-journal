export { _bind };
export { _guard };
export { _objectIsAlive };
import Ember from 'ember';

var get = Ember.get;

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