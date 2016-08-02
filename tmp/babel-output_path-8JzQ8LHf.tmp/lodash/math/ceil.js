define('lodash/math/ceil', ['exports', 'lodash/internal/createRound'], function (exports, _lodashInternalCreateRound) {
  'use strict';

  /**
   * Calculates `n` rounded up to `precision`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {number} n The number to round up.
   * @param {number} [precision=0] The precision to round up to.
   * @returns {number} Returns the rounded up number.
   * @example
   *
   * _.ceil(4.006);
   * // => 5
   *
   * _.ceil(6.004, 2);
   * // => 6.01
   *
   * _.ceil(6040, -2);
   * // => 6100
   */
  var ceil = (0, _lodashInternalCreateRound['default'])('ceil');

  exports['default'] = ceil;
});