define('lodash/chain/wrapperReverse', ['exports', 'lodash/internal/LazyWrapper', 'lodash/internal/LodashWrapper', 'lodash/chain/thru'], function (exports, _lodashInternalLazyWrapper, _lodashInternalLodashWrapper, _lodashChainThru) {
  'use strict';

  /**
   * Reverses the wrapped array so the first element becomes the last, the
   * second element becomes the second to last, and so on.
   *
   * **Note:** This method mutates the wrapped array.
   *
   * @name reverse
   * @memberOf _
   * @category Chain
   * @returns {Object} Returns the new reversed `lodash` wrapper instance.
   * @example
   *
   * var array = [1, 2, 3];
   *
   * _(array).reverse().value()
   * // => [3, 2, 1]
   *
   * console.log(array);
   * // => [3, 2, 1]
   */
  function wrapperReverse() {
    var value = this.__wrapped__;

    var interceptor = function interceptor(value) {
      return value.reverse();
    };
    if (value instanceof _lodashInternalLazyWrapper['default']) {
      var wrapped = value;
      if (this.__actions__.length) {
        wrapped = new _lodashInternalLazyWrapper['default'](this);
      }
      wrapped = wrapped.reverse();
      wrapped.__actions__.push({ 'func': _lodashChainThru['default'], 'args': [interceptor], 'thisArg': undefined });
      return new _lodashInternalLodashWrapper['default'](wrapped, this.__chain__);
    }
    return this.thru(interceptor);
  }

  exports['default'] = wrapperReverse;
});