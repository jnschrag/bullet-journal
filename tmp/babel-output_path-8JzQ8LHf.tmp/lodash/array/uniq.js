define('lodash/array/uniq', ['exports', 'lodash/internal/baseCallback', 'lodash/internal/baseUniq', 'lodash/internal/isIterateeCall', 'lodash/internal/sortedUniq'], function (exports, _lodashInternalBaseCallback, _lodashInternalBaseUniq, _lodashInternalIsIterateeCall, _lodashInternalSortedUniq) {
  'use strict';

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurence of each element
   * is kept. Providing `true` for `isSorted` performs a faster search algorithm
   * for sorted arrays. If an iteratee function is provided it's invoked for
   * each element in the array to generate the criterion by which uniqueness
   * is computed. The `iteratee` is bound to `thisArg` and invoked with three
   * arguments: (value, index, array).
   *
   * If a property name is provided for `iteratee` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `iteratee` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {boolean} [isSorted] Specify the array is sorted.
   * @param {Function|Object|string} [iteratee] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array} Returns the new duplicate-value-free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   *
   * // using `isSorted`
   * _.uniq([1, 1, 2], true);
   * // => [1, 2]
   *
   * // using an iteratee function
   * _.uniq([1, 2.5, 1.5, 2], function(n) {
   *   return this.floor(n);
   * }, Math);
   * // => [1, 2.5]
   *
   * // using the `_.property` callback shorthand
   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  function uniq(array, isSorted, iteratee, thisArg) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (isSorted != null && typeof isSorted != 'boolean') {
      thisArg = iteratee;
      iteratee = (0, _lodashInternalIsIterateeCall['default'])(array, isSorted, thisArg) ? undefined : isSorted;
      isSorted = false;
    }
    iteratee = iteratee == null ? iteratee : (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 3);
    return isSorted ? (0, _lodashInternalSortedUniq['default'])(array, iteratee) : (0, _lodashInternalBaseUniq['default'])(array, iteratee);
  }

  exports['default'] = uniq;
});