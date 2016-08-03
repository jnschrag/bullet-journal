define('lodash/internal/createBaseFor', ['exports', 'lodash/internal/toObject'], function (exports, _lodashInternalToObject) {
  'use strict';

  /**
   * Creates a base function for `_.forIn` or `_.forInRight`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var iterable = (0, _lodashInternalToObject['default'])(object),
          props = keysFunc(object),
          length = props.length,
          index = fromRight ? length : -1;

      while (fromRight ? index-- : ++index < length) {
        var key = props[index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  exports['default'] = createBaseFor;
});