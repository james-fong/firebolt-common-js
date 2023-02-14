"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

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
_index["default"].registerDeprecatedMethod('Authentication', 'token', 'Authentication module has individual methods for each token type.');

function token(type, options) {
  var transforms = null;
  return _index["default"].send('authentication', 'token', {
    type: type,
    options: options
  }, transforms);
}

function device() {
  var transforms = null;
  return _index["default"].send('authentication', 'device', {}, transforms);
}

function session() {
  var transforms = null;
  return _index["default"].send('authentication', 'session', {}, transforms);
}

function root() {
  var transforms = null;
  return _index["default"].send('authentication', 'root', {}, transforms);
}

var _default = {
  TokenType: {
    PLATFORM: 'platform',
    DEVICE: 'device',
    DISTRIBUTOR: 'distributor'
  },
  token: token,
  device: device,
  session: session,
  root: root
};
exports["default"] = _default;