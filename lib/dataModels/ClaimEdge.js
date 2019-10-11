"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClaimEdge = void 0;

var _Affects = require("./Affects");

var _Type = require("./Type");

var _End = _interopRequireDefault(require("./End"));

var _newId = require("../newId");

var _Id = require("./Id");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the relationship between two claims in a specific scope.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
var ClaimEdge = function ClaimEdge() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _Id.ID)("");
  var childId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _Id.ID)("");
  var scopeId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _Id.ID)("");
  var affects = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Affects.Affects.Confidence;
  var pro = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _newId.newId)();
  var version = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : (0, _newId.newId)();
  var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Date().toISOString();
  var end = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _End["default"];

  _classCallCheck(this, ClaimEdge);

  this.parentId = parentId;
  this.childId = childId;
  this.scopeId = scopeId;
  this.affects = affects;
  this.pro = pro;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.claimEdge);
};
/** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
//public reversable: boolean = false,


exports.ClaimEdge = ClaimEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJzY29wZUlkIiwiYWZmZWN0cyIsIkFmZmVjdHMiLCJDb25maWRlbmNlIiwicHJvIiwiaWQiLCJ2ZXJzaW9uIiwic3RhcnQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJlbmQiLCJFbmQiLCJUeXBlIiwiY2xhaW1FZGdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7Ozs7OztJQU1hQSxTLEdBR1QscUJBZUU7QUFBQSxNQWJTQyxRQWFULHVFQWJ3QixZQUFHLEVBQUgsQ0FheEI7QUFBQSxNQVhTQyxPQVdULHVFQVh1QixZQUFHLEVBQUgsQ0FXdkI7QUFBQSxNQVRTQyxPQVNULHVFQVR1QixZQUFHLEVBQUgsQ0FTdkI7QUFBQSxNQVBTQyxPQU9ULHVFQVA0QkMsaUJBQVFDLFVBT3BDO0FBQUEsTUFMU0MsR0FLVCx1RUFMd0IsSUFLeEI7QUFBQSxNQUpTQyxFQUlULHVFQUprQixtQkFJbEI7QUFBQSxNQUhTQyxPQUdULHVFQUh1QixtQkFHdkI7QUFBQSxNQUZTQyxLQUVULHVFQUZ5QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFFekI7QUFBQSxNQURTQyxHQUNULHVFQUR1QkMsZUFDdkI7O0FBQUE7O0FBQUEsT0FiU2IsUUFhVCxHQWJTQSxRQWFUO0FBQUEsT0FYU0MsT0FXVCxHQVhTQSxPQVdUO0FBQUEsT0FUU0MsT0FTVCxHQVRTQSxPQVNUO0FBQUEsT0FQU0MsT0FPVCxHQVBTQSxPQU9UO0FBQUEsT0FMU0csR0FLVCxHQUxTQSxHQUtUO0FBQUEsT0FKU0MsRUFJVCxHQUpTQSxFQUlUO0FBQUEsT0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0csR0FDVCxHQURTQSxHQUNUOztBQUFBLGdDQWpCV0UsV0FBS0MsU0FpQmhCO0FBQ0QsQztBQUdHO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vRW5kXCJcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vSWRcIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIGNsYWltcyBpbiBhIHNwZWNpZmljIHNjb3BlLlxyXG4gKiBUaGlzIGlzIGRpcmVjdGlvbmFsIGFzIHRoZSBlZGdlIHBvaW50cyBmcm9tIG9uZSBjbGFpbSB0byBhbm90aGVyLlxyXG4gKiBUaGlzIGlzIGp1c3QgYSBkYXRhIHRyYW5zZmVyIG9iamVjdCBzbyBpdCBzaG91bGQgaGF2ZSBubyBsb2dpYyBpbiBpdFxyXG4gKiBhbmQgb25seSBKU09OIGNvbXBhdGlibGUgdHlwZXMgc3RyaW5nLCBudW1iZXIsIG9iamVjdCwgYXJyYXksIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDbGFpbUVkZ2UgaW1wbGVtZW50cyBJdGVtIHtcclxuICAgIHR5cGU6IFR5cGUgPSBUeXBlLmNsYWltRWRnZVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgcGFyZW50IGNsYWltIHRoaXMgZWRnZSBwb2ludHMgdG8gKi9cclxuICAgICAgICBwdWJsaWMgcGFyZW50SWQ6IElkID0gSUQoXCJcIiksXHJcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIGNoaWxkIGNsYWltIHRoaXMgZWRnZSBwb2ludHMgZnJvbSAqL1xyXG4gICAgICAgIHB1YmxpYyBjaGlsZElkOiBJZCA9IElEKFwiXCIpLFxyXG4gICAgICAgIC8qKiBXaGF0IGNsYWltSWQgbmVlZCB0byBiZSBhbiBhbmNlc3RvciBvZiB0aGlzIGVkZ2UgZm9yIHRoaXMgZWRnZSB0byBiZSBkaXNwbGF5ZWQgb3IgdXNlZCBpbiB0aGUgY2FsY3VsYXRpb25zKi9cclxuICAgICAgICBwdWJsaWMgc2NvcGVJZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICAvKiogSG93IHRoZSBjaGlsZCBhZmZlY3RzIHRoZSBwYXJlbnQuIE9mdGVuIHdoYXQgbWF0aCBpcyBkb25lIHdpdGggd2hlbiB1c2luZyB0aGlzIGVkZ2UgaW4gZ2VuZXJhdGluZyB0aGUgc2NvcmUgKi9cclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyA9IEFmZmVjdHMuQ29uZmlkZW5jZSxcclxuICAgICAgICAvKiogSXMgdGhlIGNoaWxkIGNsYWltIGEgcHJvIG9mIGl0J3MgcGFyZW50IChmYWxzZSBpZiBpdCBpcyBhIGNvbikgKi9cclxuICAgICAgICBwdWJsaWMgcHJvOiBib29sZWFuID0gdHJ1ZSxcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIC8qKiBDYW4gdGhlIHNjb3JlIGZvciB0aGlzIGVkZ2UgZmFsbCBiZWxvdyBhIDAgY29uZmlkZW5jZSAoaGF2ZSBhIG5lZ2F0aXZlIGNvbmZpZGVuY2UpICovXHJcbiAgICAgICAgLy9wdWJsaWMgcmV2ZXJzYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4iXX0=