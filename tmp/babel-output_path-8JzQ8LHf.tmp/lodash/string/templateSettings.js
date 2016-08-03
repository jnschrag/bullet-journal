define('lodash/string/templateSettings', ['exports', 'lodash/string/escape', 'lodash/internal/reEscape', 'lodash/internal/reEvaluate', 'lodash/internal/reInterpolate'], function (exports, _lodashStringEscape, _lodashInternalReEscape, _lodashInternalReEvaluate, _lodashInternalReInterpolate) {
  'use strict';

  /**
   * By default, the template delimiters used by lodash are like those in
   * embedded Ruby (ERB). Change the following template settings to use
   * alternative delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  var templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': _lodashInternalReEscape['default'],

    /**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': _lodashInternalReEvaluate['default'],

    /**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': _lodashInternalReInterpolate['default'],

    /**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type string
     */
    'variable': '',

    /**
     * Used to import variables into the compiled template.
     *
     * @memberOf _.templateSettings
     * @type Object
     */
    'imports': {

      /**
       * A reference to the `lodash` function.
       *
       * @memberOf _.templateSettings.imports
       * @type Function
       */
      '_': { 'escape': _lodashStringEscape['default'] }
    }
  };

  exports['default'] = templateSettings;
});