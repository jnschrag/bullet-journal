define('lodash/internal/metaMap', ['exports', 'lodash/internal/getNative', 'lodash/internal/root'], function (exports, _lodashInternalGetNative, _lodashInternalRoot) {
  'use strict';

  /** Native method references. */
  var WeakMap = (0, _lodashInternalGetNative['default'])(_lodashInternalRoot['default'], 'WeakMap');

  /** Used to store function metadata. */
  var metaMap = WeakMap && new WeakMap();

  exports['default'] = metaMap;
});