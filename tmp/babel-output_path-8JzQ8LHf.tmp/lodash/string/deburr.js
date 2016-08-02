define('lodash/string/deburr', ['exports', 'lodash/internal/baseToString', 'lodash/internal/deburrLetter'], function (exports, _lodashInternalBaseToString, _lodashInternalDeburrLetter) {
  'use strict';

  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /**
   * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * _.deburr('déjà vu');
   * // => 'deja vu'
   */
  function deburr(string) {
    string = (0, _lodashInternalBaseToString['default'])(string);
    return string && string.replace(reLatin1, _lodashInternalDeburrLetter['default']).replace(reComboMark, '');
  }

  exports['default'] = deburr;
});