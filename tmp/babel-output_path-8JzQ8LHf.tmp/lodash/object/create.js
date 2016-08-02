define('lodash/object/create', ['exports', 'lodash/internal/baseAssign', 'lodash/internal/baseCreate', 'lodash/internal/isIterateeCall'], function (exports, _lodashInternalBaseAssign, _lodashInternalBaseCreate, _lodashInternalIsIterateeCall) {
  'use strict';

  /**
   * Creates an object that inherits from the given `prototype` object. If a
   * `properties` object is provided its own enumerable properties are assigned
   * to the created object.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} prototype The object to inherit from.
   * @param {Object} [properties] The properties to assign to the object.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * function Circle() {
   *   Shape.call(this);
   * }
   *
   * Circle.prototype = _.create(Shape.prototype, {
   *   'constructor': Circle
   * });
   *
   * var circle = new Circle;
   * circle instanceof Circle;
   * // => true
   *
   * circle instanceof Shape;
   * // => true
   */
  function create(prototype, properties, guard) {
    var result = (0, _lodashInternalBaseCreate['default'])(prototype);
    if (guard && (0, _lodashInternalIsIterateeCall['default'])(prototype, properties, guard)) {
      properties = undefined;
    }
    return properties ? (0, _lodashInternalBaseAssign['default'])(result, properties) : result;
  }

  exports['default'] = create;
});