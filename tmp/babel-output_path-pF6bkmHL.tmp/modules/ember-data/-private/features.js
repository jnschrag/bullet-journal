

export default isEnabled;
import Ember from 'ember';
function isEnabled() {
  var _Ember$FEATURES;

  return (_Ember$FEATURES = Ember.FEATURES).isEnabled.apply(_Ember$FEATURES, arguments);
}