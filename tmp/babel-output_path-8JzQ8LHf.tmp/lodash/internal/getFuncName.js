define('lodash/internal/getFuncName', ['exports', 'lodash/internal/realNames'], function (exports, _lodashInternalRealNames) {
  'use strict';

  /**
   * Gets the name of `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {string} Returns the function name.
   */
  function getFuncName(func) {
    var result = func.name + '',
        array = _lodashInternalRealNames['default'][result],
        length = array ? array.length : 0;

    while (length--) {
      var data = array[length],
          otherFunc = data.func;
      if (otherFunc == null || otherFunc == func) {
        return data.name;
      }
    }
    return result;
  }

  exports['default'] = getFuncName;
});