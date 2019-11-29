"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreAndClaimEdge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores a score and it's edge in one inseparable unit to reduce future searching
 */
var ScoreAndClaimEdge = function ScoreAndClaimEdge(score, claimEdge) {
  _classCallCheck(this, ScoreAndClaimEdge);

  this.score = score;
  this.claimEdge = claimEdge;
};

exports.ScoreAndClaimEdge = ScoreAndClaimEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlQW5kQ2xhaW1FZGdlLnRzIl0sIm5hbWVzIjpbIlNjb3JlQW5kQ2xhaW1FZGdlIiwic2NvcmUiLCJjbGFpbUVkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7SUFHYUEsaUIsR0FDVCwyQkFDV0MsS0FEWCxFQUVXQyxTQUZYLEVBR0U7QUFBQTs7QUFBQSxPQUZTRCxLQUVULEdBRlNBLEtBRVQ7QUFBQSxPQURTQyxTQUNULEdBRFNBLFNBQ1Q7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaVNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vQ2xhaW1FZGdlXCI7XHJcbi8qKlxyXG4gKiBTdG9yZXMgYSBzY29yZSBhbmQgaXQncyBlZGdlIGluIG9uZSBpbnNlcGFyYWJsZSB1bml0IHRvIHJlZHVjZSBmdXR1cmUgc2VhcmNoaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NvcmVBbmRDbGFpbUVkZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHNjb3JlOiBpU2NvcmUsXHJcbiAgICAgICAgcHVibGljIGNsYWltRWRnZTogQ2xhaW1FZGdlLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn1cclxuIl19