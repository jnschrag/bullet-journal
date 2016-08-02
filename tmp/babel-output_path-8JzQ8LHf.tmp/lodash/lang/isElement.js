define('lodash/lang/isElement', ['exports', 'lodash/internal/isObjectLike', 'lodash/lang/isPlainObject'], function (exports, _lodashInternalIsObjectLike, _lodashLangIsPlainObject) {
  'use strict';

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return !!value && value.nodeType === 1 && (0, _lodashInternalIsObjectLike['default'])(value) && !(0, _lodashLangIsPlainObject['default'])(value);
  }

  exports['default'] = isElement;
});