"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireWildcard(require("../Events/index.js"));

var _index3 = require("../Metrics/index.js");

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
(0, _index2.registerEvents)('Lifecycle', Object.values(["inactive", "foreground", "background", "suspended", "unloading"]));
var store = {
  _current: 'initializing',

  get current() {
    return this._current;
  }

};
exports.store = store;

_index2["default"].listen('Lifecycle', function (event, value) {
  store._current = event;
});

function ready() {
  var p = _index["default"].send('lifecycle', 'ready', {});

  p.then(function (_) {
    setTimeout(function (_) {
      (0, _index3.ready)();
    });
  });
  return p;
}

function close(reason) {
  return _index["default"].send('lifecycle', 'close', {
    reason: reason
  });
}

function listen() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].listen.apply(_index2["default"], ['lifecycle'].concat(args));
}

function once() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].once.apply(_index2["default"], ['lifecycle'].concat(args));
}

function clear() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].clear.apply(_index2["default"], ['lifecycle'].concat(args));
}

function state() {
  return store.current;
}

function finished() {
  if (store.current === 'unloading') {
    return _index["default"].send('lifecycle', 'finished');
  } else {
    throw 'Cannot call finished() except when in the unloading transition';
  }
} // public API


var _default = {
  events: {
    inactive: 'inactive',
    foreground: 'foreground',
    background: 'background',
    suspended: 'suspended',
    unloading: 'unloading'
  },
  LifecycleState: {
    INITIALIZING: 'initializing',
    INACTIVE: 'inactive',
    BACKGROUND: 'background',
    FOREGROUND: 'foreground',
    SUSPENDED: 'suspended',
    UNLOADING: 'unloading'
  },
  CloseReason: {
    REMOTE_BUTTON: 'remoteButton',
    USER_EXIT: 'userExit',
    ERROR: 'error'
  },
  state: state,
  finished: finished,
  ready: ready,
  close: close,
  listen: listen,
  once: once,
  clear: clear
};
exports["default"] = _default;