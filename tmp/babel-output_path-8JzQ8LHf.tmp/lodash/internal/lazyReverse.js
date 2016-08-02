define('lodash/internal/lazyReverse', ['exports', 'lodash/internal/LazyWrapper'], function (exports, _lodashInternalLazyWrapper) {
  'use strict';

  /**
   * Reverses the direction of lazy iteration.
   *
   * @private
   * @name reverse
   * @memberOf LazyWrapper
   * @returns {Object} Returns the new reversed `LazyWrapper` object.
   */
  function lazyReverse() {
    if (this.__filtered__) {
      var result = new _lodashInternalLazyWrapper['default'](this);
      result.__dir__ = -1;
      result.__filtered__ = true;
    } else {
      result = this.clone();
      result.__dir__ *= -1;
    }
    return result;
  }

  exports['default'] = lazyReverse;
});