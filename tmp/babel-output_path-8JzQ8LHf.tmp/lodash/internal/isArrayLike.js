define('lodash/internal/isArrayLike', ['exports', 'lodash/internal/getLength', 'lodash/internal/isLength'], function (exports, _lodashInternalGetLength, _lodashInternalIsLength) {
  'use strict';

  /**
   * Checks if `value` is array-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   */
  function isArrayLike(value) {
    return value != null && (0, _lodashInternalIsLength['default'])((0, _lodashInternalGetLength['default'])(value));
  }

  exports['default'] = isArrayLike;
});