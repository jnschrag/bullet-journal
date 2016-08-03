define('lodash/collection/size', ['exports', 'lodash/internal/getLength', 'lodash/internal/isLength', 'lodash/object/keys'], function (exports, _lodashInternalGetLength, _lodashInternalIsLength, _lodashObjectKeys) {
  'use strict';

  /**
   * Gets the size of `collection` by returning its length for array-like
   * values or the number of own enumerable properties for objects.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns the size of `collection`.
   * @example
   *
   * _.size([1, 2, 3]);
   * // => 3
   *
   * _.size({ 'a': 1, 'b': 2 });
   * // => 2
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    var length = collection ? (0, _lodashInternalGetLength['default'])(collection) : 0;
    return (0, _lodashInternalIsLength['default'])(length) ? length : (0, _lodashObjectKeys['default'])(collection).length;
  }

  exports['default'] = size;
});