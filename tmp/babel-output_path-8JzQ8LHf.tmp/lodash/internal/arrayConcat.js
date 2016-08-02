define("lodash/internal/arrayConcat", ["exports"], function (exports) {
  /**
   * Creates a new array joining `array` with `other`.
   *
   * @private
   * @param {Array} array The array to join.
   * @param {Array} other The other array to join.
   * @returns {Array} Returns the new concatenated array.
   */
  "use strict";

  function arrayConcat(array, other) {
    var index = -1,
        length = array.length,
        othIndex = -1,
        othLength = other.length,
        result = Array(length + othLength);

    while (++index < length) {
      result[index] = array[index];
    }
    while (++othIndex < othLength) {
      result[index++] = other[othIndex];
    }
    return result;
  }

  exports["default"] = arrayConcat;
});