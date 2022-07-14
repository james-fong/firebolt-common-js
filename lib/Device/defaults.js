"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MockProps = _interopRequireDefault(require("../Prop/MockProps.js"));

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
var _default = {
  id: function id() {
    return _MockProps["default"].mock('device', 'id', arguments, "123");
  },
  distributor: function distributor() {
    return _MockProps["default"].mock('device', 'distributor', arguments, "Company");
  },
  platform: function platform() {
    return _MockProps["default"].mock('device', 'platform', arguments, "WPE");
  },
  uid: function uid() {
    return _MockProps["default"].mock('device', 'uid', arguments, "ee6723b8-7ab3-462c-8d93-dbf61227998e");
  },
  type: function type() {
    return _MockProps["default"].mock('device', 'type', arguments, "STB");
  },
  model: function model() {
    return _MockProps["default"].mock('device', 'model', arguments, "xi6");
  },
  sku: function sku() {
    return _MockProps["default"].mock('device', 'sku', arguments, "AX061AEI");
  },
  make: function make() {
    return _MockProps["default"].mock('device', 'make', arguments, "Arris");
  },
  version: function version() {
    return _MockProps["default"].mock('device', 'version', arguments, {
      "sdk": {
        "major": 0,
        "minor": 5,
        "patch": 0,
        "readable": "Firebolt JS SDK v0.5.0"
      },
      "os": {
        "major": 0,
        "minor": 1,
        "patch": 0,
        "readable": "Firebolt OS v0.1.0"
      },
      "debug": ""
    });
  },
  hdcp: function hdcp() {
    return _MockProps["default"].mock('device', 'hdcp', arguments, {
      "hdcp1.4": true,
      "hdcp2.2": true
    });
  },
  hdr: function hdr() {
    return _MockProps["default"].mock('device', 'hdr', arguments, {
      "hdr10": true,
      "hdr10Plus": true,
      "dolbyVision": true,
      "hlg": true
    });
  },
  audio: function audio() {
    return _MockProps["default"].mock('device', 'audio', arguments, {
      "stereo": true,
      "dolbyDigital5.1": true,
      "dolbyDigital5.1+": true,
      "dolbyAtmos": true
    });
  },
  screenResolution: function screenResolution() {
    return _MockProps["default"].mock('device', 'screenResolution', arguments, [1920, 1080]);
  },
  videoResolution: function videoResolution() {
    return _MockProps["default"].mock('device', 'videoResolution', arguments, [1920, 1080]);
  },
  name: function name() {
    return _MockProps["default"].mock('device', 'name', arguments, "Living Room");
  },
  network: function network() {
    return _MockProps["default"].mock('device', 'network', arguments, {
      "state": "connected",
      "type": "wifi"
    });
  }
};
exports["default"] = _default;