define('lodash/string/parseInt', ['exports', 'lodash/internal/isIterateeCall', 'lodash/internal/root', 'lodash/string/trim'], function (exports, _lodashInternalIsIterateeCall, _lodashInternalRoot, _lodashStringTrim) {
  'use strict';

  /** Used to detect hexadecimal string values. */
  var reHasHexPrefix = /^0[xX]/;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeParseInt = _lodashInternalRoot['default'].parseInt;

  /**
   * Converts `string` to an integer of the specified radix. If `radix` is
   * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
   * in which case a `radix` of `16` is used.
   *
   * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
   * of `parseInt`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} string The string to convert.
   * @param {number} [radix] The radix to interpret `value` by.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.parseInt('08');
   * // => 8
   *
   * _.map(['6', '08', '10'], _.parseInt);
   * // => [6, 8, 10]
   */
  function parseInt(string, radix, guard) {
    // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
    // Chrome fails to trim leading <BOM> whitespace characters.
    // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
    if (guard ? (0, _lodashInternalIsIterateeCall['default'])(string, radix, guard) : radix == null) {
      radix = 0;
    } else if (radix) {
      radix = +radix;
    }
    string = (0, _lodashStringTrim['default'])(string);
    return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
  }

  exports['default'] = parseInt;
});