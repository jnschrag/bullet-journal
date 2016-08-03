var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/* global require, module, URL */
import isFastBoot from './is-fastboot';

var completeUrlRegex = /^(http|https)/;

/*
 * Isomorphic URL parsing
 * Borrowed from
 * http://www.sitepoint.com/url-parsing-isomorphic-javascript/
 */
var isNode = typeof module === 'object' && module.exports;
var url = getUrlModule();

/**
 * Get the node url module or an anchor element
 *
 * @private
 * @return {Object|HTMLAnchorElement} Object to parse urls
 */
function getUrlModule() {
  if (isFastBoot) {
    // ember-fastboot-server provides the node url module as URL global
    return URL;
  }

  if (isNode) {
    return require('url');
  }

  return document.createElement('a');
}

/**
 * Parse a URL string into an object that defines its structure
 *
 * The returned object will have the following properties:
 *
 *   href: the full URL
 *   protocol: the request protocol
 *   hostname: the target for the request
 *   port: the port for the request
 *   pathname: any URL after the host
 *   search: query parameters
 *   hash: the URL hash
 *
 * @private
 * @return {Object} URL structure
 */
function parseUrl(str) {
  var fullObject = undefined;
  if (isNode || isFastBoot) {
    fullObject = url.parse(str);
  } else {
    url.href = str;
    fullObject = url;
  }
  var desiredProps = {};
  desiredProps.href = fullObject.href;
  desiredProps.protocol = fullObject.protocol;
  desiredProps.hostname = fullObject.hostname;
  desiredProps.port = fullObject.port;
  desiredProps.pathname = fullObject.pathname;
  desiredProps.search = fullObject.search;
  desiredProps.hash = fullObject.hash;
  return desiredProps;
}

/**
 * RequestURL
 *
 * Converts a URL string into an object for easy comparison to other URLs
 *
 * @public
 */

var RequestURL = (function () {
  function RequestURL(url) {
    _classCallCheck(this, RequestURL);

    this.url = url;
  }

  _createClass(RequestURL, [{
    key: 'sameHost',
    value: function sameHost(other) {
      var _this = this;

      return ['protocol', 'hostname', 'port'].reduce(function (previous, prop) {
        return previous && _this[prop] === other[prop];
      }, true);
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    },
    set: function set(value) {
      this._url = value;

      var explodedUrl = parseUrl(value);
      for (var prop in explodedUrl) {
        this[prop] = explodedUrl[prop];
      }

      return this._url;
    }
  }, {
    key: 'isComplete',
    get: function get() {
      return this.url.match(completeUrlRegex);
    }
  }]);

  return RequestURL;
})();

export { RequestURL };