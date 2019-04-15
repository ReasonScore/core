"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Score = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
var Score =
/** How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score. */

/** The total summed strength of all the children scores. */

/** The total summed weight of all the children scores */

/** The final score calculated for this claim in this scope. calculation: strengthTotal / weightTotal. This is usually set during the calculation of it's parent score. */

/** The final weight of this claim on it's parent. Calculation: score * relvance. This is usually set during the calculation of it's parent score. */

/** The final strength of this claim on it's parent. Calculation: childScore.weight * +/-childScore.score. This is usually set during the calculation of it's parent score. */

/** The score displayed in a short text. rounded to whole % for confidence or a multiplier or division for relevance.*/
function Score(claimId) {
  _classCallCheck(this, Score);

  this.claimId = claimId;

  _defineProperty(this, "relevance", 1);

  _defineProperty(this, "childrenStrength", 1);

  _defineProperty(this, "childrenWeight", 1);

  _defineProperty(this, "score", 0);

  _defineProperty(this, "weight", 0);

  _defineProperty(this, "strength", 0);

  _defineProperty(this, "displayText", "");
};

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TY29yZS50cyJdLCJuYW1lcyI6WyJTY29yZSIsImNsYWltSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFJYUEsSztBQUNUOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBR0EsZUFFV0MsT0FGWCxFQUdFO0FBQUE7O0FBQUE7O0FBQUEscUNBakJrQixDQWlCbEI7O0FBQUEsNENBZnlCLENBZXpCOztBQUFBLDBDQWJ1QixDQWF2Qjs7QUFBQSxpQ0FYYyxDQVdkOztBQUFBLGtDQVRlLENBU2Y7O0FBQUEsb0NBUGlCLENBT2pCOztBQUFBLHVDQUxvQixFQUtwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RvcmVzIHRoZSBzY29yZSBmb3IgYSBjbGFpbS4gSnVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0LiBEb2VzIG5vdCBjb250YWluIGFueSBsb2dpYy5cclxuICogVXN1YWxseSB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYSB2aWV3IG9mIHRoZSBjbGFpbSBvciBhbm90aGVyIGNsYWltXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NvcmUge1xyXG4gICAgLyoqIEhvdyByZWxldmVudCB0aGlzIGNsYWltIGlzIHRvIGl0J3MgcGFyZW50IGNsYWltLiBDYWxjdWxhdGlvbjogUHJvOiAxICsgY2hpbGRTY29yZS5zY29yZSwgY29uOiAxIC0gKGNoaWxkU2NvcmUuc2NvcmUgLyAyKS4gQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnLiBBIG11bHRpcGxpZXIgc2V0IGJ5IGFsbCB0aGUgY2hpbGQgZWRnZXMgdGhhdCBhZmZlY3QgJ3JlbGV2YW5jZScuIFRoaXMgaXMgdXN1YWxseSBzZXQgZHVyaW5nIHRoZSBjYWxjdWxhdGlvbiBvZiBpdCdzIHBhcmVudCBzY29yZS4gKi9cclxuICAgIHJlbGV2YW5jZTogbnVtYmVyID0gMTtcclxuICAgIC8qKiBUaGUgdG90YWwgc3VtbWVkIHN0cmVuZ3RoIG9mIGFsbCB0aGUgY2hpbGRyZW4gc2NvcmVzLiAqL1xyXG4gICAgY2hpbGRyZW5TdHJlbmd0aDogbnVtYmVyID0gMTtcclxuICAgIC8qKiBUaGUgdG90YWwgc3VtbWVkIHdlaWdodCBvZiBhbGwgdGhlIGNoaWxkcmVuIHNjb3JlcyAqL1xyXG4gICAgY2hpbGRyZW5XZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICAvKiogVGhlIGZpbmFsIHNjb3JlIGNhbGN1bGF0ZWQgZm9yIHRoaXMgY2xhaW0gaW4gdGhpcyBzY29wZS4gY2FsY3VsYXRpb246IHN0cmVuZ3RoVG90YWwgLyB3ZWlnaHRUb3RhbC4gVGhpcyBpcyB1c3VhbGx5IHNldCBkdXJpbmcgdGhlIGNhbGN1bGF0aW9uIG9mIGl0J3MgcGFyZW50IHNjb3JlLiAqL1xyXG4gICAgc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICAvKiogVGhlIGZpbmFsIHdlaWdodCBvZiB0aGlzIGNsYWltIG9uIGl0J3MgcGFyZW50LiBDYWxjdWxhdGlvbjogc2NvcmUgKiByZWx2YW5jZS4gVGhpcyBpcyB1c3VhbGx5IHNldCBkdXJpbmcgdGhlIGNhbGN1bGF0aW9uIG9mIGl0J3MgcGFyZW50IHNjb3JlLiAqL1xyXG4gICAgd2VpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIFRoZSBmaW5hbCBzdHJlbmd0aCBvZiB0aGlzIGNsYWltIG9uIGl0J3MgcGFyZW50LiBDYWxjdWxhdGlvbjogY2hpbGRTY29yZS53ZWlnaHQgKiArLy1jaGlsZFNjb3JlLnNjb3JlLiBUaGlzIGlzIHVzdWFsbHkgc2V0IGR1cmluZyB0aGUgY2FsY3VsYXRpb24gb2YgaXQncyBwYXJlbnQgc2NvcmUuICovXHJcbiAgICBzdHJlbmd0aDogbnVtYmVyID0gMDtcclxuICAgIC8qKiBUaGUgc2NvcmUgZGlzcGxheWVkIGluIGEgc2hvcnQgdGV4dC4gcm91bmRlZCB0byB3aG9sZSAlIGZvciBjb25maWRlbmNlIG9yIGEgbXVsdGlwbGllciBvciBkaXZpc2lvbiBmb3IgcmVsZXZhbmNlLiovXHJcbiAgICBkaXNwbGF5VGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKipUaGUgSUQgb2YgdGhlIGNsYWltIHRoaXMgc2NvcmUgaXMgYmFzZWQgb24gKi9cclxuICAgICAgICBwdWJsaWMgY2xhaW1JZDogc3RyaW5nLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG59Il19