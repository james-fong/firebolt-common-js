"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireDefault(require("../Events/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sessions = {};
var eventEmitterInitialized = false;

var eventHandler = function eventHandler(module, event, value) {
  var session = getSession(module, method);

  if (session) {
    if (event === session.addName && session.add) {
      session.add(value);
    } else if (event === session.removeName && session.remove) {
      session.remove(value);
    }
  }
};

function getSession(module, method) {
  return sessions[module.toLowerCase() + '.' + method];
}

function startSession(module, method) {
  sessions[module.toLowerCase() + '.' + method] = {};
  return sessions[module.toLowerCase() + '.' + method];
}

function stopSession(module, method) {
  delete sessions[module.toLowerCase() + '.' + method];
}

function start(module, method, addName, removeName, params, add, remove) {
  var session = getSession(module, method);

  if (!eventEmitterInitialized) {
    _index["default"].addEventEmitter(eventHandler);

    eventEmitterInitialized = true;
  }

  if (session) {
    throw "Error: only one ".concat(module, ".").concat(method, " operation may be in progress at a time. Call stop").concat(method.charAt(0).toUpperCase() + method.substr(1), " on previous ").concat(method, " first.");
  } else {
    session = startSession(module, method);
  }

  if (!add) {
    throw "Error: ".concat(module, ".").concat(method, " requires at least one callback because results may be asynchronous.");
  }

  var requests = [{
    module: module,
    method: method,
    params: params
  }];
  requests.push({
    module: module,
    method: addName,
    params: {
      listen: true
    }
  });

  if (remove) {
    requests.push({
      module: module,
      method: removeName,
      params: {
        listen: true
      }
    });
  }

  var results = _index["default"].send(requests);

  session.id = results[0].id;
  session.addRpcId = results[1].id;
  session.add = add;
  session.remove = remove;
  session.addName = addName;
  session.removeName = removeName;
  results[0].promise.then(function (items) {
    items && items.forEach(function (item) {
      return add(item);
    });
  });
  results[1].promise.then(function (id) {
    // clear it out if the session is already canceled
    if (!session.id) {
      _index2["default"].clear(id);
    } else {
      session.addListenerId = id;
    }
  });

  if (remove) {
    session.removeRpcId = results[2].id;
    results[2].promise.then(function (id) {
      // clear it out if the session is already canceled
      if (!session.id) {
        _index2["default"].clear(id);
      } else {
        session.removeListenerId = id;
      }
    });
  }

  return {
    stop: function stop() {
      var requests = [{
        module: module,
        method: "stop".concat(method.charAt(0).toUpperCase() + method.substr(1)),
        params: {
          correlationId: session.id
        }
      }, {
        module: module,
        method: addName,
        params: {
          listen: false
        }
      }];

      if (remove) {
        requests.push({
          module: module,
          method: removeName,
          params: {
            listen: false
          }
        });
      }

      _index["default"].send(requests);

      stopSession(module, method);
    }
  };
}

var _default = {
  start: start
};
exports["default"] = _default;