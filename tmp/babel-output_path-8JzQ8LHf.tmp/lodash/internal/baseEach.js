define('lodash/internal/baseEach', ['exports', 'lodash/internal/baseForOwn', 'lodash/internal/createBaseEach'], function (exports, _lodashInternalBaseForOwn, _lodashInternalCreateBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.forEach` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */
  var baseEach = (0, _lodashInternalCreateBaseEach['default'])(_lodashInternalBaseForOwn['default']);

  exports['default'] = baseEach;
});