"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireWildcard(require("../Events/index.js"));

var _index3 = _interopRequireDefault(require("../Prop/index.js"));

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
(0, _index2.registerEvents)('Device', Object.values(["deviceNameChanged", "hdcpChanged", "hdrChanged", "audioChanged", "screenResolutionChanged", "videoResolutionChanged", "nameChanged", "networkChanged"]));

_index["default"].registerDeprecatedMethod('Device', 'onDeviceNameChanged', 'Use Device.name() instead.');

function version() {
  return new Promise(function (resolve, reject) {
    _index["default"].send('device', 'version').then(function (v) {
      v = v || {};
      v.sdk = v.sdk || {};
      v.sdk.major = parseInt('0');
      v.sdk.minor = parseInt('7');
      v.sdk.patch = parseInt('0');
      v.sdk.readable = 'The Firebolt JS SDK';
      resolve(v);
    })["catch"](function (error) {
      reject(error);
    });
  });
}

function id() {
  return _index3["default"].prop('device', 'id', arguments, true, true);
}

function distributor() {
  return _index3["default"].prop('device', 'distributor', arguments, true, true);
}

function platform() {
  return _index3["default"].prop('device', 'platform', arguments, true, true);
}

function uid() {
  return _index3["default"].prop('device', 'uid', arguments, true, true);
}

function type() {
  return _index3["default"].prop('device', 'type', arguments, true, true);
}

function model() {
  return _index3["default"].prop('device', 'model', arguments, true, true);
}

function sku() {
  return _index3["default"].prop('device', 'sku', arguments, true, true);
}

function make() {
  return _index3["default"].prop('device', 'make', arguments, true, true);
}

function hdcp() {
  return _index3["default"].prop('device', 'hdcp', arguments, false, true);
}

function hdr() {
  return _index3["default"].prop('device', 'hdr', arguments, false, true);
}

function audio() {
  return _index3["default"].prop('device', 'audio', arguments, false, true);
}

function screenResolution() {
  return _index3["default"].prop('device', 'screenResolution', arguments, false, true);
}

function videoResolution() {
  return _index3["default"].prop('device', 'videoResolution', arguments, false, true);
}

function name() {
  return _index3["default"].prop('device', 'name', arguments, false, true);
}

function network() {
  return _index3["default"].prop('device', 'network', arguments, false, true);
}

function listen() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].listen.apply(_index2["default"], ['device'].concat(args));
}

function once() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].once.apply(_index2["default"], ['device'].concat(args));
}

function clear() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].clear.apply(_index2["default"], ['device'].concat(args));
}

var _default = {
  events: {
    deviceNameChanged: 'deviceNameChanged',
    hdcpChanged: 'hdcpChanged',
    hdrChanged: 'hdrChanged',
    audioChanged: 'audioChanged',
    screenResolutionChanged: 'screenResolutionChanged',
    videoResolutionChanged: 'videoResolutionChanged',
    nameChanged: 'nameChanged',
    networkChanged: 'networkChanged'
  },
  NetworkType: {
    WIFI: 'wifi',
    ETHERNET: 'ethernet',
    HYBRID: 'hybrid'
  },
  NetworkState: {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
  },
  AudioProfile: {
    STEREO: 'stereo',
    DOLBY_DIGITAL_5_1: 'dolbyDigital5.1',
    DOLBY_DIGITAL_7_1: 'dolbyDigital7.1',
    DOLBY_DIGITAL_5_1_PLUS: 'dolbyDigital5.1+',
    DOLBY_DIGITAL_7_1_PLUS: 'dolbyDigital7.1+',
    DOLBY_ATMOS: 'dolbyAtmos'
  },
  version: version,
  id: id,
  distributor: distributor,
  platform: platform,
  uid: uid,
  type: type,
  model: model,
  sku: sku,
  make: make,
  hdcp: hdcp,
  hdr: hdr,
  audio: audio,
  screenResolution: screenResolution,
  videoResolution: videoResolution,
  name: name,
  network: network,
  listen: listen,
  once: once,
  clear: clear
};
exports["default"] = _default;