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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbSIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiQ2FsY3VsYXRlQnlDbGFpbUlkIiwicGFyZW50SWQiLCJjbGFpbSIsImlkIiwic2NvcmUiLCJjbGFpbXNlRWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlDaGlsZElkIiwic291cmNlQ2xhaW1JZCIsImZvckVhY2giLCJzY29yZUFuZENsYWltRWRnZXMiLCJyZXZlcnNhYmxlIiwicGFyZW50SXRlbSIsImdldEl0ZW0iLCJwYXJlbnRDbGFpbSIsImdldENsYWltRWRnZXNCeVBhcmVudElkIiwiYyIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUlhQSxtQjs7O0FBRVQsK0JBQ1dDLElBRFgsRUFHRTtBQUFBOztBQUFBLFFBRFNDLFVBQ1QsdUVBRGlFQyxTQUNqRTs7QUFBQTs7QUFBQSxTQUZTRixJQUVULEdBRlNBLElBRVQ7QUFBQSxTQURTQyxVQUNULEdBRFNBLFVBQ1Q7O0FBQUEsb0NBSU8sVUFBQ0UsT0FBRCxFQUF1QjtBQUM1QixNQUFBLEtBQUksQ0FBQ0gsSUFBTCxDQUFVSSxNQUFWLENBQWlCRCxPQUFqQjs7QUFDQSxVQUFJLEtBQUksQ0FBQ0YsVUFBVCxFQUFxQjtBQUNqQixRQUFBLEtBQUksQ0FBQ0EsVUFBTCxDQUFnQkUsT0FBaEI7QUFDSDs7QUFDRCxNQUFBLEtBQUksQ0FBQ0Us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LENBQVo7QUFDSDtBQUNKLE9BTEQsTUFLTztBQUNILGFBQUs3QixNQUFMLENBQVksQ0FBQyxJQUFJOEIsY0FBSixDQUFXRixRQUFYLENBQUQsQ0FBWjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IFNjb3JlQW5kQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZUFuZENsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IFNjb3JlLCBkaWZmZXJlbnRTY29yZXMgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSWRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkluaXRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVwbzogUmVwb3NpdG9yeSxcclxuICAgICAgICBwdWJsaWMgc3Vic2NyaWJlcjogKChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkgPSAoY2hhbmdlczogQ2hhbmdlW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlcG8ubm90aWZ5KGNoYW5nZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlczogQ2hhbmdlW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3SXRlbSwgb2xkSXRlbSB9ID0gY2hhbmdlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjaGFuZ2VkL25ldyBjbGFpbSBFZGdlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IG5ld0l0ZW0gYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IGNsYWltXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW0gPSA8Q2xhaW0+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltLmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IHNjb3JlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGhlIGNsYWltRWRnZXMgdGhhdCBoYXZlIHRoaXMgc2NvcmUncyBTb3VyY2VDbGFpbUlkIGFzIHRoZSBjaGlsZCBhbmQgcmUgY2FsY3VsYXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlDaGlsZElkKHNjb3JlLnNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgICAgICAgICAgY2xhaW1zZUVkZ2VzLmZvckVhY2goY2xhaW1FZGdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUJ5Q2xhaW1JZChwYXJlbnRJZDogSWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXM6IFNjb3JlQW5kQ2xhaW1FZGdlW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy9JcyBwYXJlbnQgcmV2ZXJzYWJsZT9cclxuICAgICAgICBsZXQgcmV2ZXJzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSB0aGlzLnJlcG8uZ2V0SXRlbShwYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKHBhcmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q2xhaW0gPSA8Q2xhaW0+cGFyZW50SXRlbTtcclxuICAgICAgICAgICAgcmV2ZXJzYWJsZSA9IHBhcmVudENsYWltLnJldmVyc2FibGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0dldCBhbGwgdGhlIGNsYWltcyBmb3IgdGhlIHBhcmVudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXHJcbiAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkKTtcclxuICAgICAgICBjbGFpbXNlRWRnZXMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2UoPFNjb3JlPnRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjLmNoaWxkSWQpLCBjKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IGNhbGN1bGF0ZVNjb3JlKHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzOiBzY29yZUFuZENsYWltRWRnZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2FibGU6IHJldmVyc2FibGUsXHJcbiAgICAgICAgICAgIHNvdXJjZUNsYWltSWQ6IHBhcmVudElkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFNjb3JlID0gdGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG5ld1Njb3JlLnNvdXJjZUNsYWltSWQpXHJcbiAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbnRTY29yZXMob2xkU2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3U2NvcmUuaWQgPSBvbGRTY29yZS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=