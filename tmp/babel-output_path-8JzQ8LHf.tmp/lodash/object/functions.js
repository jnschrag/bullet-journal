define('lodash/object/functions', ['exports', 'lodash/internal/baseFunctions', 'lodash/object/keysIn'], function (exports, _lodashInternalBaseFunctions, _lodashObjectKeysIn) {
  'use strict';

  /**
   * Creates an array of function property names from all enumerable properties,
   * own and inherited, of `object`.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Object
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the new array of property names.
   * @example
   *
   * _.functions(_);
   * // => ['after', 'ary', 'assign', ...]
   */
  function functions(object) {
    return (0, _lodashInternalBaseFunctions['default'])(object, (0, _lodashObjectKeysIn['default'])(object));
  }

  exports['default'] = functions;
});