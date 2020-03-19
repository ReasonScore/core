"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messenger = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Messenger {
  constructor() {
    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "log", []);

    _defineProperty(this, "notify", changes => {
      this.log.push(changes);

      for (const subscriber of this.subscribers) {
        subscriber(changes);
      }
    });
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback, 0);

    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
  /** this function can be called by outside code to notfy this repository of changes */


}

exports.Messenger = Messenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJzdWJzY3JpYmVyIiwic3Vic2NyaWJlcnMiLCJzdWJzY3JpYmUiLCJjYWxsYmFjayIsInVuc3Vic2NyaWJlIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFTyxNQUFNQSxTQUFOLENBQWdCO0FBQUE7QUFBQSx5Q0FDNkMsRUFEN0M7O0FBQUEsaUNBRWUsRUFGZjs7QUFBQSxvQ0FnQlRDLE9BQUQsSUFBdUI7QUFDNUIsV0FBS0MsR0FBTCxDQUFTQyxJQUFULENBQWNGLE9BQWQ7O0FBQ0EsV0FBSyxNQUFNRyxVQUFYLElBQXlCLEtBQUtDLFdBQTlCLEVBQTJDO0FBQ3ZDRCxRQUFBQSxVQUFVLENBQUNILE9BQUQsQ0FBVjtBQUNIO0FBQ0osS0FyQmtCO0FBQUE7O0FBSW5CSyxFQUFBQSxTQUFTLENBQUNDLFFBQUQsRUFBOEM7QUFDbkQsU0FBS0YsV0FBTCxDQUFpQkYsSUFBakIsQ0FBc0JJLFFBQXRCO0FBQ0g7O0FBRURDLEVBQUFBLFdBQVcsQ0FBQ0QsUUFBRCxFQUE4QztBQUNyRCxVQUFNRSxLQUFLLEdBQUcsS0FBS0osV0FBTCxDQUFpQkssT0FBakIsQ0FBeUJILFFBQXpCLEVBQW1DLENBQW5DLENBQWQ7O0FBQ0EsUUFBSUUsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtBQUNaLFdBQUtKLFdBQUwsQ0FBaUJNLE1BQWpCLENBQXdCRixLQUF4QixFQUErQixDQUEvQjtBQUNIO0FBQ0o7QUFFRDs7O0FBZm1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9BY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1YnNjcmliZXJzOiB7IChjaGFuZ2VzOiBBY3Rpb25bXSk6IHZvaWQ7IH1bXSA9IFtdXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBBY3Rpb25bXVtdID0gW107XHJcblxyXG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrOiAoY2hhbmdlczogQWN0aW9uW10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spXHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUoY2FsbGJhY2s6IChjaGFuZ2VzOiBBY3Rpb25bXSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdWJzY3JpYmVycy5pbmRleE9mKGNhbGxiYWNrLCAwKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkgPSAoY2hhbmdlczogQWN0aW9uW10pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5wdXNoKGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc3Vic2NyaWJlciBvZiB0aGlzLnN1YnNjcmliZXJzKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXIoY2hhbmdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19