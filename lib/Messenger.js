"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messenger = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Messenger {
  constructor() {
    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "actionsLog", []);

    _defineProperty(this, "notify", actions => {
      this.actionsLog.push(actions);

      for (const subscriber of this.subscribers) {
        subscriber(actions);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTWVzc2VuZ2VyIiwiYWN0aW9ucyIsImFjdGlvbnNMb2ciLCJwdXNoIiwic3Vic2NyaWJlciIsInN1YnNjcmliZXJzIiwic3Vic2NyaWJlIiwiY2FsbGJhY2siLCJ1bnN1YnNjcmliZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRU8sTUFBTUEsU0FBTixDQUFnQjtBQUFBO0FBQUEseUNBQzZDLEVBRDdDOztBQUFBLHdDQUVzQixFQUZ0Qjs7QUFBQSxvQ0FnQlRDLE9BQUQsSUFBdUI7QUFDNUIsV0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUJGLE9BQXJCOztBQUNBLFdBQUssTUFBTUcsVUFBWCxJQUF5QixLQUFLQyxXQUE5QixFQUEyQztBQUN2Q0QsUUFBQUEsVUFBVSxDQUFDSCxPQUFELENBQVY7QUFDSDtBQUNKLEtBckJrQjtBQUFBOztBQUluQkssRUFBQUEsU0FBUyxDQUFDQyxRQUFELEVBQThDO0FBQ25ELFNBQUtGLFdBQUwsQ0FBaUJGLElBQWpCLENBQXNCSSxRQUF0QjtBQUNIOztBQUVEQyxFQUFBQSxXQUFXLENBQUNELFFBQUQsRUFBOEM7QUFDckQsVUFBTUUsS0FBSyxHQUFHLEtBQUtKLFdBQUwsQ0FBaUJLLE9BQWpCLENBQXlCSCxRQUF6QixFQUFtQyxDQUFuQyxDQUFkOztBQUNBLFFBQUlFLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7QUFDWixXQUFLSixXQUFMLENBQWlCTSxNQUFqQixDQUF3QkYsS0FBeEIsRUFBK0IsQ0FBL0I7QUFDSDtBQUNKO0FBRUQ7OztBQWZtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdWJzY3JpYmVyczogeyAoY2hhbmdlczogQWN0aW9uW10pOiB2b2lkOyB9W10gPSBbXVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGFjdGlvbnNMb2c6IEFjdGlvbltdW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoY2FsbGJhY2s6IChhY3Rpb25zOiBBY3Rpb25bXSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjaylcclxuICAgIH1cclxuXHJcbiAgICB1bnN1YnNjcmliZShjYWxsYmFjazogKGFjdGlvbnM6IEFjdGlvbltdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN1YnNjcmliZXJzLmluZGV4T2YoY2FsbGJhY2ssIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeSA9IChhY3Rpb25zOiBBY3Rpb25bXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uc0xvZy5wdXNoKGFjdGlvbnMpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc3Vic2NyaWJlciBvZiB0aGlzLnN1YnNjcmliZXJzKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXIoYWN0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19