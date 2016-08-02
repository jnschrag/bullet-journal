define('lodash/lodash', ['exports', 'lodash/array', 'lodash/chain', 'lodash/collection', 'lodash/date', 'lodash/function', 'lodash/lang', 'lodash/math', 'lodash/number', 'lodash/object', 'lodash/string', 'lodash/utility', 'lodash/internal/LazyWrapper', 'lodash/internal/LodashWrapper', 'lodash/internal/arrayEach', 'lodash/internal/arrayPush', 'lodash/internal/baseCallback', 'lodash/internal/baseForOwn', 'lodash/internal/baseFunctions', 'lodash/internal/baseMatches', 'lodash/internal/createHybridWrapper', 'lodash/utility/identity', 'lodash/lang/isArray', 'lodash/lang/isObject', 'lodash/object/keys', 'lodash/array/last', 'lodash/internal/lazyClone', 'lodash/internal/lazyReverse', 'lodash/internal/lazyValue', 'lodash/chain/lodash', 'lodash/utility/mixin', 'lodash/utility/property', 'lodash/internal/realNames', 'lodash/support', 'lodash/chain/thru'], function (exports, _lodashArray, _lodashChain, _lodashCollection, _lodashDate, _lodashFunction, _lodashLang, _lodashMath, _lodashNumber, _lodashObject, _lodashString, _lodashUtility, _lodashInternalLazyWrapper, _lodashInternalLodashWrapper, _lodashInternalArrayEach, _lodashInternalArrayPush, _lodashInternalBaseCallback, _lodashInternalBaseForOwn, _lodashInternalBaseFunctions, _lodashInternalBaseMatches, _lodashInternalCreateHybridWrapper, _lodashUtilityIdentity, _lodashLangIsArray, _lodashLangIsObject, _lodashObjectKeys, _lodashArrayLast, _lodashInternalLazyClone, _lodashInternalLazyReverse, _lodashInternalLazyValue, _lodashChainLodash, _lodashUtilityMixin, _lodashUtilityProperty, _lodashInternalRealNames, _lodashSupport, _lodashChainThru) {
  /**
   * @license
   * lodash 3.10.1 (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize modern exports="es" -o ./`
   * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Available under MIT license <https://lodash.com/license>
   */
  'use strict';

  /** Used as the semantic version number. */
  var VERSION = '3.10.1';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_KEY_FLAG = 2;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_MAP_FLAG = 2;

  /** Used for native method references. */
  var arrayProto = Array.prototype,
      stringProto = String.prototype;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeFloor = Math.floor,
      nativeMax = Math.max,
      nativeMin = Math.min;

  /** Used as references for `-Infinity` and `Infinity`. */
  var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

  // wrap `_.mixin` so it works when provided only one argument
  var mixin = (function (func) {
    return function (object, source, options) {
      if (options == null) {
        var isObj = (0, _lodashLangIsObject['default'])(source),
            props = isObj && (0, _lodashObjectKeys['default'])(source),
            methodNames = props && props.length && (0, _lodashInternalBaseFunctions['default'])(source, props);

        if (!(methodNames ? methodNames.length : isObj)) {
          options = source;
          source = object;
          object = this;
        }
      }
      return func(object, source, options);
    };
  })(_lodashUtilityMixin['default']);

  // Add functions that return wrapped values when chaining.
  _lodashChainLodash['default'].after = _lodashFunction['default'].after;
  _lodashChainLodash['default'].ary = _lodashFunction['default'].ary;
  _lodashChainLodash['default'].assign = _lodashObject['default'].assign;
  _lodashChainLodash['default'].at = _lodashCollection['default'].at;
  _lodashChainLodash['default'].before = _lodashFunction['default'].before;
  _lodashChainLodash['default'].bind = _lodashFunction['default'].bind;
  _lodashChainLodash['default'].bindAll = _lodashFunction['default'].bindAll;
  _lodashChainLodash['default'].bindKey = _lodashFunction['default'].bindKey;
  _lodashChainLodash['default'].callback = _lodashUtility['default'].callback;
  _lodashChainLodash['default'].chain = _lodashChain['default'].chain;
  _lodashChainLodash['default'].chunk = _lodashArray['default'].chunk;
  _lodashChainLodash['default'].compact = _lodashArray['default'].compact;
  _lodashChainLodash['default'].constant = _lodashUtility['default'].constant;
  _lodashChainLodash['default'].countBy = _lodashCollection['default'].countBy;
  _lodashChainLodash['default'].create = _lodashObject['default'].create;
  _lodashChainLodash['default'].curry = _lodashFunction['default'].curry;
  _lodashChainLodash['default'].curryRight = _lodashFunction['default'].curryRight;
  _lodashChainLodash['default'].debounce = _lodashFunction['default'].debounce;
  _lodashChainLodash['default'].defaults = _lodashObject['default'].defaults;
  _lodashChainLodash['default'].defaultsDeep = _lodashObject['default'].defaultsDeep;
  _lodashChainLodash['default'].defer = _lodashFunction['default'].defer;
  _lodashChainLodash['default'].delay = _lodashFunction['default'].delay;
  _lodashChainLodash['default'].difference = _lodashArray['default'].difference;
  _lodashChainLodash['default'].drop = _lodashArray['default'].drop;
  _lodashChainLodash['default'].dropRight = _lodashArray['default'].dropRight;
  _lodashChainLodash['default'].dropRightWhile = _lodashArray['default'].dropRightWhile;
  _lodashChainLodash['default'].dropWhile = _lodashArray['default'].dropWhile;
  _lodashChainLodash['default'].fill = _lodashArray['default'].fill;
  _lodashChainLodash['default'].filter = _lodashCollection['default'].filter;
  _lodashChainLodash['default'].flatten = _lodashArray['default'].flatten;
  _lodashChainLodash['default'].flattenDeep = _lodashArray['default'].flattenDeep;
  _lodashChainLodash['default'].flow = _lodashFunction['default'].flow;
  _lodashChainLodash['default'].flowRight = _lodashFunction['default'].flowRight;
  _lodashChainLodash['default'].forEach = _lodashCollection['default'].forEach;
  _lodashChainLodash['default'].forEachRight = _lodashCollection['default'].forEachRight;
  _lodashChainLodash['default'].forIn = _lodashObject['default'].forIn;
  _lodashChainLodash['default'].forInRight = _lodashObject['default'].forInRight;
  _lodashChainLodash['default'].forOwn = _lodashObject['default'].forOwn;
  _lodashChainLodash['default'].forOwnRight = _lodashObject['default'].forOwnRight;
  _lodashChainLodash['default'].functions = _lodashObject['default'].functions;
  _lodashChainLodash['default'].groupBy = _lodashCollection['default'].groupBy;
  _lodashChainLodash['default'].indexBy = _lodashCollection['default'].indexBy;
  _lodashChainLodash['default'].initial = _lodashArray['default'].initial;
  _lodashChainLodash['default'].intersection = _lodashArray['default'].intersection;
  _lodashChainLodash['default'].invert = _lodashObject['default'].invert;
  _lodashChainLodash['default'].invoke = _lodashCollection['default'].invoke;
  _lodashChainLodash['default'].keys = _lodashObjectKeys['default'];
  _lodashChainLodash['default'].keysIn = _lodashObject['default'].keysIn;
  _lodashChainLodash['default'].map = _lodashCollection['default'].map;
  _lodashChainLodash['default'].mapKeys = _lodashObject['default'].mapKeys;
  _lodashChainLodash['default'].mapValues = _lodashObject['default'].mapValues;
  _lodashChainLodash['default'].matches = _lodashUtility['default'].matches;
  _lodashChainLodash['default'].matchesProperty = _lodashUtility['default'].matchesProperty;
  _lodashChainLodash['default'].memoize = _lodashFunction['default'].memoize;
  _lodashChainLodash['default'].merge = _lodashObject['default'].merge;
  _lodashChainLodash['default'].method = _lodashUtility['default'].method;
  _lodashChainLodash['default'].methodOf = _lodashUtility['default'].methodOf;
  _lodashChainLodash['default'].mixin = mixin;
  _lodashChainLodash['default'].modArgs = _lodashFunction['default'].modArgs;
  _lodashChainLodash['default'].negate = _lodashFunction['default'].negate;
  _lodashChainLodash['default'].omit = _lodashObject['default'].omit;
  _lodashChainLodash['default'].once = _lodashFunction['default'].once;
  _lodashChainLodash['default'].pairs = _lodashObject['default'].pairs;
  _lodashChainLodash['default'].partial = _lodashFunction['default'].partial;
  _lodashChainLodash['default'].partialRight = _lodashFunction['default'].partialRight;
  _lodashChainLodash['default'].partition = _lodashCollection['default'].partition;
  _lodashChainLodash['default'].pick = _lodashObject['default'].pick;
  _lodashChainLodash['default'].pluck = _lodashCollection['default'].pluck;
  _lodashChainLodash['default'].property = _lodashUtilityProperty['default'];
  _lodashChainLodash['default'].propertyOf = _lodashUtility['default'].propertyOf;
  _lodashChainLodash['default'].pull = _lodashArray['default'].pull;
  _lodashChainLodash['default'].pullAt = _lodashArray['default'].pullAt;
  _lodashChainLodash['default'].range = _lodashUtility['default'].range;
  _lodashChainLodash['default'].rearg = _lodashFunction['default'].rearg;
  _lodashChainLodash['default'].reject = _lodashCollection['default'].reject;
  _lodashChainLodash['default'].remove = _lodashArray['default'].remove;
  _lodashChainLodash['default'].rest = _lodashArray['default'].rest;
  _lodashChainLodash['default'].restParam = _lodashFunction['default'].restParam;
  _lodashChainLodash['default'].set = _lodashObject['default'].set;
  _lodashChainLodash['default'].shuffle = _lodashCollection['default'].shuffle;
  _lodashChainLodash['default'].slice = _lodashArray['default'].slice;
  _lodashChainLodash['default'].sortBy = _lodashCollection['default'].sortBy;
  _lodashChainLodash['default'].sortByAll = _lodashCollection['default'].sortByAll;
  _lodashChainLodash['default'].sortByOrder = _lodashCollection['default'].sortByOrder;
  _lodashChainLodash['default'].spread = _lodashFunction['default'].spread;
  _lodashChainLodash['default'].take = _lodashArray['default'].take;
  _lodashChainLodash['default'].takeRight = _lodashArray['default'].takeRight;
  _lodashChainLodash['default'].takeRightWhile = _lodashArray['default'].takeRightWhile;
  _lodashChainLodash['default'].takeWhile = _lodashArray['default'].takeWhile;
  _lodashChainLodash['default'].tap = _lodashChain['default'].tap;
  _lodashChainLodash['default'].throttle = _lodashFunction['default'].throttle;
  _lodashChainLodash['default'].thru = _lodashChainThru['default'];
  _lodashChainLodash['default'].times = _lodashUtility['default'].times;
  _lodashChainLodash['default'].toArray = _lodashLang['default'].toArray;
  _lodashChainLodash['default'].toPlainObject = _lodashLang['default'].toPlainObject;
  _lodashChainLodash['default'].transform = _lodashObject['default'].transform;
  _lodashChainLodash['default'].union = _lodashArray['default'].union;
  _lodashChainLodash['default'].uniq = _lodashArray['default'].uniq;
  _lodashChainLodash['default'].unzip = _lodashArray['default'].unzip;
  _lodashChainLodash['default'].unzipWith = _lodashArray['default'].unzipWith;
  _lodashChainLodash['default'].values = _lodashObject['default'].values;
  _lodashChainLodash['default'].valuesIn = _lodashObject['default'].valuesIn;
  _lodashChainLodash['default'].where = _lodashCollection['default'].where;
  _lodashChainLodash['default'].without = _lodashArray['default'].without;
  _lodashChainLodash['default'].wrap = _lodashFunction['default'].wrap;
  _lodashChainLodash['default'].xor = _lodashArray['default'].xor;
  _lodashChainLodash['default'].zip = _lodashArray['default'].zip;
  _lodashChainLodash['default'].zipObject = _lodashArray['default'].zipObject;
  _lodashChainLodash['default'].zipWith = _lodashArray['default'].zipWith;

  // Add aliases.
  _lodashChainLodash['default'].backflow = _lodashFunction['default'].flowRight;
  _lodashChainLodash['default'].collect = _lodashCollection['default'].map;
  _lodashChainLodash['default'].compose = _lodashFunction['default'].flowRight;
  _lodashChainLodash['default'].each = _lodashCollection['default'].forEach;
  _lodashChainLodash['default'].eachRight = _lodashCollection['default'].forEachRight;
  _lodashChainLodash['default'].extend = _lodashObject['default'].assign;
  _lodashChainLodash['default'].iteratee = _lodashUtility['default'].callback;
  _lodashChainLodash['default'].methods = _lodashObject['default'].functions;
  _lodashChainLodash['default'].object = _lodashArray['default'].zipObject;
  _lodashChainLodash['default'].select = _lodashCollection['default'].filter;
  _lodashChainLodash['default'].tail = _lodashArray['default'].rest;
  _lodashChainLodash['default'].unique = _lodashArray['default'].uniq;

  // Add functions to `lodash.prototype`.
  mixin(_lodashChainLodash['default'], _lodashChainLodash['default']);

  // Add functions that return unwrapped values when chaining.
  _lodashChainLodash['default'].add = _lodashMath['default'].add;
  _lodashChainLodash['default'].attempt = _lodashUtility['default'].attempt;
  _lodashChainLodash['default'].camelCase = _lodashString['default'].camelCase;
  _lodashChainLodash['default'].capitalize = _lodashString['default'].capitalize;
  _lodashChainLodash['default'].ceil = _lodashMath['default'].ceil;
  _lodashChainLodash['default'].clone = _lodashLang['default'].clone;
  _lodashChainLodash['default'].cloneDeep = _lodashLang['default'].cloneDeep;
  _lodashChainLodash['default'].deburr = _lodashString['default'].deburr;
  _lodashChainLodash['default'].endsWith = _lodashString['default'].endsWith;
  _lodashChainLodash['default'].escape = _lodashString['default'].escape;
  _lodashChainLodash['default'].escapeRegExp = _lodashString['default'].escapeRegExp;
  _lodashChainLodash['default'].every = _lodashCollection['default'].every;
  _lodashChainLodash['default'].find = _lodashCollection['default'].find;
  _lodashChainLodash['default'].findIndex = _lodashArray['default'].findIndex;
  _lodashChainLodash['default'].findKey = _lodashObject['default'].findKey;
  _lodashChainLodash['default'].findLast = _lodashCollection['default'].findLast;
  _lodashChainLodash['default'].findLastIndex = _lodashArray['default'].findLastIndex;
  _lodashChainLodash['default'].findLastKey = _lodashObject['default'].findLastKey;
  _lodashChainLodash['default'].findWhere = _lodashCollection['default'].findWhere;
  _lodashChainLodash['default'].first = _lodashArray['default'].first;
  _lodashChainLodash['default'].floor = _lodashMath['default'].floor;
  _lodashChainLodash['default'].get = _lodashObject['default'].get;
  _lodashChainLodash['default'].gt = _lodashLang['default'].gt;
  _lodashChainLodash['default'].gte = _lodashLang['default'].gte;
  _lodashChainLodash['default'].has = _lodashObject['default'].has;
  _lodashChainLodash['default'].identity = _lodashUtilityIdentity['default'];
  _lodashChainLodash['default'].includes = _lodashCollection['default'].includes;
  _lodashChainLodash['default'].indexOf = _lodashArray['default'].indexOf;
  _lodashChainLodash['default'].inRange = _lodashNumber['default'].inRange;
  _lodashChainLodash['default'].isArguments = _lodashLang['default'].isArguments;
  _lodashChainLodash['default'].isArray = _lodashLangIsArray['default'];
  _lodashChainLodash['default'].isBoolean = _lodashLang['default'].isBoolean;
  _lodashChainLodash['default'].isDate = _lodashLang['default'].isDate;
  _lodashChainLodash['default'].isElement = _lodashLang['default'].isElement;
  _lodashChainLodash['default'].isEmpty = _lodashLang['default'].isEmpty;
  _lodashChainLodash['default'].isEqual = _lodashLang['default'].isEqual;
  _lodashChainLodash['default'].isError = _lodashLang['default'].isError;
  _lodashChainLodash['default'].isFinite = _lodashLang['default'].isFinite;
  _lodashChainLodash['default'].isFunction = _lodashLang['default'].isFunction;
  _lodashChainLodash['default'].isMatch = _lodashLang['default'].isMatch;
  _lodashChainLodash['default'].isNaN = _lodashLang['default'].isNaN;
  _lodashChainLodash['default'].isNative = _lodashLang['default'].isNative;
  _lodashChainLodash['default'].isNull = _lodashLang['default'].isNull;
  _lodashChainLodash['default'].isNumber = _lodashLang['default'].isNumber;
  _lodashChainLodash['default'].isObject = _lodashLangIsObject['default'];
  _lodashChainLodash['default'].isPlainObject = _lodashLang['default'].isPlainObject;
  _lodashChainLodash['default'].isRegExp = _lodashLang['default'].isRegExp;
  _lodashChainLodash['default'].isString = _lodashLang['default'].isString;
  _lodashChainLodash['default'].isTypedArray = _lodashLang['default'].isTypedArray;
  _lodashChainLodash['default'].isUndefined = _lodashLang['default'].isUndefined;
  _lodashChainLodash['default'].kebabCase = _lodashString['default'].kebabCase;
  _lodashChainLodash['default'].last = _lodashArrayLast['default'];
  _lodashChainLodash['default'].lastIndexOf = _lodashArray['default'].lastIndexOf;
  _lodashChainLodash['default'].lt = _lodashLang['default'].lt;
  _lodashChainLodash['default'].lte = _lodashLang['default'].lte;
  _lodashChainLodash['default'].max = _lodashMath['default'].max;
  _lodashChainLodash['default'].min = _lodashMath['default'].min;
  _lodashChainLodash['default'].noop = _lodashUtility['default'].noop;
  _lodashChainLodash['default'].now = _lodashDate['default'].now;
  _lodashChainLodash['default'].pad = _lodashString['default'].pad;
  _lodashChainLodash['default'].padLeft = _lodashString['default'].padLeft;
  _lodashChainLodash['default'].padRight = _lodashString['default'].padRight;
  _lodashChainLodash['default'].parseInt = _lodashString['default'].parseInt;
  _lodashChainLodash['default'].random = _lodashNumber['default'].random;
  _lodashChainLodash['default'].reduce = _lodashCollection['default'].reduce;
  _lodashChainLodash['default'].reduceRight = _lodashCollection['default'].reduceRight;
  _lodashChainLodash['default'].repeat = _lodashString['default'].repeat;
  _lodashChainLodash['default'].result = _lodashObject['default'].result;
  _lodashChainLodash['default'].round = _lodashMath['default'].round;
  _lodashChainLodash['default'].size = _lodashCollection['default'].size;
  _lodashChainLodash['default'].snakeCase = _lodashString['default'].snakeCase;
  _lodashChainLodash['default'].some = _lodashCollection['default'].some;
  _lodashChainLodash['default'].sortedIndex = _lodashArray['default'].sortedIndex;
  _lodashChainLodash['default'].sortedLastIndex = _lodashArray['default'].sortedLastIndex;
  _lodashChainLodash['default'].startCase = _lodashString['default'].startCase;
  _lodashChainLodash['default'].startsWith = _lodashString['default'].startsWith;
  _lodashChainLodash['default'].sum = _lodashMath['default'].sum;
  _lodashChainLodash['default'].template = _lodashString['default'].template;
  _lodashChainLodash['default'].trim = _lodashString['default'].trim;
  _lodashChainLodash['default'].trimLeft = _lodashString['default'].trimLeft;
  _lodashChainLodash['default'].trimRight = _lodashString['default'].trimRight;
  _lodashChainLodash['default'].trunc = _lodashString['default'].trunc;
  _lodashChainLodash['default'].unescape = _lodashString['default'].unescape;
  _lodashChainLodash['default'].uniqueId = _lodashUtility['default'].uniqueId;
  _lodashChainLodash['default'].words = _lodashString['default'].words;

  // Add aliases.
  _lodashChainLodash['default'].all = _lodashCollection['default'].every;
  _lodashChainLodash['default'].any = _lodashCollection['default'].some;
  _lodashChainLodash['default'].contains = _lodashCollection['default'].includes;
  _lodashChainLodash['default'].eq = _lodashLang['default'].isEqual;
  _lodashChainLodash['default'].detect = _lodashCollection['default'].find;
  _lodashChainLodash['default'].foldl = _lodashCollection['default'].reduce;
  _lodashChainLodash['default'].foldr = _lodashCollection['default'].reduceRight;
  _lodashChainLodash['default'].head = _lodashArray['default'].first;
  _lodashChainLodash['default'].include = _lodashCollection['default'].includes;
  _lodashChainLodash['default'].inject = _lodashCollection['default'].reduce;

  mixin(_lodashChainLodash['default'], (function () {
    var source = {};
    (0, _lodashInternalBaseForOwn['default'])(_lodashChainLodash['default'], function (func, methodName) {
      if (!_lodashChainLodash['default'].prototype[methodName]) {
        source[methodName] = func;
      }
    });
    return source;
  })(), false);

  // Add functions capable of returning wrapped and unwrapped values when chaining.
  _lodashChainLodash['default'].sample = _lodashCollection['default'].sample;

  _lodashChainLodash['default'].prototype.sample = function (n) {
    if (!this.__chain__ && n == null) {
      return _lodashCollection['default'].sample(this.value());
    }
    return this.thru(function (value) {
      return _lodashCollection['default'].sample(value, n);
    });
  };

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
  _lodashChainLodash['default'].VERSION = VERSION;

  _lodashChainLodash['default'].support = _lodashSupport['default'];
  (_lodashChainLodash['default'].templateSettings = _lodashString['default'].templateSettings).imports._ = _lodashChainLodash['default'];

  // Assign default placeholders.
  (0, _lodashInternalArrayEach['default'])(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
    _lodashChainLodash['default'][methodName].placeholder = _lodashChainLodash['default'];
  });

  // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
  (0, _lodashInternalArrayEach['default'])(['drop', 'take'], function (methodName, index) {
    _lodashInternalLazyWrapper['default'].prototype[methodName] = function (n) {
      var filtered = this.__filtered__;
      if (filtered && !index) {
        return new _lodashInternalLazyWrapper['default'](this);
      }
      n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

      var result = this.clone();
      if (filtered) {
        result.__takeCount__ = nativeMin(result.__takeCount__, n);
      } else {
        result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
      }
      return result;
    };

    _lodashInternalLazyWrapper['default'].prototype[methodName + 'Right'] = function (n) {
      return this.reverse()[methodName](n).reverse();
    };
  });

  // Add `LazyWrapper` methods that accept an `iteratee` value.
  (0, _lodashInternalArrayEach['default'])(['filter', 'map', 'takeWhile'], function (methodName, index) {
    var type = index + 1,
        isFilter = type != LAZY_MAP_FLAG;

    _lodashInternalLazyWrapper['default'].prototype[methodName] = function (iteratee, thisArg) {
      var result = this.clone();
      result.__iteratees__.push({ 'iteratee': (0, _lodashInternalBaseCallback['default'])(iteratee, thisArg, 1), 'type': type });
      result.__filtered__ = result.__filtered__ || isFilter;
      return result;
    };
  });

  // Add `LazyWrapper` methods for `_.first` and `_.last`.
  (0, _lodashInternalArrayEach['default'])(['first', 'last'], function (methodName, index) {
    var takeName = 'take' + (index ? 'Right' : '');

    _lodashInternalLazyWrapper['default'].prototype[methodName] = function () {
      return this[takeName](1).value()[0];
    };
  });

  // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
  (0, _lodashInternalArrayEach['default'])(['initial', 'rest'], function (methodName, index) {
    var dropName = 'drop' + (index ? '' : 'Right');

    _lodashInternalLazyWrapper['default'].prototype[methodName] = function () {
      return this.__filtered__ ? new _lodashInternalLazyWrapper['default'](this) : this[dropName](1);
    };
  });

  // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
  (0, _lodashInternalArrayEach['default'])(['pluck', 'where'], function (methodName, index) {
    var operationName = index ? 'filter' : 'map',
        createCallback = index ? _lodashInternalBaseMatches['default'] : _lodashUtilityProperty['default'];

    _lodashInternalLazyWrapper['default'].prototype[methodName] = function (value) {
      return this[operationName](createCallback(value));
    };
  });

  _lodashInternalLazyWrapper['default'].prototype.compact = function () {
    return this.filter(_lodashUtilityIdentity['default']);
  };

  _lodashInternalLazyWrapper['default'].prototype.reject = function (predicate, thisArg) {
    predicate = (0, _lodashInternalBaseCallback['default'])(predicate, thisArg, 1);
    return this.filter(function (value) {
      return !predicate(value);
    });
  };

  _lodashInternalLazyWrapper['default'].prototype.slice = function (start, end) {
    start = start == null ? 0 : +start || 0;

    var result = this;
    if (result.__filtered__ && (start > 0 || end < 0)) {
      return new _lodashInternalLazyWrapper['default'](result);
    }
    if (start < 0) {
      result = result.takeRight(-start);
    } else if (start) {
      result = result.drop(start);
    }
    if (end !== undefined) {
      end = +end || 0;
      result = end < 0 ? result.dropRight(-end) : result.take(end - start);
    }
    return result;
  };

  _lodashInternalLazyWrapper['default'].prototype.takeRightWhile = function (predicate, thisArg) {
    return this.reverse().takeWhile(predicate, thisArg).reverse();
  };

  _lodashInternalLazyWrapper['default'].prototype.toArray = function () {
    return this.take(POSITIVE_INFINITY);
  };

  // Add `LazyWrapper` methods to `lodash.prototype`.
  (0, _lodashInternalBaseForOwn['default'])(_lodashInternalLazyWrapper['default'].prototype, function (func, methodName) {
    var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
        retUnwrapped = /^(?:first|last)$/.test(methodName),
        lodashFunc = _lodashChainLodash['default'][retUnwrapped ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName];

    if (!lodashFunc) {
      return;
    }
    _lodashChainLodash['default'].prototype[methodName] = function () {
      var args = retUnwrapped ? [1] : arguments,
          chainAll = this.__chain__,
          value = this.__wrapped__,
          isHybrid = !!this.__actions__.length,
          isLazy = value instanceof _lodashInternalLazyWrapper['default'],
          iteratee = args[0],
          useLazy = isLazy || (0, _lodashLangIsArray['default'])(value);

      if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
        // Avoid lazy use if the iteratee has a "length" value other than `1`.
        isLazy = useLazy = false;
      }
      var interceptor = function interceptor(value) {
        return retUnwrapped && chainAll ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, (0, _lodashInternalArrayPush['default'])([value], args));
      };

      var action = { 'func': _lodashChainThru['default'], 'args': [interceptor], 'thisArg': undefined },
          onlyLazy = isLazy && !isHybrid;

      if (retUnwrapped && !chainAll) {
        if (onlyLazy) {
          value = value.clone();
          value.__actions__.push(action);
          return func.call(value);
        }
        return lodashFunc.call(undefined, this.value())[0];
      }
      if (!retUnwrapped && useLazy) {
        value = onlyLazy ? value : new _lodashInternalLazyWrapper['default'](this);
        var result = func.apply(value, args);
        result.__actions__.push(action);
        return new _lodashInternalLodashWrapper['default'](result, chainAll);
      }
      return this.thru(interceptor);
    };
  });

  // Add `Array` and `String` methods to `lodash.prototype`.
  (0, _lodashInternalArrayEach['default'])(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function (methodName) {
    var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
        retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

    _lodashChainLodash['default'].prototype[methodName] = function () {
      var args = arguments;
      if (retUnwrapped && !this.__chain__) {
        return func.apply(this.value(), args);
      }
      return this[chainName](function (value) {
        return func.apply(value, args);
      });
    };
  });

  // Map minified function names to their real names.
  (0, _lodashInternalBaseForOwn['default'])(_lodashInternalLazyWrapper['default'].prototype, function (func, methodName) {
    var lodashFunc = _lodashChainLodash['default'][methodName];
    if (lodashFunc) {
      var key = lodashFunc.name + '',
          names = _lodashInternalRealNames['default'][key] || (_lodashInternalRealNames['default'][key] = []);

      names.push({ 'name': methodName, 'func': lodashFunc });
    }
  });

  _lodashInternalRealNames['default'][(0, _lodashInternalCreateHybridWrapper['default'])(undefined, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined }];

  // Add functions to the lazy wrapper.
  _lodashInternalLazyWrapper['default'].prototype.clone = _lodashInternalLazyClone['default'];
  _lodashInternalLazyWrapper['default'].prototype.reverse = _lodashInternalLazyReverse['default'];
  _lodashInternalLazyWrapper['default'].prototype.value = _lodashInternalLazyValue['default'];

  // Add chaining functions to the `lodash` wrapper.
  _lodashChainLodash['default'].prototype.chain = _lodashChain['default'].wrapperChain;
  _lodashChainLodash['default'].prototype.commit = _lodashChain['default'].commit;
  _lodashChainLodash['default'].prototype.concat = _lodashChain['default'].concat;
  _lodashChainLodash['default'].prototype.plant = _lodashChain['default'].plant;
  _lodashChainLodash['default'].prototype.reverse = _lodashChain['default'].reverse;
  _lodashChainLodash['default'].prototype.toString = _lodashChain['default'].toString;
  _lodashChainLodash['default'].prototype.run = _lodashChainLodash['default'].prototype.toJSON = _lodashChainLodash['default'].prototype.valueOf = _lodashChainLodash['default'].prototype.value = _lodashChain['default'].value;

  // Add function aliases to the `lodash` wrapper.
  _lodashChainLodash['default'].prototype.collect = _lodashChainLodash['default'].prototype.map;
  _lodashChainLodash['default'].prototype.head = _lodashChainLodash['default'].prototype.first;
  _lodashChainLodash['default'].prototype.select = _lodashChainLodash['default'].prototype.filter;
  _lodashChainLodash['default'].prototype.tail = _lodashChainLodash['default'].prototype.rest;

  exports['default'] = _lodashChainLodash['default'];
});