define('lodash/utility/property', ['exports', 'lodash/internal/baseProperty', 'lodash/internal/basePropertyDeep', 'lodash/internal/isKey'], function (exports, _lodashInternalBaseProperty, _lodashInternalBasePropertyDeep, _lodashInternalIsKey) {
  'use strict';

  /**
   * Creates a function that returns the property value at `path` on a
   * given object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': { 'c': 2 } } },
   *   { 'a': { 'b': { 'c': 1 } } }
   * ];
   *
   * _.map(objects, _.property('a.b.c'));
   * // => [2, 1]
   *
   * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
   * // => [1, 2]
   */
  function property(path) {
    return (0, _lodashInternalIsKey['default'])(path) ? (0, _lodashInternalBaseProperty['default'])(path) : (0, _lodashInternalBasePropertyDeep['default'])(path);
  }

  exports['default'] = property;
});