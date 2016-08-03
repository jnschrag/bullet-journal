define('lodash/math/round', ['exports', 'lodash/internal/createRound'], function (exports, _lodashInternalCreateRound) {
  'use strict';

  /**
   * Calculates `n` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {number} n The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */
  var round = (0, _lodashInternalCreateRound['default'])('round');

  exports['default'] = round;
});