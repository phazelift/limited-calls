"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// Generated by CoffeeScript 2.7.0
(function () {
  //	limited-calls - Wraps a function so it will only be called once during a set delay time.
  // MIT License
  // Copyright (c) 2018 Dennis Raymondo van der Sluis
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.
  var DELAY_DEFAULT, LimitedCalls, MISSING_FUNC_TEXT, types;
  types = require('types.js');
  MISSING_FUNC_TEXT = 'limit-calls: invalid or missing function, check the first argument of limit-calls invocation.'; // in milliseconds

  DELAY_DEFAULT = 100;

  LimitedCalls = /*#__PURE__*/function () {
    function LimitedCalls(func, delay, ignorePending) {
      _classCallCheck(this, LimitedCalls);

      this.func = types.forceFunction(func, function () {
        return console.log(MISSING_FUNC_TEXT);
      });
      this.delay = types.forceNumber(delay, DELAY_DEFAULT);
      this.running = false;
      this.pendingCall = false;
      this.pendingCallArgs = [];
      this.ignorePending = types.forceBoolean(ignorePending);
    }

    _createClass(LimitedCalls, [{
      key: "setPendingCall",
      value: function setPendingCall() {
        if (this.ignorePending) {
          return;
        }

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.pendingCallArgs = args;
        return this.pendingCall = true;
      }
    }, {
      key: "run",
      value: function run() {
        var _this = this;

        if (this.running) {
          return this.setPendingCall.apply(this, arguments);
        }

        this.func.apply(this, arguments);
        this.running = true;
        return setTimeout(function () {
          if (_this.pendingCall) {
            _this.func.apply(_this, _toConsumableArray(_this.pendingCallArgs));

            _this.pendingCall = false;
          }

          return _this.running = false;
        }, this.delay);
      }
    }]);

    return LimitedCalls;
  }(); // returns a function that can be called as many times, but only executes once during the delay time
  // the last call of calls made during the delay is executed after the delay ends
  // this can be disabled by passing true for ignorePending


  module.exports = function (func, delay, ignorePending) {
    var limitedCalls;
    limitedCalls = new LimitedCalls(func, delay, ignorePending);
    return function () {
      var _limitedCalls;

      return (_limitedCalls = limitedCalls).run.apply(_limitedCalls, arguments);
    };
  };
}).call(void 0);