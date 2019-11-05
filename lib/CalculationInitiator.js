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

      var scoreAndClaimEdges = []; //Is parent reversable?

      var reversable = false;
      var parentItem = this.repo.getItem(parentId);

      if (parentItem) {
        var parentClaim = parentItem;
        reversable = parentClaim.reversable;
      } //Get all the claims for the parent to calculate the score


      var claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
      claimseEdges.forEach(function (c) {
        scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(_this3.repo.getScoreBySourceClaimId(c.childId), c));
      });
      var newScore = (0, _calculateScore.calculateScore)({
        scoreAndClaimEdges: scoreAndClaimEdges,
        reversable: reversable,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiQ2FsY3VsYXRlQnlDbGFpbUlkIiwicGFyZW50SWQiLCJjbGFpbSIsImlkIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwic291cmNlQ2xhaW1JZCIsImZvckVhY2giLCJzY29yZUFuZENsYWltRWRnZXMiLCJyZXZlcnNhYmxlIiwicGFyZW50SXRlbSIsImdldEl0ZW0iLCJwYXJlbnRDbGFpbSIsImdldENsYWltRWRnZXNCeVBhcmVudElkIiwiYyIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUlhQSxtQjs7O0FBRVQsK0JBQ1dDLElBRFgsRUFHRTtBQUFBOztBQUFBLFFBRFNDLFVBQ1QsdUVBRGlFQyxTQUNqRTs7QUFBQTs7QUFBQSxTQUZTRixJQUVULEdBRlNBLElBRVQ7QUFBQSxTQURTQyxVQUNULEdBRFNBLFVBQ1Q7O0FBQUEsb0NBSU8sVUFBQ0UsT0FBRCxFQUF1QjtBQUM1QixNQUFBLEtBQUksQ0FBQ0gsSUFBTCxDQUFVSSxNQUFWLENBQWlCRCxPQUFqQjs7QUFDQSxVQUFJLEtBQUksQ0FBQ0YsVUFBVCxFQUFxQjtBQUNqQixRQUFBLEtBQUksQ0FBQ0EsVUFBTCxDQUFnQkUsT0FBaEI7QUFDSDs7QUFDRCxNQUFBLEtBQUksQ0FBQ0Us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RCxDQUFaO0FBQ0g7QUFDSixPQUxELE1BS087QUFDSCxhQUFLN0IsTUFBTCxDQUFZLENBQUMsSUFBSThCLGNBQUosQ0FBV0YsUUFBWCxDQUFELENBQVo7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlcG86IFJlcG9zaXRvcnksXHJcbiAgICAgICAgcHVibGljIHN1YnNjcmliZXI6ICgoY2hhbmdlczogQ2hhbmdlW10pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5ID0gKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXBvLm5vdGlmeShjaGFuZ2VzKTtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcihjaGFuZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCB7IG5ld0l0ZW0sIG9sZEl0ZW0gfSA9IGNoYW5nZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2hhbmdlZC9uZXcgY2xhaW0gRWRnZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2UgPSBuZXdJdGVtIGFzIENsYWltRWRnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgY2xhaW1cclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbSA9IDxDbGFpbT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgc2NvcmVcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2xhaW1FZGdlcyB0aGF0IGhhdmUgdGhpcyBzY29yZSdzIFNvdXJjZUNsYWltSWQgYXMgdGhlIGNoaWxkIGFuZCByZSBjYWxjdWxhdGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeUNoaWxkSWQoc2NvcmUuc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjbGFpbUVkZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlQnlDbGFpbUlkKHBhcmVudElkOiBJZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlQW5kQ2xhaW1FZGdlczogU2NvcmVBbmRDbGFpbUVkZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICAvL0lzIHBhcmVudCByZXZlcnNhYmxlP1xyXG4gICAgICAgIGxldCByZXZlcnNhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHRoaXMucmVwby5nZXRJdGVtKHBhcmVudElkKTtcclxuICAgICAgICBpZiAocGFyZW50SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRDbGFpbSA9IDxDbGFpbT5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICByZXZlcnNhYmxlID0gcGFyZW50Q2xhaW0ucmV2ZXJzYWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vR2V0IGFsbCB0aGUgY2xhaW1zIGZvciB0aGUgcGFyZW50IHRvIGNhbGN1bGF0ZSB0aGUgc2NvcmVcclxuICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQpO1xyXG4gICAgICAgIGNsYWltc2VFZGdlcy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZSg8U2NvcmU+dGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGMuY2hpbGRJZCksIGMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgcmV2ZXJzYWJsZTogcmV2ZXJzYWJsZSxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==