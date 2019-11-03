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

var CalculationInitator =
/*#__PURE__*/
function () {
  function CalculationInitator(repo) {
    var subscriber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, CalculationInitator);

    this.repo = repo;
    this.subscriber = subscriber;
  }
  /** this function can be called by outside code to notfy this repository of changes */


  _createClass(CalculationInitator, [{
    key: "notify",
    value: function notify(changes) {
      this.repo.notify(changes);

      if (this.subscriber) {
        this.subscriber(changes);
      }

      this.CalculationInitiator(changes);
    }
  }, {
    key: "CalculationInitiator",
    value: function CalculationInitiator(changes) {
      var _this = this;

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
            var newScore = this.CalculateByClaimId(claimEdge.parentId);
            var oldScore = this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

            if (oldScore) {
              if ((0, _Score.differentScores)(oldScore, newScore)) {
                newScore.id = oldScore.id;
                this.notify([new _Change.Change(newScore, oldScore)]);
              }
            } else {
              this.notify([new _Change.Change(newScore)]);
            }

            this.notify([new _Change.Change(newScore, oldScore)]);
          } // Initiate calculations from a canged/new claim


          if (newItem.type == _Type.Type.claim) {
            var claim = newItem;
            this.notify([new _Change.Change(new _Score.Score(undefined, undefined, undefined, claim.id))]);
          } // Initiate calculations from a canged/new score


          if (newItem.type == _Type.Type.score) {
            var score = newItem; // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them

            var claimseEdges = this.repo.getClaimEdgesByChildId(score.sourceClaimId);
            claimseEdges.forEach(function (claimEdge) {
              var newScore = _this.CalculateByClaimId(claimEdge.parentId);

              var oldScore = _this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

              if (oldScore) {
                if ((0, _Score.differentScores)(oldScore, newScore)) {
                  newScore.id = oldScore.id;

                  _this.notify([new _Change.Change(newScore, oldScore)]);
                }
              } else {
                _this.notify([new _Change.Change(newScore)]);
              }
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
      var _this2 = this;

      var scoreAndClaimEdges = []; //Is parent reversable?

      var reversable = false;
      var parentItem = this.repo.getItem(parentId);

      if (parentItem) {
        var parentClaim = parentItem;
        reversable = parentClaim.reversable;
      } //Get all the claims for the parent to calculate the score


      var claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
      claimseEdges.forEach(function (c) {
        scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(_this2.repo.getScoreBySourceClaimId(c.childId), c));
      });
      var newScore = (0, _calculateScore.calculateScore)({
        scoreAndClaimEdges: scoreAndClaimEdges,
        reversable: reversable,
        sourceClaimId: parentId
      });
      return newScore;
    }
  }]);

  return CalculationInitator;
}();

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwibmV3U2NvcmUiLCJDYWxjdWxhdGVCeUNsYWltSWQiLCJwYXJlbnRJZCIsIm9sZFNjb3JlIiwiZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiaWQiLCJDaGFuZ2UiLCJjbGFpbSIsIlNjb3JlIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwiZm9yRWFjaCIsInNjb3JlQW5kQ2xhaW1FZGdlcyIsInJldmVyc2FibGUiLCJwYXJlbnRJdGVtIiwiZ2V0SXRlbSIsInBhcmVudENsYWltIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjIiwicHVzaCIsIlNjb3JlQW5kQ2xhaW1FZGdlIiwiY2hpbGRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7OztJQUlhQSxtQjs7O0FBRVQsK0JBQ1dDLElBRFgsRUFHRTtBQUFBLFFBRFNDLFVBQ1QsdUVBRGlFQyxTQUNqRTs7QUFBQTs7QUFBQSxTQUZTRixJQUVULEdBRlNBLElBRVQ7QUFBQSxTQURTQyxVQUNULEdBRFNBLFVBQ1Q7QUFDRDtBQUVEOzs7OzsyQkFDT0UsTyxFQUFtQjtBQUN0QixXQUFLSCxJQUFMLENBQVVJLE1BQVYsQ0FBaUJELE9BQWpCOztBQUNBLFVBQUksS0FBS0YsVUFBVCxFQUFxQjtBQUNqQixhQUFLQSxVQUFMLENBQWdCRSxPQUFoQjtBQUNIOztBQUNELFdBQUtFLG9CQUFMLENBQTBCRixPQUExQjtBQUNIOzs7eUNBRTRCQSxP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ckMsVUFBTVksa0JBQXVDLEdBQUcsRUFBaEQsQ0FEcUMsQ0FHckM7O0FBQ0EsVUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsVUFBTUMsVUFBVSxHQUFHLEtBQUs1QixJQUFMLENBQVU2QixPQUFWLENBQWtCZixRQUFsQixDQUFuQjs7QUFDQSxVQUFJYyxVQUFKLEVBQWdCO0FBQ1osWUFBTUUsV0FBVyxHQUFVRixVQUEzQjtBQUNBRCxRQUFBQSxVQUFVLEdBQUdHLFdBQVcsQ0FBQ0gsVUFBekI7QUFDSCxPQVRvQyxDQVdyQzs7O0FBQ0EsVUFBTUosWUFBWSxHQUFHLEtBQUt2QixJQUFMLENBQVUrQix1QkFBVixDQUFrQ2pCLFFBQWxDLENBQXJCO0FBQ0FTLE1BQUFBLFlBQVksQ0FBQ0UsT0FBYixDQUFxQixVQUFBTyxDQUFDLEVBQUk7QUFDdEJOLFFBQUFBLGtCQUFrQixDQUFDTyxJQUFuQixDQUNJLElBQUlDLG9DQUFKLENBQTZCLE1BQUksQ0FBQ2xDLElBQUwsQ0FBVWdCLHVCQUFWLENBQWtDZ0IsQ0FBQyxDQUFDRyxPQUFwQyxDQUE3QixFQUEyRUgsQ0FBM0UsQ0FESjtBQUdILE9BSkQ7QUFNQSxVQUFNcEIsUUFBUSxHQUFHLG9DQUFlO0FBQzVCYyxRQUFBQSxrQkFBa0IsRUFBRUEsa0JBRFE7QUFFNUJDLFFBQUFBLFVBQVUsRUFBRUEsVUFGZ0I7QUFHNUJWLFFBQUFBLGFBQWEsRUFBRUg7QUFIYSxPQUFmLENBQWpCO0FBTUEsYUFBT0YsUUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlcG86IFJlcG9zaXRvcnksXHJcbiAgICAgICAgcHVibGljIHN1YnNjcmliZXI6ICgoY2hhbmdlczogQ2hhbmdlW10pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgdGhpcy5yZXBvLm5vdGlmeShjaGFuZ2VzKTtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcihjaGFuZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCB7IG5ld0l0ZW0sIG9sZEl0ZW0gfSA9IGNoYW5nZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2hhbmdlZC9uZXcgY2xhaW0gRWRnZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2UgPSA8Q2xhaW1FZGdlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTY29yZSA9IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRTY29yZSA9IHRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChuZXdTY29yZS5zb3VyY2VDbGFpbUlkKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Njb3JlLmlkID0gb2xkU2NvcmUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgY2xhaW1cclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbSA9IDxDbGFpbT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNjb3JlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNsYWltLmlkKVxyXG4gICAgICAgICAgICAgICAgKV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgc2NvcmVcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2xhaW1FZGdlcyB0aGF0IGhhdmUgdGhpcyBzY29yZSdzIFNvdXJjZUNsYWltSWQgYXMgdGhlIGNoaWxkIGFuZCByZSBjYWxjdWxhdGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeUNoaWxkSWQoc2NvcmUuc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjbGFpbUVkZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njb3JlID0gdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTY29yZSA9IHRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChuZXdTY29yZS5zb3VyY2VDbGFpbUlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW50U2NvcmVzKG9sZFNjb3JlLCBuZXdTY29yZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Njb3JlLmlkID0gb2xkU2NvcmUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSwgb2xkU2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUJ5Q2xhaW1JZChwYXJlbnRJZDogSWQpIHtcclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXM6IFNjb3JlQW5kQ2xhaW1FZGdlW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy9JcyBwYXJlbnQgcmV2ZXJzYWJsZT9cclxuICAgICAgICBsZXQgcmV2ZXJzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSB0aGlzLnJlcG8uZ2V0SXRlbShwYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKHBhcmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q2xhaW0gPSA8Q2xhaW0+cGFyZW50SXRlbTtcclxuICAgICAgICAgICAgcmV2ZXJzYWJsZSA9IHBhcmVudENsYWltLnJldmVyc2FibGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0dldCBhbGwgdGhlIGNsYWltcyBmb3IgdGhlIHBhcmVudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXHJcbiAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkKTtcclxuICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2UoPFNjb3JlPnRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjLmNoaWxkSWQpLCBjKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IGNhbGN1bGF0ZVNjb3JlKHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzOiBzY29yZUFuZENsYWltRWRnZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2FibGU6IHJldmVyc2FibGUsXHJcbiAgICAgICAgICAgIHNvdXJjZUNsYWltSWQ6IHBhcmVudElkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTY29yZTtcclxuICAgIH1cclxufSJdfQ==