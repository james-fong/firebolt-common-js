"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireDefault(require("../Events/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function prop(moduleName, key, args, immutable, readonly) {
  if (args.length === 0) {
    // getter
    return _index["default"].send(moduleName, key);
  } else if (args.length === 1 && typeof args[0] === 'function') {
    // subscribe
    if (immutable) {
      throw new Error('Cannot subscribe to an immutable property');
    }

    return _index2["default"].listen(moduleName, key + 'Changed', args[0]);
  } else {
    // setter
    if (immutable) {
      throw new Error('Cannot set a value to an immutable property');
    }

    if (readonly) {
      throw new Error('Cannot set a value to a readonly property');
    }

    return _index["default"].send(moduleName, 'set' + key[0].toUpperCase() + key.substring(1), {
      value: args[0]
    });
  }
}

var _default = {
  prop: prop
};
exports["default"] = _default;