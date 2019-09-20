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
  var scopeId = arguments.length > 4 ? arguments[4] : undefined;
  var version = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _newId.newId)();
  var start = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Date().toISOString();
  var end = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _End["default"];

  _classCallCheck(this, Score);

  this.confidence = confidence;
  this.relevance = relevance;
  this.id = id;
  this.sourceClaimId = sourceClaimId;
  this.scopeId = scopeId;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", _Type.Type.score);
};

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uZmlkZW5jZSIsInJlbGV2YW5jZSIsImlkIiwic291cmNlQ2xhaW1JZCIsInNjb3BlSWQiLCJ2ZXJzaW9uIiwic3RhcnQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJlbmQiLCJFbmQiLCJUeXBlIiwic2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7OztJQUlhQSxLLEdBR1QsaUJBY0U7QUFBQSxNQVpTQyxVQVlULHVFQVo4QixDQVk5QjtBQUFBLE1BVFNDLFNBU1QsdUVBVDZCLENBUzdCO0FBQUEsTUFSU0MsRUFRVCx1RUFSa0IsbUJBUWxCO0FBQUEsTUFOU0MsYUFNVCx1RUFONkIsbUJBTTdCO0FBQUEsTUFKU0MsT0FJVDtBQUFBLE1BSFNDLE9BR1QsdUVBSHVCLG1CQUd2QjtBQUFBLE1BRlNDLEtBRVQsdUVBRnlCLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUV6QjtBQUFBLE1BRFNDLEdBQ1QsdUVBRHVCQyxlQUN2Qjs7QUFBQTs7QUFBQSxPQVpTVixVQVlULEdBWlNBLFVBWVQ7QUFBQSxPQVRTQyxTQVNULEdBVFNBLFNBU1Q7QUFBQSxPQVJTQyxFQVFULEdBUlNBLEVBUVQ7QUFBQSxPQU5TQyxhQU1ULEdBTlNBLGFBTVQ7QUFBQSxPQUpTQyxPQUlULEdBSlNBLE9BSVQ7QUFBQSxPQUhTQyxPQUdULEdBSFNBLE9BR1Q7QUFBQSxPQUZTQyxLQUVULEdBRlNBLEtBRVQ7QUFBQSxPQURTRyxHQUNULEdBRFNBLEdBQ1Q7O0FBQUEsZ0NBaEJXRSxXQUFLQyxLQWdCaEI7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZmZWN0cyB9IGZyb20gXCIuL0FmZmVjdHNcIlxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0l0ZW1cIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlXCI7XG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xuaW1wb3J0IEVuZCBmcm9tIFwiLi9FbmRcIjtcbmltcG9ydCB7IElkIH0gZnJvbSBcIi4vSWRcIjtcbi8qKlxuICogU3RvcmVzIHRoZSBzY29yZSBmb3IgYSBjbGFpbS4gSnVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0LiBEb2VzIG5vdCBjb250YWluIGFueSBsb2dpYy5cbiAqIFVzdWFsbHkgd2l0aGluIHRoZSBjb250ZXh0IG9mIGEgdmlldyBvZiB0aGUgY2xhaW0gb3IgYW5vdGhlciBjbGFpbVxuICovXG5leHBvcnQgY2xhc3MgU2NvcmUgaW1wbGVtZW50cyBJdGVtIHtcbiAgICB0eXBlOiBUeXBlID0gVHlwZS5zY29yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKiogaG93IGNvbmZpZGVudCB3ZSBzb3VsZCBiZSBpbiB0aGUgY2xhaW0uIChBS0EgVHJ1ZSkgKi9cbiAgICAgICAgcHVibGljIGNvbmZpZGVuY2U6IG51bWJlciA9IDEsXG4gICAgICAgIC8qKiBIb3cgcmVsZXZlbnQgdGhpcyBjbGFpbSBpcyB0byBpdCdzIHBhcmVudCBjbGFpbS4gUmFuZ2VzIGZyb20gMCB0byBpbmZpbml0eS5cbiAgICAgICAgICogQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnKi9cbiAgICAgICAgcHVibGljIHJlbGV2YW5jZTogbnVtYmVyID0gMSxcbiAgICAgICAgcHVibGljIGlkOiBJZCA9IG5ld0lkKCksXG4gICAgICAgIC8qKiBUaGUgY2xhaW0gdG8gd2hpY2ggdGhpcyBzY29yZSBiZWxvbmdzICovXG4gICAgICAgIHB1YmxpYyBzb3VyY2VDbGFpbUlkOiBJZCA9IG5ld0lkKCksXG4gICAgICAgIC8qKiBJZiB0aGlzIHNjb3JlIGlzIGNhbHVsYXRlZCB1bmRlciBhIHNjb3BlIHRoaXMgd2lsbCBiZSB0aGUgSUQgb2YgdGhlIHNjb3BlICovXG4gICAgICAgIHB1YmxpYyBzY29wZUlkPzogSWQsXG4gICAgICAgIHB1YmxpYyB2ZXJzaW9uOiBJZCA9IG5ld0lkKCksXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBwdWJsaWMgZW5kOiBzdHJpbmcgPSBFbmQsXG4gICAgKSB7XG4gICAgfVxuXG59Il19