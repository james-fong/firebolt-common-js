"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var MAX_QUEUED_MESSAGES = 100;

var WebsocketTransport = /*#__PURE__*/function () {
  function WebsocketTransport(endpoint) {
    _classCallCheck(this, WebsocketTransport);

    this._endpoint = endpoint;
    this._ws = null;
    this._connected = false;
    this._queue = [];
    this._callbacks = [];
  }

  _createClass(WebsocketTransport, [{
    key: "send",
    value: function send(msg) {
      this._connect();

      if (this._connected) {
        this._ws.send(msg);
      } else {
        if (this._queue.length < MAX_QUEUED_MESSAGES) {
          this._queue.push(msg);
        }
      }
    }
  }, {
    key: "receive",
    value: function receive(callback) {
      if (!callback) return;

      this._connect();

      this._callbacks.push(callback);
    }
  }, {
    key: "_notifyCallbacks",
    value: function _notifyCallbacks(message) {
      var _this = this;

      var _loop = function _loop(i) {
        setTimeout(function () {
          return _this._callbacks[i](message);
        }, 1);
      };

      for (var i = 0; i < this._callbacks.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "_connect",
    value: function _connect() {
      var _this2 = this;

      if (this._ws) return;
      this._ws = new WebSocket(this._endpoint, ['jsonrpc']);

      this._ws.addEventListener('message', function (message) {
        _this2._notifyCallbacks(message.data);
      });

      this._ws.addEventListener('error', function (message) {});

      this._ws.addEventListener('close', function (message) {
        _this2._ws = null;
        _this2._connected = false;
      });

      this._ws.addEventListener('open', function (message) {
        _this2._connected = true;

        for (var i = 0; i < _this2._queue.length; i++) {
          _this2._ws.send(_this2._queue[i]);
        }

        _this2._queue = [];
      });
    }
  }]);

  return WebsocketTransport;
}();

exports["default"] = WebsocketTransport;