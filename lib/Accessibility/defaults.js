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
  closedCaptions: {
    "enabled": true,
    "styles": {
      "fontFamily": "Monospace sans-serif",
      "fontSize": 1,
      "fontColor": "#ffffff",
      "fontEdge": "none",
      "fontEdgeColor": "#7F7F7F",
      "fontOpacity": 100,
      "backgroundColor": "#000000",
      "backgroundOpacity": 100,
      "textAlign": "center",
      "textAlignVertical": "middle",
      "windowColor": "white",
      "windowOpacity": 50
    }
  },
  closedCaptionsSettings: function closedCaptionsSettings() {
    return _MockProps["default"].mock('Accessibility', 'closedCaptionsSettings', arguments, {
      "enabled": true,
      "styles": {
        "fontFamily": "Monospace sans-serif",
        "fontSize": 1,
        "fontColor": "#ffffff",
        "fontEdge": "none",
        "fontEdgeColor": "#7F7F7F",
        "fontOpacity": 100,
        "backgroundColor": "#000000",
        "backgroundOpacity": 100,
        "textAlign": "center",
        "textAlignVertical": "middle",
        "windowColor": "white",
        "windowOpacity": 50
      }
    });
  },
  voiceGuidance: {
    "enabled": true,
    "speed": 2
  },
  voiceGuidanceSettings: function voiceGuidanceSettings() {
    return _MockProps["default"].mock('Accessibility', 'voiceGuidanceSettings', arguments, {
      "enabled": true,
      "speed": 2
    });
  },
  audioDescriptionSettings: function audioDescriptionSettings() {
    return _MockProps["default"].mock('Accessibility', 'audioDescriptionSettings', arguments, {
      "enabled": true
    });
  }
};
exports["default"] = _default;