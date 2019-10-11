"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculationLooper = void 0;

var _Change = require("./dataModels/Change");

var _Type = require("./dataModels/Type");

var _ScoreAndClaimEdge = require("./dataModels/ScoreAndClaimEdge");

var _FindScopes = require("./FindScopes");

var _Id = require("./dataModels/Id");

var _calculateScore = require("./calculateScore");

var _Score = require("./dataModels/Score");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalculationLooper =
/*#__PURE__*/
function () {
  function CalculationLooper(repo, messenger) {
    _classCallCheck(this, CalculationLooper);

    _defineProperty(this, "messenger", void 0);

    _defineProperty(this, "repo", void 0);

    this.repo = repo;

    if (messenger) {
      this.messenger = messenger;
    }
  }
  /** this function can be called by outside code to notfy this repository of changes */


  _createClass(CalculationLooper, [{
    key: "notify",
    value: function notify(changes) {
      this.repo.notify(changes);
      this.calcLoop(changes);
    }
  }, {
    key: "calcLoop",
    value: function calcLoop(changes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;

          if (change.newItem.type == _Type.Type.claimEdge) {
            this.calculateFromClaimEdge(change.newItem);
          }

          if (change.newItem.type == _Type.Type.claim) {
            var claim = change.newItem;
            this.repo.notify([new _Change.Change(new _Score.Score(undefined, undefined, undefined, claim.id, claim.id))]);
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
    key: "calculateFromClaimEdge",
    value: function calculateFromClaimEdge(sourceClaimEdge) {
      var _this = this;

      debugger;
      var claimEdges = this.repo.getClaimEdgesByParentId(sourceClaimEdge.parentId);
      var scoreAndClaimEdges = []; //get scores for claimedges

      claimEdges.forEach(function (claimEdge) {
        var claimEdgeScores = _this.repo.getScoresByClaimId(claimEdge.childId);

        claimEdgeScores.forEach(function (score) {
          scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(score, claimEdge));
        });
      });
      var scoreAndClaimEdgesByScoreScopeIds = (0, _FindScopes.FindScopes)(scoreAndClaimEdges); //Check each Scope and ClaimEdge and create any missing scores

      Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            scopeIdString = _ref2[0];

        claimEdges.forEach(function (claimEdge) {
          if (scoreAndClaimEdgesByScoreScopeIds[scopeIdString].find(function (sce) {
            return sce.claimEdge == claimEdge;
          }) == undefined) {
            //Look for already existing scores
            var foundScore = _this.repo.getScoreByClaimIdAndScope(claimEdge.childId, (0, _Id.ID)(scopeIdString));

            scoreAndClaimEdgesByScoreScopeIds[scopeIdString].push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(foundScore, claimEdge));
          }
        });
      }); //For each scope, loop through and create a score

      Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            scopeIdString = _ref4[0],
            scoreAndClaimEdges = _ref4[1];

        var newScore = (0, _calculateScore.calculateScore)(scoreAndClaimEdges);
        newScore.scopeId = (0, _Id.ID)(scopeIdString);
        newScore.sourceClaimId = scoreAndClaimEdges[0].claimEdge.parentId; //ToDo: Is there a better way to get this?

        var oldScore = _this.repo.getScoreByClaimIdAndScope(newScore.sourceClaimId, newScore.scopeId);

        if (oldScore) {
          newScore.id = oldScore.id;
        }

        _this.repo.notify([new _Change.Change(newScore)]);
      }); //If there are no edges below it then create a base score

      if (claimEdges.length === 0) {
        this.repo.notify([new _Change.Change(new _Score.Score(undefined, undefined, undefined, sourceClaimEdge.parentId, sourceClaimEdge.scopeId))]);
      }
    }
  }]);

  return CalculationLooper;
}();

