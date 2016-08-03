define('ember-ajax/utils/is-fastboot', ['exports'], function (exports) {
  /* global FastBoot */
  'use strict';

  var isFastBoot = typeof FastBoot !== 'undefined';
  exports['default'] = isFastBoot;
});