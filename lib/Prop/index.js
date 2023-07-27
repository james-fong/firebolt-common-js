"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireDefault(require("../Events/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function prop(moduleName, key, params) {
  var callbackOrValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var immutable = arguments.length > 4 ? arguments[4] : undefined;
  var readonly = arguments.length > 5 ? arguments[5] : undefined;
  var contextParameterCount = arguments.length > 6 ? arguments[6] : undefined;
  var numArgs = Object.values(params).length;

  if (numArgs === contextParameterCount && callbackOrValue === null) {
    // getter
    return _index["default"].send(moduleName, key, params);
  } else if (numArgs === contextParameterCount && typeof callbackOrValue === 'function') {
    // subscribe
    if (immutable) {
      throw new Error('Cannot subscribe to an immutable property');
    }

    return _index2["default"].listen.apply(_index2["default"], [moduleName, key + 'Changed'].concat(_toConsumableArray(Object.values(params)), [callbackOrValue]));
  } else if (numArgs === contextParameterCount && callbackOrValue !== null) {
    // setter
    if (immutable) {
      throw new Error('Cannot set a value to an immutable property');
    }

    if (readonly) {
      throw new Error('Cannot set a value to a readonly property');
    }

    return _index["default"].send(moduleName, 'set' + key[0].toUpperCase() + key.substring(1), Object.assign({
      value: callbackOrValue
    }, params));
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