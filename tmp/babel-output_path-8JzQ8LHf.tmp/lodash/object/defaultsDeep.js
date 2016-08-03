define('lodash/object/defaultsDeep', ['exports', 'lodash/internal/createDefaults', 'lodash/object/merge', 'lodash/internal/mergeDefaults'], function (exports, _lodashInternalCreateDefaults, _lodashObjectMerge, _lodashInternalMergeDefaults) {
  'use strict';

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
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
   * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
   * // => { 'user': { 'name': 'barney', 'age': 36 } }
   *
   */
  var defaultsDeep = (0, _lodashInternalCreateDefaults['default'])(_lodashObjectMerge['default'], _lodashInternalMergeDefaults['default']);

  exports['default'] = defaultsDeep;
});