define('lodash/internal/baseForOwnRight', ['exports', 'lodash/internal/baseForRight', 'lodash/object/keys'], function (exports, _lodashInternalBaseForRight, _lodashObjectKeys) {
  'use strict';

  /**
   * The base implementation of `_.forOwnRight` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwnRight(object, iteratee) {
    return (0, _lodashInternalBaseForRight['default'])(object, iteratee, _lodashObjectKeys['default']);
  }

  exports['default'] = baseForOwnRight;
});