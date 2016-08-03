export default classFactory;

function classFactory(klass) {
  return {
    create: function create(injections) {
      if (typeof klass.extend === 'function') {
        return klass.extend(injections);
      } else {
        return klass;
      }
    }
  };
}