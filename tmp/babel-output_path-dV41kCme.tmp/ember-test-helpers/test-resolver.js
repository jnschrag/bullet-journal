define('ember-test-helpers/test-resolver', ['exports'], function (exports) {
  'use strict';

  exports.setResolver = setResolver;
  exports.getResolver = getResolver;
  var __resolver__;

  function setResolver(resolver) {
    __resolver__ = resolver;
  }

  function getResolver() {
    if (__resolver__ == null) {
      throw new Error('you must set a resolver with `testResolver.set(resolver)`');
    }

    return __resolver__;
  }
});