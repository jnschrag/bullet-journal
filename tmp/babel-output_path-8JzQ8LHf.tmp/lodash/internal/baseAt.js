define('lodash/internal/baseAt', ['exports', 'lodash/internal/isArrayLike', 'lodash/internal/isIndex'], function (exports, _lodashInternalIsArrayLike, _lodashInternalIsIndex) {
  'use strict';

  /**
   * The base implementation of `_.at` without support for string collections
   * and individual key arguments.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {number[]|string[]} props The property names or indexes of elements to pick.
   * @returns {Array} Returns the new array of picked elements.
   */
  function baseAt(collection, props) {
    var index = -1,
        isNil = collection == null,
        isArr = !isNil && (0, _lodashInternalIsArrayLike['default'])(collection),
        length = isArr ? collection.length : 0,
        propsLength = props.length,
        result = Array(propsLength);

    while (++index < propsLength) {
      var key = props[index];
      if (isArr) {
        result[index] = (0, _lodashInternalIsIndex['default'])(key, length) ? collection[key] : undefined;
      } else {
        result[index] = isNil ? undefined : collection[key];
      }
    }
    return result;
  }

  exports['default'] = baseAt;
});