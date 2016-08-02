define('lodash/math', ['exports', 'lodash/math/add', 'lodash/math/ceil', 'lodash/math/floor', 'lodash/math/max', 'lodash/math/min', 'lodash/math/round', 'lodash/math/sum'], function (exports, _lodashMathAdd, _lodashMathCeil, _lodashMathFloor, _lodashMathMax, _lodashMathMin, _lodashMathRound, _lodashMathSum) {
  'use strict';

  exports['default'] = {
    'add': _lodashMathAdd['default'],
    'ceil': _lodashMathCeil['default'],
    'floor': _lodashMathFloor['default'],
    'max': _lodashMathMax['default'],
    'min': _lodashMathMin['default'],
    'round': _lodashMathRound['default'],
    'sum': _lodashMathSum['default']
  };
});