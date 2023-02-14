"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MockTransport = _interopRequireDefault(require("../Transport/MockTransport.js"));

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
var inactive = {
  "state": "inactive",
  "previous": "initializing"
};
var foreground = {
  "state": "foreground",
  "previous": "inactive"
};
var background = {
  "state": "background",
  "previous": "foreground"
};
var suspended = {
  "state": "suspended",
  "previous": "inactive"
};
var unloading = {
  "state": "unloading",
  "previous": "inactive"
};

var emit = function emit(value) {
  _MockTransport["default"].event('Lifecycle', value.state, value);
};

var automation = window.__firebolt ? !!window.__firebolt.automation : false;
var _default = {
  ready: function ready() {
    inactive.previous = 'initializing';
    setTimeout(function () {
      return emit(inactive);
    }, automation ? 1 : 500);
    foreground.previous = 'inactive';
    setTimeout(function () {
      return emit(foreground);
    }, automation ? 2 : 1000);
  },
  close: function close(params) {
    var reason = params.reason;

    if (reason === 'remoteButton') {
      inactive.previous = 'foreground';
      setTimeout(function () {
        return emit(inactive);
      }, automation ? 1 : 500);
    } else if (['userExit', 'error'].includes(reason)) {
      inactive.previous = 'foreground';
      unloading.previous = 'inactive';
      setTimeout(function () {
        return emit(inactive);
      }, automation ? 1 : 500);
      setTimeout(function () {
        return emit(unloading);
      }, automation ? 2 : 1000);
    } else {
      throw "Invalid close reason";
    }
  },
  finished: function finished() {
    if (window.location) window.location.href = "about:blank";
  }
};
exports["default"] = _default;