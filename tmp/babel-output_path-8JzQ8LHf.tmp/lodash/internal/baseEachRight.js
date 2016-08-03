define('lodash/internal/baseEachRight', ['exports', 'lodash/internal/baseForOwnRight', 'lodash/internal/createBaseEach'], function (exports, _lodashInternalBaseForOwnRight, _lodashInternalCreateBaseEach) {
  'use strict';

  /**
   * The base implementation of `_.forEachRight` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */
  var baseEachRight = (0, _lodashInternalCreateBaseEach['default'])(_lodashInternalBaseForOwnRight['default'], true);

  exports['default'] = baseEachRight;
});