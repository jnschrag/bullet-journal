
export default cloneNull;
import EmptyObject from "ember-data/-private/system/empty-object";
function cloneNull(source) {
  var clone = new EmptyObject();
  for (var key in source) {
    clone[key] = source[key];
  }
  return clone;
}