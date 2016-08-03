define('lodash/internal/createAssigner', ['exports', 'lodash/internal/bindCallback', 'lodash/internal/isIterateeCall', 'lodash/function/restParam'], function (exports, _lodashInternalBindCallback, _lodashInternalIsIterateeCall, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return (0, _lodashFunctionRestParam['default'])(function (object, sources) {
      var index = -1,
          length = object == null ? 0 : sources.length,
          customizer = length > 2 ? sources[length - 2] : undefined,
          guard = length > 2 ? sources[2] : undefined,
          thisArg = length > 1 ? sources[length - 1] : undefined;

      if (typeof customizer == 'function') {
        customizer = (0, _lodashInternalBindCallback['default'])(customizer, thisArg, 5);
        length -= 2;
      } else {
        customizer = typeof thisArg == 'function' ? thisArg : undefined;
        length -= customizer ? 1 : 0;
      }
      if (guard && (0, _lodashInternalIsIterateeCall['default'])(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, customizer);
        }
      }
      return object;
    });
  }

  exports['default'] = createAssigner;
});