exports.CalculationLooper = CalculationLooper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkxvb3Blci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkxvb3BlciIsInJlcG8iLCJtZXNzZW5nZXIiLCJjaGFuZ2VzIiwibm90aWZ5IiwiY2FsY0xvb3AiLCJjaGFuZ2UiLCJuZXdJdGVtIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJjYWxjdWxhdGVGcm9tQ2xhaW1FZGdlIiwiY2xhaW0iLCJDaGFuZ2UiLCJTY29yZSIsInVuZGVmaW5lZCIsImlkIiwic291cmNlQ2xhaW1FZGdlIiwiY2xhaW1FZGdlcyIsImdldENsYWltRWRnZXNCeVBhcmVudElkIiwicGFyZW50SWQiLCJzY29yZUFuZENsYWltRWRnZXMiLCJmb3JFYWNoIiwiY2xhaW1FZGdlU2NvcmVzIiwiZ2V0U2NvcmVzQnlDbGFpbUlkIiwiY2hpbGRJZCIsInNjb3JlIiwicHVzaCIsIlNjb3JlQW5kQ2xhaW1FZGdlIiwic2NvcmVBbmRDbGFpbUVkZ2VzQnlTY29yZVNjb3BlSWRzIiwiT2JqZWN0IiwiZW50cmllcyIsInNjb3BlSWRTdHJpbmciLCJmaW5kIiwic2NlIiwiZm91bmRTY29yZSIsImdldFNjb3JlQnlDbGFpbUlkQW5kU2NvcGUiLCJuZXdTY29yZSIsInNjb3BlSWQiLCJzb3VyY2VDbGFpbUlkIiwib2xkU2NvcmUiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSWFBLGlCOzs7QUFJVCw2QkFDSUMsSUFESixFQUVJQyxTQUZKLEVBR0U7QUFBQTs7QUFBQTs7QUFBQTs7QUFDRSxTQUFLRCxJQUFMLEdBQVlBLElBQVo7O0FBQ0EsUUFBSUMsU0FBSixFQUFlO0FBQ1gsV0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDSDtBQUNKO0FBRUQ7Ozs7OzJCQUNPQyxPLEVBQW1CO0FBQ3RCLFdBQUtGLElBQUwsQ0FBVUcsTUFBVixDQUFpQkQsT0FB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QUFHTixhQUFILENBQW5CO0FBQ0FLLFFBQUFBLFFBQVEsQ0FBQ0UsYUFBVCxHQUF5QmxCLGtCQUFrQixDQUFDLENBQUQsQ0FBbEIsQ0FBc0JYLFNBQXRCLENBQWdDVSxRQUF6RCxDQUgrRixDQUc1Qjs7QUFDbkUsWUFBTW9CLFFBQVEsR0FBRyxLQUFJLENBQUN2QyxJQUFMLENBQVVtQyx5QkFBVixDQUFvQ0MsUUFBUSxDQUFDRSxhQUE3QyxFQUE0REYsUUFBUSxDQUFDQyxPQUFyRSxDQUFqQjs7QUFDQSxZQUFJRSxRQUFKLEVBQWM7QUFDVkgsVUFBQUEsUUFBUSxDQUFDckIsRUFBVCxHQUFjd0IsUUFBUSxDQUFDeEIsRUFBdkI7QUFDSDs7QUFDRCxRQUFBLEtBQUksQ0FBQ2YsSUFBTCxDQUFVRyxNQUFWLENBQWlCLENBQUMsSUFBSVMsY0FBSixDQUFXd0IsUUFBWCxDQUFELENBQWpCO0FBQ0gsT0FURCxFQS9CdUQsQ0EwQ3ZEOztBQUNBLFVBQUluQixVQUFVLENBQUN1QixNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLGFBQUt4QyxJQUFMLENBQVVHLE1BQVYsQ0FBaUIsQ0FBQyxJQUFJUyxjQUFKLENBQ2QsSUFBSUMsWUFBSixDQUFVQyxTQUFWLEVBQXFCQSxTQUFyQixFQUFnQ0EsU0FBaEMsRUFBMkNFLGVBQWUsQ0FBQ0csUUFBM0QsRUFBcUVILGVBQWUsQ0FBQ3FCLE9BQXJGLENBRGMsQ0FBRCxDQUFqQjtBQUlIO0FBR0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi9tZXNzZW5nZXJcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgRmluZFNjb3BlcyB9IGZyb20gXCIuL0ZpbmRTY29wZXNcIjtcclxuaW1wb3J0IHsgSUQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBkZWJ1Z2dlclN0YXRlbWVudCB9IGZyb20gXCJAYmFiZWwvdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkxvb3BlciB7XHJcbiAgICBwcml2YXRlIG1lc3Nlbmdlcj86IE1lc3NlbmdlcjtcclxuICAgIHByaXZhdGUgcmVwbzogUmVwb3NpdG9yeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZXBvOiBSZXBvc2l0b3J5LFxyXG4gICAgICAgIG1lc3Nlbmdlcj86IE1lc3NlbmdlcixcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVwbyA9IHJlcG87XHJcbiAgICAgICAgaWYgKG1lc3Nlbmdlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgICAgIHRoaXMucmVwby5ub3RpZnkoY2hhbmdlcyk7XHJcbiAgICAgICAgdGhpcy5jYWxjTG9vcChjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGNMb29wKGNoYW5nZXM6IENoYW5nZVtdKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVGcm9tQ2xhaW1FZGdlKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2UubmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltID0gPENsYWltPmNoYW5nZS5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvLm5vdGlmeShbbmV3IENoYW5nZShuZXcgU2NvcmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2xhaW0uaWQsIGNsYWltLmlkKSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZyb21DbGFpbUVkZ2Uoc291cmNlQ2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VzID0gdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHNvdXJjZUNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVBbmRDbGFpbUVkZ2VzOiBTY29yZUFuZENsYWltRWRnZVtdID0gW107XHJcblxyXG4gICAgICAgIC8vZ2V0IHNjb3JlcyBmb3IgY2xhaW1lZGdlc1xyXG4gICAgICAgIGNsYWltRWRnZXMuZm9yRWFjaCgoY2xhaW1FZGdlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbGFpbUVkZ2VTY29yZXMgPSB0aGlzLnJlcG8uZ2V0U2NvcmVzQnlDbGFpbUlkKGNsYWltRWRnZS5jaGlsZElkKTtcclxuICAgICAgICAgICAgY2xhaW1FZGdlU2NvcmVzLmZvckVhY2goKHNjb3JlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2Uoc2NvcmUsIGNsYWltRWRnZSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXNCeVNjb3JlU2NvcGVJZHMgPSBGaW5kU2NvcGVzKHNjb3JlQW5kQ2xhaW1FZGdlcyk7XHJcbiAgICAgICAgLy9DaGVjayBlYWNoIFNjb3BlIGFuZCBDbGFpbUVkZ2UgYW5kIGNyZWF0ZSBhbnkgbWlzc2luZyBzY29yZXNcclxuICAgICAgICBPYmplY3QuZW50cmllcyhzY29yZUFuZENsYWltRWRnZXNCeVNjb3JlU2NvcGVJZHMpLmZvckVhY2goKFtzY29wZUlkU3RyaW5nXSkgPT4ge1xyXG4gICAgICAgICAgICBjbGFpbUVkZ2VzLmZvckVhY2goKGNsYWltRWRnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlQW5kQ2xhaW1FZGdlc0J5U2NvcmVTY29wZUlkc1tzY29wZUlkU3RyaW5nXS5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZSA9PiBzY2UuY2xhaW1FZGdlID09IGNsYWltRWRnZSkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Mb29rIGZvciBhbHJlYWR5IGV4aXN0aW5nIHNjb3Jlc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeUNsYWltSWRBbmRTY29wZShjbGFpbUVkZ2UuY2hpbGRJZCwgSUQoc2NvcGVJZFN0cmluZykpXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzQnlTY29yZVNjb3BlSWRzW3Njb3BlSWRTdHJpbmddLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZShmb3VuZFNjb3JlLCBjbGFpbUVkZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Gb3IgZWFjaCBzY29wZSwgbG9vcCB0aHJvdWdoIGFuZCBjcmVhdGUgYSBzY29yZVxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNjb3JlQW5kQ2xhaW1FZGdlc0J5U2NvcmVTY29wZUlkcykuZm9yRWFjaCgoW3Njb3BlSWRTdHJpbmcsIHNjb3JlQW5kQ2xhaW1FZGdlc10pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3U2NvcmUgPSBjYWxjdWxhdGVTY29yZShzY29yZUFuZENsYWltRWRnZXMpO1xyXG4gICAgICAgICAgICBuZXdTY29yZS5zY29wZUlkID0gSUQoc2NvcGVJZFN0cmluZyk7XHJcbiAgICAgICAgICAgIG5ld1Njb3JlLnNvdXJjZUNsYWltSWQgPSBzY29yZUFuZENsYWltRWRnZXNbMF0uY2xhaW1FZGdlLnBhcmVudElkOyAvL1RvRG86IElzIHRoZXJlIGEgYmV0dGVyIHdheSB0byBnZXQgdGhpcz9cclxuICAgICAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLnJlcG8uZ2V0U2NvcmVCeUNsYWltSWRBbmRTY29wZShuZXdTY29yZS5zb3VyY2VDbGFpbUlkLCBuZXdTY29yZS5zY29wZUlkKVxyXG4gICAgICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1Njb3JlLmlkID0gb2xkU2NvcmUuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXBvLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSldKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9JZiB0aGVyZSBhcmUgbm8gZWRnZXMgYmVsb3cgaXQgdGhlbiBjcmVhdGUgYSBiYXNlIHNjb3JlXHJcbiAgICAgICAgaWYgKGNsYWltRWRnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVwby5ub3RpZnkoW25ldyBDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgc291cmNlQ2xhaW1FZGdlLnBhcmVudElkLCBzb3VyY2VDbGFpbUVkZ2Uuc2NvcGVJZClcclxuICAgICAgICAgICAgKV0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufSJdfQ==