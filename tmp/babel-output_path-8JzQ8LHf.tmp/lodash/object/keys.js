define('lodash/object/keys', ['exports', 'lodash/internal/getNative', 'lodash/internal/isArrayLike', 'lodash/lang/isObject', 'lodash/internal/shimKeys'], function (exports, _lodashInternalGetNative, _lodashInternalIsArrayLike, _lodashLangIsObject, _lodashInternalShimKeys) {
  'use strict';

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeKeys = (0, _lodashInternalGetNative['default'])(Object, 'keys');

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
   * for more details.
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
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  var keys = !nativeKeys ? _lodashInternalShimKeys['default'] : function (object) {
    var Ctor = object == null ? undefined : object.constructor;
    if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && (0, _lodashInternalIsArrayLike['default'])(object)) {
      return (0, _lodashInternalShimKeys['default'])(object);
    }
    return (0, _lodashLangIsObject['default'])(object) ? nativeKeys(object) : [];
  };

  exports['default'] = keys;
});