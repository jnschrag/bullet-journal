define('lodash/object/result', ['exports', 'lodash/internal/baseGet', 'lodash/internal/baseSlice', 'lodash/lang/isFunction', 'lodash/internal/isKey', 'lodash/array/last', 'lodash/internal/toPath'], function (exports, _lodashInternalBaseGet, _lodashInternalBaseSlice, _lodashLangIsFunction, _lodashInternalIsKey, _lodashArrayLast, _lodashInternalToPath) {
  'use strict';

  /**
   * This method is like `_.get` except that if the resolved value is a function
   * it's invoked with the `this` binding of its parent object and its result
   * is returned.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to resolve.
   * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
   *
   * _.result(object, 'a[0].b.c1');
   * // => 3
   *
   * _.result(object, 'a[0].b.c2');
   * // => 4
   *
   * _.result(object, 'a.b.c', 'default');
   * // => 'default'
   *
   * _.result(object, 'a.b.c', _.constant('default'));
   * // => 'default'
   */
  function result(object, path, defaultValue) {
    var result = object == null ? undefined : object[path];
    if (result === undefined) {
      if (object != null && !(0, _lodashInternalIsKey['default'])(path, object)) {
        path = (0, _lodashInternalToPath['default'])(path);
        object = path.length == 1 ? object : (0, _lodashInternalBaseGet['default'])(object, (0, _lodashInternalBaseSlice['default'])(path, 0, -1));
        result = object == null ? undefined : object[(0, _lodashArrayLast['default'])(path)];
      }
      result = result === undefined ? defaultValue : result;
    }
    return (0, _lodashLangIsFunction['default'])(result) ? result.call(object) : result;
  }

  exports['default'] = result;
});