"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.ready = ready;
exports.signIn = signIn;
exports.signOut = signOut;

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
function ready() {
  return _index["default"].send('metrics', 'ready', {});
}

function signIn() {
  return _index["default"].send('metrics', 'signIn', {});
}

function signOut() {
  return _index["default"].send('metrics', 'signOut', {});
}

function startContent(entityId) {
  return _index["default"].send('metrics', 'startContent', {
    entityId: entityId
  });
}

function stopContent(entityId) {
  return _index["default"].send('metrics', 'stopContent', {
    entityId: entityId
  });
}

function page(pageId) {
  return _index["default"].send('metrics', 'page', {
    pageId: pageId
  });
}

function action(category, type, parameters) {
  return _index["default"].send('metrics', 'action', {
    category: category,
    type: type,
    parameters: parameters
  });
}

function error(type, code, description, visible, parameters) {
  return _index["default"].send('metrics', 'error', {
    type: type,
    code: code,
    description: description,
    visible: visible,
    parameters: parameters
  });
}

function mediaLoadStart(entityId) {
  return _index["default"].send('metrics', 'mediaLoadStart', {
    entityId: entityId
  });
}

function mediaPlay(entityId) {
  return _index["default"].send('metrics', 'mediaPlay', {
    entityId: entityId
  });
}

function mediaPlaying(entityId) {
  return _index["default"].send('metrics', 'mediaPlaying', {
    entityId: entityId
  });
}

function mediaPause(entityId) {
  return _index["default"].send('metrics', 'mediaPause', {
    entityId: entityId
  });
}

function mediaWaiting(entityId) {
  return _index["default"].send('metrics', 'mediaWaiting', {
    entityId: entityId
  });
}

function mediaProgress(entityId, progress) {
  return _index["default"].send('metrics', 'mediaProgress', {
    entityId: entityId,
    progress: progress
  });
}

function mediaSeeking(entityId, target) {
  return _index["default"].send('metrics', 'mediaSeeking', {
    entityId: entityId,
    target: target
  });
}

function mediaSeeked(entityId, position) {
  return _index["default"].send('metrics', 'mediaSeeked', {
    entityId: entityId,
    position: position
  });
}

function mediaRateChange(entityId, rate) {
  return _index["default"].send('metrics', 'mediaRateChange', {
    entityId: entityId,
    rate: rate
  });
}

function mediaRenditionChange(entityId, bitrate, width, height, profile) {
  return _index["default"].send('metrics', 'mediaRenditionChange', {
    entityId: entityId,
    bitrate: bitrate,
    width: width,
    height: height,
    profile: profile
  });
}

function mediaEnded(entityId) {
  return _index["default"].send('metrics', 'mediaEnded', {
    entityId: entityId
  });
}

var _default = {
  ErrorType: {
    NETWORK: 'network',
    MEDIA: 'media',
    RESTRICTION: 'restriction',
    ENTITLEMENT: 'entitlement',
    OTHER: 'other'
  },
  startContent: startContent,
  stopContent: stopContent,
  page: page,
  action: action,
  error: error,
  mediaLoadStart: mediaLoadStart,
  mediaPlay: mediaPlay,
  mediaPlaying: mediaPlaying,
  mediaPause: mediaPause,
  mediaWaiting: mediaWaiting,
  mediaProgress: mediaProgress,
  mediaSeeking: mediaSeeking,
  mediaSeeked: mediaSeeked,
  mediaRateChange: mediaRateChange,
  mediaRenditionChange: mediaRenditionChange,
  mediaEnded: mediaEnded
};
exports["default"] = _default;