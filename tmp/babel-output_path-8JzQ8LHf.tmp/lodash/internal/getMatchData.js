define('lodash/internal/getMatchData', ['exports', 'lodash/internal/isStrictComparable', 'lodash/object/pairs'], function (exports, _lodashInternalIsStrictComparable, _lodashObjectPairs) {
  'use strict';

  /**
   * Gets the propery names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = (0, _lodashObjectPairs['default'])(object),
        length = result.length;

    while (length--) {
      result[length][2] = (0, _lodashInternalIsStrictComparable['default'])(result[length][1]);
    }
    return result;
  }

  exports['default'] = getMatchData;
});