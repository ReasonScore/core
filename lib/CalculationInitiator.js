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
    _classCallCheck(this, CalculationInitator);

    _defineProperty(this, "repo", void 0);

    this.repo = repo;
  }
  /** this function can be called by outside code to notfy this repository of changes */


  _createClass(CalculationInitator, [{
    key: "notify",
    value: function notify(changes) {
      this.repo.notify(changes);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsImNoYW5nZXMiLCJub3RpZnkiLCJDYWxjdWxhdGlvbkluaXRpYXRvciIsImNoYW5nZSIsIm5ld0l0ZW0iLCJvbGRJdGVtIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJuZXdTY29yZSIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInBhcmVudElkIiwib2xkU2NvcmUiLCJnZXRTY29yZUJ5U291cmNlQ2xhaW1JZCIsInNvdXJjZUNsYWltSWQiLCJpZCIsIkNoYW5nZSIsImNsYWltIiwiU2NvcmUiLCJ1bmRlZmluZWQiLCJzY29yZSIsImNsYWltc2VFZGdlcyIsImdldENsYWltRWRnZXNCeUNoaWxkSWQiLCJmb3JFYWNoIiwic2NvcmVBbmRDbGFpbUVkZ2VzIiwicmV2ZXJzYWJsZSIsInBhcmVudEl0ZW0iLCJnZXRJdGVtIiwicGFyZW50Q2xhaW0iLCJnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZCIsImMiLCJwdXNoIiwiU2NvcmVBbmRDbGFpbUVkZ2UiLCJjaGlsZElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFJYUEsbUI7OztBQUdULCtCQUNJQyxJQURKLEVBRUU7QUFBQTs7QUFBQTs7QUFDRSxTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSDtBQUVEOzs7OzsyQkFDT0MsTyxFQUFtQjtBQUN0QixXQUFLRCxJQUFMLENBQVVFLE1BQVYsQ0FBaUJELE9BQWpCO0FBQ0EsV0FBS0Usb0JBQUwsQ0FBMEJGLE9BQTFCO0FBQ0g7Ozt5Q0FFNEJBLE8sRUFBeUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDbEQsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7QUFBQSxjQUNsQkMsT0FEa0IsR0FDR0QsTUFESCxDQUNsQkMsT0FEa0I7QUFBQSxj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Qjs7QUFDQSxVQUFJZSxVQUFKLEVBQWdCO0FBQ1osWUFBTUUsV0FBVyxHQUFVRixVQUEzQjtBQUNBRCxRQUFBQSxVQUFVLEdBQUdHLFdBQVcsQ0FBQ0gsVUFBekI7QUFDSCxPQVRvQyxDQVdyQzs7O0FBQ0EsVUFBTUosWUFBWSxHQUFHLEtBQUt0QixJQUFMLENBQVU4Qix1QkFBVixDQUFrQ2xCLFFBQWxDLENBQXJCO0FBQ0FVLE1BQUFBLFlBQVksQ0FBQ0UsT0FBYixDQUFxQixVQUFBTyxDQUFDLEVBQUk7QUFDdEJOLFFBQUFBLGtCQUFrQixDQUFDTyxJQUFuQixDQUNJLElBQUlDLG9DQUFKLENBQTZCLE1BQUksQ0FBQ2pDLElBQUwsQ0FBVWMsdUJBQVYsQ0FBa0NpQixDQUFDLENBQUNHLE9BQXBDLENBQTdCLEVBQTJFSCxDQUEzRSxDQURKO0FBR0gsT0FKRDtBQU1BLFVBQU1yQixRQUFRLEdBQUcsb0NBQWU7QUFDNUJlLFFBQUFBLGtCQUFrQixFQUFFQSxrQkFEUTtBQUU1QkMsUUFBQUEsVUFBVSxFQUFFQSxVQUZnQjtBQUc1QlgsUUFBQUEsYUFBYSxFQUFFSDtBQUhhLE9BQWYsQ0FBakI7QUFNQSxhQUFPRixRQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IFNjb3JlQW5kQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZUFuZENsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IFNjb3JlLCBkaWZmZXJlbnRTY29yZXMgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSWRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkluaXRhdG9yIHtcclxuICAgIHByaXZhdGUgcmVwbzogUmVwb3NpdG9yeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZXBvOiBSZXBvc2l0b3J5LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZXBvID0gcmVwbztcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgdGhpcy5yZXBvLm5vdGlmeShjaGFuZ2VzKTtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3SXRlbSwgb2xkSXRlbSB9ID0gY2hhbmdlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjaGFuZ2VkL25ldyBjbGFpbSBFZGdlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IDxDbGFpbUVkZ2U+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njb3JlID0gdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFNjb3JlID0gdGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG5ld1Njb3JlLnNvdXJjZUNsYWltSWQpXHJcbiAgICAgICAgICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW50U2NvcmVzKG9sZFNjb3JlLCBuZXdTY29yZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2NvcmUuaWQgPSBvbGRTY29yZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSwgb2xkU2NvcmUpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2FuZ2VkL25ldyBjbGFpbVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltID0gPENsYWltPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgU2NvcmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2xhaW0uaWQpXHJcbiAgICAgICAgICAgICAgICApXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2FuZ2VkL25ldyBzY29yZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIHRoZSBjbGFpbUVkZ2VzIHRoYXQgaGF2ZSB0aGlzIHNjb3JlJ3MgU291cmNlQ2xhaW1JZCBhcyB0aGUgY2hpbGQgYW5kIHJlIGNhbGN1bGF0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZChzY29yZS5zb3VyY2VDbGFpbUlkKTtcclxuICAgICAgICAgICAgICAgIGNsYWltc2VFZGdlcy5mb3JFYWNoKGNsYWltRWRnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2NvcmUgPSB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFNjb3JlID0gdGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG5ld1Njb3JlLnNvdXJjZUNsYWltSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWZmZXJlbnRTY29yZXMob2xkU2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2NvcmUuaWQgPSBvbGRTY29yZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlQnlDbGFpbUlkKHBhcmVudElkOiBJZCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlQW5kQ2xhaW1FZGdlczogU2NvcmVBbmRDbGFpbUVkZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICAvL0lzIHBhcmVudCByZXZlcnNhYmxlP1xyXG4gICAgICAgIGxldCByZXZlcnNhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHRoaXMucmVwby5nZXRJdGVtKHBhcmVudElkKTtcclxuICAgICAgICBpZiAocGFyZW50SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRDbGFpbSA9IDxDbGFpbT5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICByZXZlcnNhYmxlID0gcGFyZW50Q2xhaW0ucmV2ZXJzYWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vR2V0IGFsbCB0aGUgY2xhaW1zIGZvciB0aGUgcGFyZW50IHRvIGNhbGN1bGF0ZSB0aGUgc2NvcmVcclxuICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQpO1xyXG4gICAgICAgIGNsYWltc2VFZGdlcy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZSg8U2NvcmU+dGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGMuY2hpbGRJZCksIGMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgcmV2ZXJzYWJsZTogcmV2ZXJzYWJsZSxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3U2NvcmU7XHJcbiAgICB9XHJcbn0iXX0=