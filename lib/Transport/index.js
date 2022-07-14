"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MockTransport = _interopRequireDefault(require("./MockTransport.js"));

var _queue = _interopRequireDefault(require("./queue.js"));

var _index = _interopRequireWildcard(require("../Settings/index.js"));

var _LegacyTransport = _interopRequireDefault(require("./LegacyTransport.js"));

var _global = _interopRequireDefault(require("../Transport/global.js"));

var _WebsocketTransport = _interopRequireDefault(require("./WebsocketTransport.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var LEGACY_TRANSPORT_SERVICE_NAME = 'com.comcast.BridgeObject_1';
var moduleInstance = null;

var isEventSuccess = function isEventSuccess(x) {
  return x && typeof x.event === 'string' && typeof x.listening === 'boolean';
};

var Transport = /*#__PURE__*/function () {
  function Transport() {
    _classCallCheck(this, Transport);

    this._promises = [];
    this._transport = null;
    this._id = 1;
    this._eventEmitters = [];
    this._eventMap = {};
    this._queue = new _queue["default"]();
    this._deprecated = {};
    this.isMock = false;
  }

  _createClass(Transport, [{
    key: "_endpoint",
    value: function _endpoint() {
      if (_global["default"].__firebolt && _global["default"].__firebolt.endpoint) {
        return _global["default"].__firebolt.endpoint;
      }

      return null;
    }
  }, {
    key: "constructTransportLayer",
    value: function constructTransportLayer() {
      var _this = this;

      var transport;

      var endpoint = this._endpoint();

      if (endpoint && (endpoint.startsWith('ws://') || endpoint.startsWith('wss://'))) {
        transport = new _WebsocketTransport["default"](endpoint);
        transport.receive(this.receiveHandler.bind(this));
      } else if (typeof _global["default"].ServiceManager !== 'undefined' && _global["default"].ServiceManager && _global["default"].ServiceManager.version) {
        // Wire up the queue
        transport = this._queue; // get the default bridge service, and flush the queue

        _global["default"].ServiceManager.getServiceForJavaScript(LEGACY_TRANSPORT_SERVICE_NAME, function (service) {
          if (_LegacyTransport["default"].isLegacy(service)) {
            transport = new _LegacyTransport["default"](service);
          } else {
            transport = service;
          }

          _this.setTransportLayer(transport);
        });
      } else {
        this.isMock = true;
        transport = _MockTransport["default"];
        transport.receive(this.receiveHandler.bind(this));
      }

      return transport;
    }
  }, {
    key: "setTransportLayer",
    value: function setTransportLayer(tl) {
      this._transport = tl;

      this._queue.flush(tl);
    }
  }, {
    key: "_send",
    value: function _send(module, method, params) {
      if (Array.isArray(module) && !method && !params) {
        return this._batch(module);
      }

      var _this$_processRequest = this._processRequest(module, method, params),
          promise = _this$_processRequest.promise,
          json = _this$_processRequest.json,
          id = _this$_processRequest.id;

      var msg = JSON.stringify(json);

      if (_index["default"].getLogLevel() === 'DEBUG') {
        console.debug('Sending message to transport: ' + msg);
      }

      this._transport.send(msg);

      return promise;
    }
  }, {
    key: "_batch",
    value: function _batch(requests) {
      var _this2 = this;

      var results = [];
      var json = [];
      requests.forEach(function (_ref) {
        var module = _ref.module,
            method = _ref.method,
            params = _ref.params;

        var result = _this2._processRequest(module, method, params);

        results.push({
          promise: result.promise,
          id: result.id
        });
        json.push(result.json);
      });
      var msg = JSON.stringify(json);

      if (_index["default"].getLogLevel() === 'DEBUG') {
        console.debug('Sending message to transport: ' + msg);
      }

      this._transport.send(msg);

      return results;
    }
  }, {
    key: "_processRequest",
    value: function _processRequest(module, method, params) {
      var p = this._addPromiseToQueue(module, method, params);

      var json = this._createRequestJSON(module, method, params);

      var result = {
        promise: p,
        json: json,
        id: this._id
      };
      this._id++;
      return result;
    }
  }, {
    key: "_createRequestJSON",
    value: function _createRequestJSON(module, method, params) {
      return {
        jsonrpc: '2.0',
        method: module + '.' + method,
        params: params,
        id: this._id
      };
    }
  }, {
    key: "_addPromiseToQueue",
    value: function _addPromiseToQueue(module, method, params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._promises[_this3._id] = {};
        _this3._promises[_this3._id].promise = _this3;
        _this3._promises[_this3._id].resolve = resolve;
        _this3._promises[_this3._id].reject = reject;

        var deprecated = _this3._deprecated[module.toLowerCase() + '.' + method.toLowerCase()];

        if (deprecated) {
          console.warn("WARNING: ".concat(module, ".").concat(method, "() is deprecated. ") + deprecated.alternative);
        } // store the ID of the first listen for each event
        // TODO: what about wild cards?


        if (method.match(/^on[A-Z]/)) {
          if (params.listen) {
            _this3._eventMap[_this3._id] = module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3);
          } else {
            Object.keys(_this3._eventMap).forEach(function (key) {
              if (_this3._eventMap[key] === module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3)) {
                delete _this3._eventMap[key];
              }
            });
          }
        }
      });
    }
  }, {
    key: "receiveHandler",
    value: function receiveHandler(message) {
      if (_index["default"].getLogLevel() === 'DEBUG') {
        console.debug('Received message from transport: ' + message);
      }

      var json = JSON.parse(message);
      var p = this._promises[json.id];

      if (p) {
        if (json.error) p.reject(json.error);else {
          p.resolve(json.result);
        }
        delete this._promises[json.id];
      } // event responses need to be emitted, even after the listen call is resolved


      if (this._eventMap[json.id] && !isEventSuccess(json.result)) {
        var moduleevent = this._eventMap[json.id];

        if (moduleevent) {
          this._eventEmitters.forEach(function (emit) {
            emit(moduleevent.split('.')[0], moduleevent.split('.')[1], json.result);
          });
        }
      }
    }
  }, {
    key: "init",
    value: function init() {
      (0, _index.initSettings)({}, {
        log: true
      });

      this._queue.receive(this.receiveHandler.bind(this));

      if (_global["default"].__firebolt) {
        if (_global["default"].__firebolt.mockTransportLayer === true) {
          this.isMock = true;
          this.setTransportLayer(_MockTransport["default"]);
        } else if (_global["default"].__firebolt.getTransportLayer) {
          this.setTransportLayer(_global["default"].__firebolt.getTransportLayer());
        }
      }

      if (this._transport == null) {
        this._transport = this.constructTransportLayer();
      }
    }
  }], [{
    key: "addEventEmitter",
    value: function addEventEmitter(emitter) {
      Transport.get()._eventEmitters.push(emitter);
    }
  }, {
    key: "registerDeprecatedMethod",
    value: function registerDeprecatedMethod(module, method, alternative) {
      Transport.get()._deprecated[module.toLowerCase() + '.' + method.toLowerCase()] = {
        alternative: alternative || ''
      };
    }
  }, {
    key: "send",
    value: function send(module, method, params) {
      /** Transport singleton across all SDKs to keep single id map */
      return Transport.get()._send(module, method, params);
    }
  }, {
    key: "getEventMap",
    value: function getEventMap() {
      return Transport.get()._eventMap;
    }
    /**
     * If we have a global transport, use that. Otherwise, use the module-scoped transport instance.
     * @returns {Transport}
     */

  }, {
    key: "get",
    value: function get() {
      return _global["default"].__firebolt.transport ? _global["default"].__firebolt.transport : moduleInstance;
    }
  }]);

  return Transport;
}();
/** Set up singleton and initialize it */


exports["default"] = Transport;
_global["default"].__firebolt = _global["default"].__firebolt || {};

if (_global["default"].__firebolt.transport == null && moduleInstance == null) {
  var transport = new Transport();
  transport.init();

  if (transport.isMock) {
    /** We should use the mock transport built with the SDK, not a global */
    moduleInstance = transport;
  } else {
    _global["default"].__firebolt = _global["default"].__firebolt || {};
    _global["default"].__firebolt.transport = transport;
  }

  _global["default"].__firebolt.setTransportLayer = transport.setTransportLayer.bind(transport);
}