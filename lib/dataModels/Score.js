"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.differentScores = differentScores;
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
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */


exports.Score = Score;

function differentScores(scoreA, scoreB) {
  return !(scoreA.confidence == scoreB.confidence && scoreA.relevance == scoreB.relevance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uZmlkZW5jZSIsInJlbGV2YW5jZSIsImlkIiwic291cmNlQ2xhaW1JZCIsInZlcnNpb24iLCJzdGFydCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVuZCIsIkVuZCIsIlR5cGUiLCJzY29yZSIsImRpZmZlcmVudFNjb3JlcyIsInNjb3JlQSIsInNjb3JlQiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7OztJQUlhQSxLLEdBR1QsaUJBWUU7QUFBQSxNQVZTQyxVQVVULHVFQVY4QixDQVU5QjtBQUFBLE1BUFNDLFNBT1QsdUVBUDZCLENBTzdCO0FBQUEsTUFOU0MsRUFNVCx1RUFOa0IsbUJBTWxCO0FBQUEsTUFKU0MsYUFJVCx1RUFKNkIsbUJBSTdCO0FBQUEsTUFIU0MsT0FHVCx1RUFIdUIsbUJBR3ZCO0FBQUEsTUFGU0MsS0FFVCx1RUFGeUIsSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBRXpCO0FBQUEsTUFEU0MsR0FDVCx1RUFEdUJDLGVBQ3ZCOztBQUFBOztBQUFBLE9BVlNULFVBVVQsR0FWU0EsVUFVVDtBQUFBLE9BUFNDLFNBT1QsR0FQU0EsU0FPVDtBQUFBLE9BTlNDLEVBTVQsR0FOU0EsRUFNVDtBQUFBLE9BSlNDLGFBSVQsR0FKU0EsYUFJVDtBQUFBLE9BSFNDLE9BR1QsR0FIU0EsT0FHVDtBQUFBLE9BRlNDLEtBRVQsR0FGU0EsS0FFVDtBQUFBLE9BRFNHLEdBQ1QsR0FEU0EsR0FDVDs7QUFBQSxnQ0FkV0UsV0FBS0MsS0FjaEI7QUFDRCxDO0FBR0w7Ozs7Ozs7QUFHTyxTQUFTQyxlQUFULENBQXlCQyxNQUF6QixFQUF3Q0MsTUFBeEMsRUFBdUQ7QUFDMUQsU0FBTyxFQUNIRCxNQUFNLENBQUNiLFVBQVAsSUFBcUJjLE1BQU0sQ0FBQ2QsVUFBNUIsSUFDR2EsTUFBTSxDQUFDWixTQUFQLElBQW9CYSxNQUFNLENBQUNiLFNBRjNCLENBQVA7QUFJSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlXCI7XHJcbmltcG9ydCB7IG5ld0lkIH0gZnJvbSBcIi4uL25ld0lkXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vRW5kXCI7XHJcbmltcG9ydCB7IElkIH0gZnJvbSBcIi4vSWRcIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgc2NvcmUgZm9yIGEgY2xhaW0uIEp1c3QgYSBkYXRhIHRyYW5zZmVyIG9iamVjdC4gRG9lcyBub3QgY29udGFpbiBhbnkgbG9naWMuXHJcbiAqIFVzdWFsbHkgd2l0aGluIHRoZSBjb250ZXh0IG9mIGEgdmlldyBvZiB0aGUgY2xhaW0gb3IgYW5vdGhlciBjbGFpbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjb3JlIGltcGxlbWVudHMgaVNjb3JlIHtcclxuICAgIHR5cGU6IFR5cGUgPSBUeXBlLnNjb3JlXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqIGhvdyBjb25maWRlbnQgd2Ugc291bGQgYmUgaW4gdGhlIGNsYWltLiAoQUtBIFRydWUpICovXHJcbiAgICAgICAgcHVibGljIGNvbmZpZGVuY2U6IG51bWJlciA9IDEsXHJcbiAgICAgICAgLyoqIEhvdyByZWxldmVudCB0aGlzIGNsYWltIGlzIHRvIGl0J3MgcGFyZW50IGNsYWltLiBSYW5nZXMgZnJvbSAwIHRvIGluZmluaXR5LlxyXG4gICAgICAgICAqIEEgbXVsdGlwbGllciBzZXQgYnkgYWxsIHRoZSBjaGlsZCBlZGdlcyB0aGF0IGFmZmVjdCAncmVsZXZhbmNlJyovXHJcbiAgICAgICAgcHVibGljIHJlbGV2YW5jZTogbnVtYmVyID0gMSxcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICAvKiogVGhlIGNsYWltIHRvIHdoaWNoIHRoaXMgc2NvcmUgYmVsb25ncyAqL1xyXG4gICAgICAgIHB1YmxpYyBzb3VyY2VDbGFpbUlkOiBJZCA9IG5ld0lkKCksXHJcbiAgICAgICAgcHVibGljIHZlcnNpb246IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgc3RhcnQ6IHN0cmluZyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICBwdWJsaWMgZW5kOiBzdHJpbmcgPSBFbmQsXHJcbiAgICApIHtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIENvbXBhcmUgdHdvIHNjb3JlcyB0byBzZWUgaWYgdGhleSBhcmUgZGlmZmVyZW50IGluIHdoYXQgdGhlIHNjb3JlIGlzLlxyXG4gKiAgSnVzdCBjb21wYXJlcyBjb25maWRlbmNlIGFuZCByZWxhdmFuY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXJlbnRTY29yZXMoc2NvcmVBOiBTY29yZSwgc2NvcmVCOiBTY29yZSkge1xyXG4gICAgcmV0dXJuICEoXHJcbiAgICAgICAgc2NvcmVBLmNvbmZpZGVuY2UgPT0gc2NvcmVCLmNvbmZpZGVuY2VcclxuICAgICAgICAmJiBzY29yZUEucmVsZXZhbmNlID09IHNjb3JlQi5yZWxldmFuY2VcclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpU2NvcmUgZXh0ZW5kcyBJdGVtICB7XHJcbiAgICAvKiogaG93IGNvbmZpZGVudCB3ZSBzb3VsZCBiZSBpbiB0aGUgY2xhaW0uIChBS0EgVHJ1ZSkgKi9cclxuICAgIGNvbmZpZGVuY2U6IG51bWJlcixcclxuICAgIC8qKiBIb3cgcmVsZXZlbnQgdGhpcyBjbGFpbSBpcyB0byBpdCdzIHBhcmVudCBjbGFpbS4gUmFuZ2VzIGZyb20gMCB0byBpbmZpbml0eS5cclxuICAgICAqIEEgbXVsdGlwbGllciBzZXQgYnkgYWxsIHRoZSBjaGlsZCBlZGdlcyB0aGF0IGFmZmVjdCAncmVsZXZhbmNlJyovXHJcbiAgICByZWxldmFuY2U6IG51bWJlcixcclxuICAgIGlkOiBJZCxcclxuICAgIC8qKiBUaGUgY2xhaW0gdG8gd2hpY2ggdGhpcyBzY29yZSBiZWxvbmdzICovXHJcbiAgICBzb3VyY2VDbGFpbUlkOiBJZCxcclxuICAgIHZlcnNpb246IElkLFxyXG4gICAgc3RhcnQ6IHN0cmluZyxcclxuICAgIGVuZDogc3RyaW5nLFxyXG59Il19