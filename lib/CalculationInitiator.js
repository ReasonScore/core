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
              var newScore = _this2.CalculateByClaimId(claimEdge.parentId);

              var oldScore = _this2.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

              if (oldScore) {
                if ((0, _Score.differentScores)(oldScore, newScore)) {
                  newScore.id = oldScore.id;

                  _this2.notify([new _Change.Change(newScore, oldScore)]);
                }
              } else {
                _this2.notify([new _Change.Change(newScore)]);
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
      return newScore;
    }
  }]);

  return CalculationInitator;
}();

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwibmV3U2NvcmUiLCJDYWxjdWxhdGVCeUNsYWltSWQiLCJwYXJlbnRJZCIsIm9sZFNjb3JlIiwiZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiaWQiLCJDaGFuZ2UiLCJjbGFpbSIsIlNjb3JlIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwiZm9yRWFjaCIsInNjb3JlQW5kQ2xhaW1FZGdlcyIsInJldmVyc2FibGUiLCJwYXJlbnRJdGVtIiwiZ2V0SXRlbSIsInBhcmVudENsYWltIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjIiwicHVzaCIsIlNjb3JlQW5kQ2xhaW1FZGdlIiwiY2hpbGRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBSWFBLG1COzs7QUFFVCwrQkFDV0MsSUFEWCxFQUdFO0FBQUE7O0FBQUEsUUFEU0MsVUFDVCx1RUFEaUVDLFNBQ2pFOztBQUFBOztBQUFBLFNBRlNGLElBRVQsR0FGU0EsSUFFVDtBQUFBLFNBRFNDLFVBQ1QsR0FEU0EsVUFDVDs7QUFBQSxvQ0FJTSxVQUFDRSxPQUFELEVBQXVCO0FBQzNCLE1BQUEsS0FBSSxDQUFDSCxJQUFMLENBQVVJLE1BQVYsQ0FBaUJELE9BQWpCOztBQUNBLFVBQUksS0FBSSxDQUFDRixVQUFULEVBQXFCO0FBQ2pCLFFBQUEsS0FBSSxDQUFDQSxVQUFMLENBQWdCRSxPQUFoQjtBQUNIOztBQUNELE1BQUEsS0FB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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUErQ3JEOzs7dUNBRzBCRSxRLEVBQWM7QUFBQTs7QUFDckMsVUFBTVksa0JBQXVDLEdBQUcsRUFBaEQsQ0FEcUMsQ0FHckM7O0FBQ0EsVUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsVUFBTUMsVUFBVSxHQUFHLEtBQUs1QixJQUFMLENBQVU2QixPQUFWLENBQWtCZixRQUFsQixDQUFuQjs7QUFDQSxVQUFJYyxVQUFKLEVBQWdCO0FBQ1osWUFBTUUsV0FBVyxHQUFVRixVQUEzQjtBQUNBRCxRQUFBQSxVQUFVLEdBQUdHLFdBQVcsQ0FBQ0gsVUFBekI7QUFDSCxPQVRvQyxDQVdyQzs7O0FBQ0EsVUFBTUosWUFBWSxHQUFHLEtBQUt2QixJQUFMLENBQVUrQix1QkFBVixDQUFrQ2pCLFFBQWxDLENBQXJCO0FBQ0FTLE1BQUFBLFlBQVksQ0FBQ0UsT0FBYixDQUFxQixVQUFBTyxDQUFDLEVBQUk7QUFDdEJOLFFBQUFBLGtCQUFrQixDQUFDTyxJQUFuQixDQUNJLElBQUlDLG9DQUFKLENBQTZCLE1BQUksQ0FBQ2xDLElBQUwsQ0FBVWdCLHVCQUFWLENBQWtDZ0IsQ0FBQyxDQUFDRyxPQUFwQyxDQUE3QixFQUEyRUgsQ0FBM0UsQ0FESjtBQUdILE9BSkQ7QUFNQSxVQUFNcEIsUUFBUSxHQUFHLG9DQUFlO0FBQzVCYyxRQUFBQSxrQkFBa0IsRUFBRUEsa0JBRFE7QUFFNUJDLFFBQUFBLFVBQVUsRUFBRUEsVUFGZ0I7QUFHNUJWLFFBQUFBLGFBQWEsRUFBRUg7QUFIYSxPQUFmLENBQWpCO0FBTUEsYUFBT0YsUUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlcG86IFJlcG9zaXRvcnksXHJcbiAgICAgICAgcHVibGljIHN1YnNjcmliZXI6ICgoY2hhbmdlczogQ2hhbmdlW10pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5ID0oY2hhbmdlczogQ2hhbmdlW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlcG8ubm90aWZ5KGNoYW5nZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3SXRlbSwgb2xkSXRlbSB9ID0gY2hhbmdlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjaGFuZ2VkL25ldyBjbGFpbSBFZGdlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IG5ld0l0ZW0gYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2NvcmUgPSB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICAgICAgICAgIGlmIChvbGRTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWZmZXJlbnRTY29yZXMob2xkU2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSwgb2xkU2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IGNsYWltXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW0gPSA8Q2xhaW0+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTY29yZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjbGFpbS5pZClcclxuICAgICAgICAgICAgICAgICldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IHNjb3JlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGhlIGNsYWltRWRnZXMgdGhhdCBoYXZlIHRoaXMgc2NvcmUncyBTb3VyY2VDbGFpbUlkIGFzIHRoZSBjaGlsZCBhbmQgcmUgY2FsY3VsYXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlDaGlsZElkKHNjb3JlLnNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgICAgICAgICAgY2xhaW1zZUVkZ2VzLmZvckVhY2goY2xhaW1FZGdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTY29yZSA9IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVCeUNsYWltSWQocGFyZW50SWQ6IElkKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVBbmRDbGFpbUVkZ2VzOiBTY29yZUFuZENsYWltRWRnZVtdID0gW107XHJcblxyXG4gICAgICAgIC8vSXMgcGFyZW50IHJldmVyc2FibGU/XHJcbiAgICAgICAgbGV0IHJldmVyc2FibGUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBwYXJlbnRJdGVtID0gdGhpcy5yZXBvLmdldEl0ZW0ocGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudENsYWltID0gPENsYWltPnBhcmVudEl0ZW07XHJcbiAgICAgICAgICAgIHJldmVyc2FibGUgPSBwYXJlbnRDbGFpbS5yZXZlcnNhYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9HZXQgYWxsIHRoZSBjbGFpbXMgZm9yIHRoZSBwYXJlbnQgdG8gY2FsY3VsYXRlIHRoZSBzY29yZVxyXG4gICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZCk7XHJcbiAgICAgICAgY2xhaW1zZUVkZ2VzLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgIHNjb3JlQW5kQ2xhaW1FZGdlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IFNjb3JlQW5kQ2xhaW1FZGdlKDxTY29yZT50aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQoYy5jaGlsZElkKSwgYylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3U2NvcmUgPSBjYWxjdWxhdGVTY29yZSh7XHJcbiAgICAgICAgICAgIHNjb3JlQW5kQ2xhaW1FZGdlczogc2NvcmVBbmRDbGFpbUVkZ2VzLFxyXG4gICAgICAgICAgICByZXZlcnNhYmxlOiByZXZlcnNhYmxlLFxyXG4gICAgICAgICAgICBzb3VyY2VDbGFpbUlkOiBwYXJlbnRJZFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3U2NvcmU7XHJcbiAgICB9XHJcbn0iXX0=