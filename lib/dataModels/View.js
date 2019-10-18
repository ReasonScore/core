"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

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
var View = function View() {
  var topClaimId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _Id.ID)("");
  var claimId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _Id.ID)("");
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _newId.newId)();
  var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var scoreDisplay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var scoreId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _Id.ID)("");
  var version = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : (0, _newId.newId)();
  var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Date().toISOString();
  var end = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _End["default"];

  _classCallCheck(this, View);

  this.topClaimId = topClaimId;
  this.claimId = claimId;
  this.id = id;
  this.content = content;
  this.scoreDisplay = scoreDisplay;
  this.scoreId = scoreId;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.view);
};

exports.View = View;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1ZpZXcudHMiXSwibmFtZXMiOlsiVmlldyIsInRvcENsYWltSWQiLCJjbGFpbUlkIiwiaWQiLCJjb250ZW50Iiwic2NvcmVEaXNwbGF5Iiwic2NvcmVJZCIsInZlcnNpb24iLCJzdGFydCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVuZCIsIkVuZCIsIlR5cGUiLCJ2aWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS2FBLEksR0FHVCxnQkFhRTtBQUFBLE1BWlNDLFVBWVQsdUVBWjBCLFlBQUcsRUFBSCxDQVkxQjtBQUFBLE1BWFNDLE9BV1QsdUVBWHVCLFlBQUcsRUFBSCxDQVd2QjtBQUFBLE1BVlNDLEVBVVQsdUVBVmtCLG1CQVVsQjtBQUFBLE1BUFNDLE9BT1QsdUVBUDJCLEVBTzNCO0FBQUEsTUFOU0MsWUFNVCx1RUFOZ0MsRUFNaEM7QUFBQSxNQUxTQyxPQUtULHVFQUx1QixZQUFHLEVBQUgsQ0FLdkI7QUFBQSxNQUhTQyxPQUdULHVFQUh1QixtQkFHdkI7QUFBQSxNQUZTQyxLQUVULHVFQUZ5QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFFekI7QUFBQSxNQURTQyxHQUNULHVFQUR1QkMsZUFDdkI7O0FBQUE7O0FBQUEsT0FaU1gsVUFZVCxHQVpTQSxVQVlUO0FBQUEsT0FYU0MsT0FXVCxHQVhTQSxPQVdUO0FBQUEsT0FWU0MsRUFVVCxHQVZTQSxFQVVUO0FBQUEsT0FQU0MsT0FPVCxHQVBTQSxPQU9UO0FBQUEsT0FOU0MsWUFNVCxHQU5TQSxZQU1UO0FBQUEsT0FMU0MsT0FLVCxHQUxTQSxPQUtUO0FBQUEsT0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0csR0FDVCxHQURTQSxHQUNUOztBQUFBLGdDQWZXRSxXQUFLQyxJQWVoQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZVwiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5pbXBvcnQgRW5kIGZyb20gXCIuL0VuZFwiO1xyXG5pbXBvcnQgeyBJZCwgSUQgfSBmcm9tIFwiLi9JZFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIHZpZXcgbm9kZXMgdGhhdCBhcmUgY2hpbGRyZW4gb2YgYSB0b3AgY2xhaW1cclxuICogVGhpcyBpcyBkaXJlY3Rpb25hbCBhcyB0aGUgZWRnZSBwb2ludHMgZnJvbSBvbmUgY2xhaW0gdG8gYW5vdGhlci5cclxuICogVGhpcyBpcyBqdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3Qgc28gaXQgc2hvdWxkIGhhdmUgbm8gbG9naWMgaW4gaXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIEl0ZW0ge1xyXG4gICAgdHlwZTogVHlwZSA9IFR5cGUudmlld1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdG9wQ2xhaW1JZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICBwdWJsaWMgY2xhaW1JZDogSWQgPSBJRChcIlwiKSxcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgY2hpbGQgVmlldyB0aGlzIGVkZ2UgcG9pbnRzIGZyb20gKi9cclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgcGFyZW50IFZpZXcgdGhpcyBlZGdlIHBvaW50cyB0byAqL1xyXG4gICAgICAgIHB1YmxpYyBjb250ZW50OiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgIHB1YmxpYyBzY29yZURpc3BsYXk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIHNjb3JlSWQ6IElkID0gSUQoXCJcIiksXHJcbiAgICAgICAgLyoqIFRoaXMgVmlld0VkZ2UgSUQgV2lsbCBtYXRjaCB0aGUgdG9wQ2xhaW1JRCBpZiB0aGlzIGlzIHRoZSB0b3Agdmlld0VkZ2UgKi9cclxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcclxuICAgICkge1xyXG4gICAgfVxyXG59Il19