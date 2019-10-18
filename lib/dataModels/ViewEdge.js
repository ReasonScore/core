"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewEdge = void 0;

var _Type = require("./Type");

var _newId = require("../newId");

var _End = _interopRequireDefault(require("./End"));

var _Id = require("./Id");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
var ViewEdge = function ViewEdge() {
  var topClaimId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _Id.ID)("");
  var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _Id.ID)("");
  var childId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _Id.ID)("");
  var claimEdgeID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _Id.ID)("");
  var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _newId.newId)();
  var version = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _newId.newId)();
  var start = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Date().toISOString();
  var end = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _End["default"];

  _classCallCheck(this, ViewEdge);

  this.topClaimId = topClaimId;
  this.parentId = parentId;
  this.childId = childId;
  this.claimEdgeID = claimEdgeID;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.viewEdge);
};

exports.ViewEdge = ViewEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1ZpZXdFZGdlLnRzIl0sIm5hbWVzIjpbIlZpZXdFZGdlIiwidG9wQ2xhaW1JZCIsInBhcmVudElkIiwiY2hpbGRJZCIsImNsYWltRWRnZUlEIiwiaWQiLCJ2ZXJzaW9uIiwic3RhcnQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJlbmQiLCJFbmQiLCJUeXBlIiwidmlld0VkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7SUFLYUEsUSxHQUdULG9CQVlFO0FBQUEsTUFYU0MsVUFXVCx1RUFYMEIsWUFBRyxFQUFILENBVzFCO0FBQUEsTUFUU0MsUUFTVCx1RUFUd0IsWUFBRyxFQUFILENBU3hCO0FBQUEsTUFQU0MsT0FPVCx1RUFQdUIsWUFBRyxFQUFILENBT3ZCO0FBQUEsTUFOU0MsV0FNVCx1RUFOMkIsWUFBRyxFQUFILENBTTNCO0FBQUEsTUFKU0MsRUFJVCx1RUFKa0IsbUJBSWxCO0FBQUEsTUFIU0MsT0FHVCx1RUFIdUIsbUJBR3ZCO0FBQUEsTUFGU0MsS0FFVCx1RUFGeUIsSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBRXpCO0FBQUEsTUFEU0MsR0FDVCx1RUFEdUJDLGVBQ3ZCOztBQUFBOztBQUFBLE9BWFNWLFVBV1QsR0FYU0EsVUFXVDtBQUFBLE9BVFNDLFFBU1QsR0FUU0EsUUFTVDtBQUFBLE9BUFNDLE9BT1QsR0FQU0EsT0FPVDtBQUFBLE9BTlNDLFdBTVQsR0FOU0EsV0FNVDtBQUFBLE9BSlNDLEVBSVQsR0FKU0EsRUFJVDtBQUFBLE9BSFNDLE9BR1QsR0FIU0EsT0FHVDtBQUFBLE9BRlNDLEtBRVQsR0FGU0EsS0FFVDtBQUFBLE9BRFNHLEdBQ1QsR0FEU0EsR0FDVDs7QUFBQSxnQ0FkV0UsV0FBS0MsUUFjaEI7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0l0ZW1cIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IEVuZCBmcm9tIFwiLi9FbmRcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vSWRcIjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHR3byB2aWV3IG5vZGVzIHRoYXQgYXJlIGNoaWxkcmVuIG9mIGEgdG9wIGNsYWltXHJcbiAqIFRoaXMgaXMgZGlyZWN0aW9uYWwgYXMgdGhlIGVkZ2UgcG9pbnRzIGZyb20gb25lIGNsYWltIHRvIGFub3RoZXIuXHJcbiAqIFRoaXMgaXMganVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0IHNvIGl0IHNob3VsZCBoYXZlIG5vIGxvZ2ljIGluIGl0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZpZXdFZGdlIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBUeXBlID0gVHlwZS52aWV3RWRnZVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdG9wQ2xhaW1JZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgcGFyZW50IFZpZXcgdGhpcyBlZGdlIHBvaW50cyB0byAqL1xyXG4gICAgICAgIHB1YmxpYyBwYXJlbnRJZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgY2hpbGQgVmlldyB0aGlzIGVkZ2UgcG9pbnRzIGZyb20gKi9cclxuICAgICAgICBwdWJsaWMgY2hpbGRJZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICBwdWJsaWMgY2xhaW1FZGdlSUQ6IElkID0gSUQoXCJcIiksXHJcbiAgICAgICAgLyoqIFRoaXMgVmlld0VkZ2UgSUQgV2lsbCBtYXRjaCB0aGUgdG9wQ2xhaW1JRCBpZiB0aGlzIGlzIHRoZSB0b3Agdmlld0VkZ2UgKi9cclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcclxuICAgICkge1xyXG4gICAgfVxyXG59Il19