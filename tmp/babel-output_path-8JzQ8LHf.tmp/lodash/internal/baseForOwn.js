define('lodash/internal/baseForOwn', ['exports', 'lodash/internal/baseFor', 'lodash/object/keys'], function (exports, _lodashInternalBaseFor, _lodashObjectKeys) {
  'use strict';

  /**
   * The base implementation of `_.forOwn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return (0, _lodashInternalBaseFor['default'])(object, iteratee, _lodashObjectKeys['default']);
  }

  exports['default'] = baseForOwn;
});