define('lodash/internal/mergeDefaults', ['exports', 'lodash/object/merge'], function (exports, _lodashObjectMerge) {
  'use strict';

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function mergeDefaults(objectValue, sourceValue) {
    return objectValue === undefined ? sourceValue : (0, _lodashObjectMerge['default'])(objectValue, sourceValue, mergeDefaults);
  }

  exports['default'] = mergeDefaults;
});