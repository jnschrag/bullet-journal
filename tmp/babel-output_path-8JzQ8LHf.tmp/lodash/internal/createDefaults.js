define('lodash/internal/createDefaults', ['exports', 'lodash/function/restParam'], function (exports, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates a `_.defaults` or `_.defaultsDeep` function.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Function} Returns the new defaults function.
   */
  function createDefaults(assigner, customizer) {
    return (0, _lodashFunctionRestParam['default'])(function (args) {
      var object = args[0];
      if (object == null) {
        return object;
      }
      args.push(customizer);
      return assigner.apply(undefined, args);
    });
  }

  exports['default'] = createDefaults;
});