define('lodash/object/keysIn', ['exports', 'lodash/lang/isArguments', 'lodash/lang/isArray', 'lodash/internal/isIndex', 'lodash/internal/isLength', 'lodash/lang/isObject'], function (exports, _lodashLangIsArguments, _lodashLangIsArray, _lodashInternalIsIndex, _lodashInternalIsLength, _lodashLangIsObject) {
  'use strict';

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    if (object == null) {
      return [];
    }
    if (!(0, _lodashLangIsObject['default'])(object)) {
      object = Object(object);
    }
    var length = object.length;
    length = length && (0, _lodashInternalIsLength['default'])(length) && ((0, _lodashLangIsArray['default'])(object) || (0, _lodashLangIsArguments['default'])(object)) && length || 0;

    var Ctor = object.constructor,
        index = -1,
        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
        result = Array(length),
        skipIndexes = length > 0;

    while (++index < length) {
      result[index] = index + '';
    }
    for (var key in object) {
      if (!(skipIndexes && (0, _lodashInternalIsIndex['default'])(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  exports['default'] = keysIn;
});