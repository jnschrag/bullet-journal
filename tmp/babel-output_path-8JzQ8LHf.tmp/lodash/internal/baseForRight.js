define('lodash/internal/baseForRight', ['exports', 'lodash/internal/createBaseFor'], function (exports, _lodashInternalCreateBaseFor) {
  'use strict';

  /**
   * This function is like `baseFor` except that it iterates over properties
   * in the opposite order.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseForRight = (0, _lodashInternalCreateBaseFor['default'])(true);

  exports['default'] = baseForRight;
});