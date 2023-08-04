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
(0, _index2.registerEvents)('Device', ["audioChanged", "deviceNameChanged", "hdcpChanged", "hdrChanged", "nameChanged", "networkChanged", "screenResolutionChanged", "videoResolutionChanged"]);

_index["default"].registerDeprecatedMethod('Device', 'onDeviceNameChanged', 'Use Device.name() instead.');

function version() {
  return new Promise(function (resolve, reject) {
    _index["default"].send('device', 'version').then(function (v) {
      v = v || {};
      v.sdk = v.sdk || {};
      v.sdk.major = parseInt('0');
      v.sdk.minor = parseInt('15');
      v.sdk.patch = parseInt('0');
      v.sdk.readable = 'Firebolt Core SDK 0.15.0';
      resolve(v);
    })["catch"](function (error) {
      reject(error);
    });
  });
} // Methods


function audio() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'audio', {}, callbackOrValue, false, true, 0);
}

function clear() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].clear.apply(_index2["default"], ['Device'].concat(args));
}

function distributor() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'distributor', {}, callbackOrValue, true, true, 0);
}

function hdcp() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'hdcp', {}, callbackOrValue, false, true, 0);
}

function hdr() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'hdr', {}, callbackOrValue, false, true, 0);
}

function id() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'id', {}, callbackOrValue, true, true, 0);
}

function listen() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].listen.apply(_index2["default"], ['Device'].concat(args));
}

function make() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'make', {}, callbackOrValue, true, true, 0);
}

function model() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'model', {}, callbackOrValue, true, true, 0);
}

function name() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'name', {}, callbackOrValue, false, true, 0);
}

function network() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'network', {}, callbackOrValue, false, true, 0);
}

function once() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].once.apply(_index2["default"], ['Device'].concat(args));
}

function platform() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'platform', {}, callbackOrValue, true, true, 0);
}

function screenResolution() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'screenResolution', {}, callbackOrValue, false, true, 0);
}

function sku() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'sku', {}, callbackOrValue, true, true, 0);
}

function type() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'type', {}, callbackOrValue, true, true, 0);
}

function uid() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'uid', {}, callbackOrValue, true, true, 0);
}

function videoResolution() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Device', 'videoResolution', {}, callbackOrValue, false, true, 0);
}

var _default = {
  events: {
    DEVICE_NAME_CHANGED: 'deviceNameChanged',
    NAME_CHANGED: 'nameChanged',
    HDCP_CHANGED: 'hdcpChanged',
    HDR_CHANGED: 'hdrChanged',
    AUDIO_CHANGED: 'audioChanged',
    SCREEN_RESOLUTION_CHANGED: 'screenResolutionChanged',
    VIDEO_RESOLUTION_CHANGED: 'videoResolutionChanged',
    NETWORK_CHANGED: 'networkChanged'
  },
  NetworkState: {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
  },
  NetworkType: {
    WIFI: 'wifi',
    ETHERNET: 'ethernet',
    HYBRID: 'hybrid'
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
  audio: audio,
  clear: clear,
  distributor: distributor,
  hdcp: hdcp,
  hdr: hdr,
  id: id,
  listen: listen,
  make: make,
  model: model,
  name: name,
  network: network,
  once: once,
  platform: platform,
  screenResolution: screenResolution,
  sku: sku,
  type: type,
  uid: uid,
  videoResolution: videoResolution
};
exports["default"] = _default;