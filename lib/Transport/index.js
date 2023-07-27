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

var _WebsocketTransport = _interopRequireDefault(require("./WebsocketTransport.js"));

var _index2 = _interopRequireDefault(require("../Results/index.js"));

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

var win = typeof window !== 'undefined' ? window : void 0;

var Transport = /*#__PURE__*/function () {
  function Transport() {
    _classCallCheck(this, Transport);

    this._promises = [];
    this._transport = null;
    this._id = 1;
    this._eventEmitters = [];
    this._eventIds = [];
    this._queue = new _queue["default"]();
    this._deprecated = {};
    this.isMock = false;
  }

  _createClass(Transport, [{
    key: "_endpoint",
    value: function _endpoint() {
      if (win.__firebolt && win.__firebolt.endpoint) {
        return win.__firebolt.endpoint;
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
      } else if (typeof win.ServiceManager !== 'undefined' && win.ServiceManager && win.ServiceManager.version) {
        // Wire up the queue
        transport = this._queue; // get the default bridge service, and flush the queue

        win.ServiceManager.getServiceForJavaScript(LEGACY_TRANSPORT_SERVICE_NAME, function (service) {
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
    value: function _send(module, method, params, transforms) {
      if (Array.isArray(module) && !method && !params) {
        return this._batch(module);
      } else {
        return this._sendAndGetId(module, method, params, transforms).promise;
      }
    }
  }, {
    key: "_sendAndGetId",
    value: function _sendAndGetId(module, method, params, transforms) {
      var _this$_processRequest = this._processRequest(module, method, params, transforms),
          promise = _this$_processRequest.promise,
          json = _this$_processRequest.json,
          id = _this$_processRequest.id;

      var msg = JSON.stringify(json);

      if (_index["default"].getLogLevel() === 'DEBUG') {
        console.debug('Sending message to transport: ' + msg);
      }

      this._transport.send(msg);

      return {
        id: id,
        promise: promise
      };
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
            params = _ref.params,
            transforms = _ref.transforms;

        var result = _this2._processRequest(module, method, params, transforms);

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
    value: function _processRequest(module, method, params, transforms) {
      var p = this._addPromiseToQueue(module, method, params, transforms);

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
        method: module.toLowerCase() + '.' + method,
        params: params,
        id: this._id
      };
    }
  }, {
    key: "_addPromiseToQueue",
    value: function _addPromiseToQueue(module, method, params, transforms) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._promises[_this3._id] = {};
        _this3._promises[_this3._id].promise = _this3;
        _this3._promises[_this3._id].resolve = resolve;
        _this3._promises[_this3._id].reject = reject;
        _this3._promises[_this3._id].transforms = transforms;

        var deprecated = _this3._deprecated[module.toLowerCase() + '.' + method.toLowerCase()];

        if (deprecated) {
          console.warn("WARNING: ".concat(module, ".").concat(method, "() is deprecated. ") + deprecated.alternative);
        } // store the ID of the first listen for each event
        // TODO: what about wild cards?


        if (method.match(/^on[A-Z]/)) {
          if (params.listen) {
            _this3._eventIds.push(_this3._id);
          } else {
            _this3._eventIds = _this3._eventIds.filter(function (id) {
              return id !== _this3._id;
            });
          }
        }
      });
    }
    /**
     * If we have a global transport, use that. Otherwise, use the module-scoped transport instance.
     * @returns {Transport}
     */

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
          // Do any module-specific transforms on the result
          var result = json.result;

          if (p.transforms) {
            if (Array.isArray(json.result)) {
              result = result.map(function (x) {
                return _index2["default"].transform(x, p.transforms);
              });
            } else {
              result = _index2["default"].transform(result, p.transforms);
            }
          }

          p.resolve(result);
        }
        delete this._promises[json.id];
      } // event responses need to be emitted, even after the listen call is resolved


      if (this._eventIds.includes(json.id) && !isEventSuccess(json.result)) {
        this._eventEmitters.forEach(function (emit) {
          emit(json.id, json.result);
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      (0, _index.initSettings)({}, {
        log: true
      });

      this._queue.receive(this.receiveHandler.bind(this));

      if (win.__firebolt) {
        if (win.__firebolt.mockTransportLayer === true) {
          this.isMock = true;
          this.setTransportLayer(_MockTransport["default"]);
        } else if (win.__firebolt.getTransportLayer) {
          this.setTransportLayer(win.__firebolt.getTransportLayer());
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
    value: function send(module, method, params, transforms) {
      /** Transport singleton across all SDKs to keep single id map */
      return Transport.get()._send(module, method, params, transforms);
    }
  }, {
    key: "listen",
    value: function listen(module, method, params, transforms) {
      return Transport.get()._sendAndGetId(module, method, params, transforms);
    }
  }, {
    key: "get",
    value: function get() {
      /** Set up singleton and initialize it */
      win.__firebolt = win.__firebolt || {};

      if (win.__firebolt.transport == null && moduleInstance == null) {
        var transport = new Transport();
        transport.init();

        if (transport.isMock) {
          /** We should use the mock transport built with the SDK, not a global */
          moduleInstance = transport;
        } else {
          win.__firebolt = win.__firebolt || {};
          win.__firebolt.transport = transport;
        }

        win.__firebolt.setTransportLayer = transport.setTransportLayer.bind(transport);
      }

      return win.__firebolt.transport ? win.__firebolt.transport : moduleInstance;
    }
  }]);

  return Transport;
}();

exports["default"] = Transport;
win.__firebolt = win.__firebolt || {};

win.__firebolt.setTransportLayer = function (transport) {
  Transport.get().setTransportLayer(transport);
};