define('lodash/number', ['exports', 'lodash/number/inRange', 'lodash/number/random'], function (exports, _lodashNumberInRange, _lodashNumberRandom) {
  'use strict';

  exports['default'] = {
    'inRange': _lodashNumberInRange['default'],
    'random': _lodashNumberRandom['default']
  };
});