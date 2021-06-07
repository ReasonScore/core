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
  /** how confident we sould be in the claim. (AKA True) */

  /** How the child affects the parent score */
  affects = "confidence", confidence = 1,
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
  } // //TODO:Experimental
  // public childrenProWeight: number = 0;
  // public childrenConWeight: number = 0;
  // public percentAgreeWeight: number = 0;
  // public parentFractionSimple: number = 0;


}

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uc3RydWN0b3IiLCJzb3VyY2VDbGFpbUlkIiwic2NvcmVUcmVlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlRWRnZUlkIiwicmV2ZXJzaWJsZSIsInBybyIsImFmZmVjdHMiLCJjb25maWRlbmNlIiwicmVsZXZhbmNlIiwiaWQiLCJwcmlvcml0eSIsImNvbnRlbnQiLCJzY2FsZWRXZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLEtBQU4sQ0FBNEI7QUFHL0JDLEVBQUFBLFdBQVc7QUFDUDtBQUNPQyxFQUFBQSxhQUZBO0FBR1A7QUFDT0MsRUFBQUEsV0FKQTtBQUtQO0FBQ09DLEVBQUFBLGFBQTRCLEdBQUcsSUFOL0IsRUFNcUM7O0FBQzVDO0FBQ09DLEVBQUFBLFlBQTJCLEdBQUcsSUFSOUIsRUFVQUMsVUFBbUIsR0FBRyxLQVZ0QjtBQVdQO0FBQ09DLEVBQUFBLEdBQVksR0FBRyxJQVpmO0FBYVA7O0FBQ0E7QUFDT0MsRUFBQUEsT0FBZ0IsR0FBRyxZQWZuQixFQWdCQUMsVUFBa0IsR0FBRyxDQWhCckI7QUFpQlA7QUFDUjtBQUNlQyxFQUFBQSxTQUFpQixHQUFHLENBbkJwQixFQW9CQUMsRUFBVSxHQUFHLG1CQXBCYixFQXFCQUMsUUFBZ0IsR0FBRyxFQXJCbkIsRUFzQkFDLE9BQWUsR0FBRyxFQXRCbEI7QUF1QlA7QUFDT0MsRUFBQUEsWUFBb0IsR0FBRyxDQXhCdkIsRUF5QlQ7QUFBQSxTQXZCU1osYUF1QlQsR0F2QlNBLGFBdUJUO0FBQUEsU0FyQlNDLFdBcUJULEdBckJTQSxXQXFCVDtBQUFBLFNBbkJTQyxhQW1CVCxHQW5CU0EsYUFtQlQ7QUFBQSxTQWpCU0MsWUFpQlQsR0FqQlNBLFlBaUJUO0FBQUEsU0FmU0MsVUFlVCxHQWZTQSxVQWVUO0FBQUEsU0FiU0MsR0FhVCxHQWJTQSxHQWFUO0FBQUEsU0FWU0MsT0FVVCxHQVZTQSxPQVVUO0FBQUEsU0FUU0MsVUFTVCxHQVRTQSxVQVNUO0FBQUEsU0FOU0MsU0FNVCxHQU5TQSxTQU1UO0FBQUEsU0FMU0MsRUFLVCxHQUxTQSxFQUtUO0FBQUEsU0FKU0MsUUFJVCxHQUpTQSxRQUlUO0FBQUEsU0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsU0FEU0MsWUFDVCxHQURTQSxZQUNUOztBQUFBLGtDQTNCZ0IsT0EyQmhCOztBQUFBLDZDQUcrQixDQUgvQjs7QUFBQSx3Q0FJMEIsQ0FKMUI7O0FBQUEsNENBTzhCLENBUDlCOztBQUFBLHNDQVN3QixDQVR4Qjs7QUFBQSxxREFXdUMsQ0FYdkM7O0FBQUEsc0RBWXdDLENBWnhDOztBQUFBLHFEQWF1QyxDQWJ2Qzs7QUFBQSw0Q0FjOEIsQ0FkOUI7O0FBQUEsb0NBZXNCLENBZnRCOztBQUFBLDZDQWdCK0IsQ0FoQi9CO0FBQ0QsR0E3QjhCLENBOEMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFsRCtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IHsgQWZmZWN0cyB9IGZyb20gXCIuL0FmZmVjdHNcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0l0ZW1cIjtcclxuaW1wb3J0IHsgSXRlbVR5cGVzIH0gZnJvbSBcIi4uXCI7XHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHNjb3JlIGZvciBhIGNsYWltLiBKdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3QuIERvZXMgbm90IGNvbnRhaW4gYW55IGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjb3JlIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBJdGVtVHlwZXMgPSAnc2NvcmUnXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqIFRoZSBjbGFpbSB0byB3aGljaCB0aGlzIHNjb3JlIGJlbG9uZ3MgKi9cclxuICAgICAgICBwdWJsaWMgc291cmNlQ2xhaW1JZDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBUaGUgdG9wIG9mIHRoZSB0cmVlIG9mIHNjb3JlcyB0aGF0IHRoaXMgYmVsb25ncyB0by4gVXNlZCBmb3IgaW5kZXhpbmcgKi9cclxuICAgICAgICBwdWJsaWMgc2NvcmVUcmVlSWQ6IHN0cmluZyxcclxuICAgICAgICAvKiogVGhlIHBhcmVudCBvZiB0aGlzIHNjb3JlIGluIHRoZSBzY29yZSB0cmVlIGdyYXBoICovXHJcbiAgICAgICAgcHVibGljIHBhcmVudFNjb3JlSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLCAvLyBVc2UgbnVsbCBiZWNhdXNlIEZpcmVzdG9yZSBkb2VzIG5vdCBhbGxvdyB1bmRlZmluZWRcclxuICAgICAgICAvKiogVGhlIEVkZ2UgdG8gd2hpY2ggdGhpcyBzY29yZSBiZWxvbmdzICovXHJcbiAgICAgICAgcHVibGljIHNvdXJjZUVkZ2VJZDogc3RyaW5nIHwgbnVsbCA9IG51bGwsXHJcblxyXG4gICAgICAgIHB1YmxpYyByZXZlcnNpYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgLyoqIElzIHRoaXMgc2NvcmUgYSBwcm8gb2YgaXQncyBwYXJlbnQgKGZhbHNlIGlmIGl0IGlzIGEgY29uKSAqL1xyXG4gICAgICAgIHB1YmxpYyBwcm86IGJvb2xlYW4gPSB0cnVlLFxyXG4gICAgICAgIC8qKiBob3cgY29uZmlkZW50IHdlIHNvdWxkIGJlIGluIHRoZSBjbGFpbS4gKEFLQSBUcnVlKSAqL1xyXG4gICAgICAgIC8qKiBIb3cgdGhlIGNoaWxkIGFmZmVjdHMgdGhlIHBhcmVudCBzY29yZSAqL1xyXG4gICAgICAgIHB1YmxpYyBhZmZlY3RzOiBBZmZlY3RzID0gXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgcHVibGljIGNvbmZpZGVuY2U6IG51bWJlciA9IDEsXHJcbiAgICAgICAgLyoqIEhvdyByZWxldmVudCB0aGlzIGNsYWltIGlzIHRvIGl0J3MgcGFyZW50IGNsYWltLiBSYW5nZXMgZnJvbSAwIHRvIGluZmluaXR5LlxyXG4gICAgICAgICAqIEEgbXVsdGlwbGllciBzZXQgYnkgYWxsIHRoZSBjaGlsZCBlZGdlcyB0aGF0IGFmZmVjdCAncmVsZXZhbmNlJyovXHJcbiAgICAgICAgcHVibGljIHJlbGV2YW5jZTogbnVtYmVyID0gMSxcclxuICAgICAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IG5ld0lkKCksXHJcbiAgICAgICAgcHVibGljIHByaW9yaXR5OiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgIHB1YmxpYyBjb250ZW50OiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgIC8qKiB0aGUgaW1wYWN0L3dlaWdodCBvZiB0aGlzIHNjb3JlIG9uIGl0J3MgcGFyZW50IHNjb3JlIGJ1dCBzY2FsZWQgc28gYWxsIHRoZSBjaGlsZHJlbiBhcmUgbGVzcyB0aGFuIDEgICovXHJcbiAgICAgICAgcHVibGljIHNjYWxlZFdlaWdodDogbnVtYmVyID0gMCxcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNjZW5kYW50Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2VuZXJhdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogV2hhdCBmcmFjdGlvbiBvZiB0cmVlIGlzIHRoaXMgZGlzcmVnYXJkaW5nIGFsbCBzY29yZXMgKi9cclxuICAgIHB1YmxpYyBmcmFjdGlvblNpbXBsZTogbnVtYmVyID0gMTtcclxuICAgIC8qKiBXaGF0IGZyYWN0aW9uIG9mIG1haW5TY29yZSBpcyB0aGlzIHNjb3JlIGFuZCBpdCdzIGRlc2NlbmRhbnRzIHJlc3BvbnNpYmxlIGZvciAqL1xyXG4gICAgcHVibGljIGZyYWN0aW9uOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIHB1YmxpYyBjaGlsZHJlbkF2ZXJhZ2luZ1dlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBjaGlsZHJlbkNvbmZpZGVuY2VXZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW5SZWxldmFuY2VXZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW5XZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgd2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHBlcmNlbnRPZldlaWdodDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvLyAvL1RPRE86RXhwZXJpbWVudGFsXHJcbiAgICAvLyBwdWJsaWMgY2hpbGRyZW5Qcm9XZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwdWJsaWMgY2hpbGRyZW5Db25XZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwdWJsaWMgcGVyY2VudEFncmVlV2VpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgLy8gcHVibGljIHBhcmVudEZyYWN0aW9uU2ltcGxlOiBudW1iZXIgPSAwO1xyXG59XHJcblxyXG4iXX0=