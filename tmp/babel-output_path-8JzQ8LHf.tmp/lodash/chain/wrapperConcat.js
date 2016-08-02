define('lodash/chain/wrapperConcat', ['exports', 'lodash/internal/arrayConcat', 'lodash/internal/baseFlatten', 'lodash/lang/isArray', 'lodash/function/restParam', 'lodash/internal/toObject'], function (exports, _lodashInternalArrayConcat, _lodashInternalBaseFlatten, _lodashLangIsArray, _lodashFunctionRestParam, _lodashInternalToObject) {
  'use strict';

  /**
   * Creates a new array joining a wrapped array with any additional arrays
   * and/or values.
   *
   * @name concat
   * @memberOf _
   * @category Chain
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var wrapped = _(array).concat(2, [3], [[4]]);
   *
   * console.log(wrapped.value());
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  var wrapperConcat = (0, _lodashFunctionRestParam['default'])(function (values) {
    values = (0, _lodashInternalBaseFlatten['default'])(values);
    return this.thru(function (array) {
      return (0, _lodashInternalArrayConcat['default'])((0, _lodashLangIsArray['default'])(array) ? array : [(0, _lodashInternalToObject['default'])(array)], values);
    });
  });

  exports['default'] = wrapperConcat;
});