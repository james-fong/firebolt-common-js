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
} // Methods


function action(category, type, parameters) {
  var transforms = null;
  return _index["default"].send('Metrics', 'action', {
    category: category,
    type: type,
    parameters: parameters
  }, transforms);
}

function error(type, code, description, visible, parameters) {
  var transforms = null;
  return _index["default"].send('Metrics', 'error', {
    type: type,
    code: code,
    description: description,
    visible: visible,
    parameters: parameters
  }, transforms);
}

function mediaEnded(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaEnded', {
    entityId: entityId
  }, transforms);
}

function mediaLoadStart(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaLoadStart', {
    entityId: entityId
  }, transforms);
}

function mediaPause(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaPause', {
    entityId: entityId
  }, transforms);
}

function mediaPlay(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaPlay', {
    entityId: entityId
  }, transforms);
}

function mediaPlaying(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaPlaying', {
    entityId: entityId
  }, transforms);
}

function mediaProgress(entityId, progress) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaProgress', {
    entityId: entityId,
    progress: progress
  }, transforms);
}

function mediaRateChange(entityId, rate) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaRateChange', {
    entityId: entityId,
    rate: rate
  }, transforms);
}

function mediaRenditionChange(entityId, bitrate, width, height, profile) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaRenditionChange', {
    entityId: entityId,
    bitrate: bitrate,
    width: width,
    height: height,
    profile: profile
  }, transforms);
}

function mediaSeeked(entityId, position) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaSeeked', {
    entityId: entityId,
    position: position
  }, transforms);
}

function mediaSeeking(entityId, target) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaSeeking', {
    entityId: entityId,
    target: target
  }, transforms);
}

function mediaWaiting(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'mediaWaiting', {
    entityId: entityId
  }, transforms);
}

function page(pageId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'page', {
    pageId: pageId
  }, transforms);
}

function startContent(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'startContent', {
    entityId: entityId
  }, transforms);
}

function stopContent(entityId) {
  var transforms = null;
  return _index["default"].send('Metrics', 'stopContent', {
    entityId: entityId
  }, transforms);
}

var _default = {
  ErrorType: {
    NETWORK: 'network',
    MEDIA: 'media',
    RESTRICTION: 'restriction',
    ENTITLEMENT: 'entitlement',
    OTHER: 'other'
  },
  action: action,
  error: error,
  mediaEnded: mediaEnded,
  mediaLoadStart: mediaLoadStart,
  mediaPause: mediaPause,
  mediaPlay: mediaPlay,
  mediaPlaying: mediaPlaying,
  mediaProgress: mediaProgress,
  mediaRateChange: mediaRateChange,
  mediaRenditionChange: mediaRenditionChange,
  mediaSeeked: mediaSeeked,
  mediaSeeking: mediaSeeking,
  mediaWaiting: mediaWaiting,
  page: page,
  startContent: startContent,
  stopContent: stopContent
};
exports["default"] = _default;