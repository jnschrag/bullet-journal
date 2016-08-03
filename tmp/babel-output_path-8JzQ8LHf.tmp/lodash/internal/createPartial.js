define('lodash/internal/createPartial', ['exports', 'lodash/internal/createWrapper', 'lodash/internal/replaceHolders', 'lodash/function/restParam'], function (exports, _lodashInternalCreateWrapper, _lodashInternalReplaceHolders, _lodashFunctionRestParam) {
  'use strict';

  /**
   * Creates a `_.partial` or `_.partialRight` function.
   *
   * @private
   * @param {boolean} flag The partial bit flag.
   * @returns {Function} Returns the new partial function.
   */
  function createPartial(flag) {
    var partialFunc = (0, _lodashFunctionRestParam['default'])(function (func, partials) {
      var holders = (0, _lodashInternalReplaceHolders['default'])(partials, partialFunc.placeholder);
      return (0, _lodashInternalCreateWrapper['default'])(func, flag, undefined, partials, holders);
    });
    return partialFunc;
  }

  exports['default'] = createPartial;
});