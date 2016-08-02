'use strict';

var expect = require('chai').expect;
var getEmberVersions = require('../lib/get-ember-versions');

describe('lib/get-ember-versions', function() {

  it('merges fetched versions with versions known locally', function() {
    return getEmberVersions(['house', 'car', 'truck', '2.0.0']).then(function(versions) {
      expect(versions).to.include.members(['house', 'car', 'truck']);
      expect(versions.length).to.equal(138);
    });
  });
});
