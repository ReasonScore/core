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
  var version = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _newId.newId)();
  var start = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Date().toISOString();
  var end = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _End["default"];

  _classCallCheck(this, ClaimEdge);

  this.parentId = parentId;
  this.childId = childId;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJhZmZlY3RzIiwiQWZmZWN0cyIsIkNvbmZpZGVuY2UiLCJwcm8iLCJpZCIsInZlcnNpb24iLCJzdGFydCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVuZCIsIkVuZCIsIlR5cGUiLCJjbGFpbUVkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFDQTs7Ozs7O0lBTWFBLFMsR0FHVCxxQkFhRTtBQUFBLE1BWFNDLFFBV1QsdUVBWHdCLFlBQUcsRUFBSCxDQVd4QjtBQUFBLE1BVFNDLE9BU1QsdUVBVHVCLFlBQUcsRUFBSCxDQVN2QjtBQUFBLE1BUFNDLE9BT1QsdUVBUDRCQyxpQkFBUUMsVUFPcEM7QUFBQSxNQUxTQyxHQUtULHVFQUx3QixJQUt4QjtBQUFBLE1BSlNDLEVBSVQsdUVBSmtCLG1CQUlsQjtBQUFBLE1BSFNDLE9BR1QsdUVBSHVCLG1CQUd2QjtBQUFBLE1BRlNDLEtBRVQsdUVBRnlCLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUV6QjtBQUFBLE1BRFNDLEdBQ1QsdUVBRHVCQyxlQUN2Qjs7QUFBQTs7QUFBQSxPQVhTWixRQVdULEdBWFNBLFFBV1Q7QUFBQSxPQVRTQyxPQVNULEdBVFNBLE9BU1Q7QUFBQSxPQVBTQyxPQU9ULEdBUFNBLE9BT1Q7QUFBQSxPQUxTRyxHQUtULEdBTFNBLEdBS1Q7QUFBQSxPQUpTQyxFQUlULEdBSlNBLEVBSVQ7QUFBQSxPQUhTQyxPQUdULEdBSFNBLE9BR1Q7QUFBQSxPQUZTQyxLQUVULEdBRlNBLEtBRVQ7QUFBQSxPQURTRyxHQUNULEdBRFNBLEdBQ1Q7O0FBQUEsZ0NBZldFLFdBQUtDLFNBZWhCO0FBQ0QsQztBQUdHO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vRW5kXCJcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vSWRcIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIGNsYWltcy5cclxuICogVGhpcyBpcyBkaXJlY3Rpb25hbCBhcyB0aGUgZWRnZSBwb2ludHMgZnJvbSBvbmUgY2xhaW0gdG8gYW5vdGhlci5cclxuICogVGhpcyBpcyBqdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3Qgc28gaXQgc2hvdWxkIGhhdmUgbm8gbG9naWMgaW4gaXRcclxuICogYW5kIG9ubHkgSlNPTiBjb21wYXRpYmxlIHR5cGVzIHN0cmluZywgbnVtYmVyLCBvYmplY3QsIGFycmF5LCBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2xhaW1FZGdlIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBUeXBlID0gVHlwZS5jbGFpbUVkZ2VcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIHBhcmVudCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIHRvICovXHJcbiAgICAgICAgcHVibGljIHBhcmVudElkOiBJZCA9IElEKFwiXCIpLFxyXG4gICAgICAgIC8qKiBUaGUgSUQgZm9yIHRoZSBjaGlsZCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIGZyb20gKi9cclxuICAgICAgICBwdWJsaWMgY2hpbGRJZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICAvKiogSG93IHRoZSBjaGlsZCBhZmZlY3RzIHRoZSBwYXJlbnQuIE9mdGVuIHdoYXQgbWF0aCBpcyBkb25lIHdpdGggd2hlbiB1c2luZyB0aGlzIGVkZ2UgaW4gZ2VuZXJhdGluZyB0aGUgc2NvcmUgKi9cclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyA9IEFmZmVjdHMuQ29uZmlkZW5jZSxcclxuICAgICAgICAvKiogSXMgdGhlIGNoaWxkIGNsYWltIGEgcHJvIG9mIGl0J3MgcGFyZW50IChmYWxzZSBpZiBpdCBpcyBhIGNvbikgKi9cclxuICAgICAgICBwdWJsaWMgcHJvOiBib29sZWFuID0gdHJ1ZSxcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIC8qKiBDYW4gdGhlIHNjb3JlIGZvciB0aGlzIGVkZ2UgZmFsbCBiZWxvdyBhIDAgY29uZmlkZW5jZSAoaGF2ZSBhIG5lZ2F0aXZlIGNvbmZpZGVuY2UpICovXHJcbiAgICAgICAgLy9wdWJsaWMgcmV2ZXJzYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4iXX0=