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
(0, _index2.registerEvents)('Discovery', ["navigateTo", "policyChanged", "pullEntityInfo", "pullPurchasedContent"]);

_index["default"].registerDeprecatedMethod('Discovery', 'entitlements', 'Use Discovery.contentAccess() instead.'); // onNavigateTo is accessed via listen('navigateTo, ...)
// onPolicyChanged is accessed via listen('policyChanged, ...)
// Methods


function clear() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _index2["default"].clear.apply(_index2["default"], ['Discovery'].concat(args));
}

function clearContentAccess() {
  var transforms = null;
  return _index["default"].send('Discovery', 'clearContentAccess', {}, transforms);
}

function contentAccess(ids) {
  var transforms = null;
  return _index["default"].send('Discovery', 'contentAccess', {
    ids: ids
  }, transforms);
}

function entitlements(entitlements) {
  var transforms = null;
  return _index["default"].send('Discovery', 'entitlements', {
    entitlements: entitlements
  }, transforms);
}

var entityInfoHasCallback = false;

function entityInfo(data) {
  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    if (entityInfoHasCallback) {
      return Promise.reject('Cannot register more than one entityInfo handler.');
    }

    var callback = arguments[0];
    entityInfoHasCallback = true;
    return _index2["default"].listen('Discovery', 'pullEntityInfo', function (request) {
      if (typeof request === 'boolean') return;

      try {
        var result = callback(request.parameters).then(function (result) {
          var params = {
            correlationId: request.correlationId,
            result: result
          };

          _index["default"].send('Discovery', 'entityInfo', params)["catch"](function (error) {
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
    return _index["default"].send('Discovery', 'entityInfo', {
      correlationId: null,
      result: data
    });
  }
}

function launch(appId, intent) {
  var transforms = null;
  return _index["default"].send('Discovery', 'launch', {
    appId: appId,
    intent: intent
  }, transforms);
}

function listen() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _index2["default"].listen.apply(_index2["default"], ['Discovery'].concat(args));
}

function once() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _index2["default"].once.apply(_index2["default"], ['Discovery'].concat(args));
}

function policy() {
  var callbackOrValue = arguments[0];
  return _index3["default"].prop('Discovery', 'policy', {}, callbackOrValue, false, true, 0);
}

var purchasedContentHasCallback = false;

function purchasedContent(data) {
  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    if (purchasedContentHasCallback) {
      return Promise.reject('Cannot register more than one purchasedContent handler.');
    }

    var callback = arguments[0];
    purchasedContentHasCallback = true;
    return _index2["default"].listen('Discovery', 'pullPurchasedContent', function (request) {
      if (typeof request === 'boolean') return;

      try {
        var result = callback(request.parameters).then(function (result) {
          var params = {
            correlationId: request.correlationId,
            result: result
          };

          _index["default"].send('Discovery', 'purchasedContent', params)["catch"](function (error) {
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
    return _index["default"].send('Discovery', 'purchasedContent', {
      correlationId: null,
      result: data
    });
  }
}

function signIn(entitlements) {
  var transforms = null;

  var p = _index["default"].send('Discovery', 'signIn', {
    entitlements: entitlements
  }, transforms);

  p.then(function (_) {
    setTimeout(function (_) {
      (0, _index4.signIn)(entitlements);
    });
  })["catch"](function (error) {
    var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
    console.error("Metrics 'signIn' callback failed: ".concat(msg));
  });
  return p;
}

function signOut() {
  var transforms = null;

  var p = _index["default"].send('Discovery', 'signOut', {}, transforms);

  p.then(function (_) {
    setTimeout(function (_) {
      (0, _index4.signOut)();
    });
  })["catch"](function (error) {
    var msg = typeof error === 'string' ? error : error.message || 'Unknown Error';
    console.error("Metrics 'signOut' callback failed: ".concat(msg));
  });
  return p;
}

function watched(entityId, progress, completed, watchedOn) {
  var transforms = null;

  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return _index["default"].send('Discovery', 'watched', arguments[0], transforms);
  } else {
    return _index["default"].send('Discovery', 'watched', {
      entityId: entityId,
      progress: progress,
      completed: completed,
      watchedOn: watchedOn
    }, transforms);
  }
}

function watchNext(title, identifiers, expires, images) {
  var transforms = null;
  return _index["default"].send('Discovery', 'watchNext', {
    title: title,
    identifiers: identifiers,
    expires: expires,
    images: images
  }, transforms);
}

var _default = {
  events: {
    NAVIGATE_TO: 'navigateTo',
    POLICY_CHANGED: 'policyChanged',
    PULL_ENTITY_INFO: 'pullEntityInfo',
    PULL_PURCHASED_CONTENT: 'pullPurchasedContent'
  },
  ProgramType: {
    MOVIE: 'movie',
    EPISODE: 'episode',
    SEASON: 'season',
    SERIES: 'series',
    OTHER: 'other',
    PREVIEW: 'preview',
    EXTRA: 'extra',
    CONCERT: 'concert',
    SPORTING_EVENT: 'sportingEvent',
    ADVERTISEMENT: 'advertisement',
    MUSIC_VIDEO: 'musicVideo',
    MINISODE: 'minisode'
  },
  OfferingType: {
    FREE: 'free',
    SUBSCRIBE: 'subscribe',
    BUY: 'buy',
    RENT: 'rent'
  },
  AudioProfile: {
    STEREO: 'stereo',
    DOLBY_DIGITAL_5_1: 'dolbyDigital5.1',
    DOLBY_DIGITAL_7_1: 'dolbyDigital7.1',
    DOLBY_DIGITAL_5_1_PLUS: 'dolbyDigital5.1+',
    DOLBY_DIGITAL_7_1_PLUS: 'dolbyDigital7.1+',
    DOLBY_ATMOS: 'dolbyAtmos'
  },
  clear: clear,
  clearContentAccess: clearContentAccess,
  contentAccess: contentAccess,
  entitlements: entitlements,
  entityInfo: entityInfo,
  launch: launch,
  listen: listen,
  once: once,
  policy: policy,
  purchasedContent: purchasedContent,
  signIn: signIn,
  signOut: signOut,
  watched: watched,
  watchNext: watchNext
};
exports["default"] = _default;