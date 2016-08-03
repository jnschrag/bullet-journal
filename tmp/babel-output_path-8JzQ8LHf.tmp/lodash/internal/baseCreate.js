define('lodash/internal/baseCreate', ['exports', 'lodash/lang/isObject'], function (exports, _lodashLangIsObject) {
  'use strict';

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function () {
    function object() {}
    return function (prototype) {
      if ((0, _lodashLangIsObject['default'])(prototype)) {
        object.prototype = prototype;
        var result = new object();
        object.prototype = undefined;
      }
      return result || {};
    };
  })();

  exports['default'] = baseCreate;
});