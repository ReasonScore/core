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
 * Stores the relationship between two claims.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
var ClaimEdge = function ClaimEdge() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _Id.ID)("");
  var childId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _Id.ID)("");
  var affects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Affects.Affects.Confidence;
  var pro = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _newId.newId)();
  var priority = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var version = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : (0, _newId.newId)();
  var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Date().toISOString();
  var end = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _End["default"];

  _classCallCheck(this, ClaimEdge);

  this.parentId = parentId;
  this.childId = childId;
  this.affects = affects;
  this.pro = pro;
  this.id = id;
  this.priority = priority;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.claimEdge);
};
/** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
//public reversible: boolean = false,


exports.ClaimEdge = ClaimEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJhZmZlY3RzIiwiQWZmZWN0cyIsIkNvbmZpZGVuY2UiLCJwcm8iLCJpZCIsInByaW9yaXR5IiwidmVyc2lvbiIsInN0YXJ0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZW5kIiwiRW5kIiwiVHlwZSIsImNsYWltRWRnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUNBOzs7Ozs7SUFNYUEsUyxHQUdULHFCQWNFO0FBQUEsTUFaU0MsUUFZVCx1RUFad0IsWUFBRyxFQUFILENBWXhCO0FBQUEsTUFWU0MsT0FVVCx1RUFWdUIsWUFBRyxFQUFILENBVXZCO0FBQUEsTUFSU0MsT0FRVCx1RUFSNEJDLGlCQUFRQyxVQVFwQztBQUFBLE1BTlNDLEdBTVQsdUVBTndCLElBTXhCO0FBQUEsTUFMU0MsRUFLVCx1RUFMa0IsbUJBS2xCO0FBQUEsTUFKU0MsUUFJVCx1RUFKNEIsRUFJNUI7QUFBQSxNQUhTQyxPQUdULHVFQUh1QixtQkFHdkI7QUFBQSxNQUZTQyxLQUVULHVFQUZ5QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFFekI7QUFBQSxNQURTQyxHQUNULHVFQUR1QkMsZUFDdkI7O0FBQUE7O0FBQUEsT0FaU2IsUUFZVCxHQVpTQSxRQVlUO0FBQUEsT0FWU0MsT0FVVCxHQVZTQSxPQVVUO0FBQUEsT0FSU0MsT0FRVCxHQVJTQSxPQVFUO0FBQUEsT0FOU0csR0FNVCxHQU5TQSxHQU1UO0FBQUEsT0FMU0MsRUFLVCxHQUxTQSxFQUtUO0FBQUEsT0FKU0MsUUFJVCxHQUpTQSxRQUlUO0FBQUEsT0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0csR0FDVCxHQURTQSxHQUNUOztBQUFBLGdDQWhCV0UsV0FBS0MsU0FnQmhCO0FBQ0QsQztBQUdHO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vRW5kXCJcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vSWRcIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIGNsYWltcy5cclxuICogVGhpcyBpcyBkaXJlY3Rpb25hbCBhcyB0aGUgZWRnZSBwb2ludHMgZnJvbSBvbmUgY2xhaW0gdG8gYW5vdGhlci5cclxuICogVGhpcyBpcyBqdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3Qgc28gaXQgc2hvdWxkIGhhdmUgbm8gbG9naWMgaW4gaXRcclxuICogYW5kIG9ubHkgSlNPTiBjb21wYXRpYmxlIHR5cGVzIHN0cmluZywgbnVtYmVyLCBvYmplY3QsIGFycmF5LCBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2xhaW1FZGdlIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBUeXBlID0gVHlwZS5jbGFpbUVkZ2VcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIHBhcmVudCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIHRvICovXHJcbiAgICAgICAgcHVibGljIHBhcmVudElkOiBJZCA9IElEKFwiXCIpLFxyXG4gICAgICAgIC8qKiBUaGUgSUQgZm9yIHRoZSBjaGlsZCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIGZyb20gKi9cclxuICAgICAgICBwdWJsaWMgY2hpbGRJZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICAvKiogSG93IHRoZSBjaGlsZCBhZmZlY3RzIHRoZSBwYXJlbnQuIE9mdGVuIHdoYXQgbWF0aCBpcyBkb25lIHdpdGggd2hlbiB1c2luZyB0aGlzIGVkZ2UgaW4gZ2VuZXJhdGluZyB0aGUgc2NvcmUgKi9cclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyA9IEFmZmVjdHMuQ29uZmlkZW5jZSxcclxuICAgICAgICAvKiogSXMgdGhlIGNoaWxkIGNsYWltIGEgcHJvIG9mIGl0J3MgcGFyZW50IChmYWxzZSBpZiBpdCBpcyBhIGNvbikgKi9cclxuICAgICAgICBwdWJsaWMgcHJvOiBib29sZWFuID0gdHJ1ZSxcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcHJpb3JpdHk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIHZlcnNpb246IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgc3RhcnQ6IHN0cmluZyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICBwdWJsaWMgZW5kOiBzdHJpbmcgPSBFbmQsXHJcbiAgICApIHtcclxuICAgIH1cclxufVxyXG5cclxuICAgICAgICAvKiogQ2FuIHRoZSBzY29yZSBmb3IgdGhpcyBlZGdlIGZhbGwgYmVsb3cgYSAwIGNvbmZpZGVuY2UgKGhhdmUgYSBuZWdhdGl2ZSBjb25maWRlbmNlKSAqL1xyXG4gICAgICAgIC8vcHVibGljIHJldmVyc2libGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuIl19