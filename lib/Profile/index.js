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
// Methods
function approveContentRating() {
  var transforms = null;
  return _index["default"].send('Profile', 'approveContentRating', {}, transforms);
}

function approvePurchase() {
  var transforms = null;
  return _index["default"].send('Profile', 'approvePurchase', {}, transforms);
}

function flags() {
  var transforms = null;
  return _index["default"].send('Profile', 'flags', {}, transforms);
}

var _default = {
  approveContentRating: approveContentRating,
  approvePurchase: approvePurchase,
  flags: flags
};
exports["default"] = _default;