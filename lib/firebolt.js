"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Accessibility", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
Object.defineProperty(exports, "Account", {
  enumerable: true,
  get: function get() {
    return _index2["default"];
  }
});
Object.defineProperty(exports, "Advertising", {
  enumerable: true,
  get: function get() {
    return _index3["default"];
  }
});
Object.defineProperty(exports, "Authentication", {
  enumerable: true,
  get: function get() {
    return _index4["default"];
  }
});
Object.defineProperty(exports, "Capabilities", {
  enumerable: true,
  get: function get() {
    return _index5["default"];
  }
});
Object.defineProperty(exports, "Device", {
  enumerable: true,
  get: function get() {
    return _index6["default"];
  }
});
Object.defineProperty(exports, "Discovery", {
  enumerable: true,
  get: function get() {
    return _index7["default"];
  }
});
Object.defineProperty(exports, "Events", {
  enumerable: true,
  get: function get() {
    return _index18["default"];
  }
});
Object.defineProperty(exports, "Keyboard", {
  enumerable: true,
  get: function get() {
    return _index8["default"];
  }
});
Object.defineProperty(exports, "Lifecycle", {
  enumerable: true,
  get: function get() {
    return _index9["default"];
  }
});
Object.defineProperty(exports, "Localization", {
  enumerable: true,
  get: function get() {
    return _index10["default"];
  }
});
Object.defineProperty(exports, "Log", {
  enumerable: true,
  get: function get() {
    return _index17["default"];
  }
});
Object.defineProperty(exports, "Metrics", {
  enumerable: true,
  get: function get() {
    return _index11["default"];
  }
});
Object.defineProperty(exports, "Parameters", {
  enumerable: true,
  get: function get() {
    return _index12["default"];
  }
});
Object.defineProperty(exports, "Platform", {
  enumerable: true,
  get: function get() {
    return _index16["default"];
  }
});
Object.defineProperty(exports, "Profile", {
  enumerable: true,
  get: function get() {
    return _index13["default"];
  }
});
Object.defineProperty(exports, "SecondScreen", {
  enumerable: true,
  get: function get() {
    return _index14["default"];
  }
});
Object.defineProperty(exports, "SecureStorage", {
  enumerable: true,
  get: function get() {
    return _index15["default"];
  }
});
Object.defineProperty(exports, "Settings", {
  enumerable: true,
  get: function get() {
    return _index19["default"];
  }
});

var _MockTransport = require("./Transport/MockTransport.js");

var _defaults = _interopRequireDefault(require("./Accessibility/defaults.js"));

var _defaults2 = _interopRequireDefault(require("./Account/defaults.js"));

var _defaults3 = _interopRequireDefault(require("./Advertising/defaults.js"));

var _defaults4 = _interopRequireDefault(require("./Authentication/defaults.js"));

var _defaults5 = _interopRequireDefault(require("./Capabilities/defaults.js"));

var _defaults6 = _interopRequireDefault(require("./Device/defaults.js"));

var _defaults7 = _interopRequireDefault(require("./Discovery/defaults.js"));

var _defaults8 = _interopRequireDefault(require("./Keyboard/defaults.js"));

var _defaults9 = _interopRequireDefault(require("./Lifecycle/defaults.js"));

var _defaults10 = _interopRequireDefault(require("./Localization/defaults.js"));

var _defaults11 = _interopRequireDefault(require("./Metrics/defaults.js"));

var _defaults12 = _interopRequireDefault(require("./Parameters/defaults.js"));

var _defaults13 = _interopRequireDefault(require("./Profile/defaults.js"));

var _defaults14 = _interopRequireDefault(require("./SecondScreen/defaults.js"));

var _defaults15 = _interopRequireDefault(require("./SecureStorage/defaults.js"));

var _defaults16 = _interopRequireDefault(require("./Platform/defaults.js"));

var _index = _interopRequireDefault(require("./Accessibility/index.js"));

var _index2 = _interopRequireDefault(require("./Account/index.js"));

var _index3 = _interopRequireDefault(require("./Advertising/index.js"));

var _index4 = _interopRequireDefault(require("./Authentication/index.js"));

var _index5 = _interopRequireDefault(require("./Capabilities/index.js"));

var _index6 = _interopRequireDefault(require("./Device/index.js"));

var _index7 = _interopRequireDefault(require("./Discovery/index.js"));

var _index8 = _interopRequireDefault(require("./Keyboard/index.js"));

var _index9 = _interopRequireDefault(require("./Lifecycle/index.js"));

var _index10 = _interopRequireDefault(require("./Localization/index.js"));

var _index11 = _interopRequireDefault(require("./Metrics/index.js"));

var _index12 = _interopRequireDefault(require("./Parameters/index.js"));

var _index13 = _interopRequireDefault(require("./Profile/index.js"));

var _index14 = _interopRequireDefault(require("./SecondScreen/index.js"));

var _index15 = _interopRequireDefault(require("./SecureStorage/index.js"));

var _index16 = _interopRequireDefault(require("./Platform/index.js"));

var _index17 = _interopRequireDefault(require("./Log/index.js"));

var _index18 = _interopRequireDefault(require("./Events/index.js"));

var _index19 = _interopRequireDefault(require("./Settings/index.js"));

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
(0, _MockTransport.setMockResponses)({
  Accessibility: _defaults["default"],
  Account: _defaults2["default"],
  Advertising: _defaults3["default"],
  Authentication: _defaults4["default"],
  Capabilities: _defaults5["default"],
  Device: _defaults6["default"],
  Discovery: _defaults7["default"],
  Keyboard: _defaults8["default"],
  Lifecycle: _defaults9["default"],
  Localization: _defaults10["default"],
  Metrics: _defaults11["default"],
  Parameters: _defaults12["default"],
  Profile: _defaults13["default"],
  SecondScreen: _defaults14["default"],
  SecureStorage: _defaults15["default"],
  Platform: _defaults16["default"]
});