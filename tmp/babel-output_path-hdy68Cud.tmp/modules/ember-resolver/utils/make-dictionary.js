

export default makeDictionary;
import create from './create';
function makeDictionary() {
  var cache = create(null);
  cache['_dict'] = null;
  delete cache['_dict'];
  return cache;
}