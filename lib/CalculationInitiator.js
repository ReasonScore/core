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
        reversable = parentClaim.reversible;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiQ2FsY3VsYXRlQnlDbGFpbUlkIiwicGFyZW50SWQiLCJjbGFpbSIsImlkIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwic291cmNlQ2xhaW1JZCIsImZvckVhY2giLCJzY29yZUFuZENsYWltRWRnZXMiLCJyZXZlcnNhYmxlIiwicGFyZW50SXRlbSIsImdldEl0ZW0iLCJwYXJlbnRDbGFpbSIsInJldmVyc2libGUiLCJnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZCIsImMiLCJwdXNoIiwiU2NvcmVBbmRDbGFpbUVkZ2UiLCJnZXRTY29yZUJ5U291cmNlQ2xhaW1JZCIsImNoaWxkSWQiLCJuZXdTY29yZSIsIm9sZFNjb3JlIiwiQ2hhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFLYUEsbUI7OztBQUVULCtCQUNXQyxJQURYLEVBR0U7QUFBQTs7QUFBQSxRQURTQyxVQUNULHVFQURpRUMsU0FDakU7O0FBQUE7O0FBQUEsU0FGU0YsSUFFVCxHQUZTQSxJQUVUO0FBQUEsU0FEU0MsVUFDVCxHQURTQSxVQUNUOztBQUFBLG9DQUlPLFVBQUNFLE9BQUQsRUFBdUI7QUFDNUIsTUFBQSxLQUFJLENBQUNILElBQUwsQ0FBVUksTUFBVixDQUFpQkQsT0FBakI7O0FBQ0EsVUFBSSxLQUFJLENBQUNGLFVBQVQsRUFBcUI7QUFDakIsUUFBQSxLQUFJLENBQUNBLFVBQUwsQ0FBZ0JFLE9BQWhCO0FBQ0g7O0FBQ0QsTUFB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QkMsUUFBckIsQ0FBRCxDQUFaO0FBQ0g7QUFDSixPQUxELE1BS087QUFDSCxhQUFLOUIsTUFBTCxDQUFZLENBQUMsSUFBSStCLGNBQUosQ0FBV0YsUUFBWCxDQUFELENBQVo7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uSW5pdGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZXBvOiBpUmVwb3NpdG9yeSxcclxuICAgICAgICBwdWJsaWMgc3Vic2NyaWJlcjogKChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkgPSAoY2hhbmdlczogQ2hhbmdlW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlcG8ubm90aWZ5KGNoYW5nZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3SXRlbSwgb2xkSXRlbSB9ID0gY2hhbmdlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjaGFuZ2VkL25ldyBjbGFpbSBFZGdlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IG5ld0l0ZW0gYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IGNsYWltXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW0gPSA8Q2xhaW0+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltLmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IHNjb3JlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGhlIGNsYWltRWRnZXMgdGhhdCBoYXZlIHRoaXMgc2NvcmUncyBTb3VyY2VDbGFpbUlkIGFzIHRoZSBjaGlsZCBhbmQgcmUgY2FsY3VsYXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlDaGlsZElkKHNjb3JlLnNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgICAgICAgICAgY2xhaW1zZUVkZ2VzLmZvckVhY2goY2xhaW1FZGdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUJ5Q2xhaW1JZChwYXJlbnRJZDogSWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXM6IFNjb3JlQW5kQ2xhaW1FZGdlW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy9JcyBwYXJlbnQgcmV2ZXJzYWJsZT9cclxuICAgICAgICBsZXQgcmV2ZXJzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSB0aGlzLnJlcG8uZ2V0SXRlbShwYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKHBhcmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q2xhaW0gPSA8Q2xhaW0+cGFyZW50SXRlbTtcclxuICAgICAgICAgICAgcmV2ZXJzYWJsZSA9IHBhcmVudENsYWltLnJldmVyc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0dldCBhbGwgdGhlIGNsYWltcyBmb3IgdGhlIHBhcmVudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXHJcbiAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkKTtcclxuICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2UoPFNjb3JlPnRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjLmNoaWxkSWQpLCBjKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IGNhbGN1bGF0ZVNjb3JlKHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzOiBzY29yZUFuZENsYWltRWRnZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2FibGU6IHJldmVyc2FibGUsXHJcbiAgICAgICAgICAgIHNvdXJjZUNsYWltSWQ6IHBhcmVudElkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFNjb3JlID0gdGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG5ld1Njb3JlLnNvdXJjZUNsYWltSWQpXHJcbiAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbnRTY29yZXMob2xkU2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3U2NvcmUuaWQgPSBvbGRTY29yZS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=