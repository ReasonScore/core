"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Score = void 0;

var _Type = require("./Type");

var _newId = require("../newId");

var _End = _interopRequireDefault(require("./End"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
var Score = function Score() {
  var confidence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var relevance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _newId.newId)();
  var sourceClaimId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _newId.newId)();
  var version = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _newId.newId)();
  var start = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Date().toISOString();
  var end = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _End["default"];

  _classCallCheck(this, Score);

  this.confidence = confidence;
  this.relevance = relevance;
  this.id = id;
  this.sourceClaimId = sourceClaimId;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.score);
};

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uZmlkZW5jZSIsInJlbGV2YW5jZSIsImlkIiwic291cmNlQ2xhaW1JZCIsInZlcnNpb24iLCJzdGFydCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVuZCIsIkVuZCIsIlR5cGUiLCJzY29yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBOzs7O0lBSWFBLEssR0FHVCxpQkFZRTtBQUFBLE1BVlNDLFVBVVQsdUVBVjhCLENBVTlCO0FBQUEsTUFQU0MsU0FPVCx1RUFQNkIsQ0FPN0I7QUFBQSxNQU5TQyxFQU1ULHVFQU5rQixtQkFNbEI7QUFBQSxNQUpTQyxhQUlULHVFQUo2QixtQkFJN0I7QUFBQSxNQUhTQyxPQUdULHVFQUh1QixtQkFHdkI7QUFBQSxNQUZTQyxLQUVULHVFQUZ5QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFFekI7QUFBQSxNQURTQyxHQUNULHVFQUR1QkMsZUFDdkI7O0FBQUE7O0FBQUEsT0FWU1QsVUFVVCxHQVZTQSxVQVVUO0FBQUEsT0FQU0MsU0FPVCxHQVBTQSxTQU9UO0FBQUEsT0FOU0MsRUFNVCxHQU5TQSxFQU1UO0FBQUEsT0FKU0MsYUFJVCxHQUpTQSxhQUlUO0FBQUEsT0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0csR0FDVCxHQURTQSxHQUNUOztBQUFBLGdDQWRXRSxXQUFLQyxLQWNoQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcbmltcG9ydCB7IG5ld0lkIH0gZnJvbSBcIi4uL25ld0lkXCI7XG5pbXBvcnQgRW5kIGZyb20gXCIuL0VuZFwiO1xuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9JZFwiO1xuLyoqXG4gKiBTdG9yZXMgdGhlIHNjb3JlIGZvciBhIGNsYWltLiBKdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3QuIERvZXMgbm90IGNvbnRhaW4gYW55IGxvZ2ljLlxuICogVXN1YWxseSB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYSB2aWV3IG9mIHRoZSBjbGFpbSBvciBhbm90aGVyIGNsYWltXG4gKi9cbmV4cG9ydCBjbGFzcyBTY29yZSBpbXBsZW1lbnRzIEl0ZW0ge1xuICAgIHR5cGU6IFR5cGUgPSBUeXBlLnNjb3JlXG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKiBob3cgY29uZmlkZW50IHdlIHNvdWxkIGJlIGluIHRoZSBjbGFpbS4gKEFLQSBUcnVlKSAqL1xuICAgICAgICBwdWJsaWMgY29uZmlkZW5jZTogbnVtYmVyID0gMSxcbiAgICAgICAgLyoqIEhvdyByZWxldmVudCB0aGlzIGNsYWltIGlzIHRvIGl0J3MgcGFyZW50IGNsYWltLiBSYW5nZXMgZnJvbSAwIHRvIGluZmluaXR5LlxuICAgICAgICAgKiBBIG11bHRpcGxpZXIgc2V0IGJ5IGFsbCB0aGUgY2hpbGQgZWRnZXMgdGhhdCBhZmZlY3QgJ3JlbGV2YW5jZScqL1xuICAgICAgICBwdWJsaWMgcmVsZXZhbmNlOiBudW1iZXIgPSAxLFxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcbiAgICAgICAgLyoqIFRoZSBjbGFpbSB0byB3aGljaCB0aGlzIHNjb3JlIGJlbG9uZ3MgKi9cbiAgICAgICAgcHVibGljIHNvdXJjZUNsYWltSWQ6IElkID0gbmV3SWQoKSxcbiAgICAgICAgcHVibGljIHZlcnNpb246IElkID0gbmV3SWQoKSxcbiAgICAgICAgcHVibGljIHN0YXJ0OiBzdHJpbmcgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcbiAgICApIHtcbiAgICB9XG5cbn0iXX0=