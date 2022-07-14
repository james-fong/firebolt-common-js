"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerProviderInterface = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireDefault(require("../Events/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var providerInterfaces = {};

var registerProviderInterface = function registerProviderInterface(capability, module, methods) {
  if (providerInterfaces[capability]) {
    throw "Capability ".concat(capability, " has multiple provider interfaces registered.");
  }

  methods.forEach(function (m) {
    return m.name = "".concat(module, ".").concat(m.name);
  });
  providerInterfaces[capability] = methods.concat();
};

exports.registerProviderInterface = registerProviderInterface;

var provide = function provide(capability, provider) {
  var methods = [];
  var iface = providerInterfaces[capability];

  if (provider.constructor.name !== 'Object') {
    methods.push.apply(methods, _toConsumableArray(Object.getOwnPropertyNames(Object.getPrototypeOf(provider)).filter(function (item) {
      return typeof provider[item] === 'function' && item !== 'constructor';
    })));
  } else {
    methods.push.apply(methods, _toConsumableArray(Object.getOwnPropertyNames(provider).filter(function (item) {
      return typeof provider[item] === 'function';
    })));
  }

  if (!iface) {
    throw "Ignoring unknown provider capability.";
  } // make sure every interfaced method exists in the providers methods list


  var valid = iface.every(function (method) {
    return methods.find(function (m) {
      return m === method.name.split('.').pop();
    });
  });

  if (!valid) {
    throw "Provider that does not fully implement ".concat(capability, ":\n\t").concat(iface.map(function (m) {
      return m.name.split('.').pop();
    }).join('\n\t'));
  }

  iface.forEach(function (imethod) {
    var parts = imethod.name.split('.');
    var method = parts.pop();
    var module = parts.pop().toLowerCase();
    var defined = !!methods.find(function (m) {
      return m === method;
    });

    if (!defined) {
      return; // returns from this cycle of iface.forEach
    }

    _index2["default"].listen(module, "request".concat(method.charAt(0).toUpperCase() + method.substr(1)), function (request) {
      var providerCallArgs = []; // only pass in parameters object if schema exists

      if (imethod.parameters) {
        providerCallArgs.push(request.parameters);
      } else {
        providerCallArgs.push(null);
      }

      var session = {
        correlationId: function correlationId() {
          return request.correlationId;
        }
      }; // only pass in the focus handshake if needed

      if (imethod.focus) {
        session.focus = function () {
          _index["default"].send(module, "".concat(method, "Focus"), {
            correlationId: request.correlationId
          });
        };
      }

      providerCallArgs.push(session);
      var response = {
        correlationId: request.correlationId
      };
      var result = provider[method].apply(provider, providerCallArgs);

      if (!(result instanceof Promise)) {
        throw "Provider method ".concat(method, " did not return a Promise.");
      }

      result.then(function (result) {
        if (imethod.response) {
          response.result = result;
        }

        _index["default"].send(module, "".concat(method, "Response"), response);
      });
    });
  });
};

var _default = {
  provide: provide
};
exports["default"] = _default;