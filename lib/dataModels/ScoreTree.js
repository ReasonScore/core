"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreTree = void 0;

var _newId = require("../newId");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents an intentional top of a tree of scores.
 */
class ScoreTree {
  constructor(
  /** The claim to which this score belongs */
  sourceClaimId,
  /** The top of the tree of scores that this belongs to. Used for indexing */
  topScoreId,
  /** how confident we sould be in the claim. (AKA True) */
  confidence = 1, id = (0, _newId.newId)(), descendantCount = 0) {
    this.sourceClaimId = sourceClaimId;
    this.topScoreId = topScoreId;
    this.confidence = confidence;
    this.id = id;
    this.descendantCount = descendantCount;

    _defineProperty(this, "type", 'scoreTree');
  }

}

exports.ScoreTree = ScoreTree;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlVHJlZS50cyJdLCJuYW1lcyI6WyJTY29yZVRyZWUiLCJjb25zdHJ1Y3RvciIsInNvdXJjZUNsYWltSWQiLCJ0b3BTY29yZUlkIiwiY29uZmlkZW5jZSIsImlkIiwiZGVzY2VuZGFudENvdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxTQUFOLENBQWdDO0FBR25DQyxFQUFBQSxXQUFXO0FBQ1A7QUFDT0MsRUFBQUEsYUFGQTtBQUdQO0FBQ09DLEVBQUFBLFVBSkE7QUFLUDtBQUNPQyxFQUFBQSxVQUFrQixHQUFHLENBTnJCLEVBT0FDLEVBQVUsR0FBRyxtQkFQYixFQVFBQyxlQUF1QixHQUFHLENBUjFCLEVBU1Q7QUFBQSxTQVBTSixhQU9ULEdBUFNBLGFBT1Q7QUFBQSxTQUxTQyxVQUtULEdBTFNBLFVBS1Q7QUFBQSxTQUhTQyxVQUdULEdBSFNBLFVBR1Q7QUFBQSxTQUZTQyxFQUVULEdBRlNBLEVBRVQ7QUFBQSxTQURTQyxlQUNULEdBRFNBLGVBQ1Q7O0FBQUEsa0NBWGdCLFdBV2hCO0FBQ0Q7O0FBYmtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0l0ZW1cIjtcclxuaW1wb3J0IHsgSXRlbVR5cGVzIH0gZnJvbSBcIi4uXCI7XHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGludGVudGlvbmFsIHRvcCBvZiBhIHRyZWUgb2Ygc2NvcmVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjb3JlVHJlZSBpbXBsZW1lbnRzIEl0ZW0ge1xyXG4gICAgdHlwZTogSXRlbVR5cGVzID0gJ3Njb3JlVHJlZSdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKiogVGhlIGNsYWltIHRvIHdoaWNoIHRoaXMgc2NvcmUgYmVsb25ncyAqL1xyXG4gICAgICAgIHB1YmxpYyBzb3VyY2VDbGFpbUlkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIFRoZSB0b3Agb2YgdGhlIHRyZWUgb2Ygc2NvcmVzIHRoYXQgdGhpcyBiZWxvbmdzIHRvLiBVc2VkIGZvciBpbmRleGluZyAqL1xyXG4gICAgICAgIHB1YmxpYyB0b3BTY29yZUlkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIGhvdyBjb25maWRlbnQgd2Ugc291bGQgYmUgaW4gdGhlIGNsYWltLiAoQUtBIFRydWUpICovXHJcbiAgICAgICAgcHVibGljIGNvbmZpZGVuY2U6IG51bWJlciA9IDEsXHJcbiAgICAgICAgcHVibGljIGlkOiBzdHJpbmcgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBkZXNjZW5kYW50Q291bnQ6IG51bWJlciA9IDAsXHJcbiAgICApIHtcclxuICAgIH1cclxufSJdfQ==