"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Settings/index.js"));

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
var prepLog = function prepLog(type, args) {
  var colors = {
    Info: 'green',
    Debug: 'gray',
    Warn: 'orange',
    Error: 'red'
  };
  args = Array.from(args);
  return ['%c' + (args.length > 1 && typeof args[0] === 'string' ? args.shift() : type), 'background-color: ' + colors[type] + '; color: white; padding: 2px 4px; border-radius: 2px', args];
};

var _default = {
  info: function info() {
    _index["default"].get('platform', 'log') && console.log.apply(console, prepLog('Info', arguments));
  },
  debug: function debug() {
    _index["default"].get('platform', 'log') && console.debug.apply(console, prepLog('Debug', arguments));
  },
  error: function error() {
    _index["default"].get('platform', 'log') && console.error.apply(console, prepLog('Error', arguments));
  },
  warn: function warn() {
    _index["default"].get('platform', 'log') && console.warn.apply(console, prepLog('Warn', arguments));
  }
};
exports["default"] = _default;