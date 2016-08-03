define('lodash/internal/lazyClone', ['exports', 'lodash/internal/LazyWrapper', 'lodash/internal/arrayCopy'], function (exports, _lodashInternalLazyWrapper, _lodashInternalArrayCopy) {
  'use strict';

  /**
   * Creates a clone of the lazy wrapper object.
   *
   * @private
   * @name clone
   * @memberOf LazyWrapper
   * @returns {Object} Returns the cloned `LazyWrapper` object.
   */
  function lazyClone() {
    var result = new _lodashInternalLazyWrapper['default'](this.__wrapped__);
    result.__actions__ = (0, _lodashInternalArrayCopy['default'])(this.__actions__);
    result.__dir__ = this.__dir__;
    result.__filtered__ = this.__filtered__;
    result.__iteratees__ = (0, _lodashInternalArrayCopy['default'])(this.__iteratees__);
    result.__takeCount__ = this.__takeCount__;
    result.__views__ = (0, _lodashInternalArrayCopy['default'])(this.__views__);
    return result;
  }

  exports['default'] = lazyClone;
});