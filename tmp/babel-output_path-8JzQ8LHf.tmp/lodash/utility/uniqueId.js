define('lodash/utility/uniqueId', ['exports', 'lodash/internal/baseToString'], function (exports, _lodashInternalBaseToString) {
  'use strict';

  /** Used to generate unique IDs. */
  var idCounter = 0;

  /**
   * Generates a unique ID. If `prefix` is provided the ID is appended to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {string} [prefix] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return (0, _lodashInternalBaseToString['default'])(prefix) + id;
  }

  exports['default'] = uniqueId;
});