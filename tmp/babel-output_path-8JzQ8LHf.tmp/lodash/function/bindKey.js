define('lodash/function/bindKey', ['exports', 'lodash/internal/createWrapper', 'lodash/internal/replaceHolders', 'lodash/function/restParam'], function (exports, _lodashInternalCreateWrapper, _lodashInternalReplaceHolders, _lodashFunctionRestParam) {
  'use strict';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes the method at `object[key]` and prepends
   * any additional `_.bindKey` arguments to those provided to the bound function.
   *
   * This method differs from `_.bind` by allowing bound functions to reference
   * methods that may be redefined or don't yet exist.
   * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
   * for more details.
   *
   * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Object} object The object the method belongs to.
   * @param {string} key The key of the method.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var object = {
   *   'user': 'fred',
   *   'greet': function(greeting, punctuation) {
   *     return greeting + ' ' + this.user + punctuation;
   *   }
   * };
   *
   * var bound = _.bindKey(object, 'greet', 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * object.greet = function(greeting, punctuation) {
   *   return greeting + 'ya ' + this.user + punctuation;
   * };
   *
   * bound('!');
   * // => 'hiya fred!'
   *
   * // using placeholders
   * var bound = _.bindKey(object, 'greet', _, '!');
   * bound('hi');
   * // => 'hiya fred!'
   */
  var bindKey = (0, _lodashFunctionRestParam['default'])(function (object, key, partials) {
    var bitmask = BIND_FLAG | BIND_KEY_FLAG;
    if (partials.length) {
      var holders = (0, _lodashInternalReplaceHolders['default'])(partials, bindKey.placeholder);
      bitmask |= PARTIAL_FLAG;
    }
    return (0, _lodashInternalCreateWrapper['default'])(key, bitmask, object, partials, holders);
  });

  // Assign default placeholders.
  bindKey.placeholder = {};

  exports['default'] = bindKey;
});