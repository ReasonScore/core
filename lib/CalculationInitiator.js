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

      var scoreAndClaimEdges = []; //Get all the claims for the parent to calculate the score

      var claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
      claimseEdges.forEach(function (c) {
        scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(_this2.repo.getScoreBySourceClaimId(c.childId), c));
      });
      var newScore = (0, _calculateScore.calculateScore)({
        scoreAndClaimEdges: scoreAndClaimEdges,
        sourceClaimId: parentId
      });
      return newScore;
    }
  }]);

  return CalculationInitator;
}();

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsImNoYW5nZXMiLCJub3RpZnkiLCJDYWxjdWxhdGlvbkluaXRpYXRvciIsImNoYW5nZSIsIm5ld0l0ZW0iLCJvbGRJdGVtIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJuZXdTY29yZSIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInBhcmVudElkIiwib2xkU2NvcmUiLCJnZXRTY29yZUJ5U291cmNlQ2xhaW1JZCIsInNvdXJjZUNsYWltSWQiLCJpZCIsIkNoYW5nZSIsImNsYWltIiwiU2NvcmUiLCJ1bmRlZmluZWQiLCJzY29yZSIsImNsYWltc2VFZGdlcyIsImdldENsYWltRWRnZXNCeUNoaWxkSWQiLCJmb3JFYWNoIiwic2NvcmVBbmRDbGFpbUVkZ2VzIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjIiwicHVzaCIsIlNjb3JlQW5kQ2xhaW1FZGdlIiwiY2hpbGRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBSWFBLG1COzs7QUFHVCwrQkFDSUMsSUFESixFQUVFO0FBQUE7O0FBQUE7O0FBQ0UsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFFRDs7Ozs7MkJBQ09DLE8sRUFBbUI7QUFDdEIsV0FBS0QsSUFBTCxDQUFVRSxNQUFWLENBQWlCRCxPQUFqQjtBQUNBLFdBQUtFLG9CQUFMLENBQTBCRixPQUExQjtBQUNIOzs7eUNBRTRCQSxPLEVBQXlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2xELDZCQUFxQkEsT0FBckIsOEhBQThCO0FBQUEsY0FBbkJHLE1BQW1CO0FBQUEsY0FDbEJDLE9BRGtCLEdBQ0dELE1BREgsQ0FDbEJDLE9BRGtCO0FBQUEsY0FDVEMsT0FEUyxHQUNHRixNQURILENBQ1RFLE9BRFMsRUFHMUI7O0FBQ0EsY0FBSUQs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LElBQW5CLENBQ0ksSUFBSUMsb0NBQUosQ0FBNkIsTUFBSSxDQUFDN0IsSUFBTCxDQUFVYyx1QkFBVixDQUFrQ2EsQ0FBQyxDQUFDRyxPQUFwQyxDQUE3QixFQUEyRUgsQ0FBM0UsQ0FESjtBQUdILE9BSkQ7QUFLQSxVQUFNakIsUUFBUSxHQUFHLG9DQUFlO0FBQzVCZSxRQUFBQSxrQkFBa0IsRUFBRUEsa0JBRFE7QUFFNUJWLFFBQUFBLGFBQWEsRUFBRUg7QUFGYSxPQUFmLENBQWpCO0FBSUEsYUFBT0YsUUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcbiAgICBwcml2YXRlIHJlcG86IFJlcG9zaXRvcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVwbzogUmVwb3NpdG9yeSxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVwbyA9IHJlcG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgICAgIHRoaXMucmVwby5ub3RpZnkoY2hhbmdlcyk7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCB7IG5ld0l0ZW0sIG9sZEl0ZW0gfSA9IGNoYW5nZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2hhbmdlZC9uZXcgY2xhaW0gRWRnZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2UgPSA8Q2xhaW1FZGdlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTY29yZSA9IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRTY29yZSA9IHRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChuZXdTY29yZS5zb3VyY2VDbGFpbUlkKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Njb3JlLmlkID0gb2xkU2NvcmUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IGNsYWltXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW0gPSA8Q2xhaW0+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTY29yZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjbGFpbS5pZClcclxuICAgICAgICAgICAgICAgICldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IHNjb3JlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGhlIGNsYWltRWRnZXMgdGhhdCBoYXZlIHRoaXMgc2NvcmUncyBTb3VyY2VDbGFpbUlkIGFzIHRoZSBjaGlsZCBhbmQgcmUgY2FsY3VsYXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlDaGlsZElkKHNjb3JlLnNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgICAgICAgICAgY2xhaW1zZUVkZ2VzLmZvckVhY2goY2xhaW1FZGdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTY29yZSA9IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsb2xkU2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUJ5Q2xhaW1JZChwYXJlbnRJZDogSWQpIHtcclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXM6IFNjb3JlQW5kQ2xhaW1FZGdlW10gPSBbXTtcclxuICAgICAgICAvL0dldCBhbGwgdGhlIGNsYWltcyBmb3IgdGhlIHBhcmVudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXHJcbiAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkKTtcclxuICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2UoPFNjb3JlPnRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjLmNoaWxkSWQpLCBjKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3U2NvcmU7XHJcbiAgICB9XHJcbn0iXX0=