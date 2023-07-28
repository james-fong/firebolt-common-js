"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var win = typeof window !== 'undefined' ? window : {};

var LegacyTransport = /*#__PURE__*/function () {
  function LegacyTransport(bridge) {
    _classCallCheck(this, LegacyTransport);

    this.bridge = bridge;
  }

  _createClass(LegacyTransport, [{
    key: "send",
    value: function send(msg) {
      this.bridge.JSMessageChanged(msg, function () {});
    }
  }, {
    key: "receive",
    value: function receive(callback) {
      win.$badger = win.$badger || {};
      /** Hold on to real $badger callback and event methods so they can be called for non-jsonrpc messages */

      var badgerCallback = win.$badger.callback ? win.$badger.callback.bind(win.$badger) : null;
      var badgerEvent = win.$badger.event ? win.$badger.event.bind(win.$badger) : null;

      win.$badger.callback = function (pid, success, json) {
        if (json.jsonrpc) {
          callback(JSON.stringify(json));
        } else if (badgerCallback) {
          badgerCallback(pid, success, json);
        }
      };

      win.$badger.event = function (handlerId, json) {
        if (json.jsonrpc) {
          callback(JSON.stringify(json));
        } else if (badgerEvent) {
          badgerEvent(handlerId, json);
        }
      };
    }
  }], [{
    key: "isLegacy",
    value: function isLegacy(transport) {
      return LegacyTransport.isXREProxy(transport) || transport.send === undefined && transport.JSMessageChanged;
    }
  }, {
    key: "isXREProxy",
    value: function isXREProxy(transport) {
      /** Set top boxes running XRE has a "Proxy" transport
       * native object that intercepts ALL method calls, so we
       * cannot test for transport.send existence because it will return true
       * even though it actually is not supported. Check if some obscure method
       * name like "proxyObjectTest" is defined. If it is then we know we are using a
       * Proxy object and thus is legacy transport.
       */
      return transport.proxyObjectTest !== undefined;
    }
  }]);

  return LegacyTransport;
}();

exports["default"] = LegacyTransport;