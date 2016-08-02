define('lodash/function/bind', ['exports', 'lodash/internal/createWrapper', 'lodash/internal/replaceHolders', 'lodash/function/restParam'], function (exports, _lodashInternalCreateWrapper, _lodashInternalReplaceHolders, _lodashFunctionRestParam) {
  'use strict';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and prepends any additional `_.bind` arguments to those provided to the
   * bound function.
   *
   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for partially applied arguments.
   *
   * **Note:** Unlike native `Function#bind` this method does not set the "length"
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var greet = function(greeting, punctuation) {
   *   return greeting + ' ' + this.user + punctuation;
   * };
   *
   * var object = { 'user': 'fred' };
   *
   * var bound = _.bind(greet, object, 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * // using placeholders
   * var bound = _.bind(greet, object, _, '!');
   * bound('hi');
   * // => 'hi fred!'
   */
  var bind = (0, _lodashFunctionRestParam['default'])(function (func, thisArg, partials) {
    var bitmask = BIND_FLAG;
    if (partials.length) {
      var holders = (0, _lodashInternalReplaceHolders['default'])(partials, bind.placeholder);
      bitmask |= PARTIAL_FLAG;
    }
    return (0, _lodashInternalCreateWrapper['default'])(func, bitmask, thisArg, partials, holders);
  });

  // Assign default placeholders.
  bind.placeholder = {};

  exports['default'] = bind;
});