define('lodash/internal/isKey', ['exports', 'lodash/lang/isArray', 'lodash/internal/toObject'], function (exports, _lodashLangIsArray, _lodashInternalToObject) {
  'use strict';

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    var type = typeof value;
    if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
      return true;
    }
    if ((0, _lodashLangIsArray['default'])(value)) {
      return false;
    }
    var result = !reIsDeepProp.test(value);
    return result || object != null && value in (0, _lodashInternalToObject['default'])(object);
  }

  exports['default'] = isKey;
});