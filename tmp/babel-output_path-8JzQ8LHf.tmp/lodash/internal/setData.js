define('lodash/internal/setData', ['exports', 'lodash/internal/baseSetData', 'lodash/date/now'], function (exports, _lodashInternalBaseSetData, _lodashDateNow) {
  'use strict';

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity function
   * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = (function () {
    var count = 0,
        lastCalled = 0;

    return function (key, value) {
      var stamp = (0, _lodashDateNow['default'])(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return key;
        }
      } else {
        count = 0;
      }
      return (0, _lodashInternalBaseSetData['default'])(key, value);
    };
  })();

  exports['default'] = setData;
});