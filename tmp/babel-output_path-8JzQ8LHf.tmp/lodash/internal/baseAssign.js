define('lodash/internal/baseAssign', ['exports', 'lodash/internal/baseCopy', 'lodash/object/keys'], function (exports, _lodashInternalBaseCopy, _lodashObjectKeys) {
  'use strict';

  /**
   * The base implementation of `_.assign` without support for argument juggling,
   * multiple sources, and `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return source == null ? object : (0, _lodashInternalBaseCopy['default'])(source, (0, _lodashObjectKeys['default'])(source), object);
  }

  exports['default'] = baseAssign;
});