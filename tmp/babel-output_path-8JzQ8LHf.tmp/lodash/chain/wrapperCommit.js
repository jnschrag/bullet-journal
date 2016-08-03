define('lodash/chain/wrapperCommit', ['exports', 'lodash/internal/LodashWrapper'], function (exports, _lodashInternalLodashWrapper) {
  'use strict';

  /**
   * Executes the chained sequence and returns the wrapped result.
   *
   * @name commit
   * @memberOf _
   * @category Chain
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var array = [1, 2];
   * var wrapped = _(array).push(3);
   *
   * console.log(array);
   * // => [1, 2]
   *
   * wrapped = wrapped.commit();
   * console.log(array);
   * // => [1, 2, 3]
   *
   * wrapped.last();
   * // => 3
   *
   * console.log(array);
   * // => [1, 2, 3]
   */
  function wrapperCommit() {
    return new _lodashInternalLodashWrapper['default'](this.value(), this.__chain__);
  }

  exports['default'] = wrapperCommit;
});