define('lodash/internal/pickByCallback', ['exports', 'lodash/internal/baseForIn'], function (exports, _lodashInternalBaseForIn) {
  'use strict';

  /**
   * A specialized version of `_.pick` which picks `object` properties `predicate`
   * returns truthy for.
   *
   * @private
   * @param {Object} object The source object.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Object} Returns the new object.
   */
  function pickByCallback(object, predicate) {
    var result = {};
    (0, _lodashInternalBaseForIn['default'])(object, function (value, key, object) {
      if (predicate(value, key, object)) {
        result[key] = value;
      }
    });
    return result;
  }

  exports['default'] = pickByCallback;
});