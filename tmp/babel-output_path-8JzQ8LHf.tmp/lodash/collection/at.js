define('lodash/collection/at', ['exports', 'lodash/internal/baseAt', 'lodash/internal/baseFlatten', 'lodash/function/restParam'], function (exports, _lodashInternalBaseAt, _lodashInternalBaseFlatten, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an array of elements corresponding to the given keys, or indexes,
   * of `collection`. Keys may be specified as individual arguments or as arrays
   * of keys.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {...(number|number[]|string|string[])} [props] The property names
   *  or indexes of elements to pick, specified individually or in arrays.
   * @returns {Array} Returns the new array of picked elements.
   * @example
   *
   * _.at(['a', 'b', 'c'], [0, 2]);
   * // => ['a', 'c']
   *
   * _.at(['barney', 'fred', 'pebbles'], 0, 2);
   * // => ['barney', 'pebbles']
   */
  var at = (0, _lodashFunctionRestParam['default'])(function (collection, props) {
    return (0, _lodashInternalBaseAt['default'])(collection, (0, _lodashInternalBaseFlatten['default'])(props));
  });

  exports['default'] = at;
});