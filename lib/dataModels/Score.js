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

    _defineProperty(this, "proMain", true);
  } // TODO: should this start undefined?
  // //TODO:Experimental
  // public childrenProWeight: number = 0;
  // public childrenConWeight: number = 0;
  // public percentAgreeWeight: number = 0;
  // public parentFractionSimple: number = 0;


}

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uc3RydWN0b3IiLCJzb3VyY2VDbGFpbUlkIiwic2NvcmVUcmVlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlRWRnZUlkIiwicmV2ZXJzaWJsZSIsInBybyIsImFmZmVjdHMiLCJjb25maWRlbmNlIiwicmVsZXZhbmNlIiwiaWQiLCJwcmlvcml0eSIsImNvbnRlbnQiLCJzY2FsZWRXZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLEtBQU4sQ0FBNEI7QUFHL0JDLEVBQUFBLFdBQVc7QUFDUDtBQUNPQyxFQUFBQSxhQUZBO0FBR1A7QUFDT0MsRUFBQUEsV0FKQTtBQUtQO0FBQ09DLEVBQUFBLGFBQTRCLEdBQUcsSUFOL0IsRUFNcUM7O0FBQzVDO0FBQ09DLEVBQUFBLFlBQTJCLEdBQUcsSUFSOUIsRUFVQUMsVUFBbUIsR0FBRyxLQVZ0QjtBQVdQO0FBQ09DLEVBQUFBLEdBQVksR0FBRyxJQVpmO0FBYVA7O0FBQ0E7QUFDT0MsRUFBQUEsT0FBZ0IsR0FBRyxZQWZuQixFQWdCQUMsVUFBa0IsR0FBRyxDQWhCckI7QUFpQlA7QUFDUjtBQUNlQyxFQUFBQSxTQUFpQixHQUFHLENBbkJwQixFQW9CQUMsRUFBVSxHQUFHLG1CQXBCYixFQXFCQUMsUUFBZ0IsR0FBRyxFQXJCbkIsRUFzQkFDLE9BQWUsR0FBRyxFQXRCbEI7QUF1QlA7QUFDT0MsRUFBQUEsWUFBb0IsR0FBRyxDQXhCdkIsRUF5QlQ7QUFBQSxTQXZCU1osYUF1QlQsR0F2QlNBLGFBdUJUO0FBQUEsU0FyQlNDLFdBcUJULEdBckJTQSxXQXFCVDtBQUFBLFNBbkJTQyxhQW1CVCxHQW5CU0EsYUFtQlQ7QUFBQSxTQWpCU0MsWUFpQlQsR0FqQlNBLFlBaUJUO0FBQUEsU0FmU0MsVUFlVCxHQWZTQSxVQWVUO0FBQUEsU0FiU0MsR0FhVCxHQWJTQSxHQWFUO0FBQUEsU0FWU0MsT0FVVCxHQVZTQSxPQVVUO0FBQUEsU0FUU0MsVUFTVCxHQVRTQSxVQVNUO0FBQUEsU0FOU0MsU0FNVCxHQU5TQSxTQU1UO0FBQUEsU0FMU0MsRUFLVCxHQUxTQSxFQUtUO0FBQUEsU0FKU0MsUUFJVCxHQUpTQSxRQUlUO0FBQUEsU0FIU0MsT0FHVCxHQUhTQSxPQUdUO0FBQUEsU0FEU0MsWUFDVCxHQURTQSxZQUNUOztBQUFBLGtDQTNCZ0IsT0EyQmhCOztBQUFBLDZDQUcrQixDQUgvQjs7QUFBQSx3Q0FJMEIsQ0FKMUI7O0FBQUEsNENBTzhCLENBUDlCOztBQUFBLHNDQVN3QixDQVR4Qjs7QUFBQSxxREFXdUMsQ0FYdkM7O0FBQUEsc0RBWXdDLENBWnhDOztBQUFBLHFEQWF1QyxDQWJ2Qzs7QUFBQSw0Q0FjOEIsQ0FkOUI7O0FBQUEsb0NBZXNCLENBZnRCOztBQUFBLDZDQWdCK0IsQ0FoQi9COztBQUFBLHFDQWtCd0IsSUFsQnhCO0FBQ0QsR0E3QjhCLENBOENDO0FBR2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXJEK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5pbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5pbXBvcnQgeyBJdGVtVHlwZXMgfSBmcm9tIFwiLi5cIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgc2NvcmUgZm9yIGEgY2xhaW0uIEp1c3QgYSBkYXRhIHRyYW5zZmVyIG9iamVjdC4gRG9lcyBub3QgY29udGFpbiBhbnkgbG9naWMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NvcmUgaW1wbGVtZW50cyBJdGVtIHtcclxuICAgIHR5cGU6IEl0ZW1UeXBlcyA9ICdzY29yZSdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKiogVGhlIGNsYWltIHRvIHdoaWNoIHRoaXMgc2NvcmUgYmVsb25ncyAqL1xyXG4gICAgICAgIHB1YmxpYyBzb3VyY2VDbGFpbUlkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIFRoZSB0b3Agb2YgdGhlIHRyZWUgb2Ygc2NvcmVzIHRoYXQgdGhpcyBiZWxvbmdzIHRvLiBVc2VkIGZvciBpbmRleGluZyAqL1xyXG4gICAgICAgIHB1YmxpYyBzY29yZVRyZWVJZDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBUaGUgcGFyZW50IG9mIHRoaXMgc2NvcmUgaW4gdGhlIHNjb3JlIHRyZWUgZ3JhcGggKi9cclxuICAgICAgICBwdWJsaWMgcGFyZW50U2NvcmVJZDogc3RyaW5nIHwgbnVsbCA9IG51bGwsIC8vIFVzZSBudWxsIGJlY2F1c2UgRmlyZXN0b3JlIGRvZXMgbm90IGFsbG93IHVuZGVmaW5lZFxyXG4gICAgICAgIC8qKiBUaGUgRWRnZSB0byB3aGljaCB0aGlzIHNjb3JlIGJlbG9uZ3MgKi9cclxuICAgICAgICBwdWJsaWMgc291cmNlRWRnZUlkOiBzdHJpbmcgfCBudWxsID0gbnVsbCxcclxuXHJcbiAgICAgICAgcHVibGljIHJldmVyc2libGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICAvKiogSXMgdGhpcyBzY29yZSBhIHBybyBvZiBpdCdzIHBhcmVudCAoZmFsc2UgaWYgaXQgaXMgYSBjb24pICovXHJcbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgLyoqIGhvdyBjb25maWRlbnQgd2Ugc291bGQgYmUgaW4gdGhlIGNsYWltLiAoQUtBIFRydWUpICovXHJcbiAgICAgICAgLyoqIEhvdyB0aGUgY2hpbGQgYWZmZWN0cyB0aGUgcGFyZW50IHNjb3JlICovXHJcbiAgICAgICAgcHVibGljIGFmZmVjdHM6IEFmZmVjdHMgPSBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICBwdWJsaWMgY29uZmlkZW5jZTogbnVtYmVyID0gMSxcclxuICAgICAgICAvKiogSG93IHJlbGV2ZW50IHRoaXMgY2xhaW0gaXMgdG8gaXQncyBwYXJlbnQgY2xhaW0uIFJhbmdlcyBmcm9tIDAgdG8gaW5maW5pdHkuXHJcbiAgICAgICAgICogQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnKi9cclxuICAgICAgICBwdWJsaWMgcmVsZXZhbmNlOiBudW1iZXIgPSAxLFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcHJpb3JpdHk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgLyoqIHRoZSBpbXBhY3Qvd2VpZ2h0IG9mIHRoaXMgc2NvcmUgb24gaXQncyBwYXJlbnQgc2NvcmUgYnV0IHNjYWxlZCBzbyBhbGwgdGhlIGNoaWxkcmVuIGFyZSBsZXNzIHRoYW4gMSAgKi9cclxuICAgICAgICBwdWJsaWMgc2NhbGVkV2VpZ2h0OiBudW1iZXIgPSAwLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc2NlbmRhbnRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZW5lcmF0aW9uOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBXaGF0IGZyYWN0aW9uIG9mIHRyZWUgaXMgdGhpcyBkaXNyZWdhcmRpbmcgYWxsIHNjb3JlcyAqL1xyXG4gICAgcHVibGljIGZyYWN0aW9uU2ltcGxlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoqIFdoYXQgZnJhY3Rpb24gb2YgbWFpblNjb3JlIGlzIHRoaXMgc2NvcmUgYW5kIGl0J3MgZGVzY2VuZGFudHMgcmVzcG9uc2libGUgZm9yICovXHJcbiAgICBwdWJsaWMgZnJhY3Rpb246IG51bWJlciA9IDE7XHJcblxyXG4gICAgcHVibGljIGNoaWxkcmVuQXZlcmFnaW5nV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIGNoaWxkcmVuQ29uZmlkZW5jZVdlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBjaGlsZHJlblJlbGV2YW5jZVdlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBjaGlsZHJlbldlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyB3ZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgcGVyY2VudE9mV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgLyoqIElzIHRoaXMgc2NvcmUgcHJvIHRoZSBtYWluIHRvcCBjbGFpbSAqL1xyXG4gICAgcHVibGljIHByb01haW46IGJvb2xlYW4gPSB0cnVlOyAvLyBUT0RPOiBzaG91bGQgdGhpcyBzdGFydCB1bmRlZmluZWQ/XHJcblxyXG5cclxuICAgIC8vIC8vVE9ETzpFeHBlcmltZW50YWxcclxuICAgIC8vIHB1YmxpYyBjaGlsZHJlblByb1dlaWdodDogbnVtYmVyID0gMDtcclxuICAgIC8vIHB1YmxpYyBjaGlsZHJlbkNvbldlaWdodDogbnVtYmVyID0gMDtcclxuICAgIC8vIHB1YmxpYyBwZXJjZW50QWdyZWVXZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwdWJsaWMgcGFyZW50RnJhY3Rpb25TaW1wbGU6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbiJdfQ==