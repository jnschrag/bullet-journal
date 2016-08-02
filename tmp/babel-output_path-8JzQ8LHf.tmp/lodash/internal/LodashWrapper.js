define('lodash/internal/LodashWrapper', ['exports', 'lodash/internal/baseCreate', 'lodash/internal/baseLodash'], function (exports, _lodashInternalBaseCreate, _lodashInternalBaseLodash) {
  'use strict';

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
   * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
   */
  function LodashWrapper(value, chainAll, actions) {
    this.__wrapped__ = value;
    this.__actions__ = actions || [];
    this.__chain__ = !!chainAll;
  }

  LodashWrapper.prototype = (0, _lodashInternalBaseCreate['default'])(_lodashInternalBaseLodash['default'].prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  exports['default'] = LodashWrapper;
});