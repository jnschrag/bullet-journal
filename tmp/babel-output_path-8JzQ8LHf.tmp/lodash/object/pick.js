define('lodash/object/pick', ['exports', 'lodash/internal/baseFlatten', 'lodash/internal/bindCallback', 'lodash/internal/pickByArray', 'lodash/internal/pickByCallback', 'lodash/function/restParam'], function (exports, _lodashInternalBaseFlatten, _lodashInternalBindCallback, _lodashInternalPickByArray, _lodashInternalPickByCallback, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates an object composed of the picked `object` properties. Property
   * names may be specified as individual arguments or as arrays of property
   * names. If `predicate` is provided it's invoked for each property of `object`
   * picking the properties `predicate` returns truthy for. The predicate is
   * bound to `thisArg` and invoked with three arguments: (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function invoked per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.pick(object, 'user');
   * // => { 'user': 'fred' }
   *
   * _.pick(object, _.isString);
   * // => { 'user': 'fred' }
   */
  var pick = (0, _lodashFunctionRestParam['default'])(function (object, props) {
    if (object == null) {
      return {};
    }
    return typeof props[0] == 'function' ? (0, _lodashInternalPickByCallback['default'])(object, (0, _lodashInternalBindCallback['default'])(props[0], props[1], 3)) : (0, _lodashInternalPickByArray['default'])(object, (0, _lodashInternalBaseFlatten['default'])(props));
  });

  exports['default'] = pick;
});