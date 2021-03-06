"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMockListener = exports["default"] = void 0;
exports.setMockResponses = setMockResponses;

var _global = _interopRequireDefault(require("../Transport/global.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var listener;

var setMockListener = function setMockListener(func) {
  listener = func;
};

exports.setMockListener = setMockListener;
var mock;
var pending = [];
var eventMap = {};
var callback;
var testHarness;

if (_global["default"].__firebolt && _global["default"].__firebolt.testHarness) {
  testHarness = _global["default"].__firebolt.testHarness;
}

function send(message) {
  console.debug('Sending message to transport: ' + message);
  var json = JSON.parse(message); // handle bulk sends

  if (Array.isArray(json)) {
    json.forEach(function (j) {
      return send(JSON.stringify(j));
    });
    return;
  }

  var _json$method$split = json.method.split('.'),
      _json$method$split2 = _slicedToArray(_json$method$split, 2),
      module = _json$method$split2[0],
      method = _json$method$split2[1];

  if (testHarness && testHarness.onSend) {
    testHarness.onSend(module, method, json.params, json.id);
  } // store the ID of the first listen for each event


  if (method.match(/^on[A-Z]/)) {
    if (json.params.listen) {
      eventMap[json.id] = module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3);
    } else {
      Object.keys(eventMap).forEach(function (key) {
        if (eventMap[key] === module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3)) {
          delete eventMap[key];
        }
      });
    }
  }

  if (mock) handle(json);else pending.push(json);
}

function handle(json) {
  var result;

  try {
    result = getResult(json.method, json.params);
  } catch (error) {
    setTimeout(function () {
      return callback(JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32602,
          message: "Invalid params (this is a mock error from the mock transport layer)"
        },
        id: json.id
      }));
    });
  }

  setTimeout(function () {
    return callback(JSON.stringify({
      jsonrpc: '2.0',
      result: result,
      id: json.id
    }));
  });
}

function receive(_callback) {
  callback = _callback;

  if (testHarness && typeof testHarness.initialize === 'function') {
    testHarness.initialize({
      emit: event,
      listen: function listen() {
        listener.apply(void 0, arguments);
      }
    });
  }
}

function event(module, event, value) {
  var listener = Object.entries(eventMap).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return v.toLowerCase() === module.toLowerCase() + '.' + event.toLowerCase();
  });

  if (listener) {
    var message = JSON.stringify({
      jsonrpc: '2.0',
      id: listener[0],
      result: value
    });
    callback(message);
  }
}

function dotGrab() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var keys = key.split('.');
  var ref = obj;

  for (var i = 0; i < keys.length; i++) {
    ref = ref[keys[i]] || {};
  }

  return ref;
}

function getResult(method, params) {
  var api = dotGrab(mock, method);

  if (method.match(/^[a-zA-Z]+\.on[A-Za-z]+$/)) {
    api = {
      event: method,
      listening: true
    };
  }

  if (typeof api === 'function') {
    return params == null ? api() : api(params);
  } else return api;
}

function setMockResponses(m) {
  mock = m;
  pending.forEach(function (json) {
    return handle(json);
  });
  pending.length = 0;
}

var _default = {
  send: send,
  receive: receive,
  event: event
};
exports["default"] = _default;