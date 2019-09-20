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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJzY29wZUlkIiwiYWZmZWN0cyIsIkFmZmVjdHMiLCJDb25maWRlbmNlIiwicHJvIiwiaWQiLCJ2ZXJzaW9uIiwic3RhcnQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJlbmQiLCJFbmQiLCJUeXBlIiwiY2xhaW1FZGdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7Ozs7OztJQU1hQSxTLEdBR1QscUJBZUU7QUFBQSxNQWJTQyxRQWFULHVFQWJ3QixZQUFHLEVBQUgsQ0FheEI7QUFBQSxNQVhTQyxPQVdULHVFQVh1QixZQUFHLEVBQUgsQ0FXdkI7QUFBQSxNQVRTQyxPQVNULHVFQVR1QixZQUFHLEVBQUgsQ0FTdkI7QUFBQSxNQVBTQyxPQU9ULHVFQVA0QkMsaUJBQVFDLFVBT3BDO0FBQUEsTUFMU0MsR0FLVCx1RUFMd0IsSUFLeEI7QUFBQSxNQUpTQyxFQUlULHVFQUprQixtQkFJbEI7QUFBQSxNQUhTQyxPQUdULHVFQUh1QixtQkFHdkI7QUFBQSxNQUZTQyxLQUVULHVFQUZ5QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFFekI7QUFBQSxNQURTQyxHQUNULHVFQUR1QkMsZUFDdkI7O0FBQUE7O0FBQUEsT0FiU2IsUUFhVCxHQWJTQSxRQWFUO0FBQUEsT0FYU0MsT0FXVCxHQVhTQSxPQVdUO0FBQUEsT0FUU0MsT0FTVCxHQVRTQSxPQVNUO0FBQUEsT0FQU0MsT0FPVCxHQVBTQSxPQU9UO0FBQUEsT0FMU0csR0FLVCxHQUxTQSxHQUtUO0FBQUEsT0FKU0MsRUFJVCxHQUpTQSxFQUlUO0FBQUEsT0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0csR0FDVCxHQURTQSxHQUNUOztBQUFBLGdDQWpCV0UsV0FBS0MsU0FpQmhCO0FBQ0QsQztBQUdHO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcbmltcG9ydCBFbmQgZnJvbSBcIi4vRW5kXCJcbmltcG9ydCB7IG5ld0lkIH0gZnJvbSBcIi4uL25ld0lkXCI7XG5pbXBvcnQgeyBJZCwgSUQgfSBmcm9tIFwiLi9JZFwiO1xuLyoqXG4gKiBTdG9yZXMgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHR3byBjbGFpbXMgaW4gYSBzcGVjaWZpYyBzY29wZS5cbiAqIFRoaXMgaXMgZGlyZWN0aW9uYWwgYXMgdGhlIGVkZ2UgcG9pbnRzIGZyb20gb25lIGNsYWltIHRvIGFub3RoZXIuXG4gKiBUaGlzIGlzIGp1c3QgYSBkYXRhIHRyYW5zZmVyIG9iamVjdCBzbyBpdCBzaG91bGQgaGF2ZSBubyBsb2dpYyBpbiBpdFxuICogYW5kIG9ubHkgSlNPTiBjb21wYXRpYmxlIHR5cGVzIHN0cmluZywgbnVtYmVyLCBvYmplY3QsIGFycmF5LCBib29sZWFuXG4gKi9cbmV4cG9ydCBjbGFzcyBDbGFpbUVkZ2UgaW1wbGVtZW50cyBJdGVtIHtcbiAgICB0eXBlOiBUeXBlID0gVHlwZS5jbGFpbUVkZ2VcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIHBhcmVudCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIHRvICovXG4gICAgICAgIHB1YmxpYyBwYXJlbnRJZDogSWQgPSBJRChcIlwiKSxcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIGNoaWxkIGNsYWltIHRoaXMgZWRnZSBwb2ludHMgZnJvbSAqL1xuICAgICAgICBwdWJsaWMgY2hpbGRJZDogSWQgPSBJRChcIlwiKSxcbiAgICAgICAgLyoqIFdoYXQgY2xhaW1JZCBuZWVkIHRvIGJlIGFuIGFuY2VzdG9yIG9mIHRoaXMgZWRnZSBmb3IgdGhpcyBlZGdlIHRvIGJlIGRpc3BsYXllZCBvciB1c2VkIGluIHRoZSBjYWxjdWxhdGlvbnMqL1xuICAgICAgICBwdWJsaWMgc2NvcGVJZDogSWQgPSBJRChcIlwiKSxcbiAgICAgICAgLyoqIEhvdyB0aGUgY2hpbGQgYWZmZWN0cyB0aGUgcGFyZW50LiBPZnRlbiB3aGF0IG1hdGggaXMgZG9uZSB3aXRoIHdoZW4gdXNpbmcgdGhpcyBlZGdlIGluIGdlbmVyYXRpbmcgdGhlIHNjb3JlICovXG4gICAgICAgIHB1YmxpYyBhZmZlY3RzOiBBZmZlY3RzID0gQWZmZWN0cy5Db25maWRlbmNlLFxuICAgICAgICAvKiogSXMgdGhlIGNoaWxkIGNsYWltIGEgcHJvIG9mIGl0J3MgcGFyZW50IChmYWxzZSBpZiBpdCBpcyBhIGNvbikgKi9cbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgIHB1YmxpYyBpZDogSWQgPSBuZXdJZCgpLFxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxuICAgICAgICBwdWJsaWMgc3RhcnQ6IHN0cmluZyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgcHVibGljIGVuZDogc3RyaW5nID0gRW5kLFxuICAgICkge1xuICAgIH1cbn1cblxuICAgICAgICAvKiogQ2FuIHRoZSBzY29yZSBmb3IgdGhpcyBlZGdlIGZhbGwgYmVsb3cgYSAwIGNvbmZpZGVuY2UgKGhhdmUgYSBuZWdhdGl2ZSBjb25maWRlbmNlKSAqL1xuICAgICAgICAvL3B1YmxpYyByZXZlcnNhYmxlOiBib29sZWFuID0gZmFsc2UsXG4iXX0=