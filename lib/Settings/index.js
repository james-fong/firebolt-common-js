"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettings = exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var settings = {};
var subscribers = {};

var initSettings = function initSettings(appSettings, platformSettings) {
  settings['app'] = appSettings;
  settings['platform'] = _objectSpread({
    logLevel: 'WARN'
  }, platformSettings);
  settings['user'] = {};
};

exports.initSettings = initSettings;

var publish = function publish(key, value) {
  subscribers[key] && subscribers[key].forEach(function (subscriber) {
    return subscriber(value);
  });
};

var dotGrab = function dotGrab() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var keys = key.split('.');

  for (var i = 0; i < keys.length; i++) {
    obj = obj[keys[i]] = obj[keys[i]] !== undefined ? obj[keys[i]] : {};
  }

  return _typeof(obj) === 'object' ? Object.keys(obj).length ? obj : undefined : obj;
};

var _default = {
  get: function get(type, key) {
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var val = dotGrab(settings[type], key);
    return val !== undefined ? val : fallback;
  },
  has: function has(type, key) {
    return !!this.get(type, key);
  },
  set: function set(key, value) {
    settings['user'][key] = value;
    publish(key, value);
  },
  subscribe: function subscribe(key, callback) {
    subscribers[key] = subscribers[key] || [];
    subscribers[key].push(callback);
  },
  unsubscribe: function unsubscribe(key, callback) {
    if (callback) {
      var index = subscribers[key] && subscribers[key].findIndex(function (cb) {
        return cb === callback;
      });
      index > -1 && subscribers[key].splice(index, 1);
    } else {
      if (key in subscribers) {
        subscribers[key] = [];
      }
    }
  },
  clearSubscribers: function clearSubscribers() {
    var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(subscribers)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        delete subscribers[key];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  setLogLevel: function setLogLevel(logLevel) {
    settings.platform.logLevel = logLevel;
  },
  getLogLevel: function getLogLevel() {
    return settings.platform.logLevel;
  }
};
exports["default"] = _default;