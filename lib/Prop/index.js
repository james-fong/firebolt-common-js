"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireDefault(require("../Events/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function prop(moduleName, key, params, callbackOrValue, immutable, readonly, contextParameterCount) {
  var numArgs = Object.values(params).length;

  if (numArgs === contextParameterCount && !callbackOrValue) {
    // getter
    return _index["default"].send(moduleName, key, params);
  } else if (numArgs === contextParameterCount && typeof callbackOrValue === 'function') {
    // subscribe
    if (immutable) {
      throw new Error('Cannot subscribe to an immutable property');
    }

    return _index2["default"].listen(moduleName, key + 'Changed', callbackOrValue);
  } else if (numArgs === contextParameterCount && callbackOrValue) {
    // setter
    if (immutable) {
      throw new Error('Cannot set a value to an immutable property');
    }

    if (readonly) {
      throw new Error('Cannot set a value to a readonly property');
    }

    return _index["default"].send(moduleName, 'set' + key[0].toUpperCase() + key.substring(1), {
      value: callbackOrValue
    });
  } else if (numArgs < contextParameterCount) {
    throw new Error('Cannot get a value without all required context parameters.');
  } else {
    throw new Error('Property accessed with unexpected number of parameters.');
  }
}

var _default = {
  prop: prop
};
exports["default"] = _default;