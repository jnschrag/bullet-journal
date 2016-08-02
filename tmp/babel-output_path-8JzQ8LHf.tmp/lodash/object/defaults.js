define('lodash/object/defaults', ['exports', 'lodash/object/assign', 'lodash/internal/assignDefaults', 'lodash/internal/createDefaults'], function (exports, _lodashObjectAssign, _lodashInternalAssignDefaults, _lodashInternalCreateDefaults) {
  'use strict';

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to `undefined`. Once a
   * property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  var defaults = (0, _lodashInternalCreateDefaults['default'])(_lodashObjectAssign['default'], _lodashInternalAssignDefaults['default']);

  exports['default'] = defaults;
});