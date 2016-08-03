define('lodash/internal/baseForIn', ['exports', 'lodash/internal/baseFor', 'lodash/object/keysIn'], function (exports, _lodashInternalBaseFor, _lodashObjectKeysIn) {
  'use strict';

  /**
   * The base implementation of `_.forIn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForIn(object, iteratee) {
    return (0, _lodashInternalBaseFor['default'])(object, iteratee, _lodashObjectKeysIn['default']);
  }

  exports['default'] = baseForIn;
});