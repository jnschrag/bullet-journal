'use strict';
var fetch = require('node-fetch');
var RSVP = require('rsvp');

fetch.Promise = RSVP.Promise;

module.exports = function fetchEmberVersionsFromGithub(options) {
  options = options || {};
  var get = options.fetch || fetch;
  return get('https://api.github.com/repos/components/ember/tags?per_page=30', { timeout: 1000 })
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      return json.map(function(tag) {
        return tag.name;
      });
    }).catch(function(err) {
      if (options.logErrors) {
        console.log(err);
      }
      return [];
    });
};
