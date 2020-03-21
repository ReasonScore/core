"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateScoreActions = calculateScoreActions;

var _Score = require("./dataModels/Score");

var _Action = require("./dataModels/Action");

var _calculateScore = require("./calculateScore");

var _RepositoryLocalReactive = require("./repositories/RepositoryLocalReactive");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calculates the score actions based on a list of actions
 */
async function calculateScoreActions({
  actions = [],
  repository = new _RepositoryLocalReactive.RepositoryLocalReactive(),
  calculator = _calculateScore.calculateScore
} = {}) {
  const scoreActions = [];
  const claimIdsToScore = [];
  const topScoreIds = [];
  await repository.notify(actions);

  for (const action of actions) {
    // find claims that may need scores changed
    if (action.type == 'add_claim' || action.type == 'modify_claim') {
      claimIdsToScore.push(action.dataId);
    } //Add scores for new Score Tree


    if (action.type == 'add_scoretree') {
      claimIdsToScore.push(action.dataId);
      const claim = await repository.getClaim(action.dataId);

      if (claim) {
        const score = new _Score.Score(claim.id);
        const action = new _Action.Action(score, {}, "add_score", score.id);
        scoreActions.push(action);
        repository.notify([action]);
      }
    } //Add scores if edges adds new children to claims in score trees


    if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
      const claimEdge = action.newData;
      claimIdsToScore.push(claimEdge.parentId);
    } //Walk up the scores for each claim to the top


    for (const claimId of claimIdsToScore) {
      const scoresForTheClaim = await repository.getScoresByClaimId(claimId);

      for (const claimScore of scoresForTheClaim) {
        // for each score, walk up the tree looking for the top (the first score to not have a parentId)
        let currentScore = claimScore;
        let topScoreId = claimScore.id;

        while ((_currentScore = currentScore) === null || _currentScore === void 0 ? void 0 : _currentScore.parentScoreId) {
          var _currentScore;

          topScoreId = currentScore.id;
          currentScore = await repository.getScore(currentScore.parentScoreId);
        }

        if (topScoreId) {
          topScoreIds.push(topScoreId);
        }
      }
    } //Re-calc all top scores with possible changed claims


    for (const topScoreId of topScoreIds) {
      const topScore = await repository.getScore(topScoreId);

      if (topScore) {
        await createBlankMissingScores(repository, topScoreId, topScore.sourceClaimId || "", scoreActions);
        await repository.notify(scoreActions);
        await calculateScoreTree(repository, topScore, calculator, scoreActions);
      }
    }
  }

  return scoreActions;
} //Create Blank Missing Scores


async function createBlankMissingScores(repository, currentScoreId, currentClaimId, actions) {
  const edges = await repository.getClaimEdgesByParentId(currentClaimId);
  const scores = await repository.getChildrenByScoreId(currentScoreId);

  for (const edge of edges) {
    //see if there is a matching child score for the child edge
    let score = scores.find(({
      sourceClaimId
    }) => sourceClaimId === edge.childId);

    if (!score) {
      //Create a new Score and attach it to it's parent
      score = new _Score.Score(edge.childId, currentScoreId, undefined, edge.pro, edge.affects);
      actions.push(new _Action.Action(score, undefined, "add_score", score.id));
    } //Recurse and through children


    await createBlankMissingScores(repository, score.id, edge.childId, actions);
  }
} //This function assume that all scores already exist


