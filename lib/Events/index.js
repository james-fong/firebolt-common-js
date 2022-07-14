"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = exports.emit = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _MockTransport = require("../Transport/MockTransport.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var listenerId = 0; // holds a map of ${module}.${event} => listenerId, e.g. callback method id
// note that one callback can listen to multiple events, e.g. 'discovery.*'

var listeners = {}; // holds a map of ${module}.${event} => Transport.send calls (only called once per event)
// note that the keys here MUST NOT contain wild cards

var enabledEvents = {};
var oncers = [];
var validEvents = {};
var transportInitialized = false;

var emit = function emit(module, event, value) {
  callCallbacks(listeners[module + '.*'], [event, value]);
  callCallbacks(listeners[module + '.' + event], [value]);
};

exports.emit = emit;

var registerEvents = function registerEvents(module, events) {
  validEvents[module.toLowerCase()] = events.concat();
};

exports.registerEvents = registerEvents;

var callCallbacks = function callCallbacks(cbs, args) {
  cbs && Object.keys(cbs).forEach(function (listenerId) {
    var callback = cbs[listenerId];

    if (oncers.indexOf(parseInt(listenerId)) >= 0) {
      oncers.splice(oncers.indexOf(parseInt(listenerId)), 1);
      delete cbs[listenerId];
    }

    callback.apply(null, args);
  });
};

var doListen = function doListen(module, event, callback, once) {
  if (typeof callback !== 'function') {
    return Promise.reject('No valid callback function provided.');
  } else {
    if (module === '*') {
      return Promise.reject('No valid module name provided');
    }

    var events = event === '*' ? validEvents[module] : [event]; // explodes wildcards into an array

    var promises = [];
    var key = module + '.' + event; // this might be a wildcard, e.g. 'lifecycle.*'

    listenerId++;
    listeners[key] = listeners[key] || {};
    listeners[key]['' + listenerId] = callback;

    if (once) {
      oncers.push(listenerId);
    }

    events.forEach(function (event) {
      // Check each event, and only turn on events (not wildcards) that are off
      if (!enabledEvents[module + '.' + event]) {
        promises.push(_index["default"].send(module, 'on' + event[0].toUpperCase() + event.substr(1), {
          listen: true
        }));
        enabledEvents[module + '.' + event] = true;
      }
    });
    var resolve, reject;
    var p = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });

    if (promises.length) {
      Promise.all(promises).then(function (responses) {
        resolve(listenerId);
      })["catch"](function (error) {
        // Promise.all rejects if at least one promise rejects... we don't want that behavior here
        // TODO: Do something better than fail silently
        if (event === '*') {
          resolve(listenerId);
        } else {
          reject(error);
        }
      });
    } else {
      resolve(listenerId);
    }

    return p;
  }
};

var getListenArgs = function getListenArgs() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var callback = args.pop();
  var module = args[0].toLowerCase() || '*';
  var event = args[1] || '*';
  return [module, event, callback];
};

var once = function once() {
  var _getListenArgs = getListenArgs.apply(void 0, arguments),
      _getListenArgs2 = _slicedToArray(_getListenArgs, 3),
      module = _getListenArgs2[0],
      event = _getListenArgs2[1],
      callback = _getListenArgs2[2];

  return doListen(module, event, callback, true);
};

var listen = function listen() {
  init();

  var _getListenArgs3 = getListenArgs.apply(void 0, arguments),
      _getListenArgs4 = _slicedToArray(_getListenArgs3, 3),
      module = _getListenArgs4[0],
      event = _getListenArgs4[1],
      callback = _getListenArgs4[2];

  return doListen(module, event, callback, false);
};

var init = function init() {
  if (!transportInitialized) {
    _index["default"].addEventEmitter(emit);

    (0, _MockTransport.setMockListener)(listen);
    transportInitialized = true;
  }
};

var _default = {
  listen: listen,
  once: once,
  // TODO: clear needs to go through Transport Layer
  clear: function clear() {
    var moduleOrId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeof moduleOrId === 'number') {
      var searchId = moduleOrId.toString();
      Object.keys(listeners).every(function (key) {
        if (listeners[key][searchId]) {
          // delete callback
          delete listeners[key][searchId]; // delete the whole namespace if it was the only callback

          if (Object.keys(listeners[key]).length === 0) {
            delete listeners[key];
          }

          return false;
        }

        return true;
      });
    } else {
      if (!moduleOrId && !event) {
        Object.keys(listeners).forEach(function (key) {
          delete listeners[key];
        });
      } else if (!event) {
        Object.keys(listeners).forEach(function (key) {
          if (key.indexOf(moduleOrId.toLowerCase()) === 0) {
            delete listeners[key];
          }
        });
      } else {
        delete listeners[moduleOrId + '.' + event];
      }
    }
  },
  broadcast: function broadcast(event, value) {
    emit('app', event, value);
  }
};
exports["default"] = _default;