define('lodash/string/escapeRegExp', ['exports', 'lodash/internal/baseToString', 'lodash/internal/escapeRegExpChar'], function (exports, _lodashInternalBaseToString, _lodashInternalEscapeRegExpChar) {
  'use strict';

  /**
   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
   */
  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /**
   * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
   * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escapeRegExp('[lodash](https://lodash.com/)');
   * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
   */
  function escapeRegExp(string) {
    string = (0, _lodashInternalBaseToString['default'])(string);
    return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, _lodashInternalEscapeRegExpChar['default']) : string || '(?:)';
  }

  exports['default'] = escapeRegExp;
});