define('lodash/internal/isObjectLike', ['exports'], function (exports) {
  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  'use strict';

  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  exports['default'] = isObjectLike;
});