define('lodash/internal/baseWhile', ['exports', 'lodash/internal/baseSlice'], function (exports, _lodashInternalBaseSlice) {
    'use strict';

    /**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
        return isDrop ? (0, _lodashInternalBaseSlice['default'])(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : (0, _lodashInternalBaseSlice['default'])(array, fromRight ? index + 1 : 0, fromRight ? length : index);
    }

    exports['default'] = baseWhile;
});