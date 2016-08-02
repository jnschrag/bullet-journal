define('lodash/chain/wrapperValue', ['exports', 'lodash/internal/baseWrapperValue'], function (exports, _lodashInternalBaseWrapperValue) {
  'use strict';

  /**
   * Executes the chained sequence to extract the unwrapped value.
   *
   * @name value
   * @memberOf _
   * @alias run, toJSON, valueOf
   * @category Chain
   * @returns {*} Returns the resolved unwrapped value.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperValue() {
    return (0, _lodashInternalBaseWrapperValue['default'])(this.__wrapped__, this.__actions__);
  }

  exports['default'] = wrapperValue;
});