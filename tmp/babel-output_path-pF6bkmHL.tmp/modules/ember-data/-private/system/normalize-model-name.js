
export default normalizeModelName;
import Ember from 'ember';

/**
  All modelNames are dasherized internally. Changing this function may
  require changes to other normalization hooks (such as typeForRoot).
  @method normalizeModelName
  @public
  @param {String} modelName
  @return {String} if the adapter can generate one, an ID
  @for DS
*/
function normalizeModelName(modelName) {
  return Ember.String.dasherize(modelName);
}