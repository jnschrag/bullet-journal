define('ember-resolver/utils/module-registry', ['exports', 'ember'], function (exports, _ember) {
  /*globals requirejs, require */

  'use strict';

  if (typeof requirejs.entries === 'undefined') {
    requirejs.entries = requirejs._eak_seen;
  }

  function ModuleRegistry(entries) {
    this._entries = entries || requirejs.entries;
  }

  ModuleRegistry.prototype.moduleNames = function ModuleRegistry_moduleNames() {
    return (Object.keys || _ember['default'].keys)(this._entries);
  };

  ModuleRegistry.prototype.has = function ModuleRegistry_has(moduleName) {
    return moduleName in this._entries;
  };

  ModuleRegistry.prototype.get = function ModuleRegistry_get(moduleName) {
    var exportName = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];

    var module = require(moduleName);
    return module && module[exportName];
  };

  exports['default'] = ModuleRegistry;
});