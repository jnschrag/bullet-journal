define('lodash/math/floor', ['exports', 'lodash/internal/createRound'], function (exports, _lodashInternalCreateRound) {
  'use strict';

  /**
   * Calculates `n` rounded down to `precision`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {number} n The number to round down.
   * @param {number} [precision=0] The precision to round down to.
   * @returns {number} Returns the rounded down number.
   * @example
   *
   * _.floor(4.006);
   * // => 4
   *
   * _.floor(0.046, 2);
   * // => 0.04
   *
   * _.floor(4060, -2);
   * // => 4000
   */
  var floor = (0, _lodashInternalCreateRound['default'])('floor');

  exports['default'] = floor;
});