'use strict';

var expect        = require('chai').expect;
var autoScenarioConfigForEmber   = require('../lib/auto-scenario-config-for-ember');

describe('lib/auto-scenario-config-for-ember', function() {

  it('includes default scenarios and works with straight version #', function() {
    return autoScenarioConfigForEmber({ versionCompatibility: { ember: '2.0.0' } }).then(function(config) {
      expect(config.scenarios).to.eql([
        {
          name: 'default',
          bower: {
            dependencies: {}
          }
        },
        {
          name: 'ember-beta',
          allowedToFail: true,
          bower: {
            dependencies: {
              ember: 'components/ember#beta'
            },
            resolutions: {
              ember: 'beta'
            }
          }
        },
        {
          name: 'ember-canary',
          allowedToFail: true,
          bower: {
            dependencies: {
              ember: 'components/ember#canary'
            },
            resolutions: {
              ember: 'canary'
            }
          }
        },
        {
          name: 'ember-2.0.0',
          bower: {
            dependencies: {
              ember: '2.0.0'
            }
          }
        }
      ]);
    });
  });

  it('works with complex semver statement', function() {
    var availableVersions = [
      'v1.0.0',
      'v1.0.5',
      'v1.0.8',
      'v1.0.15',
      'v1.0.16',
      'v1.1.3',
      'v2.0.0',
      '1.13.0',
      'v2.0.0',
      'v2.1.1',
      'v3.0.0',
      'v1.11.0',
      'v1.11.14'
    ];

    return autoScenarioConfigForEmber({ versionCompatibility: { ember: '1.0.5 - 1.0.15 || >= 2.1.0 || ^1.11.0 || 1.1.0 - 2.0.0' }, availableVersions: availableVersions }).then(function(config) {
      expect(config.scenarios).to.deep.include.members(
        [
          { name: 'ember-1.0.15', bower: { dependencies: { ember: '1.0.15' } } },
          { name: 'ember-1.1.3', bower: { dependencies: { ember: '1.1.3' } } },
          { name: 'ember-2.0.0', bower: { dependencies: { ember: '2.0.0' } } },
          { name: 'ember-1.13.0', bower: { dependencies: { ember: '1.13.0' } } },
          { name: 'ember-2.1.1', bower: { dependencies: { ember: '2.1.1' } } },
          { name: 'ember-3.0.0', bower: { dependencies: { ember: '3.0.0' } } },
          { name: 'ember-1.11.14', bower: { dependencies: { ember: '1.11.14' } } }
        ]
      );
    });
  });
});
