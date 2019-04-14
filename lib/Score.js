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
 * @property {boolean} claimId - The ID of the claim this score is based on.
 * @property {boolean} reversable - If true, if the claim is proven false it will go into negative numbers (be reversed). If false it will stop at 0.
 * @property {boolean} scope - The ID of the claim that this score is scoped to.
 * @property {string} displayText - The score displayed in a short text. rounded to whole % for confidence or a multiplier or division for relevance.
 * @property {number} ChildrenWeight - The total summed weight of all the children scores 
 * @property {number} childrenStrength - The total summed strength of all the children scores.
 * @property {number} relevance - How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score.
 * @property {number} score - strengthTotal / weightTotal. This is usually set during the calculation of it's parent score.
 * @property {number} weight - The final weight of this claim on it's parent. Calculation: score * relvance. This is usually set during the calculation of it's parent score.
 * @property {number} strength - The final strength of this claim on it's parent. Calculation: childScore.weight * +/-childScore.score. This is usually set during the calculation of it's parent score.
 */
var Score = function Score(claimId) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TY29yZS50cyJdLCJuYW1lcyI6WyJTY29yZSIsImNsYWltSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY2FBLEssR0FRVCxlQUNXQyxPQURYLEVBRUU7QUFBQTs7QUFBQTs7QUFBQSxxQ0FUa0IsQ0FTbEI7O0FBQUEsNENBUnlCLENBUXpCOztBQUFBLDBDQVB1QixDQU92Qjs7QUFBQSxpQ0FOYyxDQU1kOztBQUFBLGtDQUxlLENBS2Y7O0FBQUEsb0NBSmlCLENBSWpCOztBQUFBLHVDQUhvQixFQUdwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RvcmVzIHRoZSBzY29yZSBmb3IgYSBjbGFpbS4gSnVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0LiBEb2VzIG5vdCBjb250YWluIGFueSBsb2dpYy5cclxuICogVXN1YWxseSB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYSB2aWV3IG9mIHRoZSBjbGFpbSBvciBhbm90aGVyIGNsYWltXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY2xhaW1JZCAtIFRoZSBJRCBvZiB0aGUgY2xhaW0gdGhpcyBzY29yZSBpcyBiYXNlZCBvbi5cclxuICogQHByb3BlcnR5IHtib29sZWFufSByZXZlcnNhYmxlIC0gSWYgdHJ1ZSwgaWYgdGhlIGNsYWltIGlzIHByb3ZlbiBmYWxzZSBpdCB3aWxsIGdvIGludG8gbmVnYXRpdmUgbnVtYmVycyAoYmUgcmV2ZXJzZWQpLiBJZiBmYWxzZSBpdCB3aWxsIHN0b3AgYXQgMC5cclxuICogQHByb3BlcnR5IHtib29sZWFufSBzY29wZSAtIFRoZSBJRCBvZiB0aGUgY2xhaW0gdGhhdCB0aGlzIHNjb3JlIGlzIHNjb3BlZCB0by5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRpc3BsYXlUZXh0IC0gVGhlIHNjb3JlIGRpc3BsYXllZCBpbiBhIHNob3J0IHRleHQuIHJvdW5kZWQgdG8gd2hvbGUgJSBmb3IgY29uZmlkZW5jZSBvciBhIG11bHRpcGxpZXIgb3IgZGl2aXNpb24gZm9yIHJlbGV2YW5jZS5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IENoaWxkcmVuV2VpZ2h0IC0gVGhlIHRvdGFsIHN1bW1lZCB3ZWlnaHQgb2YgYWxsIHRoZSBjaGlsZHJlbiBzY29yZXMgXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjaGlsZHJlblN0cmVuZ3RoIC0gVGhlIHRvdGFsIHN1bW1lZCBzdHJlbmd0aCBvZiBhbGwgdGhlIGNoaWxkcmVuIHNjb3Jlcy5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHJlbGV2YW5jZSAtIEhvdyByZWxldmVudCB0aGlzIGNsYWltIGlzIHRvIGl0J3MgcGFyZW50IGNsYWltLiBDYWxjdWxhdGlvbjogUHJvOiAxICsgY2hpbGRTY29yZS5zY29yZSwgY29uOiAxIC0gKGNoaWxkU2NvcmUuc2NvcmUgLyAyKS4gQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnLiBBIG11bHRpcGxpZXIgc2V0IGJ5IGFsbCB0aGUgY2hpbGQgZWRnZXMgdGhhdCBhZmZlY3QgJ3JlbGV2YW5jZScuIFRoaXMgaXMgdXN1YWxseSBzZXQgZHVyaW5nIHRoZSBjYWxjdWxhdGlvbiBvZiBpdCdzIHBhcmVudCBzY29yZS5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjb3JlIC0gc3RyZW5ndGhUb3RhbCAvIHdlaWdodFRvdGFsLiBUaGlzIGlzIHVzdWFsbHkgc2V0IGR1cmluZyB0aGUgY2FsY3VsYXRpb24gb2YgaXQncyBwYXJlbnQgc2NvcmUuXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3ZWlnaHQgLSBUaGUgZmluYWwgd2VpZ2h0IG9mIHRoaXMgY2xhaW0gb24gaXQncyBwYXJlbnQuIENhbGN1bGF0aW9uOiBzY29yZSAqIHJlbHZhbmNlLiBUaGlzIGlzIHVzdWFsbHkgc2V0IGR1cmluZyB0aGUgY2FsY3VsYXRpb24gb2YgaXQncyBwYXJlbnQgc2NvcmUuXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdHJlbmd0aCAtIFRoZSBmaW5hbCBzdHJlbmd0aCBvZiB0aGlzIGNsYWltIG9uIGl0J3MgcGFyZW50LiBDYWxjdWxhdGlvbjogY2hpbGRTY29yZS53ZWlnaHQgKiArLy1jaGlsZFNjb3JlLnNjb3JlLiBUaGlzIGlzIHVzdWFsbHkgc2V0IGR1cmluZyB0aGUgY2FsY3VsYXRpb24gb2YgaXQncyBwYXJlbnQgc2NvcmUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NvcmUge1xyXG4gICAgcmVsZXZhbmNlOiBudW1iZXIgPSAxO1xyXG4gICAgY2hpbGRyZW5TdHJlbmd0aDogbnVtYmVyID0gMTtcclxuICAgIGNoaWxkcmVuV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICB3ZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBzdHJlbmd0aDogbnVtYmVyID0gMDtcclxuICAgIGRpc3BsYXlUZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGNsYWltSWQ6IHN0cmluZyxcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxufSJdfQ==