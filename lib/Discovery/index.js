"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../Transport/index.js"));

var _index2 = _interopRequireWildcard(require("../Events/index.js"));

var _index3 = _interopRequireDefault(require("../Prop/index.js"));

var _index4 = require("../Metrics/index.js");

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
(0, _index2.registerEvents)('Discovery', Object.values(["navigateTo", "policyChanged"]));

function policy() {
  return _index3["default"].prop('discovery', 'policy', arguments, false, true);
}

var entityInfoHasCallback = false;

function entityInfo(data) {
  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    if (entityInfoHasCallback) {
      return Promise.reject('Cannot register more than one entityInfo handler.');
    }

    var callback = arguments[0];
    entityInfoHasCallback = true;
    return _index2["default"].listen('discovery', 'pullEntityInfo', function (request) {
      if (typeof request === 'boolean') return;

      try {
        var result = callback(request.parameters).then(function (result) {
          var params = {
            correlationId: request.correlationId,
            result: result
          };

          _index["default"].send('discovery', 'entityInfo', params)["catch"](function (error) {
            var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
            console.error("Failed to send entityInfo pull response through Transport Layer: ".concat(msg));
          });
        })["catch"](function (error) {
          var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
          console.error("App 'entityInfo' callback failed: ".concat(msg));
        });
      } catch (error) {
        var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
        console.error("App 'entityInfo' callback failed: ".concat(msg));
      }
    });
  } else {
    return _index["default"].send('discovery', 'entityInfo', {
      correlationId: null,
      result: data
    });
  }
}

var purchasedContentHasCallback = false;

function purchasedContent(data) {
  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    if (purchasedContentHasCallback) {
      return Promise.reject('Cannot register more than one purchasedContent handler.');
    }

    var callback = arguments[0];
    purchasedContentHasCallback = true;
    return _index2["default"].listen('discovery', 'pullPurchasedContent', function (request) {
      if (typeof request === 'boolean') return;

      try {
        var result = callback(request.parameters).then(function (result) {
          var params = {
            correlationId: request.correlationId,
            result: result
          };

          _index["default"].send('discovery', 'purchasedContent', params)["catch"](function (error) {
            var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
            console.error("Failed to send purchasedContent pull response through Transport Layer: ".concat(msg));
          });
        })["catch"](function (error) {
          var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
          console.error("App 'purchasedContent' callback failed: ".concat(msg));
        });
      } catch (error) {
        var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
        console.error("App 'purchasedContent' callback failed: ".concat(msg));
      }
    });
  } else {
    return _index["default"].send('discovery', 'purchasedContent', {
      correlationId: null,
      result: data
    });
  }
}

function watched(entityId, progress, completed, watchedOn) {
  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return _index["default"].send('discovery', 'watched', arguments[0]);
  } else {
    return _index["default"].send('discovery', 'watched', {
      entityId: entityId,
      progress: progress,
      completed: completed,
      watchedOn: watchedOn
    });
  }
}

function watchNext(title, identifiers, expires, images) {
  return _index["default"].send('discovery', 'watchNext', {
    title: title,
    identifiers: identifiers,
    expires: expires,
    images: images
  });
}

function entitlements(entitlements) {
  return _index["default"].send('discovery', 'entitlements', {
    entitlements: entitlements
  });
}

function launch(appId, intent) {
  return _index["default"].send('discovery', 'launch', {
    appId: appId,
    intent: intent
  });
}

function signIn(entitlements) {
  var p = _index["default"].send('discovery', 'signIn', {
    entitlements: entitlements
  });

  p.then(function (_) {
    setTimeout(function (_) {
      (0, _index4.signIn)(entitlements);
    });
  });
  return p;
}

function signOut() {
  var p = _index["default"].send('discovery', 'signOut', {});

  p.then(function (_) {
    setTimeout(function (_) {
      (0, _index4.signOut)();
    });
  });
  return p;
}

function listen() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].listen.apply(_index2["default"], ['discovery'].concat(args));
}

function once() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].once.apply(_index2["default"], ['discovery'].concat(args));
}

function clear() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].clear.apply(_index2["default"], ['discovery'].concat(args));
}

var _default = {
  events: {
    navigateTo: 'navigateTo',
    policyChanged: 'policyChanged'
  },
  policy: policy,
  entityInfo: entityInfo,
  purchasedContent: purchasedContent,
  watched: watched,
  watchNext: watchNext,
  entitlements: entitlements,
  launch: launch,
  signIn: signIn,
  signOut: signOut,
  listen: listen,
  once: once,
  clear: clear
};
exports["default"] = _default;