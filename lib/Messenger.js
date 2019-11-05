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
      delete this.subscribers[this.subscribers.findIndex(function (item) {
        return item == callback;
      })];
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }]);

  return Messenger;
}();

exports.Messenger = Messenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZXIiLCJjYWxsYmFjayIsImZpbmRJbmRleCIsIml0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxTOzs7Ozs7Ozt5Q0FDdUQsRTs7aUNBQzlCLEU7O29DQVd6QixVQUFDQyxPQUFELEVBQXVCO0FBQzVCLE1BQUEsS0FBSSxDQUFDQyxHQUFMLENBQVNDLElBQVQsQ0FBY0YsT0FBZDs7QUFENEI7QUFBQTtBQUFBOztBQUFBO0FBRTVCLDZCQUF5QixLQUFJLENBQUNHLFdBQTlCLDhIQUEyQztBQUFBLGNBQWhDQyxVQUFnQztBQUN2Q0EsVUFBQUEsVUFBVSxDQUFDSixPQUFELENBQVY7QUFDSDtBQUoyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSy9CLEs7Ozs7OzhCQWRTSyxRLEVBQTZDO0FBQ25ELFdBQUtGLFdBQUwsQ0FBaUJELElBQWpCLENBQXNCRyxRQUF0QjtBQUNIOzs7Z0NBRVdBLFEsRUFBNkM7QUFDckQsYUFBTyxLQUFLRixXQUFMLENBQWlCLEtBQUtBLFdBQUwsQ0FBaUJHLFNBQWpCLENBQTJCLFVBQUFDLElBQUk7QUFBQSxlQUFJQSxJQUFJLElBQUlGLFFBQVo7QUFBQSxPQUEvQixDQUFqQixDQUFQO0FBQ0g7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2hhbmdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdWJzY3JpYmVyczogeyAoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkOyB9W10gPSBbXVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIHN1YnNjcmliZShjYWxsYmFjazogKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKGNhbGxiYWNrOiAoY2hhbmdlczogQ2hhbmdlW10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5zdWJzY3JpYmVyc1t0aGlzLnN1YnNjcmliZXJzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0gPT0gY2FsbGJhY2spXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5ID0gKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucHVzaChjaGFuZ2VzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2YgdGhpcy5zdWJzY3JpYmVycykge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiB9XHJcblxyXG4iXX0=