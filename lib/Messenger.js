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
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callback) {
      var index = this.subscribers.indexOf(callback, 0);

      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }]);

  return Messenger;
}();

exports.Messenger = Messenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZXIiLCJjYWxsYmFjayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFM7Ozs7Ozs7O3lDQUN1RCxFOztpQ0FDOUIsRTs7b0NBY3pCLFVBQUNDLE9BQUQsRUFBdUI7QUFDNUIsTUFBQSxLQUFJLENBQUNDLEdBQUwsQ0FBU0MsSUFBVCxDQUFjRixPQUFkOztBQUQ0QjtBQUFBO0FBQUE7O0FBQUE7QUFFNUIsNkJBQXlCLEtBQUksQ0FBQ0csV0FBOUIsOEhBQTJDO0FBQUEsY0FBaENDLFVBQWdDO0FBQ3ZDQSxVQUFBQSxVQUFVLENBQUNKLE9BQUQsQ0FBVjtBQUNIO0FBSjJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLL0IsSzs7Ozs7OEJBakJTSyxRLEVBQTZDO0FBQ25ELFdBQUtGLFdBQUwsQ0FBaUJELElBQWpCLENBQXNCRyxRQUF0QjtBQUNIOzs7Z0NBRVdBLFEsRUFBNkM7QUFDckQsVUFBTUMsS0FBSyxHQUFHLEtBQUtILFdBQUwsQ0FBaUJJLE9BQWpCLENBQXlCRixRQUF6QixFQUFtQyxDQUFuQyxDQUFkOztBQUNBLFVBQUlDLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7QUFDWixhQUFLSCxXQUFMLENBQWlCSyxNQUFqQixDQUF3QkYsS0FBeEIsRUFBK0IsQ0FBL0I7QUFDSDtBQUNKO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3Vic2NyaWJlcnM6IHsgKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZDsgfVtdID0gW11cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2c6IENoYW5nZVtdW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoY2FsbGJhY2s6IChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjaylcclxuICAgIH1cclxuXHJcbiAgICB1bnN1YnNjcmliZShjYWxsYmFjazogKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN1YnNjcmliZXJzLmluZGV4T2YoY2FsbGJhY2ssIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeSA9IChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnB1c2goY2hhbmdlcyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBzdWJzY3JpYmVyIG9mIHRoaXMuc3Vic2NyaWJlcnMpIHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlcihjaGFuZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=