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
  relevance = 1, id = (0, _newId.newId)(), priority = "", content = "") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlLnRzIl0sIm5hbWVzIjpbIlNjb3JlIiwiY29uc3RydWN0b3IiLCJzb3VyY2VDbGFpbUlkIiwic2NvcmVUcmVlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlRWRnZUlkIiwicmV2ZXJzaWJsZSIsInBybyIsImFmZmVjdHMiLCJjb25maWRlbmNlIiwicmVsZXZhbmNlIiwiaWQiLCJwcmlvcml0eSIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLEtBQU4sQ0FBNEI7QUFHL0JDLEVBQUFBLFdBQVc7QUFDUDtBQUNPQyxFQUFBQSxhQUZBO0FBR1A7QUFDT0MsRUFBQUEsV0FKQTtBQUtQO0FBQ09DLEVBQUFBLGFBQTRCLEdBQUcsSUFOL0IsRUFNcUM7O0FBQzVDO0FBQ09DLEVBQUFBLFlBQTJCLEdBQUcsSUFSOUIsRUFVQUMsVUFBbUIsR0FBRyxLQVZ0QjtBQVdQO0FBQ09DLEVBQUFBLEdBQVksR0FBRyxJQVpmO0FBYVA7O0FBQ0E7QUFDT0MsRUFBQUEsT0FBZ0IsR0FBRyxZQWZuQixFQWdCQUMsVUFBa0IsR0FBRyxDQWhCckI7QUFpQlA7QUFDUjtBQUNlQyxFQUFBQSxTQUFpQixHQUFHLENBbkJwQixFQW9CQUMsRUFBVSxHQUFHLG1CQXBCYixFQXFCQUMsUUFBZ0IsR0FBRyxFQXJCbkIsRUFzQkFDLE9BQWUsR0FBRyxFQXRCbEIsRUF1QlQ7QUFBQSxTQXJCU1gsYUFxQlQsR0FyQlNBLGFBcUJUO0FBQUEsU0FuQlNDLFdBbUJULEdBbkJTQSxXQW1CVDtBQUFBLFNBakJTQyxhQWlCVCxHQWpCU0EsYUFpQlQ7QUFBQSxTQWZTQyxZQWVULEdBZlNBLFlBZVQ7QUFBQSxTQWJTQyxVQWFULEdBYlNBLFVBYVQ7QUFBQSxTQVhTQyxHQVdULEdBWFNBLEdBV1Q7QUFBQSxTQVJTQyxPQVFULEdBUlNBLE9BUVQ7QUFBQSxTQVBTQyxVQU9ULEdBUFNBLFVBT1Q7QUFBQSxTQUpTQyxTQUlULEdBSlNBLFNBSVQ7QUFBQSxTQUhTQyxFQUdULEdBSFNBLEVBR1Q7QUFBQSxTQUZTQyxRQUVULEdBRlNBLFFBRVQ7QUFBQSxTQURTQyxPQUNULEdBRFNBLE9BQ1Q7O0FBQUEsa0NBekJnQixPQXlCaEI7O0FBQUEsNkNBRytCLENBSC9COztBQUFBLHdDQUkwQixDQUoxQjs7QUFBQSw0Q0FPOEIsQ0FQOUI7O0FBQUEsc0NBU3dCLENBVHhCOztBQUFBLHFEQVd1QyxDQVh2Qzs7QUFBQSxzREFZd0MsQ0FaeEM7O0FBQUEscURBYXVDLENBYnZDOztBQUFBLDRDQWM4QixDQWQ5Qjs7QUFBQSxvQ0Flc0IsQ0FmdEI7O0FBQUEsNkNBZ0IrQixDQWhCL0I7QUFDRCxHQTNCOEIsQ0E0Qy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQWhEK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5pbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5pbXBvcnQgeyBJdGVtVHlwZXMgfSBmcm9tIFwiLi5cIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgc2NvcmUgZm9yIGEgY2xhaW0uIEp1c3QgYSBkYXRhIHRyYW5zZmVyIG9iamVjdC4gRG9lcyBub3QgY29udGFpbiBhbnkgbG9naWMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NvcmUgaW1wbGVtZW50cyBJdGVtIHtcclxuICAgIHR5cGU6IEl0ZW1UeXBlcyA9ICdzY29yZSdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKiogVGhlIGNsYWltIHRvIHdoaWNoIHRoaXMgc2NvcmUgYmVsb25ncyAqL1xyXG4gICAgICAgIHB1YmxpYyBzb3VyY2VDbGFpbUlkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIFRoZSB0b3Agb2YgdGhlIHRyZWUgb2Ygc2NvcmVzIHRoYXQgdGhpcyBiZWxvbmdzIHRvLiBVc2VkIGZvciBpbmRleGluZyAqL1xyXG4gICAgICAgIHB1YmxpYyBzY29yZVRyZWVJZDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBUaGUgcGFyZW50IG9mIHRoaXMgc2NvcmUgaW4gdGhlIHNjb3JlIHRyZWUgZ3JhcGggKi9cclxuICAgICAgICBwdWJsaWMgcGFyZW50U2NvcmVJZDogc3RyaW5nIHwgbnVsbCA9IG51bGwsIC8vIFVzZSBudWxsIGJlY2F1c2UgRmlyZXN0b3JlIGRvZXMgbm90IGFsbG93IHVuZGVmaW5lZFxyXG4gICAgICAgIC8qKiBUaGUgRWRnZSB0byB3aGljaCB0aGlzIHNjb3JlIGJlbG9uZ3MgKi9cclxuICAgICAgICBwdWJsaWMgc291cmNlRWRnZUlkOiBzdHJpbmcgfCBudWxsID0gbnVsbCxcclxuXHJcbiAgICAgICAgcHVibGljIHJldmVyc2libGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICAvKiogSXMgdGhpcyBzY29yZSBhIHBybyBvZiBpdCdzIHBhcmVudCAoZmFsc2UgaWYgaXQgaXMgYSBjb24pICovXHJcbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgLyoqIGhvdyBjb25maWRlbnQgd2Ugc291bGQgYmUgaW4gdGhlIGNsYWltLiAoQUtBIFRydWUpICovXHJcbiAgICAgICAgLyoqIEhvdyB0aGUgY2hpbGQgYWZmZWN0cyB0aGUgcGFyZW50IHNjb3JlICovXHJcbiAgICAgICAgcHVibGljIGFmZmVjdHM6IEFmZmVjdHMgPSBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICBwdWJsaWMgY29uZmlkZW5jZTogbnVtYmVyID0gMSxcclxuICAgICAgICAvKiogSG93IHJlbGV2ZW50IHRoaXMgY2xhaW0gaXMgdG8gaXQncyBwYXJlbnQgY2xhaW0uIFJhbmdlcyBmcm9tIDAgdG8gaW5maW5pdHkuXHJcbiAgICAgICAgICogQSBtdWx0aXBsaWVyIHNldCBieSBhbGwgdGhlIGNoaWxkIGVkZ2VzIHRoYXQgYWZmZWN0ICdyZWxldmFuY2UnKi9cclxuICAgICAgICBwdWJsaWMgcmVsZXZhbmNlOiBudW1iZXIgPSAxLFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcHJpb3JpdHk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZyA9IFwiXCIsXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzY2VuZGFudENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGdlbmVyYXRpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIFdoYXQgZnJhY3Rpb24gb2YgdHJlZSBpcyB0aGlzIGRpc3JlZ2FyZGluZyBhbGwgc2NvcmVzICovXHJcbiAgICBwdWJsaWMgZnJhY3Rpb25TaW1wbGU6IG51bWJlciA9IDE7XHJcbiAgICAvKiogV2hhdCBmcmFjdGlvbiBvZiBtYWluU2NvcmUgaXMgdGhpcyBzY29yZSBhbmQgaXQncyBkZXNjZW5kYW50cyByZXNwb25zaWJsZSBmb3IgKi9cclxuICAgIHB1YmxpYyBmcmFjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgY2hpbGRyZW5BdmVyYWdpbmdXZWlnaHQ6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW5Db25maWRlbmNlV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIGNoaWxkcmVuUmVsZXZhbmNlV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIGNoaWxkcmVuV2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHdlaWdodDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBwZXJjZW50T2ZXZWlnaHQ6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLy8gLy9UT0RPOkV4cGVyaW1lbnRhbFxyXG4gICAgLy8gcHVibGljIGNoaWxkcmVuUHJvV2VpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgLy8gcHVibGljIGNoaWxkcmVuQ29uV2VpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgLy8gcHVibGljIHBlcmNlbnRBZ3JlZVdlaWdodDogbnVtYmVyID0gMDtcclxuICAgIC8vIHB1YmxpYyBwYXJlbnRGcmFjdGlvblNpbXBsZTogbnVtYmVyID0gMDtcclxufVxyXG5cclxuIl19