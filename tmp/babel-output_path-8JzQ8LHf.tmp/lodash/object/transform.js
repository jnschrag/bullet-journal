define('lodash/object/transform', ['exports', 'lodash/internal/arrayEach', 'lodash/internal/baseCallback', 'lodash/internal/baseCreate', 'lodash/internal/baseForOwn', 'lodash/lang/isArray', 'lodash/lang/isFunction', 'lodash/lang/isObject', 'lodash/lang/isTypedArray'], function (exports, _lodashInternalArrayEach, _lodashInternalBaseCallback, _lodashInternalBaseCreate, _lodashInternalBaseForOwn, _lodashLangIsArray, _lodashLangIsFunction, _lodashLangIsObject, _lodashLangIsTypedArray) {
  'use strict';

  /**
   * An alternative to `_.reduce`; this method transforms `object` to a new
   * `accumulator` object which is the result of running each of its own enumerable
   * properties through `iteratee`, with each invocation potentially mutating
   * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
   * with four arguments: (accumulator, value, key, object). Iteratee functions
   * may exit iteration early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The custom accumulator value.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * _.transform([2, 3, 4], function(result, n) {
   *   result.push(n *= n);
   *   return n % 2 == 0;
   * });
   * // => [4, 9]
   *
   * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
   *   result[key] = n * 3;
   * });
   * // => { 'a': 3, 'b': 6 }
   */
  function transform(object, iteratee, accumulator, thisArg) {
    var isArr = (0, _lodashLangIsArray['default'])(object) || (0, _lodashLangIsTypedArray['default'])(object);
    iteratee = (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 4);

    if (accumulator == null) {
      if (isArr || (0, _lodashLangIsObject['default'])(object)) {
        var Ctor = object.constructor;
        if (isArr) {
          accumulator = (0, _lodashLangIsArray['default'])(object) ? new Ctor() : [];
        } else {
          accumulator = (0, _lodashInternalBaseCreate['default'])((0, _lodashLangIsFunction['default'])(Ctor) ? Ctor.prototype : undefined);
        }
      } else {
        accumulator = {};
      }
    }
    (isArr ? _lodashInternalArrayEach['default'] : _lodashInternalBaseForOwn['default'])(object, function (value, index, object) {
      return iteratee(accumulator, value, index, object);
    });
    return accumulator;
  }

  exports['default'] = transform;
});