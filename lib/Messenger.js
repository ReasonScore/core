"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messenger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Messenger =
/*#__PURE__*/
function () {
  function Messenger() {
    var _this = this;

    _classCallCheck(this, Messenger);

    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "log", []);

    _defineProperty(this, "notify", function (changes) {
      _this.log.push(changes);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscriber = _step.value;
          subscriber(changes);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  }

  _createClass(Messenger, [{
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }]);

  return Messenger;
}();

exports.Messenger = Messenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZXIiLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFM7Ozs7Ozs7O3lDQUN1RCxFOztpQ0FDOUIsRTs7b0NBT3pCLFVBQUNDLE9BQUQsRUFBdUI7QUFDNUIsTUFBQSxLQUFJLENBQUNDLEdBQUwsQ0FBU0MsSUFBVCxDQUFjRixPQUFkOztBQUQ0QjtBQUFBO0FBQUE7O0FBQUE7QUFFNUIsNkJBQXlCLEtBQUksQ0FBQ0csV0FBOUIsOEhBQTJDO0FBQUEsY0FBaENDLFVBQWdDO0FBQ3ZDQSxVQUFBQSxVQUFVLENBQUNKLE9BQUQsQ0FBVjtBQUNIO0FBSjJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLL0IsSzs7Ozs7OEJBVlNLLFEsRUFBNkM7QUFDbkQsV0FBS0YsV0FBTCxDQUFpQkQsSUFBakIsQ0FBc0JHLFFBQXRCO0FBQ0g7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2hhbmdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdWJzY3JpYmVyczogeyAoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkOyB9W10gPSBbXVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIHN1YnNjcmliZShjYWxsYmFjazogKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkgPSAoY2hhbmdlczogQ2hhbmdlW10pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5wdXNoKGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc3Vic2NyaWJlciBvZiB0aGlzLnN1YnNjcmliZXJzKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXIoY2hhbmdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuIH1cclxuXHJcbiJdfQ==