async function calculateScoreTree(repository, currentScore, calculator = _calculateScore.calculateScore, actions) {
  const oldScores = await repository.getChildrenByScoreId(currentScore.id);
  const newScores = [];

  for (const oldScore of oldScores) {
    //Calculate Children
    //TODO: remove any scores to calculate based on formulas
    newScores.push((await calculateScoreTree(repository, oldScore, calculator, actions)));
  }

  const newScoreFragment = calculator({
    childScores: newScores,
    reversible: currentScore.reversible
  }); //TODO: Modify the newScore based on any formulas
  //TODO: Should we add the new scores to the repository (If they are different form the old score?)

  const newScore = _objectSpread({}, currentScore, {}, newScoreFragment);

  if ((0, _Score.differentScores)(currentScore, newScore)) {
    actions.push(new _Action.Action(newScore, undefined, "add_score", newScore.id));
  }

  return newScore;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudHMiXSwibmFtZXMiOlsiY2FsY3VsYXRlU2NvcmVBY3Rpb25zIiwiYWN0aW9ucyIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZSIsImNhbGN1bGF0b3IiLCJjYWxjdWxhdGVTY29yZSIsInNjb3JlQWN0aW9ucyIsImNsYWltSWRzVG9TY29yZSIsInRvcFNjb3JlSWRzIiwibm90aWZ5IiwiYWN0aW9uIiwidHlwZSIsInB1c2giLCJkYXRhSWQiLCJjbGFpbSIsImdldENsYWltIiwic2NvcmUiLCJTY29yZSIsImlkIiwiQWN0aW9uIiwiY2xhaW1FZGdlIiwibmV3RGF0YSIsInBhcmVudElkIiwiY2xhaW1JZCIsInNjb3Jlc0ZvclRoZUNsYWltIiwiZ2V0U2NvcmVzQnlDbGFpbUlkIiwiY2xhaW1TY29yZSIsImN1cnJlbnRTY29yZSIsInRvcFNjb3JlSWQiLCJwYXJlbnRTY29yZUlkIiwiZ2V0U2NvcmUiLCJ0b3BTY29yZSIsImNyZWF0ZUJsYW5rTWlzc2luZ1Njb3JlcyIsInNvdXJjZUNsYWltSWQiLCJjYWxjdWxhdGVTY29yZVRyZWUiLCJjdXJyZW50U2NvcmVJZCIsImN1cnJlbnRDbGFpbUlkIiwiZWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZCIsInNjb3JlcyIsImdldENoaWxkcmVuQnlTY29yZUlkIiwiZWRnZSIsImZpbmQiLCJjaGlsZElkIiwidW5kZWZpbmVkIiwicHJvIiwiYWZmZWN0cyIsIm9sZFNjb3JlcyIsIm5ld1Njb3JlcyIsIm9sZFNjb3JlIiwibmV3U2NvcmVGcmFnbWVudCIsImNoaWxkU2NvcmVzIiwicmV2ZXJzaWJsZSIsIm5ld1Njb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBS0E7Ozs7Ozs7O0FBRUE7OztBQUdPLGVBQWVBLHFCQUFmLENBQXFDO0FBQUVDLEVBQUFBLE9BQU8sR0FBRyxFQUFaO0FBQWdCQyxFQUFBQSxV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QUFyQyxDQUE5QjtBQUNIO0FBQ0osQyxDQUVEOzs7QUFDQSxlQUFlaUMsa0JBQWYsQ0FBa0NoQyxVQUFsQyxFQUEyRHlCLFlBQTNELEVBQWlGdkIsVUFBMkIsR0FBR0MsOEJBQS9HLEVBQStISixPQUEvSCxFQUFrSjtBQUM5SSxRQUFNOEMsU0FBUyxHQUFHLE1BQU03QyxVQUFVLENBQUNzQyxvQkFBWCxDQUFnQ2IsWUFBWSxDQUFDVCxFQUE3QyxDQUF4QjtBQUNBLFFBQU04QixTQUFtQixHQUFHLEVBQTVCOztBQUVBLE9BQUssTUFBTUMsUUFBWCxJQUF1QkYsU0FBdkIsRUFBa0M7QUFBRTtBQUNoQztBQUNBQyxJQUFBQSxTQUFTLENBQUNwQyxJQUFWLEVBQWUsTUFBTXNCLGtCQUFrQixDQUFDaEMsVUFBRCxFQUFhK0MsUUFBYixFQUF1QjdDLFVBQXZCLEVBQW1DSCxPQUFuQyxDQUF2QztBQUNIOztBQUVELFFBQU1pRCxnQkFBZ0IsR0FBRzlDLFVBQVUsQ0FBQztBQUNoQytDLElBQUFBLFdBQVcsRUFBRUgsU0FEbUI7QUFFaENJLElBQUFBLFVBQVUsRUFBRXpCLFlBQVksQ0FBQ3lCO0FBRk8sR0FBRCxDQUFuQyxDQVQ4SSxDQWE5STtBQUNBOztBQUNBLFFBQU1DLFFBQVEscUJBQVExQixZQUFSLE1BQXlCdUIsZ0JBQXpCLENBQWQ7O0FBQ0EsTUFBSSw0QkFBZ0J2QixZQUFoQixFQUE4QjBCLFFBQTlCLENBQUosRUFBNkM7QUFDekNwRCxJQUFBQSxPQUFPLENBQUNXLElBQVIsQ0FBYSxJQUFJTyxjQUFKLENBQVdrQyxRQUFYLEVBQXFCVCxTQUFyQixFQUFnQyxXQUFoQyxFQUE2Q1MsUUFBUSxDQUFDbkMsRUFBdEQsQ0FBYjtBQUNIOztBQUNELFNBQU9tQyxRQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzLCBpU2NvcmUgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcbmltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFB1cmUgfSBmcm9tIFwiLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUHVyZVwiO1xyXG5pbXBvcnQgeyBpQ2FsY3VsYXRlU2NvcmUsIGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuL25ld0lkXCI7XHJcbmltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFJlYWN0aXZlIH0gZnJvbSBcIi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFJlYWN0aXZlXCI7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc2NvcmUgYWN0aW9ucyBiYXNlZCBvbiBhIGxpc3Qgb2YgYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7IGFjdGlvbnMgPSBbXSwgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZSgpLCBjYWxjdWxhdG9yID0gY2FsY3VsYXRlU2NvcmUgfToge1xyXG4gICAgLyoqIEFuIGFycmF5IG9mIGFjdGlvbnMsIHVzdWFsbHkgb24gY2xhaW1zIG9yIGVkZ2VzIHRoYXQgaW5jbHVzZSBubyBzY29yZXMqL1xyXG4gICAgYWN0aW9ucz86IEFjdGlvbltdO1xyXG4gICAgLyoqIFRoZSByZXBvc2l0b3J5IHVzZWQgdG8gZ2V0IGNvbnRleHQgZm9yIHRoZSBhY3Rpb25zICovXHJcbiAgICByZXBvc2l0b3J5PzogaVJlcG9zaXRvcnk7XHJcbiAgICAvKiogVGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBzY29yZXMgKi9cclxuICAgIGNhbGN1bGF0b3I/OiBpQ2FsY3VsYXRlU2NvcmU7XHJcbn0gPSB7fSxcclxuKSB7XHJcbiAgICBjb25zdCBzY29yZUFjdGlvbnM6IEFjdGlvbltdID0gW107XHJcbiAgICBjb25zdCBjbGFpbUlkc1RvU2NvcmU6IHN0cmluZ1tdID0gW107XHJcbiAgICBjb25zdCB0b3BTY29yZUlkczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShhY3Rpb25zKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgY2xhaW1zIHRoYXQgbWF5IG5lZWQgc2NvcmVzIGNoYW5nZWRcclxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT0gJ2FkZF9jbGFpbScgfHwgYWN0aW9uLnR5cGUgPT0gJ21vZGlmeV9jbGFpbScpIHtcclxuICAgICAgICAgICAgY2xhaW1JZHNUb1Njb3JlLnB1c2goYWN0aW9uLmRhdGFJZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vQWRkIHNjb3JlcyBmb3IgbmV3IFNjb3JlIFRyZWVcclxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT0gJ2FkZF9zY29yZXRyZWUnKSB7XHJcbiAgICAgICAgICAgIGNsYWltSWRzVG9TY29yZS5wdXNoKGFjdGlvbi5kYXRhSWQpXHJcbiAgICAgICAgICAgIGNvbnN0IGNsYWltID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDbGFpbShhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgaWYgKGNsYWltKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IG5ldyBTY29yZShjbGFpbS5pZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgQWN0aW9uKHNjb3JlLCB7fSwgXCJhZGRfc2NvcmVcIiwgc2NvcmUuaWQpO1xyXG4gICAgICAgICAgICAgICAgc2NvcmVBY3Rpb25zLnB1c2goYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkubm90aWZ5KFthY3Rpb25dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9BZGQgc2NvcmVzIGlmIGVkZ2VzIGFkZHMgbmV3IGNoaWxkcmVuIHRvIGNsYWltcyBpbiBzY29yZSB0cmVlc1xyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PSAnYWRkX2NsYWltRWRnZScgfHwgYWN0aW9uLnR5cGUgPT0gJ21vZGlmeV9jbGFpbUVkZ2UnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IGFjdGlvbi5uZXdEYXRhIGFzIENsYWltRWRnZTtcclxuICAgICAgICAgICAgY2xhaW1JZHNUb1Njb3JlLnB1c2goY2xhaW1FZGdlLnBhcmVudElkKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dhbGsgdXAgdGhlIHNjb3JlcyBmb3IgZWFjaCBjbGFpbSB0byB0aGUgdG9wXHJcbiAgICAgICAgZm9yIChjb25zdCBjbGFpbUlkIG9mIGNsYWltSWRzVG9TY29yZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzY29yZXNGb3JUaGVDbGFpbSA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlDbGFpbUlkKGNsYWltSWQpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2xhaW1TY29yZSBvZiBzY29yZXNGb3JUaGVDbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggc2NvcmUsIHdhbGsgdXAgdGhlIHRyZWUgbG9va2luZyBmb3IgdGhlIHRvcCAodGhlIGZpcnN0IHNjb3JlIHRvIG5vdCBoYXZlIGEgcGFyZW50SWQpXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNjb3JlOiBpU2NvcmUgfCB1bmRlZmluZWQgPSBjbGFpbVNjb3JlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvcFNjb3JlSWQgPSBjbGFpbVNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnRTY29yZT8ucGFyZW50U2NvcmVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcFNjb3JlSWQgPSBjdXJyZW50U2NvcmUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjb3JlID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZShjdXJyZW50U2NvcmUucGFyZW50U2NvcmVJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wU2NvcmVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcFNjb3JlSWRzLnB1c2godG9wU2NvcmVJZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9SZS1jYWxjIGFsbCB0b3Agc2NvcmVzIHdpdGggcG9zc2libGUgY2hhbmdlZCBjbGFpbXNcclxuICAgICAgICBmb3IgKGNvbnN0IHRvcFNjb3JlSWQgb2YgdG9wU2NvcmVJZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgdG9wU2NvcmUgPSBhd2FpdCByZXBvc2l0b3J5LmdldFNjb3JlKHRvcFNjb3JlSWQpXHJcbiAgICAgICAgICAgIGlmICh0b3BTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlQmxhbmtNaXNzaW5nU2NvcmVzKHJlcG9zaXRvcnksIHRvcFNjb3JlSWQsIHRvcFNjb3JlLnNvdXJjZUNsYWltSWQgfHwgXCJcIiwgc2NvcmVBY3Rpb25zKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoc2NvcmVBY3Rpb25zKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgY2FsY3VsYXRlU2NvcmVUcmVlKHJlcG9zaXRvcnksIHRvcFNjb3JlLCBjYWxjdWxhdG9yLCBzY29yZUFjdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzY29yZUFjdGlvbnM7XHJcbn1cclxuXHJcbi8vQ3JlYXRlIEJsYW5rIE1pc3NpbmcgU2NvcmVzXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJsYW5rTWlzc2luZ1Njb3JlcyhyZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSwgY3VycmVudFNjb3JlSWQ6IHN0cmluZywgY3VycmVudENsYWltSWQ6IHN0cmluZywgYWN0aW9uczogQWN0aW9uW10pIHtcclxuICAgIGNvbnN0IGVkZ2VzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChjdXJyZW50Q2xhaW1JZClcclxuICAgIGNvbnN0IHNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0Q2hpbGRyZW5CeVNjb3JlSWQoY3VycmVudFNjb3JlSWQpXHJcbiAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgZWRnZXMpIHtcclxuICAgICAgICAvL3NlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGNoaWxkIHNjb3JlIGZvciB0aGUgY2hpbGQgZWRnZVxyXG4gICAgICAgIGxldCBzY29yZSA9IHNjb3Jlcy5maW5kKCh7IHNvdXJjZUNsYWltSWQgfSkgPT4gc291cmNlQ2xhaW1JZCA9PT0gZWRnZS5jaGlsZElkKTtcclxuICAgICAgICBpZiAoIXNjb3JlKSB7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IFNjb3JlIGFuZCBhdHRhY2ggaXQgdG8gaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgc2NvcmUgPSBuZXcgU2NvcmUoZWRnZS5jaGlsZElkLCBjdXJyZW50U2NvcmVJZCwgdW5kZWZpbmVkLCBlZGdlLnBybywgZWRnZS5hZmZlY3RzKTtcclxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKG5ldyBBY3Rpb24oc2NvcmUsIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVcIiwgc2NvcmUuaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZWN1cnNlIGFuZCB0aHJvdWdoIGNoaWxkcmVuXHJcbiAgICAgICAgYXdhaXQgY3JlYXRlQmxhbmtNaXNzaW5nU2NvcmVzKHJlcG9zaXRvcnksIHNjb3JlLmlkLCBlZGdlLmNoaWxkSWQsIGFjdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1RoaXMgZnVuY3Rpb24gYXNzdW1lIHRoYXQgYWxsIHNjb3JlcyBhbHJlYWR5IGV4aXN0XHJcbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZVNjb3JlVHJlZShyZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSwgY3VycmVudFNjb3JlOiBpU2NvcmUsIGNhbGN1bGF0b3I6IGlDYWxjdWxhdGVTY29yZSA9IGNhbGN1bGF0ZVNjb3JlLCBhY3Rpb25zOiBBY3Rpb25bXSkge1xyXG4gICAgY29uc3Qgb2xkU2NvcmVzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDaGlsZHJlbkJ5U2NvcmVJZChjdXJyZW50U2NvcmUuaWQpXHJcbiAgICBjb25zdCBuZXdTY29yZXM6IGlTY29yZVtdID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBvbGRTY29yZSBvZiBvbGRTY29yZXMpIHsgLy9DYWxjdWxhdGUgQ2hpbGRyZW5cclxuICAgICAgICAvL1RPRE86IHJlbW92ZSBhbnkgc2NvcmVzIHRvIGNhbGN1bGF0ZSBiYXNlZCBvbiBmb3JtdWxhc1xyXG4gICAgICAgIG5ld1Njb3Jlcy5wdXNoKGF3YWl0IGNhbGN1bGF0ZVNjb3JlVHJlZShyZXBvc2l0b3J5LCBvbGRTY29yZSwgY2FsY3VsYXRvciwgYWN0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1Njb3JlRnJhZ21lbnQgPSBjYWxjdWxhdG9yKHtcclxuICAgICAgICBjaGlsZFNjb3JlczogbmV3U2NvcmVzLFxyXG4gICAgICAgIHJldmVyc2libGU6IGN1cnJlbnRTY29yZS5yZXZlcnNpYmxlLFxyXG4gICAgfSlcclxuICAgIC8vVE9ETzogTW9kaWZ5IHRoZSBuZXdTY29yZSBiYXNlZCBvbiBhbnkgZm9ybXVsYXNcclxuICAgIC8vVE9ETzogU2hvdWxkIHdlIGFkZCB0aGUgbmV3IHNjb3JlcyB0byB0aGUgcmVwb3NpdG9yeSAoSWYgdGhleSBhcmUgZGlmZmVyZW50IGZvcm0gdGhlIG9sZCBzY29yZT8pXHJcbiAgICBjb25zdCBuZXdTY29yZSA9IHsgLi4uY3VycmVudFNjb3JlLCAuLi5uZXdTY29yZUZyYWdtZW50IH1cclxuICAgIGlmIChkaWZmZXJlbnRTY29yZXMoY3VycmVudFNjb3JlLCBuZXdTY29yZSkpIHtcclxuICAgICAgICBhY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdTY29yZSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVwiLCBuZXdTY29yZS5pZCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1Njb3JlO1xyXG59XHJcbiJdfQ==