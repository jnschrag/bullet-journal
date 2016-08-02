define('bullet/tests/test-helper', ['exports', 'bullet/tests/helpers/resolver', 'ember-qunit'], function (exports, _bulletTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_bulletTestsHelpersResolver['default']);
});