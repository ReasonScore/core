"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculationInitator = void 0;

var _Change = require("./dataModels/Change");

var _Type = require("./dataModels/Type");

var _ScoreAndClaimEdge = require("./dataModels/ScoreAndClaimEdge");

var _calculateScore = require("./calculateScore");

var _Score = require("./dataModels/Score");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalculationInitator =
/*#__PURE__*/
function () {
  function CalculationInitator(repo) {
    var _this = this;

    var subscriber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, CalculationInitator);

    this.repo = repo;
    this.subscriber = subscriber;

    _defineProperty(this, "notify", function (changes) {
      _this.repo.notify(changes);

      if (_this.subscriber) {
        _this.subscriber(changes);
      }

      _this.CalculationInitiator(changes);
    });
  }
  /** this function can be called by outside code to notfy this repository of changes */


  _createClass(CalculationInitator, [{
    key: "CalculationInitiator",
    value: function CalculationInitiator(changes) {
      var _this2 = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;
          var newItem = change.newItem,
              oldItem = change.oldItem; // Initiate calculations from a changed/new claim Edge

          if (newItem.type == _Type.Type.claimEdge) {
            var claimEdge = newItem;
            this.CalculateByClaimId(claimEdge.parentId);
          } // Initiate calculations from a canged/new claim


          if (newItem.type == _Type.Type.claim) {
            var claim = newItem;
            this.CalculateByClaimId(claim.id);
          } // Initiate calculations from a canged/new score


          if (newItem.type == _Type.Type.score) {
            var score = newItem; // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them

            var claimseEdges = this.repo.getClaimEdgesByChildId(score.sourceClaimId);
            claimseEdges.forEach(function (claimEdge) {
              _this2.CalculateByClaimId(claimEdge.parentId);
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "CalculateByClaimId",
    value: function CalculateByClaimId(parentId) {
      var _this3 = this;

      var scoreAndClaimEdges = []; //Is parent reversible?

      var reversible = false;
      var parentItem = this.repo.getItem(parentId);

      if (parentItem) {
        var parentClaim = parentItem;
        reversible = parentClaim.reversible;
      } //Get all the claims for the parent to calculate the score


      var claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
      claimseEdges.forEach(function (c) {
        scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(_this3.repo.getScoreBySourceClaimId(c.childId), c));
      });
      var newScore = (0, _calculateScore.calculateScore)({
        scoreAndClaimEdges: scoreAndClaimEdges,
        reversible: reversible,
        sourceClaimId: parentId
      });
      var oldScore = this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

      if (oldScore) {
        if ((0, _Score.differentScores)(oldScore, newScore)) {
          newScore.id = oldScore.id;
          this.notify([new _Change.Change(newScore, oldScore)]);
        }
      } else {
        this.notify([new _Change.Change(newScore)]);
      }
    }
  }]);

  return CalculationInitator;
}();

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiQ2FsY3VsYXRlQnlDbGFpbUlkIiwicGFyZW50SWQiLCJjbGFpbSIsImlkIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwic291cmNlQ2xhaW1JZCIsImZvckVhY2giLCJzY29yZUFuZENsYWltRWRnZXMiLCJyZXZlcnNpYmxlIiwicGFyZW50SXRlbSIsImdldEl0ZW0iLCJwYXJlbnRDbGFpbSIsImdldENsYWltRWRnZXNCeVBhcmVudElkIiwiYyIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUthQSxtQjs7O0FBRVQsK0JBQ1dDLElBRFgsRUFHRTtBQUFBOztBQUFBLFFBRFNDLFVBQ1QsdUVBRGlFQyxTQUNqRTs7QUFBQTs7QUFBQSxTQUZTRixJQUVULEdBRlNBLElBRVQ7QUFBQSxTQURTQyxVQUNULEdBRFNBLFVBQ1Q7O0FBQUEsb0NBSU8sVUFBQ0UsT0FBRCxFQUF1QjtBQUM1QixNQUFBLEtBQUksQ0FBQ0gsSUFBTCxDQUFVSSxNQUFWLENBQWlCRCxPQUFqQjs7QUFDQSxVQUFJLEtBQUksQ0FBQ0YsVUFBVCxFQUFxQjtBQUNqQixRQUFBLEtBQUksQ0FBQ0EsVUFBTCxDQUFnQkUsT0FBaEI7QUFDSDs7QUFDRCxNQUFBLEtBQUksQ0FBQ0Us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LENBQVo7QUFDSDtBQUNKLE9BTEQsTUFLTztBQUNILGFBQUs3QixNQUFMLENBQVksQ0FBQyxJQUFJOEIsY0FBSixDQUFXRixRQUFYLENBQUQsQ0FBWjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IFNjb3JlQW5kQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZUFuZENsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IFNjb3JlLCBkaWZmZXJlbnRTY29yZXMgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSWRcIjtcclxuaW1wb3J0IHsgaVJlcG9zaXRvcnkgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL2lSZXBvc2l0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlcG86IGlSZXBvc2l0b3J5LFxyXG4gICAgICAgIHB1YmxpYyBzdWJzY3JpYmVyOiAoKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeSA9IChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVwby5ub3RpZnkoY2hhbmdlcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXIoY2hhbmdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzOiBDaGFuZ2VbXSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBuZXdJdGVtLCBvbGRJdGVtIH0gPSBjaGFuZ2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNoYW5nZWQvbmV3IGNsYWltIEVkZ2VcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1FZGdlID0gbmV3SXRlbSBhcyBDbGFpbUVkZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgY2xhaW1cclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbSA9IDxDbGFpbT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgc2NvcmVcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2xhaW1FZGdlcyB0aGF0IGhhdmUgdGhpcyBzY29yZSdzIFNvdXJjZUNsYWltSWQgYXMgdGhlIGNoaWxkIGFuZCByZSBjYWxjdWxhdGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeUNoaWxkSWQoc2NvcmUuc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjbGFpbUVkZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlQnlDbGFpbUlkKHBhcmVudElkOiBJZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlQW5kQ2xhaW1FZGdlczogU2NvcmVBbmRDbGFpbUVkZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICAvL0lzIHBhcmVudCByZXZlcnNpYmxlP1xyXG4gICAgICAgIGxldCByZXZlcnNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHRoaXMucmVwby5nZXRJdGVtKHBhcmVudElkKTtcclxuICAgICAgICBpZiAocGFyZW50SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRDbGFpbSA9IDxDbGFpbT5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICByZXZlcnNpYmxlID0gcGFyZW50Q2xhaW0ucmV2ZXJzaWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vR2V0IGFsbCB0aGUgY2xhaW1zIGZvciB0aGUgcGFyZW50IHRvIGNhbGN1bGF0ZSB0aGUgc2NvcmVcclxuICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQpO1xyXG4gICAgICAgIGNsYWltc2VFZGdlcy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZSg8U2NvcmU+dGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGMuY2hpbGRJZCksIGMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgcmV2ZXJzaWJsZTogcmV2ZXJzaWJsZSxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==