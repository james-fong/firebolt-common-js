"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = exports.registerEventContext = exports.prioritize = exports.emit = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _MockTransport = require("../Transport/MockTransport.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var listenerId = 0; // holds two maps of ${module}.${event} => listenerId, e.g. callback method id
// note that one callback can listen to multiple events, e.g. 'discovery.*'
// internal is only available via a private export that we use to ensure our modules know about
// events before the apps using the SDK (otherwise state errors can happen)

var listeners = {
  internal: {},
  external: {},
  // Several convenience functions below for checking both internal & external lists w/ one operation
  // gets a merge list of ids for a single event key
  get: function get(key) {
    return Object.assign(Object.assign({}, listeners.internal[key]), listeners.external[key]);
  },
  // adds a callback/id to a key on the external list only 
  set: function set(key, id, value) {
    listeners.external[key] = listeners.external[key] || {};
    listeners.external[key][id] = value;
  },
  // adds a callback/id to a key on the internal list only 
  setInternal: function setInternal(key, id, value) {
    listeners.internal[key] = listeners.internal[key] || {};
    listeners.internal[key][id] = value;
  },
  // finds the key for an id in either list (it can only be in one)
  find: function find(id) {
    var key;
    [listeners.internal, listeners.external].find(function (group) {
      key = Object.keys(group).find(function (key) {
        return group[key][id];
      });
      if (key) return true;
    });
    return key;
  },
  // removes an id from either list
  remove: function remove(id) {
    [listeners.internal, listeners.external].forEach(function (group) {
      Object.keys(group).forEach(function (key) {
        if (group[key] && group[key][id]) {
          delete group[key][id];

          if (Object.values(group[key]).length === 0) {
            delete group[key];
          }
        }
      });
    });
  },
  // removes a key from both lists if _internal is true, otherwise only the external list
  removeKey: function removeKey(key) {
    var _internal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _internal && listeners.internal[key] && delete listeners.internal[key];
    listeners.external[key] && delete listeners.external[key];
  },
  // gives a list of all keys
  keys: function keys() {
    return Array.from(new Set(Object.keys(listeners.internal).concat(Object.keys(listeners.external))));
  },
  // counts how many listeners are in a key across both lists
  count: function count(key) {
    return Object.values(listeners.get(key)).length;
  }
}; // holds a map of RPC Ids => Context Key, e.g. the RPC id of an onEvent call mapped to the corresponding context parameters key for that RPC call

var keys = {}; // holds a map of ${module}.${event} => Transport.send calls (only called once per event)
// note that the keys here MUST NOT contain wild cards

var oncers = [];
var validEvents = {};
var validContext = {};
var transportInitialized = false;

var emit = function emit(id, value) {
  callCallbacks(listeners.internal[keys[id]], [value]);
  callCallbacks(listeners.external[keys[id]], [value]);
};

exports.emit = emit;

var registerEvents = function registerEvents(module, events) {
  validEvents[module.toLowerCase()] = events.concat();
};

exports.registerEvents = registerEvents;

var registerEventContext = function registerEventContext(module, event, context) {
  validContext[module.toLowerCase()] = validContext[module.toLowerCase()] || {};
  validContext[module.toLowerCase()][event] = context.concat();
};

exports.registerEventContext = registerEventContext;

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

