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
function email(type, message) {
  var transforms = null;
  return _index["default"].send('keyboard', 'email', {
    type: type,
    message: message
  }, transforms);
}

function password(message) {
  var transforms = null;
  return _index["default"].send('keyboard', 'password', {
    message: message
  }, transforms);
}

function standard(message) {
  var transforms = null;
  return _index["default"].send('keyboard', 'standard', {
    message: message
  }, transforms);
}

var _default = {
  EmailUsage: {
    SIGN_IN: 'signIn',
    SIGN_UP: 'signUp'
  },
  email: email,
  password: password,
  standard: standard
};
exports["default"] = _default;