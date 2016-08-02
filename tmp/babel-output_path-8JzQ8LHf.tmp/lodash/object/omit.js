define('lodash/object/omit', ['exports', 'lodash/internal/arrayMap', 'lodash/internal/baseDifference', 'lodash/internal/baseFlatten', 'lodash/internal/bindCallback', 'lodash/object/keysIn', 'lodash/internal/pickByArray', 'lodash/internal/pickByCallback', 'lodash/function/restParam'], function (exports, _lodashInternalArrayMap, _lodashInternalBaseDifference, _lodashInternalBaseFlatten, _lodashInternalBindCallback, _lodashObjectKeysIn, _lodashInternalPickByArray, _lodashInternalPickByCallback, _lodashFunctionRestParam) {
  'use strict';

  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable properties of `object` that are not omitted.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function invoked per
   *  iteration or property names to omit, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.omit(object, 'age');
   * // => { 'user': 'fred' }
   *
   * _.omit(object, _.isNumber);
   * // => { 'user': 'fred' }
   */
  var omit = (0, _lodashFunctionRestParam['default'])(function (object, props) {
    if (object == null) {
      return {};
    }
    if (typeof props[0] != 'function') {
      var props = (0, _lodashInternalArrayMap['default'])((0, _lodashInternalBaseFlatten['default'])(props), String);
      return (0, _lodashInternalPickByArray['default'])(object, (0, _lodashInternalBaseDifference['default'])((0, _lodashObjectKeysIn['default'])(object), props));
    }
    var predicate = (0, _lodashInternalBindCallback['default'])(props[0], props[1], 3);
    return (0, _lodashInternalPickByCallback['default'])(object, function (value, key, object) {
      return !predicate(value, key, object);
    });
  });

  exports['default'] = omit;
});