var doListen = function doListen(module, event, callback, context, once) {
  var internal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  init();

  if (typeof callback !== 'function') {
    return Promise.reject('No valid callback function provided.');
  } else {
    if (module === '*') {
      return Promise.reject('No valid module name provided');
    }

    var wildcard = event === '*';
    var events = wildcard ? validEvents[module] : [event]; // explodes wildcards into an array

    var promises = [];
    var hasContext = Object.values(context).length > 0;
    var contextKey = Object.keys(context).sort().map(function (key) {
      return key + '=' + JSON.stringify(context[key]);
    }).join('&');
    listenerId++;

    if (once) {
      oncers.push(listenerId);
    }

    events.forEach(function (event) {
      var key = module + '.' + event + (hasContext ? ".".concat(contextKey) : '');

      if (Object.values(listeners.get(key)).length === 0) {
        var args = Object.assign({
          listen: true
        }, context);

        var _Transport$listen = _index["default"].listen(module, 'on' + event[0].toUpperCase() + event.substring(1), args),
            id = _Transport$listen.id,
            promise = _Transport$listen.promise;

        keys[id] = key;
        promises.push(promise);
      }

      var setter = internal ? listeners.setInternal : listeners.set;

      if (wildcard) {
        setter(key, '' + listenerId, function (value) {
          return callback(event, value);
        });
      } else {
        setter(key, '' + listenerId, callback);
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

  var _getClearArgs = getClearArgs.apply(void 0, args),
      _getClearArgs2 = _slicedToArray(_getClearArgs, 3),
      module = _getClearArgs2[0],
      event = _getClearArgs2[1],
      context = _getClearArgs2[2];

  return [module, event, callback, context];
};

var getClearArgs = function getClearArgs() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var module = (args.shift() || '*').toLowerCase();
  var event = args.shift() || '*';
  var context = {};

  for (var i = 0; args.length; i++) {
    context[validContext[module][event][i]] = args.shift();
  }

  return [module, event, context];
};

var once = function once() {
  var _getListenArgs = getListenArgs.apply(void 0, arguments),
      _getListenArgs2 = _slicedToArray(_getListenArgs, 4),
      module = _getListenArgs2[0],
      event = _getListenArgs2[1],
      callback = _getListenArgs2[2],
      context = _getListenArgs2[3];

  return doListen(module, event, callback, context, true);
};

var listen = function listen() {
  var _getListenArgs3 = getListenArgs.apply(void 0, arguments),
      _getListenArgs4 = _slicedToArray(_getListenArgs3, 4),
      module = _getListenArgs4[0],
      event = _getListenArgs4[1],
      callback = _getListenArgs4[2],
      context = _getListenArgs4[3];

  return doListen(module, event, callback, context, false);
};

var clear = function clear() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args && args.length && typeof args[0] === 'number') {
    return doClear(args[0]);
  } else if (args && args.length && typeof args[1] === 'number') {
    return doClear(args[1]);
  } else {
    var _getClearArgs3 = getClearArgs.apply(void 0, args),
        _getClearArgs4 = _slicedToArray(_getClearArgs3, 3),
        moduleOrId = _getClearArgs4[0],
        event = _getClearArgs4[1],
        context = _getClearArgs4[2];

    return doClear(moduleOrId, event, context);
  }
}; // calls doListen with a priority flag for internal listeners to get priority


var prioritize = function prioritize() {
  var _getListenArgs5 = getListenArgs.apply(void 0, arguments),
      _getListenArgs6 = _slicedToArray(_getListenArgs5, 4),
      module = _getListenArgs6[0],
      event = _getListenArgs6[1],
      callback = _getListenArgs6[2],
      context = _getListenArgs6[3];

  return doListen(module, event, callback, context, false, true);
};

exports.prioritize = prioritize;

var unsubscribe = function unsubscribe(key, context) {
  var _key$split$slice = key.split('.').slice(0, 2),
      _key$split$slice2 = _slicedToArray(_key$split$slice, 2),
      module = _key$split$slice2[0],
      event = _key$split$slice2[1];

  var args = Object.assign({
    listen: false
  }, context);

  _index["default"].send(module, 'on' + event[0].toUpperCase() + event.substr(1), args);
}; // TODO: clear needs to go through Transport Layer


var doClear = function doClear() {
  var moduleOrId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var context = arguments.length > 2 ? arguments[2] : undefined;

  if (event === '*') {
    event = false;
  }

  if (typeof moduleOrId === 'number') {
    var searchId = moduleOrId.toString();
    var key = listeners.find(searchId);

    if (key) {
      listeners.remove(searchId);

      if (listeners.count(key) === 0) {
        unsubscribe(key);
      }

      return true;
    }

    return false;
  } else {
    if (!moduleOrId && !event) {
      listeners.keys().forEach(function (key) {
        listeners.removeKey(key);
        unsubscribe(key);
      });
    } else if (!event) {
      listeners.keys().forEach(function (key) {
        if (key.indexOf(moduleOrId.toLowerCase()) === 0) {
          listeners.removeKey(key);
          unsubscribe(key);
        }
      });
    } else {
      var hasContext = Object.values(context).length > 0;
      var contextKey = Object.keys(context).sort().map(function (key) {
        return key + '=' + JSON.stringify(context[key]);
      }).join('&');

      var _key4 = moduleOrId + '.' + event + (hasContext ? ".".concat(contextKey) : '');

      listeners.removeKey(_key4);
      unsubscribe(_key4, context);
    }
  }
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
  clear: clear,
  broadcast: function broadcast(event, value) {
    emit(Object.entries(keys).find(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return v === 'app.' + event;
    })[0], value);
  }
};
exports["default"] = _default;