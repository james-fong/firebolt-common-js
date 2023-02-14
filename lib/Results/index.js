"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
methods = Map<string, {
    x-this-param: 'accessory',
    x-additional-params: ['timeout'],
    x-method: 'Accessory.pair'
}>
*/
function transform(result, transforms) {
  if (!transforms || !transforms.methods) {
    return result;
  }

  var methods = transforms.methods;
  var transformed = JSON.parse(JSON.stringify(result));
  Object.keys(methods).forEach(function (key) {
    var method_info = methods[key];
    var rpc_method = method_info['x-method'];

    var _rpc_method$split = rpc_method.split('.'),
        _rpc_method$split2 = _slicedToArray(_rpc_method$split, 2),
        module = _rpc_method$split2[0],
        method = _rpc_method$split2[1];

    var params = {};
    params[method_info['x-this-param']] = transformed;

    transformed[key] = function () {
      // copy the args into the correct RPC param names
      for (var i = 0; i < arguments.length; i++) {
        params[method_info['x-additional-params'][i]] = i < 0 || arguments.length <= i ? undefined : arguments[i];
      }

      return _index["default"].send(module.toLowerCase(), method, params);
    };
  });
  return transformed;
}

var _default = {
  transform: transform
};
exports["default"] = _default;