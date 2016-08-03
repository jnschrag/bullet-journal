define('lodash/utility/mixin', ['exports', 'lodash/internal/arrayCopy', 'lodash/internal/arrayPush', 'lodash/internal/baseFunctions', 'lodash/lang/isFunction', 'lodash/lang/isObject', 'lodash/object/keys'], function (exports, _lodashInternalArrayCopy, _lodashInternalArrayPush, _lodashInternalBaseFunctions, _lodashLangIsFunction, _lodashLangIsObject, _lodashObjectKeys) {
  'use strict';

  /**
   * Adds all own enumerable function properties of a source object to the
   * destination object. If `object` is a function then methods are added to
   * its prototype as well.
   *
   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
   * avoid conflicts caused by modifying the original.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Function|Object} [object=lodash] The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.chain=true] Specify whether the functions added
   *  are chainable.
   * @returns {Function|Object} Returns `object`.
   * @example
   *
   * function vowels(string) {
   *   return _.filter(string, function(v) {
   *     return /[aeiou]/i.test(v);
   *   });
   * }
   *
   * _.mixin({ 'vowels': vowels });
   * _.vowels('fred');
   * // => ['e']
   *
   * _('fred').vowels().value();
   * // => ['e']
   *
   * _.mixin({ 'vowels': vowels }, { 'chain': false });
   * _('fred').vowels();
   * // => ['e']
   */
  function mixin(object, source, options) {
    var methodNames = (0, _lodashInternalBaseFunctions['default'])(source, (0, _lodashObjectKeys['default'])(source));

    var chain = true,
        index = -1,
        isFunc = (0, _lodashLangIsFunction['default'])(object),
        length = methodNames.length;

    if (options === false) {
      chain = false;
    } else if ((0, _lodashLangIsObject['default'])(options) && 'chain' in options) {
      chain = options.chain;
    }
    while (++index < length) {
      var methodName = methodNames[index],
          func = source[methodName];

      object[methodName] = func;
      if (isFunc) {
        object.prototype[methodName] = (function (func) {
          return function () {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = (0, _lodashInternalArrayCopy['default'])(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, (0, _lodashInternalArrayPush['default'])([this.value()], arguments));
          };
        })(func);
      }
    }
    return object;
  }

  exports['default'] = mixin;
});