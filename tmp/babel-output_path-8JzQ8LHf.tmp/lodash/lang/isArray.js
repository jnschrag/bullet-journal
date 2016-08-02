define('lodash/lang/isArray', ['exports', 'lodash/internal/getNative', 'lodash/internal/isLength', 'lodash/internal/isObjectLike'], function (exports, _lodashInternalGetNative, _lodashInternalIsLength, _lodashInternalIsObjectLike) {
  'use strict';

  /** `Object#toString` result references. */
  var arrayTag = '[object Array]';

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objToString = objectProto.toString;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeIsArray = (0, _lodashInternalGetNative['default'])(Array, 'isArray');

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(function() { return arguments; }());
   * // => false
   */
  var isArray = nativeIsArray || function (value) {
    return (0, _lodashInternalIsObjectLike['default'])(value) && (0, _lodashInternalIsLength['default'])(value.length) && objToString.call(value) == arrayTag;
  };

  exports['default'] = isArray;
});