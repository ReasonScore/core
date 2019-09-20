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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1Njb3JlQW5kQ2xhaW1FZGdlLnRzIl0sIm5hbWVzIjpbIlNjb3JlQW5kQ2xhaW1FZGdlIiwic2NvcmUiLCJjbGFpbUVkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7SUFHYUEsaUIsR0FDVCwyQkFDV0MsS0FEWCxFQUVXQyxTQUZYLEVBR0U7QUFBQTs7QUFBQSxPQUZTRCxLQUVULEdBRlNBLEtBRVQ7QUFBQSxPQURTQyxTQUNULEdBRFNBLFNBQ1Q7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi9TY29yZVwiO1xuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vQ2xhaW1FZGdlXCI7XG4vKipcbiAqIFN0b3JlcyBhIHNjb3JlIGFuZCBpdCdzIGVkZ2UgaW4gb25lIGluc2VwYXJhYmxlIHVuaXQgdG8gcmVkdWNlIGZ1dHVyZSBzZWFyY2hpbmdcbiAqL1xuZXhwb3J0IGNsYXNzIFNjb3JlQW5kQ2xhaW1FZGdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNjb3JlOiBTY29yZSxcbiAgICAgICAgcHVibGljIGNsYWltRWRnZTogQ2xhaW1FZGdlLFxuICAgICkge1xuICAgIH1cbn1cbiJdfQ==