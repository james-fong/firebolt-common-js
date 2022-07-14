"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MockTransport = _interopRequireDefault(require("../Transport/MockTransport.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mocks = {};

function mock(module, method, args, def) {
  var fullMethod = "".concat(module, ".").concat(method);

  if (args == null || args.length === 0) {
    // get
    var rv = mocks[fullMethod] && mocks[fullMethod].value != null ? mocks[fullMethod].value : def;
    return rv;
  } else {
    // set
    var mockMethod = mocks[fullMethod];

    if (mockMethod == null) {
      mockMethod = {
        subscribers: []
      };
    }

    mocks[fullMethod] = mockMethod;
    mockMethod.value = args[0].value;

    _MockTransport["default"].event(module, method + 'Changed', {
      value: args[0].value
    });

    return {};
  }
}

var _default = {
  mock: mock
};
exports["default"] = _default;