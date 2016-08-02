'use strict';

var expect = require('chai').expect;
var findSatisfyingVersions = require('../lib/find-satisfying-versions');

describe('lib/find-satisfying-versions', function() {

  it('returns versions that satisfy the semver string', function() {
    var versions = findSatisfyingVersions(['1.13.0', '1.11.2', '4.0.0'], '< 4.0.0');
    expect(versions).to.eql(['1.13.0', '1.11.2']);
  });

  it('handles invalid versions', function() {
    var versions = findSatisfyingVersions(['1.13.0', '1.11.2', 'garbage'], '< 4.0.0');
    expect(versions).to.eql(['1.13.0', '1.11.2']);
  });

  it('limits to the latest point release of each satisfying minor version', function() {
    var availableVersions = [
      '1.0.1',
      '1.0.2',
      '1.1.0',
      '1.2.15',
      '1.3.4',
      '1.3.5',
      '1.3.6',
      '1.4.1',
      '1.5.0'
    ];
    var versions = findSatisfyingVersions(availableVersions, '< 1.2.0 || 1.2.15 || > 1.3.0 < 1.5.0');
    expect(versions).to.eql(['1.0.2', '1.1.0', '1.2.15', '1.3.6', '1.4.1']);
  });
});
