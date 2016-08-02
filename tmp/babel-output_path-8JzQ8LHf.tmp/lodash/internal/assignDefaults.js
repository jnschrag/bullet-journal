define("lodash/internal/assignDefaults", ["exports"], function (exports) {
  /**
   * Used by `_.defaults` to customize its `_.assign` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  "use strict";

  function assignDefaults(objectValue, sourceValue) {
    return objectValue === undefined ? sourceValue : objectValue;
  }

  exports["default"] = assignDefaults;
});