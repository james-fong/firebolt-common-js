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
(0, _index2.registerEvents)('Accessibility', ["audioDescriptionSettingsChanged", "closedCaptionsSettingsChanged", "voiceGuidanceSettingsChanged"]);

_index["default"].registerDeprecatedMethod('Accessibility', 'closedCaptions', 'Use Accessibility.closedCaptionsSettings() instead.');

_index["default"].registerDeprecatedMethod('Accessibility', 'voiceGuidance', 'Use Accessibility.voiceGuidanceSettings() instead.'); // onAudioDescriptionSettingsChanged is accessed via listen('audioDescriptionSettingsChanged, ...)
// onClosedCaptionsSettingsChanged is accessed via listen('closedCaptionsSettingsChanged, ...)
// onVoiceGuidanceSettingsChanged is accessed via listen('voiceGuidanceSettingsChanged, ...)
// Methods


function audioDescriptionSettings() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Accessibility', 'audioDescriptionSettings', {}, callbackOrValue, false, true, 0);
}

function clear() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].clear.apply(_index2["default"], ['Accessibility'].concat(args));
}

function closedCaptions() {
  var transforms = null;
  return _index["default"].send('Accessibility', 'closedCaptions', {}, transforms);
}

function closedCaptionsSettings() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Accessibility', 'closedCaptionsSettings', {}, callbackOrValue, false, true, 0);
}

function listen() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].listen.apply(_index2["default"], ['Accessibility'].concat(args));
}

function once() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].once.apply(_index2["default"], ['Accessibility'].concat(args));
}

function voiceGuidance() {
  var transforms = null;
  return _index["default"].send('Accessibility', 'voiceGuidance', {}, transforms);
}

function voiceGuidanceSettings() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Accessibility', 'voiceGuidanceSettings', {}, callbackOrValue, false, true, 0);
}

var _default = {
  events: {
    CLOSED_CAPTIONS_SETTINGS_CHANGED: 'closedCaptionsSettingsChanged',
    VOICE_GUIDANCE_SETTINGS_CHANGED: 'voiceGuidanceSettingsChanged',
    AUDIO_DESCRIPTION_SETTINGS_CHANGED: 'audioDescriptionSettingsChanged'
  },
  audioDescriptionSettings: audioDescriptionSettings,
  clear: clear,
  closedCaptions: closedCaptions,
  closedCaptionsSettings: closedCaptionsSettings,
  listen: listen,
  once: once,
  voiceGuidance: voiceGuidance,
  voiceGuidanceSettings: voiceGuidanceSettings
};
exports["default"] = _default;