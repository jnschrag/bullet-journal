define('lodash/lang/isEmpty', ['exports', 'lodash/lang/isArguments', 'lodash/lang/isArray', 'lodash/internal/isArrayLike', 'lodash/lang/isFunction', 'lodash/internal/isObjectLike', 'lodash/lang/isString', 'lodash/object/keys'], function (exports, _lodashLangIsArguments, _lodashLangIsArray, _lodashInternalIsArrayLike, _lodashLangIsFunction, _lodashInternalIsObjectLike, _lodashLangIsString, _lodashObjectKeys) {
  'use strict';

  /**
   * Checks if `value` is empty. A value is considered empty unless it's an
   * `arguments` object, array, string, or jQuery-like collection with a length
   * greater than `0` or an object with own enumerable properties.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {Array|Object|string} value The value to inspect.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if ((0, _lodashInternalIsArrayLike['default'])(value) && ((0, _lodashLangIsArray['default'])(value) || (0, _lodashLangIsString['default'])(value) || (0, _lodashLangIsArguments['default'])(value) || (0, _lodashInternalIsObjectLike['default'])(value) && (0, _lodashLangIsFunction['default'])(value.splice))) {
      return !value.length;
    }
    return !(0, _lodashObjectKeys['default'])(value).length;
  }

  exports['default'] = isEmpty;
});