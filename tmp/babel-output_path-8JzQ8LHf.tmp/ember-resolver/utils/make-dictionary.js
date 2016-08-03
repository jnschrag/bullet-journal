define('ember-resolver/utils/make-dictionary', ['exports', 'ember-resolver/utils/create'], function (exports, _emberResolverUtilsCreate) {
  'use strict';

  exports['default'] = makeDictionary;

  function makeDictionary() {
    var cache = (0, _emberResolverUtilsCreate['default'])(null);
    cache['_dict'] = null;
    delete cache['_dict'];
    return cache;
  }
});