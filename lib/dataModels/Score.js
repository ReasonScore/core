"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Score = void 0;

var _newId = require("../newId");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 */
class Score {
  constructor(
  /** The claim to which this score belongs */
  sourceClaimId,
  /** The top of the tree of scores that this belongs to. Used for indexing */
  scoreTreeId,
  /** The parent of this score in the score tree graph */
  parentScoreId = null, // Use null because Firestore does not allow undefined

  /** The Edge to which this score belongs */
  sourceEdgeId = null, reversible = false,
  /** Is this score a pro of it's parent (false if it is a con) */
  pro = true,
  /** How the child affects the parent score */
  affects = "confidence",
  /** how confident we should be in the claim. (AKA True) */
  confidence = 1,
  /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
   * A multiplier set by all the child edges that affect 'relevance'*/
  relevance = 1, id = (0, _newId.newId)(), priority = "", content = "",
  /** the impact/weight of this score on it's parent score but scaled so all the children are less than 1  */
  scaledWeight = 0) {
    this.sourceClaimId = sourceClaimId;
    this.scoreTreeId = scoreTreeId;
    this.parentScoreId = parentScoreId;
    this.sourceEdgeId = sourceEdgeId;
    this.reversible = reversible;
    this.pro = pro;
    this.affects = affects;
    this.confidence = confidence;
    this.relevance = relevance;
    this.id = id;
    this.priority = priority;
    this.content = content;
    this.scaledWeight = scaledWeight;

    _defineProperty(this, "type", 'score');

    _defineProperty(this, "descendantCount", 0);

    _defineProperty(this, "generation", 0);

    _defineProperty(this, "fractionSimple", 1);

    _defineProperty(this, "fraction", 1);

    _defineProperty(this, "childrenAveragingWeight", 1);

    _defineProperty(this, "childrenConfidenceWeight", 1);

    _defineProperty(this, "childrenRelevanceWeight", 1);

    _defineProperty(this, "childrenWeight", 1);

    _defineProperty(this, "weight", 1);

    _defineProperty(this, "percentOfWeight", 1);

    _defineProperty(this, "proMain", true);
  }
  /** number of total claims below this one */
  // TODO: should this start undefined?
  // //TODO:Experimental
  // public childrenProWeight: number = 0;
  // public childrenConWeight: number = 0;
  // public percentAgreeWeight: number = 0;
  // public parentFractionSimple: number = 0;


}

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uc3RydWN0b3IiLCJzb3VyY2VDbGFpbUlkIiwic2NvcmVUcmVlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlRWRnZUlkIiwicmV2ZXJzaWJsZSIsInBybyIsImFmZmVjdHMiLCJjb25maWRlbmNlIiwicmVsZXZhbmNlIiwiaWQiLCJwcmlvcml0eSIsImNvbnRlbnQiLCJzY2FsZWRXZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLEtBQU4sQ0FBNEI7QUFHL0JDLEVBQUFBLFdBQVc7QUFDUDtBQUNPQyxFQUFBQSxhQUZBO0FBR1A7QUFDT0MsRUFBQUEsV0FKQTtBQUtQO0FBQ09DLEVBQUFBLGFBQTRCLEdBQUcsSUFOL0IsRUFNcUM7O0FBQzVDO0FBQ09DLEVBQUFBLFlBQTJCLEdBQUcsSUFSOUIsRUFVQUMsVUFBbUIsR0FBRyxLQVZ0QjtBQVdQO0FBQ09DLEVBQUFBLEdBQVksR0FBRyxJQVpmO0FBYVA7QUFDT0MsRUFBQUEsT0FBZ0IsR0FBRyxZQWRuQjtBQWVQO0FBQ09DLEVBQUFBLFVBQWtCLEdBQUcsQ0FoQnJCO0FBaUJQO0FBQ1I7QUFDZUMsRUFBQUEsU0FBaUIsR0FBRyxDQW5CcEIsRUFvQkFDLEVBQVUsR0FBRyxtQkFwQmIsRUFxQkFDLFFBQWdCLEdBQUcsRUFyQm5CLEVBc0JBQyxPQUFlLEdBQUcsRUF0QmxCO0FBdUJQO0FBQ09DLEVBQUFBLFlBQW9CLEdBQUcsQ0F4QnZCLEVBeUJUO0FBQUEsU0F2QlNaLGFBdUJULEdBdkJTQSxhQXVCVDtBQUFBLFNBckJTQyxXQXFCVCxHQXJCU0EsV0FxQlQ7QUFBQSxTQW5CU0MsYUFtQlQsR0FuQlNBLGFBbUJUO0FBQUEsU0FqQlNDLFlBaUJULEdBakJTQSxZQWlCVDtBQUFBLFNBZlNDLFVBZVQsR0FmU0EsVUFlVDtBQUFBLFNBYlNDLEdBYVQsR0FiU0EsR0FhVDtBQUFBLFNBWFNDLE9BV1QsR0FYU0EsT0FXVDtBQUFBLFNBVFNDLFVBU1QsR0FUU0EsVUFTVDtBQUFBLFNBTlNDLFNBTVQsR0FOU0EsU0FNVDtBQUFBLFNBTFNDLEVBS1QsR0FMU0EsRUFLVDtBQUFBLFNBSlNDLFFBSVQsR0FKU0EsUUFJVDtBQUFBLFNBSFNDLE9BR1QsR0FIU0EsT0FHVDtBQUFBLFNBRFNDLFlBQ1QsR0FEU0EsWUFDVDs7QUFBQSxrQ0EzQmdCLE9BMkJoQjs7QUFBQSw2Q0FJK0IsQ0FKL0I7O0FBQUEsd0NBSzBCLENBTDFCOztBQUFBLDRDQVE4QixDQVI5Qjs7QUFBQSxzQ0FVd0IsQ0FWeEI7O0FBQUEscURBWXVDLENBWnZDOztBQUFBLHNEQWF3QyxDQWJ4Qzs7QUFBQSxxREFjdUMsQ0FkdkM7O0FBQUEsNENBZThCLENBZjlCOztBQUFBLG9DQWdCc0IsQ0FoQnRCOztBQUFBLDZDQWlCK0IsQ0FqQi9COztBQUFBLHFDQW1Cd0IsSUFuQnhCO0FBQ0Q7QUFFRDtBQWdCZ0M7QUFHaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBdEQrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5ld0lkIH0gZnJvbSBcIi4uL25ld0lkXCI7XHJcbmltcG9ydCB7IEFmZmVjdHMgfSBmcm9tIFwiLi9BZmZlY3RzXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcbmltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCIuLlwiO1xyXG4vKipcclxuICogU3RvcmVzIHRoZSBzY29yZSBmb3IgYSBjbGFpbS4gSnVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0LiBEb2VzIG5vdCBjb250YWluIGFueSBsb2dpYy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTY29yZSBpbXBsZW1lbnRzIEl0ZW0ge1xyXG4gICAgdHlwZTogSXRlbVR5cGVzID0gJ3Njb3JlJ1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKiBUaGUgY2xhaW0gdG8gd2hpY2ggdGhpcyBzY29yZSBiZWxvbmdzICovXHJcbiAgICAgICAgcHVibGljIHNvdXJjZUNsYWltSWQ6IHN0cmluZyxcclxuICAgICAgICAvKiogVGhlIHRvcCBvZiB0aGUgdHJlZSBvZiBzY29yZXMgdGhhdCB0aGlzIGJlbG9uZ3MgdG8uIFVzZWQgZm9yIGluZGV4aW5nICovXHJcbiAgICAgICAgcHVibGljIHNjb3JlVHJlZUlkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIFRoZSBwYXJlbnQgb2YgdGhpcyBzY29yZSBpbiB0aGUgc2NvcmUgdHJlZSBncmFwaCAqL1xyXG4gICAgICAgIHB1YmxpYyBwYXJlbnRTY29yZUlkOiBzdHJpbmcgfCBudWxsID0gbnVsbCwgLy8gVXNlIG51bGwgYmVjYXVzZSBGaXJlc3RvcmUgZG9lcyBub3QgYWxsb3cgdW5kZWZpbmVkXHJcbiAgICAgICAgLyoqIFRoZSBFZGdlIHRvIHdoaWNoIHRoaXMgc2NvcmUgYmVsb25ncyAqL1xyXG4gICAgICAgIHB1YmxpYyBzb3VyY2VFZGdlSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLFxyXG5cclxuICAgICAgICBwdWJsaWMgcmV2ZXJzaWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIC8qKiBJcyB0aGlzIHNjb3JlIGEgcHJvIG9mIGl0J3MgcGFyZW50IChmYWxzZSBpZiBpdCBpcyBhIGNvbikgKi9cclxuICAgICAgICBwdWJsaWMgcHJvOiBib29sZWFuID0gdHJ1ZSxcclxuICAgICAgICAvKiogSG93IHRoZSBjaGlsZCBhZmZlY3RzIHRoZSBwYXJlbnQgc2NvcmUgKi9cclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyA9IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgIC8qKiBob3cgY29uZmlkZW50IHdlIHNob3VsZCBiZSBpbiB0aGUgY2xhaW0uIChBS0EgVHJ1ZSkgKi9cclxuICAgICAgICBwdWJsaWMgY29uZmlkZW5jZTogbnVtYmVyID0gMSxcclxuICAgICAgICAvKiogSG93IHJlbGV2ZW50IHRoaXMgY2xhaW0gaXMgdG8gaXQncyBwYXJlbnQgY2xhaW0uIFJhbmdlcyBmcm9tIDAgdG8gaW5maW5pdHkuXHJcbiAgICAgICAgICogQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnKi9cclxuICAgICAgICBwdWJsaWMgcmVsZXZhbmNlOiBudW1iZXIgPSAxLFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcHJpb3JpdHk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgLyoqIHRoZSBpbXBhY3Qvd2VpZ2h0IG9mIHRoaXMgc2NvcmUgb24gaXQncyBwYXJlbnQgc2NvcmUgYnV0IHNjYWxlZCBzbyBhbGwgdGhlIGNoaWxkcmVuIGFyZSBsZXNzIHRoYW4gMSAgKi9cclxuICAgICAgICBwdWJsaWMgc2NhbGVkV2VpZ2h0OiBudW1iZXIgPSAwLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIG51bWJlciBvZiB0b3RhbCBjbGFpbXMgYmVsb3cgdGhpcyBvbmUgKi9cclxuICAgIHB1YmxpYyBkZXNjZW5kYW50Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2VuZXJhdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogV2hhdCBmcmFjdGlvbiBvZiB0cmVlIGlzIHRoaXMgZGlzcmVnYXJkaW5nIGFsbCBzY29yZXMgKi9cclxuICAgIHB1YmxpYyBmcmFjdGlvblNpbXBsZTogbnVtYmVyID0gMTtcclxuICAgIC8qKiBXaGF0IGZyYWN0aW9uIG9mIG1haW5TY29yZSBpcyB0aGlzIHNjb3JlIGFuZCBpdCdzIGRlc2NlbmRhbnRzIHJlc3BvbnNpYmxlIGZvciAqL1xyXG4gICAgcHVibGljIGZyYWN0aW9uOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIHB1YmxpYyBjaGlsZHJlbkF2ZXJhZ2luZ1dlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBjaGlsZHJlbkNvbmZpZGVuY2VXZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW5SZWxldmFuY2VXZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW5XZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgd2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHBlcmNlbnRPZldlaWdodDogbnVtYmVyID0gMTtcclxuICAgIC8qKiBJcyB0aGlzIHNjb3JlIHBybyB0aGUgbWFpbiB0b3AgY2xhaW0gKi9cclxuICAgIHB1YmxpYyBwcm9NYWluOiBib29sZWFuID0gdHJ1ZTsgLy8gVE9ETzogc2hvdWxkIHRoaXMgc3RhcnQgdW5kZWZpbmVkP1xyXG5cclxuXHJcbiAgICAvLyAvL1RPRE86RXhwZXJpbWVudGFsXHJcbiAgICAvLyBwdWJsaWMgY2hpbGRyZW5Qcm9XZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwdWJsaWMgY2hpbGRyZW5Db25XZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwdWJsaWMgcGVyY2VudEFncmVlV2VpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgLy8gcHVibGljIHBhcmVudEZyYWN0aW9uU2ltcGxlOiBudW1iZXIgPSAwO1xyXG59XHJcblxyXG4iXX0=