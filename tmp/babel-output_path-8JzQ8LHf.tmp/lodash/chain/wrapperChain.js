define('lodash/chain/wrapperChain', ['exports', 'lodash/chain/chain'], function (exports, _lodashChainChain) {
  'use strict';

  /**
   * Enables explicit method chaining on the wrapper object.
   *
   * @name chain
   * @memberOf _
   * @category Chain
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 }
   * ];
   *
   * // without explicit chaining
   * _(users).first();
   * // => { 'user': 'barney', 'age': 36 }
   *
   * // with explicit chaining
   * _(users).chain()
   *   .first()
   *   .pick('user')
   *   .value();
   * // => { 'user': 'barney' }
   */
  function wrapperChain() {
    return (0, _lodashChainChain['default'])(this);
  }

  exports['default'] = wrapperChain;
});