define('lodash/internal/LazyWrapper', ['exports', 'lodash/internal/baseCreate', 'lodash/internal/baseLodash'], function (exports, _lodashInternalBaseCreate, _lodashInternalBaseLodash) {
  'use strict';

  /** Used as references for `-Infinity` and `Infinity`. */
  var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @param {*} value The value to wrap.
   */
  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = POSITIVE_INFINITY;
    this.__views__ = [];
  }

  LazyWrapper.prototype = (0, _lodashInternalBaseCreate['default'])(_lodashInternalBaseLodash['default'].prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;

  exports['default'] = LazyWrapper;
});