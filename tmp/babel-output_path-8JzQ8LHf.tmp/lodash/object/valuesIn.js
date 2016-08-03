define('lodash/object/valuesIn', ['exports', 'lodash/internal/baseValues', 'lodash/object/keysIn'], function (exports, _lodashInternalBaseValues, _lodashObjectKeysIn) {
  'use strict';

  /**
   * Creates an array of the own and inherited enumerable property values
   * of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.valuesIn(new Foo);
   * // => [1, 2, 3] (iteration order is not guaranteed)
   */
  function valuesIn(object) {
    return (0, _lodashInternalBaseValues['default'])(object, (0, _lodashObjectKeysIn['default'])(object));
  }

  exports['default'] = valuesIn;
});