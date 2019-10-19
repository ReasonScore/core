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
    _classCallCheck(this, Messenger);

    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "log", []);
  }

  _createClass(Messenger, [{
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }, {
    key: "notify",
    value: function notify(changes) {
      this.log.push(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    }
  }]);

  return Messenger;
}();

exports.Messenger = Messenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiY2FsbGJhY2siLCJzdWJzY3JpYmVycyIsInB1c2giLCJjaGFuZ2VzIiwibG9nIiwic3Vic2NyaWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFM7Ozs7Ozt5Q0FDdUQsRTs7aUNBQzlCLEU7Ozs7OzhCQUV4QkMsUSxFQUE2QztBQUNuRCxXQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUFzQkYsUUFBdEI7QUFDSDtBQUVEOzs7OzJCQUNPRyxPLEVBQW1CO0FBQ3RCLFdBQUtDLEdBQUwsQ0FBU0YsSUFBVCxDQUFjQyxPQUFkO0FBRHNCO0FBQUE7QUFBQTs7QUFBQTtBQUV0Qiw2QkFBeUIsS0FBS0YsV0FBOUIsOEhBQTJDO0FBQUEsY0FBaENJLFVBQWdDO0FBQ3ZDQSxVQUFBQSxVQUFVLENBQUNGLE9BQUQsQ0FBVjtBQUNIO0FBSnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3Vic2NyaWJlcnM6IHsgKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZDsgfVtdID0gW11cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2c6IENoYW5nZVtdW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoY2FsbGJhY2s6IChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjaylcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2cucHVzaChjaGFuZ2VzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2YgdGhpcy5zdWJzY3JpYmVycykge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiB9XHJcblxyXG4iXX0=