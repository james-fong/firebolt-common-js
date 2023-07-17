"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireWildcard(require("../Events/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
(0, _index2.registerEvents)('Capabilities', ["available", "granted", "revoked", "unavailable"]); // onAvailable is accessed via listen('available, ...)

(0, _index2.registerEventContext)('Capabilities', 'available', ["capability"]); // onGranted is accessed via listen('granted, ...)

(0, _index2.registerEventContext)('Capabilities', 'granted', ["role", "capability"]); // onRevoked is accessed via listen('revoked, ...)

(0, _index2.registerEventContext)('Capabilities', 'revoked', ["role", "capability"]); // onUnavailable is accessed via listen('unavailable, ...)

(0, _index2.registerEventContext)('Capabilities', 'unavailable', ["capability"]); // Methods

function available(capability) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'available', {
    capability: capability
  }, transforms);
}

function clear() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].clear.apply(_index2["default"], ['Capabilities'].concat(args));
}

function granted(capability, options) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'granted', {
    capability: capability,
    options: options
  }, transforms);
}

function info(capabilities) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'info', {
    capabilities: capabilities
  }, transforms);
}

function listen() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].listen.apply(_index2["default"], ['Capabilities'].concat(args));
}

function once() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].once.apply(_index2["default"], ['Capabilities'].concat(args));
}

function permitted(capability, options) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'permitted', {
    capability: capability,
    options: options
  }, transforms);
}

function request(grants) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'request', {
    grants: grants
  }, transforms);
}

function supported(capability) {
  var transforms = null;
  return _index["default"].send('Capabilities', 'supported', {
    capability: capability
  }, transforms);
}

var _default = {
  events: {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    GRANTED: 'granted',
    REVOKED: 'revoked'
  },
  Role: {
    USE: 'use',
    MANAGE: 'manage',
    PROVIDE: 'provide'
  },
  DenyReason: {
    UNPERMITTED: 'unpermitted',
    UNSUPPORTED: 'unsupported',
    DISABLED: 'disabled',
    UNAVAILABLE: 'unavailable',
    GRANT_DENIED: 'grantDenied',
    UNGRANTED: 'ungranted'
  },
  available: available,
  clear: clear,
  granted: granted,
  info: info,
  listen: listen,
  once: once,
  permitted: permitted,
  request: request,
  supported: supported
};
exports["default"] = _default;