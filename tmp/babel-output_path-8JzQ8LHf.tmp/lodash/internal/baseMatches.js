define('lodash/internal/baseMatches', ['exports', 'lodash/internal/baseIsMatch', 'lodash/internal/getMatchData', 'lodash/internal/toObject'], function (exports, _lodashInternalBaseIsMatch, _lodashInternalGetMatchData, _lodashInternalToObject) {
  'use strict';

  /**
   * The base implementation of `_.matches` which does not clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   */
  function baseMatches(source) {
    var matchData = (0, _lodashInternalGetMatchData['default'])(source);
    if (matchData.length == 1 && matchData[0][2]) {
      var key = matchData[0][0],
          value = matchData[0][1];

      return function (object) {
        if (object == null) {
          return false;
        }
        return object[key] === value && (value !== undefined || key in (0, _lodashInternalToObject['default'])(object));
      };
    }
    return function (object) {
      return (0, _lodashInternalBaseIsMatch['default'])(object, matchData);
    };
  }

  exports['default'] = baseMatches;
});