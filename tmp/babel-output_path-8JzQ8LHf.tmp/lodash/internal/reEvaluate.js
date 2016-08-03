define("lodash/internal/reEvaluate", ["exports"], function (exports) {
  /** Used to match template delimiters. */
  "use strict";

  var reEvaluate = /<%([\s\S]+?)%>/g;

  exports["default"] = reEvaluate;
});