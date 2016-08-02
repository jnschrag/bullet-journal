define('ember-data/adapters/errors', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateFeatures) {
  'use strict';

  exports.AdapterError = AdapterError;
  exports.errorsHashToArray = errorsHashToArray;
  exports.errorsArrayToHash = errorsArrayToHash;

  var EmberError = _ember['default'].Error;

  var SOURCE_POINTER_REGEXP = /^\/?data\/(attributes|relationships)\/(.*)/;
  var SOURCE_POINTER_PRIMARY_REGEXP = /^\/?data/;
  var PRIMARY_ATTRIBUTE_KEY = 'base';

  /**
    @class AdapterError
    @namespace DS
  */

  function AdapterError(errors) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Adapter operation failed' : arguments[1];

    this.isAdapterError = true;
    EmberError.call(this, message);

    this.errors = errors || [{
      title: 'Adapter Error',
      detail: message
    }];
  }

  var extendedErrorsEnabled = false;
  if (false) {
    extendedErrorsEnabled = true;
  }

  function extendFn(ErrorClass) {
    return function () {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var defaultMessage = _ref.message;

      return extend(ErrorClass, defaultMessage);
    };
  }

  function extend(ParentErrorClass, defaultMessage) {
    var ErrorClass = function ErrorClass(errors, message) {
      (0, _emberDataPrivateDebug.assert)('`AdapterError` expects json-api formatted errors array.', Array.isArray(errors || []));
      ParentErrorClass.call(this, errors, message || defaultMessage);
    };
    ErrorClass.prototype = Object.create(ParentErrorClass.prototype);

    if (extendedErrorsEnabled) {
      ErrorClass.extend = extendFn(ErrorClass);
    }

    return ErrorClass;
  }

  AdapterError.prototype = Object.create(EmberError.prototype);

  if (extendedErrorsEnabled) {
    AdapterError.extend = extendFn(AdapterError);
  }

  /**
    A `DS.InvalidError` is used by an adapter to signal the external API
    was unable to process a request because the content was not
    semantically correct or meaningful per the API. Usually this means a
    record failed some form of server side validation. When a promise
    from an adapter is rejected with a `DS.InvalidError` the record will
    transition to the `invalid` state and the errors will be set to the
    `errors` property on the record.
  
    For Ember Data to correctly map errors to their corresponding
    properties on the model, Ember Data expects each error to be
    a valid json-api error object with a `source/pointer` that matches
    the property name. For example if you had a Post model that
    looked like this.
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      title: DS.attr('string'),
      content: DS.attr('string')
    });
    ```
  
    To show an error from the server related to the `title` and
    `content` properties your adapter could return a promise that
    rejects with a `DS.InvalidError` object that looks like this:
  
    ```app/adapters/post.js
    import Ember from 'ember';
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      updateRecord: function() {
        // Fictional adapter that always rejects
        return Ember.RSVP.reject(new DS.InvalidError([
          {
            detail: 'Must be unique',
            source: { pointer: '/data/attributes/title' }
          },
          {
            detail: 'Must not be blank',
            source: { pointer: '/data/attributes/content'}
          }
        ]));
      }
    });
    ```
  
    Your backend may use different property names for your records the
    store will attempt extract and normalize the errors using the
    serializer's `extractErrors` method before the errors get added to
    the the model. As a result, it is safe for the `InvalidError` to
    wrap the error payload unaltered.
  
    @class InvalidError
    @namespace DS
  */
  var InvalidError = extend(AdapterError, 'The adapter rejected the commit because it was invalid');

  exports.InvalidError = InvalidError;

  /**
    @class TimeoutError
    @namespace DS
  */
  var TimeoutError = extend(AdapterError, 'The adapter operation timed out');

  exports.TimeoutError = TimeoutError;

  /**
    @class AbortError
    @namespace DS
  */
  var AbortError = extend(AdapterError, 'The adapter operation was aborted');

  exports.AbortError = AbortError;

  /**
    @class UnauthorizedError
    @namespace DS
  */
  var UnauthorizedError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation is unauthorized') : null;

  exports.UnauthorizedError = UnauthorizedError;

  /**
    @class ForbiddenError
    @namespace DS
  */
  var ForbiddenError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation is forbidden') : null;

  exports.ForbiddenError = ForbiddenError;

  /**
    @class NotFoundError
    @namespace DS
  */
  var NotFoundError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter could not find the resource') : null;

  exports.NotFoundError = NotFoundError;

  /**
    @class ConflictError
    @namespace DS
  */
  var ConflictError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation failed due to a conflict') : null;

  exports.ConflictError = ConflictError;

  /**
    @class ServerError
    @namespace DS
  */
  var ServerError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation failed due to a server error') : null;

  exports.ServerError = ServerError;

  /**
    @method errorsHashToArray
    @private
  */

  function errorsHashToArray(errors) {
    var out = [];

    if (_ember['default'].isPresent(errors)) {
      Object.keys(errors).forEach(function (key) {
        var messages = _ember['default'].makeArray(errors[key]);
        for (var i = 0; i < messages.length; i++) {
          var title = 'Invalid Attribute';
          var pointer = '/data/attributes/' + key;
          if (key === PRIMARY_ATTRIBUTE_KEY) {
            title = 'Invalid Document';
            pointer = '/data';
          }
          out.push({
            title: title,
            detail: messages[i],
            source: {
              pointer: pointer
            }
          });
        }
      });
    }

    return out;
  }

  /**
    @method errorsArrayToHash
    @private
  */

  function errorsArrayToHash(errors) {
    var out = {};

    if (_ember['default'].isPresent(errors)) {
      errors.forEach(function (error) {
        if (error.source && error.source.pointer) {
          var key = error.source.pointer.match(SOURCE_POINTER_REGEXP);

          if (key) {
            key = key[2];
          } else if (error.source.pointer.search(SOURCE_POINTER_PRIMARY_REGEXP) !== -1) {
            key = PRIMARY_ATTRIBUTE_KEY;
          }

          if (key) {
            out[key] = out[key] || [];
            out[key].push(error.detail || error.title);
          }
        }
      });
    }

    return out;
  }
});