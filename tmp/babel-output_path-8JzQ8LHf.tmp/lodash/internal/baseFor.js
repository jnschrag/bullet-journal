define('lodash/internal/baseFor', ['exports', 'lodash/internal/createBaseFor'], function (exports, _lodashInternalCreateBaseFor) {
  'use strict';

  /**
   * The base implementation of `baseForIn` and `baseForOwn` which iterates
   * over `object` properties returned by `keysFunc` invoking `iteratee` for
   * each property. Iteratee functions may exit iteration early by explicitly
   * returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = (0, _lodashInternalCreateBaseFor['default'])();

  exports['default'] = baseFor;
});