define('lodash/object/values', ['exports', 'lodash/internal/baseValues', 'lodash/object/keys'], function (exports, _lodashInternalBaseValues, _lodashObjectKeys) {
  'use strict';

  /**
   * Creates an array of the own enumerable property values of `object`.
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
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return (0, _lodashInternalBaseValues['default'])(object, (0, _lodashObjectKeys['default'])(object));
  }

  exports['default'] = values;
});