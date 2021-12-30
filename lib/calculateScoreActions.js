"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateScoreActions = calculateScoreActions;

var _Score = require("./dataModels/Score");

var _hasItemChanged = require("./utils/hasItemChanged");

var _Action = require("./dataModels/Action");

var _calculateScore = require("./calculateScore");

var _RepositoryLocalPure = require("./repositories/RepositoryLocalPure");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calculates the score actions based on a list of actions
 */
async function calculateScoreActions({
  actions = [],
  repository = new _RepositoryLocalPure.RepositoryLocalPure(),
  calculator = _calculateScore.calculateScore
} = {}) {
  const scoreActions = [];
  const claimIdsToScore = [];
  const ScoreTreeIds = [];
  await repository.notify(actions);

  for (const action of actions) {
    // find claims that may need scores changed
    if (action.type == 'add_claim' || action.type == 'modify_claim') {
      claimIdsToScore.push(action.dataId);
    }

    if (action.type == "add_score") {
      let score = action.newData;

      if (!score.parentScoreId) {
        const scoreTemp = await repository.getScore(action.dataId);

        if (scoreTemp) {
          score = scoreTemp;
        }
      }

      claimIdsToScore.push(score.sourceClaimId);
    } //Add scores if edges adds new children to claims in score trees


    if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
      let claimEdge = action.newData;

      if (!claimEdge.parentId) {
        const claimEdgeTemp = await repository.getClaimEdge(action.dataId);

        if (claimEdgeTemp) {
          claimEdge = claimEdgeTemp;
        }
      }

      claimIdsToScore.push(claimEdge.parentId);
    } //TODO: If an edge changes then modify the existing scores to match


    if (action.type == 'modify_claimEdge') {
      let claimEdge = await repository.getClaimEdge(action.dataId);
      claimEdge = _objectSpread(_objectSpread({}, claimEdge), action.newData);

      if (claimEdge) {
        action.newData;
        const scores = await repository.getScoresBySourceId(claimEdge.id);

        for (const score of scores) {
          //TODO: Where should I put this? It is modifying am object. If it is reactive i should just change the data. If pure it should be a new object.
          //For now I will modify it but it may not trigger updates in a pure library (React)
          //This change should also probably be centralized somewhere to reduce the chance of inconsistent bugs. I think it will happen in multiple paces
          //Nope, it is an action so it should always be a new object. If it goes into a reactive respoitory then it will modify the actual object
          //Should I group these actions or just throw them in one at a time like I am doing
          if (score.pro != claimEdge.pro || score.affects != claimEdge.affects || score.priority != claimEdge.priority) {
            const action = new _Action.Action({
              pro: claimEdge.pro,
              affects: claimEdge.affects,
              priority: claimEdge.priority
            }, score, "modify_score", score.id);
            scoreActions.push(action);
            await repository.notify([action]);
          }
        }
      }
    }

    if (action.type == 'delete_claimEdge') {
      const oldClaimEdge = action.oldData;
      claimIdsToScore.push(oldClaimEdge.parentId);
    }

    if (action.type == 'add_scoreTree') {
      const scoreTree = action.newData;
      ScoreTreeIds.push(scoreTree.id);
    }
  } //Walk up the scores for each claim to the top


  for (const claimId of claimIdsToScore) {
    for (const claimScore of await repository.getScoresBySourceId(claimId)) {
      ScoreTreeIds.push(claimScore.scoreTreeId);
    }
  } //Re-calc all Score Trees with possible changed claims


  for (const scoreTreeId of ScoreTreeIds) {
    const scoreTree = await repository.getScoreTree(scoreTreeId);

    if (scoreTree) {
      const missingScoreActions = [];
      let mainScore = await repository.getScore(scoreTree.topScoreId);

      if (!mainScore) {
        mainScore = new _Score.Score(scoreTree.sourceClaimId, scoreTree.id);
        mainScore.id = scoreTree.topScoreId;
        missingScoreActions.push(new _Action.Action(mainScore, undefined, "add_score"));
      }

      await createBlankMissingScores(repository, scoreTree.topScoreId, scoreTree.sourceClaimId || "", missingScoreActions, scoreTreeId);

      if (missingScoreActions.length > 0) {
        await repository.notify(missingScoreActions);
      }

      const scoreTreeActions = [];
      const newMainScore = await calculateScoreDescendants(repository, mainScore, calculator, scoreTreeActions);

      if (missingScoreActions.length > 0) {
        await repository.notify(scoreTreeActions);
      }

      const fractionActions = [];
      await calculateFractions(repository, mainScore, fractionActions);

      if (fractionActions.length > 0) {
        await repository.notify(fractionActions);
      }

      const generationActions = [];
      await calculateGenerations(repository, mainScore.id, generationActions, 0);

      if (generationActions.length > 0) {
        await repository.notify(generationActions);
      } // const proMainActions: Action[] = []; 
      // const newChildScore = { ...mainScore, proMain: true }
      // proMainActions.push(new Action(newChildScore, undefined, "modify_score"));
      // await calculateProMain(repository, mainScore.id, proMainActions, true)
      // if (proMainActions.length > 0) {
      //     await repository.notify(proMainActions)
      // }


      scoreActions.push(...missingScoreActions, ...scoreTreeActions, ...fractionActions, ...generationActions // ...proMainActions,
      );

      if (scoreTree.descendantCount != newMainScore.descendantCount) {
        let newScoreTreePartial = {
          descendantCount: newMainScore.descendantCount
        };
        let oldScoreTreePartial = {
          descendantCount: scoreTree.descendantCount
        };
        scoreActions.push(new _Action.Action(newScoreTreePartial, oldScoreTreePartial, "modify_scoreTree", scoreTree.id));
      }
    }
  } //TODO: Review this decision: Feed the score actions back into the repository so this repository is up to date in case it is used 


  await repository.notify(scoreActions);
  return scoreActions;
} //Create Blank Missing Scores


async function createBlankMissingScores(repository, currentScoreId, currentClaimId, actions, scoreTreeId) {
  const edges = await repository.getClaimEdgesByParentId(currentClaimId);
  const scores = await repository.getChildrenByScoreId(currentScoreId);

  for (const edge of edges) {
    //see if there is a matching child score for the child edge
    let score = scores.find(({
      sourceClaimId
    }) => sourceClaimId === edge.childId);

    if (!score) {
      //Create a new Score and attach it to it's parent
      const u = undefined;
      score = new _Score.Score(edge.childId, scoreTreeId, currentScoreId, edge.id, undefined, edge.pro, edge.affects, u, u, u, edge.priority);
      actions.push(new _Action.Action(score, undefined, "add_score", score.id));
    } //Recurse and through children


    await createBlankMissingScores(repository, score.id, edge.childId, actions, scoreTreeId);
  }
} //This function assume that all scores already exist


async function calculateScoreDescendants(repository, currentScore, calculator = _calculateScore.calculateScore, actions) {
  const oldChildScores = await repository.getChildrenByScoreId(currentScore.id);
  const newChildScores = [];
  let newDescendantCount = 0;

  for (const oldChildScore of oldChildScores) {
    //Calculate Children
    //TODO: remove any scores to calculate based on formulas that exclude scores
    const newScore = await calculateScoreDescendants(repository, oldChildScore, calculator, actions);
    newChildScores.push(newScore);
    newDescendantCount += newScore.descendantCount + 1;
  }

  const newScoreFragment = calculator({
    childScores: newChildScores
  }); //update any newChildScores that changed

  for (const newChildScore of newChildScores) {
    // TODO: Is this slow accessing the data store again for this data or do we assume it is cached if it is in an external DB
    const oldChildScore = await repository.getScore(newChildScore.id);

    if (oldChildScore && (0, _hasItemChanged.hasItemChanged)(oldChildScore, newChildScore)) {
      actions.push(new _Action.Action(newChildScore, undefined, "modify_score"));
    }
  } //TODO: Modify the newScore based on any formulas


  const newScore = _objectSpread(_objectSpread(_objectSpread({}, currentScore), newScoreFragment), {}, {
    descendantCount: newDescendantCount
  });

  if ((0, _hasItemChanged.hasItemChanged)(currentScore, newScore)) {
    actions.push(new _Action.Action(newScore, undefined, "modify_score"));
  }

  return newScore;
}

async function calculateFractions(repository, parentScore, actions) {
  if (parentScore.id != undefined && parentScore.fraction != undefined && parentScore.fractionSimple != undefined) {
    const oldChildScores = await repository.getChildrenByScoreId(parentScore.id); //Count up total relevance

    let totalRelevance = 0;

    for (const oldScore of oldChildScores) {
      if (oldScore.affects === "confidence") {
        totalRelevance += oldScore.relevance;
      }
    }

    if (totalRelevance === 0) {
      totalRelevance = 1;
    }

    for (const oldChildScore of oldChildScores) {
      const newChildScore = _objectSpread(_objectSpread({}, oldChildScore), {}, {
        fractionSimple: oldChildScore.relevance / totalRelevance * parentScore.fractionSimple,
        fraction: parentScore.fraction * oldChildScore.percentOfWeight // parentFractionSimple: parentScore.fractionSimple,

      });

      if (newChildScore.fractionSimple != oldChildScore.fractionSimple || newChildScore.fraction != oldChildScore.fraction) {
        actions.push(new _Action.Action(newChildScore, undefined, "modify_score"));
      }

      await calculateFractions(repository, newChildScore, actions);
    }
  }
} // TODO: factor out duplicate code of these calculate functions. maybe make an array of items to process...


async function calculateGenerations(repository, parentScoreId, actions, generation) {
  const oldChildScores = await repository.getChildrenByScoreId(parentScoreId);
  generation++;

  for (const oldChildScore of oldChildScores) {
    if (oldChildScore.generation != generation) {
      const newChildScore = _objectSpread(_objectSpread({}, oldChildScore), {}, {
        generation: generation
      });

      actions.push(new _Action.Action(newChildScore, undefined, "modify_score"));
    }

    await calculateGenerations(repository, oldChildScore.id, actions, generation);
  }
} // // TODO: factor out duplicate code of these calculate functions. maybe make an array of items to process...
// async function calculateProMain(repository: iRepository, parentScoreId: string, actions: Action[], proMain: boolean) {
//     const oldChildScores = await repository.getChildrenByScoreId(parentScoreId)
//     for (const oldChildScore of oldChildScores) {
//         // const newChildScore = { ...oldChildScore, proMain: false }
//         // actions.push(new Action(newChildScore, undefined, "modify_score"));
//         // await calculateProMain(repository, oldChildScore.id, actions, proMain)
//         if (oldChildScore.pro === true){// && oldChildScore.proMain !== proMain) {
//             const newChildScore = { ...oldChildScore, proMain: proMain }
//             actions.push(new Action(newChildScore, undefined, "modify_score"));
//             await calculateProMain(repository, oldChildScore.id, actions, proMain)
//         }
//         if (oldChildScore.pro === false){// && oldChildScore.proMain === proMain) {
//             const newChildScore = { ...oldChildScore, proMain: !proMain }
//             actions.push(new Action(newChildScore, undefined, "modify_score"));
//             await calculateProMain(repository, oldChildScore.id, actions, !proMain)
//         }
//     }
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudHMiXSwibmFtZXMiOlsiY2FsY3VsYXRlU2NvcmVBY3Rpb25zIiwiYWN0aW9ucyIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwic2NvcmVBY3Rpb25zIiwiY2xhaW1JZHNUb1Njb3JlIiwiU2NvcmVUcmVlSWRzIiwibm90aWZ5IiwiYWN0aW9uIiwidHlwZSIsInB1c2giLCJkYXRhSWQiLCJzY29yZSIsIm5ld0RhdGEiLCJwYXJlbnRTY29yZUlkIiwic2NvcmVUZW1wIiwiZ2V0U2NvcmUiLCJzb3VyY2VDbGFpbUlkIiwiY2xhaW1FZGdlIiwicGFyZW50SWQiLCJjbGFpbUVkZ2VUZW1wIiwiZ2V0Q2xhaW1FZGdlIiwic2NvcmVzIiwiZ2V0U2NvcmVzQnlTb3VyY2VJZCIsImlkIiwicHJvIiwiYWZmZWN0cyIsInByaW9yaXR5IiwiQWN0aW9uIiwib2xkQ2xhaW1FZGdlIiwib2xkRGF0YSIsInNjb3JlVHJlZSIsImNsYWltSWQiLCJjbGFpbVNjb3JlIiwic2NvcmVUcmVlSWQiLCJnZXRTY29yZVRyZWUiLCJtaXNzaW5nU2NvcmVBY3Rpb25zIiwibWFpblNjb3JlIiwidG9wU2NvcmVJZCIsIlNjb3JlIiwidW5kZWZpbmVkIiwiY3JlYXRlQmxhbmtNaXNzaW5nU2NvcmVzIiwibGVuZ3RoIiwic2NvcmVUcmVlQWN0aW9ucyIsIm5ld01haW5TY29yZSIsImNhbGN1bGF0ZVNjb3JlRGVzY2VuZGFudHMiLCJmcmFjdGlvbkFjdGlvbnMiLCJjYWxjdWxhdGVGcmFjdGlvbnMiLCJnZW5lcmF0aW9uQWN0aW9ucyIsImNhbGN1bGF0ZUdlbmVyYXRpb25zIiwiZGVzY2VuZGFudENvdW50IiwibmV3U2NvcmVUcmVlUGFydGlhbCIsIm9sZFNjb3JlVHJlZVBhcnRpYWwiLCJjdXJyZW50U2NvcmVJZCIsImN1cnJlbnRDbGFpbUlkIiwiZWRnZXMiLCJnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZCIsImdldENoaWxkcmVuQnlTY29yZUlkIiwiZWRnZSIsImZpbmQiLCJjaGlsZElkIiwidSIsImN1cnJlbnRTY29yZSIsIm9sZENoaWxkU2NvcmVzIiwibmV3Q2hpbGRTY29yZXMiLCJuZXdEZXNjZW5kYW50Q291bnQiLCJvbGRDaGlsZFNjb3JlIiwibmV3U2NvcmUiLCJuZXdTY29yZUZyYWdtZW50IiwiY2hpbGRTY29yZXMiLCJuZXdDaGlsZFNjb3JlIiwicGFyZW50U2NvcmUiLCJmcmFjdGlvbiIsImZyYWN0aW9uU2ltcGxlIiwidG90YWxSZWxldmFuY2UiLCJvbGRTY29yZSIsInJlbGV2YW5jZSIsInBlcmNlbnRPZldlaWdodCIsImdlbmVyYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDTyxlQUFlQSxxQkFBZixDQUFxQztBQUFFQyxFQUFBQSxPQUFPLEdBQUcsRUFBWjtBQUFnQkMsRUFBQUEsVUFBVSxHQUFHLElBQUlDLHdDQUFKLEVBQTdCO0FBQXdEQyxFQUFBQSxVQUFVLEdBQUdDO0FBQXJFLElBT3hDLEVBUEcsRUFRTDtBQUNFLFFBQU1DLFlBQXNCLEdBQUcsRUFBL0I7QUFDQSxRQUFNQyxlQUF5QixHQUFHLEVBQWxDO0FBQ0EsUUFBTUMsWUFBc0IsR0FBRyxFQUEvQjtBQUVBLFFBQU1OLFVBQVUsQ0FBQ08sTUFBWCxDQUFrQlIsT0FBbEIsQ0FBTjs7QUFDQSxPQUFLLE1BQU1TLE1BQVgsSUFBcUJULE9BQXJCLEVBQThCO0FBRTFCO0FBQ0EsUUFBSVMsTUFBTSxDQUFDQyxJQUFQLElBQWUsV0FBZixJQUE4QkQsTUFBTSxDQUFDQyxJQUFQLElBQWUsY0FBakQsRUFBaUU7QUFDN0RKLE1BQUFBLGVBQWUsQ0FBQ0ssSUFBaEIsQ0FBcUJGLE1BQU0sQ0FBQ0csTUFBNUI7QUFDSDs7QUFFRCxRQUFJSCxNQUFNLENBQUNDLElBQVAsSUFBZSxXQUFuQixFQUFnQztBQUM1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Q0FnRSxFQUFBQSxVQUFVOztBQUVWLE9BQUssTUFBTVosYUFBWCxJQUE0QkgsY0FBNUIsRUFBNEM7QUFDeEMsUUFBSUcsYUFBYSxDQUFDWSxVQUFkLElBQTRCQSxVQUFoQyxFQUE0QztBQUN4QyxZQUFNUixhQUFhLG1DQUFRSixhQUFSO0FBQXVCWSxRQUFBQSxVQUFVLEVBQUVBO0FBQW5DLFFBQW5COztBQUNBL0UsTUFBQUEsT0FBTyxDQUFDVyxJQUFSLENBQWEsSUFBSWtCLGNBQUosQ0FBVzBDLGFBQVgsRUFBMEI5QixTQUExQixFQUFxQyxjQUFyQyxDQUFiO0FBQ0g7O0FBQ0QsVUFBTVMsb0JBQW9CLENBQUNqRCxVQUFELEVBQWFrRSxhQUFhLENBQUMxQyxFQUEzQixFQUErQnpCLE9BQS9CLEVBQXdDK0UsVUFBeEMsQ0FBMUI7QUFDSDtBQUNKLEMsQ0FFRDtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBoYXNJdGVtQ2hhbmdlZCB9IGZyb20gXCIuL3V0aWxzL2hhc0l0ZW1DaGFuZ2VkXCI7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcbmltcG9ydCB7IGlDYWxjdWxhdGVTY29yZSwgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBpUmVwb3NpdG9yeSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvaVJlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUHVyZSB9IGZyb20gXCIuL3JlcG9zaXRvcmllcy9SZXBvc2l0b3J5TG9jYWxQdXJlXCI7XHJcbmltcG9ydCB7IFNjb3JlVHJlZSB9IGZyb20gXCIuXCI7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc2NvcmUgYWN0aW9ucyBiYXNlZCBvbiBhIGxpc3Qgb2YgYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7IGFjdGlvbnMgPSBbXSwgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCksIGNhbGN1bGF0b3IgPSBjYWxjdWxhdGVTY29yZSB9OiB7XHJcbiAgICAvKiogQW4gYXJyYXkgb2YgYWN0aW9ucywgdXN1YWxseSBvbiBjbGFpbXMgb3IgZWRnZXMgdGhhdCBpbmNsdXNlIG5vIHNjb3JlcyovXHJcbiAgICBhY3Rpb25zPzogQWN0aW9uW107XHJcbiAgICAvKiogVGhlIHJlcG9zaXRvcnkgdXNlZCB0byBnZXQgY29udGV4dCBmb3IgdGhlIGFjdGlvbnMgKi9cclxuICAgIHJlcG9zaXRvcnk/OiBpUmVwb3NpdG9yeTtcclxuICAgIC8qKiBUaGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlcyAqL1xyXG4gICAgY2FsY3VsYXRvcj86IGlDYWxjdWxhdGVTY29yZTtcclxufSA9IHt9LFxyXG4pIHtcclxuICAgIGNvbnN0IHNjb3JlQWN0aW9uczogQWN0aW9uW10gPSBbXTtcclxuICAgIGNvbnN0IGNsYWltSWRzVG9TY29yZTogc3RyaW5nW10gPSBbXTtcclxuICAgIGNvbnN0IFNjb3JlVHJlZUlkczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShhY3Rpb25zKTtcclxuICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgLy8gZmluZCBjbGFpbXMgdGhhdCBtYXkgbmVlZCBzY29yZXMgY2hhbmdlZFxyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PSAnYWRkX2NsYWltJyB8fCBhY3Rpb24udHlwZSA9PSAnbW9kaWZ5X2NsYWltJykge1xyXG4gICAgICAgICAgICBjbGFpbUlkc1RvU2NvcmUucHVzaChhY3Rpb24uZGF0YUlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09IFwiYWRkX3Njb3JlXCIpIHtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gYWN0aW9uLm5ld0RhdGEgYXMgU2NvcmU7XHJcbiAgICAgICAgICAgIGlmICghc2NvcmUucGFyZW50U2NvcmVJZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZW1wID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZShhY3Rpb24uZGF0YUlkKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlVGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0gc2NvcmVUZW1wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbGFpbUlkc1RvU2NvcmUucHVzaChzY29yZS5zb3VyY2VDbGFpbUlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9BZGQgc2NvcmVzIGlmIGVkZ2VzIGFkZHMgbmV3IGNoaWxkcmVuIHRvIGNsYWltcyBpbiBzY29yZSB0cmVlc1xyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PSAnYWRkX2NsYWltRWRnZScgfHwgYWN0aW9uLnR5cGUgPT0gJ21vZGlmeV9jbGFpbUVkZ2UnKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFpbUVkZ2UgPSBhY3Rpb24ubmV3RGF0YSBhcyBDbGFpbUVkZ2U7XHJcbiAgICAgICAgICAgIGlmICghY2xhaW1FZGdlLnBhcmVudElkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2VUZW1wID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDbGFpbUVkZ2UoYWN0aW9uLmRhdGFJZClcclxuICAgICAgICAgICAgICAgIGlmIChjbGFpbUVkZ2VUZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1FZGdlID0gY2xhaW1FZGdlVGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGFpbUlkc1RvU2NvcmUucHVzaChjbGFpbUVkZ2UucGFyZW50SWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1RPRE86IElmIGFuIGVkZ2UgY2hhbmdlcyB0aGVuIG1vZGlmeSB0aGUgZXhpc3Rpbmcgc2NvcmVzIHRvIG1hdGNoXHJcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09ICdtb2RpZnlfY2xhaW1FZGdlJykge1xyXG4gICAgICAgICAgICBsZXQgY2xhaW1FZGdlID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDbGFpbUVkZ2UoYWN0aW9uLmRhdGFJZClcclxuICAgICAgICAgICAgY2xhaW1FZGdlID0geyAuLi5jbGFpbUVkZ2UsIC4uLmFjdGlvbi5uZXdEYXRhIH1cclxuICAgICAgICAgICAgaWYgKGNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5ld0RhdGEgYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZXNCeVNvdXJjZUlkKGNsYWltRWRnZS5pZClcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2Ygc2NvcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBXaGVyZSBzaG91bGQgSSBwdXQgdGhpcz8gSXQgaXMgbW9kaWZ5aW5nIGFtIG9iamVjdC4gSWYgaXQgaXMgcmVhY3RpdmUgaSBzaG91bGQganVzdCBjaGFuZ2UgdGhlIGRhdGEuIElmIHB1cmUgaXQgc2hvdWxkIGJlIGEgbmV3IG9iamVjdC5cclxuICAgICAgICAgICAgICAgICAgICAvL0ZvciBub3cgSSB3aWxsIG1vZGlmeSBpdCBidXQgaXQgbWF5IG5vdCB0cmlnZ2VyIHVwZGF0ZXMgaW4gYSBwdXJlIGxpYnJhcnkgKFJlYWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGhpcyBjaGFuZ2Ugc2hvdWxkIGFsc28gcHJvYmFibHkgYmUgY2VudHJhbGl6ZWQgc29tZXdoZXJlIHRvIHJlZHVjZSB0aGUgY2hhbmNlIG9mIGluY29uc2lzdGVudCBidWdzLiBJIHRoaW5rIGl0IHdpbGwgaGFwcGVuIGluIG11bHRpcGxlIHBhY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Ob3BlLCBpdCBpcyBhbiBhY3Rpb24gc28gaXQgc2hvdWxkIGFsd2F5cyBiZSBhIG5ldyBvYmplY3QuIElmIGl0IGdvZXMgaW50byBhIHJlYWN0aXZlIHJlc3BvaXRvcnkgdGhlbiBpdCB3aWxsIG1vZGlmeSB0aGUgYWN0dWFsIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vU2hvdWxkIEkgZ3JvdXAgdGhlc2UgYWN0aW9ucyBvciBqdXN0IHRocm93IHRoZW0gaW4gb25lIGF0IGEgdGltZSBsaWtlIEkgYW0gZG9pbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcmUucHJvICE9IGNsYWltRWRnZS5wcm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgc2NvcmUuYWZmZWN0cyAhPSBjbGFpbUVkZ2UuYWZmZWN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBzY29yZS5wcmlvcml0eSAhPSBjbGFpbUVkZ2UucHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm86IGNsYWltRWRnZS5wcm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZmZlY3RzOiBjbGFpbUVkZ2UuYWZmZWN0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBjbGFpbUVkZ2UucHJpb3JpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNjb3JlLCBcIm1vZGlmeV9zY29yZVwiLCBzY29yZS5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVBY3Rpb25zLnB1c2goYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoW2FjdGlvbl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09ICdkZWxldGVfY2xhaW1FZGdlJykge1xyXG4gICAgICAgICAgICBjb25zdCBvbGRDbGFpbUVkZ2UgPSBhY3Rpb24ub2xkRGF0YSBhcyBDbGFpbUVkZ2U7XHJcbiAgICAgICAgICAgIGNsYWltSWRzVG9TY29yZS5wdXNoKG9sZENsYWltRWRnZS5wYXJlbnRJZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PSAnYWRkX3Njb3JlVHJlZScpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcmVUcmVlID0gYWN0aW9uLm5ld0RhdGEgYXMgU2NvcmVUcmVlO1xyXG4gICAgICAgICAgICBTY29yZVRyZWVJZHMucHVzaChzY29yZVRyZWUuaWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL1dhbGsgdXAgdGhlIHNjb3JlcyBmb3IgZWFjaCBjbGFpbSB0byB0aGUgdG9wXHJcbiAgICBmb3IgKGNvbnN0IGNsYWltSWQgb2YgY2xhaW1JZHNUb1Njb3JlKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjbGFpbVNjb3JlIG9mIGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChjbGFpbUlkKSkge1xyXG4gICAgICAgICAgICBTY29yZVRyZWVJZHMucHVzaChjbGFpbVNjb3JlLnNjb3JlVHJlZUlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1JlLWNhbGMgYWxsIFNjb3JlIFRyZWVzIHdpdGggcG9zc2libGUgY2hhbmdlZCBjbGFpbXNcclxuXHJcbiAgICBmb3IgKGNvbnN0IHNjb3JlVHJlZUlkIG9mIFNjb3JlVHJlZUlkcykge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlVHJlZSA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVUcmVlKHNjb3JlVHJlZUlkKVxyXG4gICAgICAgIGlmIChzY29yZVRyZWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1Njb3JlQWN0aW9uczogQWN0aW9uW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYWluU2NvcmUgPSBhd2FpdCByZXBvc2l0b3J5LmdldFNjb3JlKHNjb3JlVHJlZS50b3BTY29yZUlkKTtcclxuICAgICAgICAgICAgaWYgKCFtYWluU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIG1haW5TY29yZSA9IG5ldyBTY29yZShzY29yZVRyZWUuc291cmNlQ2xhaW1JZCwgc2NvcmVUcmVlLmlkKTtcclxuICAgICAgICAgICAgICAgIG1haW5TY29yZS5pZCA9IHNjb3JlVHJlZS50b3BTY29yZUlkO1xyXG4gICAgICAgICAgICAgICAgbWlzc2luZ1Njb3JlQWN0aW9ucy5wdXNoKG5ldyBBY3Rpb24obWFpblNjb3JlLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgY3JlYXRlQmxhbmtNaXNzaW5nU2NvcmVzKHJlcG9zaXRvcnksIHNjb3JlVHJlZS50b3BTY29yZUlkLCBzY29yZVRyZWUuc291cmNlQ2xhaW1JZCB8fCBcIlwiLCBtaXNzaW5nU2NvcmVBY3Rpb25zLCBzY29yZVRyZWVJZClcclxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTY29yZUFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkobWlzc2luZ1Njb3JlQWN0aW9ucylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2NvcmVUcmVlQWN0aW9uczogQWN0aW9uW10gPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgbmV3TWFpblNjb3JlID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVEZXNjZW5kYW50cyhyZXBvc2l0b3J5LCBtYWluU2NvcmUsIGNhbGN1bGF0b3IsIHNjb3JlVHJlZUFjdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAobWlzc2luZ1Njb3JlQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShzY29yZVRyZWVBY3Rpb25zKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmcmFjdGlvbkFjdGlvbnM6IEFjdGlvbltdID0gW107XHJcbiAgICAgICAgICAgIGF3YWl0IGNhbGN1bGF0ZUZyYWN0aW9ucyhyZXBvc2l0b3J5LCBtYWluU2NvcmUsIGZyYWN0aW9uQWN0aW9ucylcclxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uQWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShmcmFjdGlvbkFjdGlvbnMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRpb25BY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xyXG4gICAgICAgICAgICBhd2FpdCBjYWxjdWxhdGVHZW5lcmF0aW9ucyhyZXBvc2l0b3J5LCBtYWluU2NvcmUuaWQsIGdlbmVyYXRpb25BY3Rpb25zLCAwKVxyXG4gICAgICAgICAgICBpZiAoZ2VuZXJhdGlvbkFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoZ2VuZXJhdGlvbkFjdGlvbnMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBwcm9NYWluQWN0aW9uczogQWN0aW9uW10gPSBbXTsgXHJcbiAgICAgICAgICAgIC8vIGNvbnN0IG5ld0NoaWxkU2NvcmUgPSB7IC4uLm1haW5TY29yZSwgcHJvTWFpbjogdHJ1ZSB9XHJcbiAgICAgICAgICAgIC8vIHByb01haW5BY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdDaGlsZFNjb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuICAgICAgICAgICAgLy8gYXdhaXQgY2FsY3VsYXRlUHJvTWFpbihyZXBvc2l0b3J5LCBtYWluU2NvcmUuaWQsIHByb01haW5BY3Rpb25zLCB0cnVlKVxyXG4gICAgICAgICAgICAvLyBpZiAocHJvTWFpbkFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkocHJvTWFpbkFjdGlvbnMpXHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlQWN0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLi4ubWlzc2luZ1Njb3JlQWN0aW9ucyxcclxuICAgICAgICAgICAgICAgIC4uLnNjb3JlVHJlZUFjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5mcmFjdGlvbkFjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5nZW5lcmF0aW9uQWN0aW9ucyxcclxuICAgICAgICAgICAgICAgIC8vIC4uLnByb01haW5BY3Rpb25zLFxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICBpZiAoc2NvcmVUcmVlLmRlc2NlbmRhbnRDb3VudCAhPSBuZXdNYWluU2NvcmUuZGVzY2VuZGFudENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2NvcmVUcmVlUGFydGlhbDogUGFydGlhbDxTY29yZVRyZWU+ID0geyBkZXNjZW5kYW50Q291bnQ6IG5ld01haW5TY29yZS5kZXNjZW5kYW50Q291bnQgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG9sZFNjb3JlVHJlZVBhcnRpYWw6IFBhcnRpYWw8U2NvcmVUcmVlPiA9IHsgZGVzY2VuZGFudENvdW50OiBzY29yZVRyZWUuZGVzY2VuZGFudENvdW50IH1cclxuICAgICAgICAgICAgICAgIHNjb3JlQWN0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpb24obmV3U2NvcmVUcmVlUGFydGlhbCwgb2xkU2NvcmVUcmVlUGFydGlhbCwgXCJtb2RpZnlfc2NvcmVUcmVlXCIsIHNjb3JlVHJlZS5pZClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IFJldmlldyB0aGlzIGRlY2lzaW9uOiBGZWVkIHRoZSBzY29yZSBhY3Rpb25zIGJhY2sgaW50byB0aGUgcmVwb3NpdG9yeSBzbyB0aGlzIHJlcG9zaXRvcnkgaXMgdXAgdG8gZGF0ZSBpbiBjYXNlIGl0IGlzIHVzZWQgXHJcbiAgICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShzY29yZUFjdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiBzY29yZUFjdGlvbnM7XHJcbn1cclxuXHJcbi8vQ3JlYXRlIEJsYW5rIE1pc3NpbmcgU2NvcmVzXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJsYW5rTWlzc2luZ1Njb3JlcyhyZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSwgY3VycmVudFNjb3JlSWQ6IHN0cmluZywgY3VycmVudENsYWltSWQ6IHN0cmluZywgYWN0aW9uczogQWN0aW9uW10sIHNjb3JlVHJlZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVkZ2VzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChjdXJyZW50Q2xhaW1JZClcclxuICAgIGNvbnN0IHNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0Q2hpbGRyZW5CeVNjb3JlSWQoY3VycmVudFNjb3JlSWQpXHJcbiAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgZWRnZXMpIHtcclxuICAgICAgICAvL3NlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGNoaWxkIHNjb3JlIGZvciB0aGUgY2hpbGQgZWRnZVxyXG4gICAgICAgIGxldCBzY29yZSA9IHNjb3Jlcy5maW5kKCh7IHNvdXJjZUNsYWltSWQgfSkgPT4gc291cmNlQ2xhaW1JZCA9PT0gZWRnZS5jaGlsZElkKTtcclxuICAgICAgICBpZiAoIXNjb3JlKSB7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IFNjb3JlIGFuZCBhdHRhY2ggaXQgdG8gaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgY29uc3QgdSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgc2NvcmUgPSBuZXcgU2NvcmUoZWRnZS5jaGlsZElkLCBzY29yZVRyZWVJZCwgY3VycmVudFNjb3JlSWQsIGVkZ2UuaWQsIHVuZGVmaW5lZCwgZWRnZS5wcm8sIGVkZ2UuYWZmZWN0cywgdSwgdSwgdSwgZWRnZS5wcmlvcml0eSk7XHJcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChuZXcgQWN0aW9uKHNjb3JlLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlXCIsIHNjb3JlLmlkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVjdXJzZSBhbmQgdGhyb3VnaCBjaGlsZHJlblxyXG4gICAgICAgIGF3YWl0IGNyZWF0ZUJsYW5rTWlzc2luZ1Njb3JlcyhyZXBvc2l0b3J5LCBzY29yZS5pZCwgZWRnZS5jaGlsZElkLCBhY3Rpb25zLCBzY29yZVRyZWVJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vVGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhhdCBhbGwgc2NvcmVzIGFscmVhZHkgZXhpc3RcclxuYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlU2NvcmVEZXNjZW5kYW50cyhyZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSwgY3VycmVudFNjb3JlOiBTY29yZSwgY2FsY3VsYXRvcjogaUNhbGN1bGF0ZVNjb3JlID0gY2FsY3VsYXRlU2NvcmUsIGFjdGlvbnM6IEFjdGlvbltdKSB7XHJcbiAgICBjb25zdCBvbGRDaGlsZFNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0Q2hpbGRyZW5CeVNjb3JlSWQoY3VycmVudFNjb3JlLmlkKVxyXG4gICAgY29uc3QgbmV3Q2hpbGRTY29yZXM6IFNjb3JlW10gPSBbXTtcclxuICAgIGxldCBuZXdEZXNjZW5kYW50Q291bnQgPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3Qgb2xkQ2hpbGRTY29yZSBvZiBvbGRDaGlsZFNjb3JlcykgeyAvL0NhbGN1bGF0ZSBDaGlsZHJlblxyXG4gICAgICAgIC8vVE9ETzogcmVtb3ZlIGFueSBzY29yZXMgdG8gY2FsY3VsYXRlIGJhc2VkIG9uIGZvcm11bGFzIHRoYXQgZXhjbHVkZSBzY29yZXNcclxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlRGVzY2VuZGFudHMocmVwb3NpdG9yeSwgb2xkQ2hpbGRTY29yZSwgY2FsY3VsYXRvciwgYWN0aW9ucyk7XHJcbiAgICAgICAgbmV3Q2hpbGRTY29yZXMucHVzaChuZXdTY29yZSk7XHJcbiAgICAgICAgbmV3RGVzY2VuZGFudENvdW50ICs9IG5ld1Njb3JlLmRlc2NlbmRhbnRDb3VudCArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3U2NvcmVGcmFnbWVudCA9IGNhbGN1bGF0b3Ioe1xyXG4gICAgICAgIGNoaWxkU2NvcmVzOiBuZXdDaGlsZFNjb3JlcyxcclxuICAgIH0pXHJcblxyXG4gICAgLy91cGRhdGUgYW55IG5ld0NoaWxkU2NvcmVzIHRoYXQgY2hhbmdlZFxyXG4gICAgZm9yIChjb25zdCBuZXdDaGlsZFNjb3JlIG9mIG5ld0NoaWxkU2NvcmVzKSB7XHJcbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyBzbG93IGFjY2Vzc2luZyB0aGUgZGF0YSBzdG9yZSBhZ2FpbiBmb3IgdGhpcyBkYXRhIG9yIGRvIHdlIGFzc3VtZSBpdCBpcyBjYWNoZWQgaWYgaXQgaXMgaW4gYW4gZXh0ZXJuYWwgREJcclxuICAgICAgICBjb25zdCBvbGRDaGlsZFNjb3JlID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZShuZXdDaGlsZFNjb3JlLmlkKTtcclxuICAgICAgICBpZiAob2xkQ2hpbGRTY29yZSAmJiBoYXNJdGVtQ2hhbmdlZChvbGRDaGlsZFNjb3JlLCBuZXdDaGlsZFNjb3JlKSkge1xyXG4gICAgICAgICAgICBhY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdDaGlsZFNjb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPOiBNb2RpZnkgdGhlIG5ld1Njb3JlIGJhc2VkIG9uIGFueSBmb3JtdWxhc1xyXG4gICAgY29uc3QgbmV3U2NvcmUgPSB7XHJcbiAgICAgICAgLi4uY3VycmVudFNjb3JlLFxyXG4gICAgICAgIC4uLm5ld1Njb3JlRnJhZ21lbnQsXHJcbiAgICAgICAgZGVzY2VuZGFudENvdW50OiBuZXdEZXNjZW5kYW50Q291bnRcclxuICAgIH1cclxuICAgIGlmIChoYXNJdGVtQ2hhbmdlZChjdXJyZW50U2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgIGFjdGlvbnMucHVzaChuZXcgQWN0aW9uKG5ld1Njb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3U2NvcmU7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUZyYWN0aW9ucyhyZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSwgcGFyZW50U2NvcmU6IFBhcnRpYWw8U2NvcmU+LCBhY3Rpb25zOiBBY3Rpb25bXSkge1xyXG4gICAgaWYgKHBhcmVudFNjb3JlLmlkICE9IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHBhcmVudFNjb3JlLmZyYWN0aW9uICE9IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHBhcmVudFNjb3JlLmZyYWN0aW9uU2ltcGxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IG9sZENoaWxkU2NvcmVzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDaGlsZHJlbkJ5U2NvcmVJZChwYXJlbnRTY29yZS5pZClcclxuXHJcbiAgICAgICAgLy9Db3VudCB1cCB0b3RhbCByZWxldmFuY2VcclxuICAgICAgICBsZXQgdG90YWxSZWxldmFuY2UgPSAwXHJcbiAgICAgICAgZm9yIChjb25zdCBvbGRTY29yZSBvZiBvbGRDaGlsZFNjb3Jlcykge1xyXG4gICAgICAgICAgICBpZiAob2xkU2NvcmUuYWZmZWN0cyA9PT0gXCJjb25maWRlbmNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUmVsZXZhbmNlICs9IG9sZFNjb3JlLnJlbGV2YW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b3RhbFJlbGV2YW5jZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0b3RhbFJlbGV2YW5jZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG9sZENoaWxkU2NvcmUgb2Ygb2xkQ2hpbGRTY29yZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3Q2hpbGRTY29yZTogUGFydGlhbDxTY29yZT4gPSB7XHJcbiAgICAgICAgICAgICAgICAuLi5vbGRDaGlsZFNjb3JlLFxyXG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TaW1wbGU6IChvbGRDaGlsZFNjb3JlLnJlbGV2YW5jZSAvIHRvdGFsUmVsZXZhbmNlKSAqIHBhcmVudFNjb3JlLmZyYWN0aW9uU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgZnJhY3Rpb246IHBhcmVudFNjb3JlLmZyYWN0aW9uICogb2xkQ2hpbGRTY29yZS5wZXJjZW50T2ZXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAvLyBwYXJlbnRGcmFjdGlvblNpbXBsZTogcGFyZW50U2NvcmUuZnJhY3Rpb25TaW1wbGUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld0NoaWxkU2NvcmUuZnJhY3Rpb25TaW1wbGUgIT0gb2xkQ2hpbGRTY29yZS5mcmFjdGlvblNpbXBsZSB8fFxyXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRTY29yZS5mcmFjdGlvbiAhPSBvbGRDaGlsZFNjb3JlLmZyYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdDaGlsZFNjb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBjYWxjdWxhdGVGcmFjdGlvbnMocmVwb3NpdG9yeSwgbmV3Q2hpbGRTY29yZSwgYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIFRPRE86IGZhY3RvciBvdXQgZHVwbGljYXRlIGNvZGUgb2YgdGhlc2UgY2FsY3VsYXRlIGZ1bmN0aW9ucy4gbWF5YmUgbWFrZSBhbiBhcnJheSBvZiBpdGVtcyB0byBwcm9jZXNzLi4uXHJcbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUdlbmVyYXRpb25zKHJlcG9zaXRvcnk6IGlSZXBvc2l0b3J5LCBwYXJlbnRTY29yZUlkOiBzdHJpbmcsIGFjdGlvbnM6IEFjdGlvbltdLCBnZW5lcmF0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG9sZENoaWxkU2NvcmVzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDaGlsZHJlbkJ5U2NvcmVJZChwYXJlbnRTY29yZUlkKVxyXG4gICAgZ2VuZXJhdGlvbisrO1xyXG5cclxuICAgIGZvciAoY29uc3Qgb2xkQ2hpbGRTY29yZSBvZiBvbGRDaGlsZFNjb3Jlcykge1xyXG4gICAgICAgIGlmIChvbGRDaGlsZFNjb3JlLmdlbmVyYXRpb24gIT0gZ2VuZXJhdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdDaGlsZFNjb3JlID0geyAuLi5vbGRDaGlsZFNjb3JlLCBnZW5lcmF0aW9uOiBnZW5lcmF0aW9uIH1cclxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKG5ldyBBY3Rpb24obmV3Q2hpbGRTY29yZSwgdW5kZWZpbmVkLCBcIm1vZGlmeV9zY29yZVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IGNhbGN1bGF0ZUdlbmVyYXRpb25zKHJlcG9zaXRvcnksIG9sZENoaWxkU2NvcmUuaWQsIGFjdGlvbnMsIGdlbmVyYXRpb24pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIC8vIFRPRE86IGZhY3RvciBvdXQgZHVwbGljYXRlIGNvZGUgb2YgdGhlc2UgY2FsY3VsYXRlIGZ1bmN0aW9ucy4gbWF5YmUgbWFrZSBhbiBhcnJheSBvZiBpdGVtcyB0byBwcm9jZXNzLi4uXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZVByb01haW4ocmVwb3NpdG9yeTogaVJlcG9zaXRvcnksIHBhcmVudFNjb3JlSWQ6IHN0cmluZywgYWN0aW9uczogQWN0aW9uW10sIHByb01haW46IGJvb2xlYW4pIHtcclxuLy8gICAgIGNvbnN0IG9sZENoaWxkU2NvcmVzID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRDaGlsZHJlbkJ5U2NvcmVJZChwYXJlbnRTY29yZUlkKVxyXG5cclxuLy8gICAgIGZvciAoY29uc3Qgb2xkQ2hpbGRTY29yZSBvZiBvbGRDaGlsZFNjb3Jlcykge1xyXG4vLyAgICAgICAgIC8vIGNvbnN0IG5ld0NoaWxkU2NvcmUgPSB7IC4uLm9sZENoaWxkU2NvcmUsIHByb01haW46IGZhbHNlIH1cclxuLy8gICAgICAgICAvLyBhY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdDaGlsZFNjb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuLy8gICAgICAgICAvLyBhd2FpdCBjYWxjdWxhdGVQcm9NYWluKHJlcG9zaXRvcnksIG9sZENoaWxkU2NvcmUuaWQsIGFjdGlvbnMsIHByb01haW4pXHJcbi8vICAgICAgICAgaWYgKG9sZENoaWxkU2NvcmUucHJvID09PSB0cnVlKXsvLyAmJiBvbGRDaGlsZFNjb3JlLnByb01haW4gIT09IHByb01haW4pIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgbmV3Q2hpbGRTY29yZSA9IHsgLi4ub2xkQ2hpbGRTY29yZSwgcHJvTWFpbjogcHJvTWFpbiB9XHJcbi8vICAgICAgICAgICAgIGFjdGlvbnMucHVzaChuZXcgQWN0aW9uKG5ld0NoaWxkU2NvcmUsIHVuZGVmaW5lZCwgXCJtb2RpZnlfc2NvcmVcIikpO1xyXG4vLyAgICAgICAgICAgICBhd2FpdCBjYWxjdWxhdGVQcm9NYWluKHJlcG9zaXRvcnksIG9sZENoaWxkU2NvcmUuaWQsIGFjdGlvbnMsIHByb01haW4pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBpZiAob2xkQ2hpbGRTY29yZS5wcm8gPT09IGZhbHNlKXsvLyAmJiBvbGRDaGlsZFNjb3JlLnByb01haW4gPT09IHByb01haW4pIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgbmV3Q2hpbGRTY29yZSA9IHsgLi4ub2xkQ2hpbGRTY29yZSwgcHJvTWFpbjogIXByb01haW4gfVxyXG4vLyAgICAgICAgICAgICBhY3Rpb25zLnB1c2gobmV3IEFjdGlvbihuZXdDaGlsZFNjb3JlLCB1bmRlZmluZWQsIFwibW9kaWZ5X3Njb3JlXCIpKTtcclxuLy8gICAgICAgICAgICAgYXdhaXQgY2FsY3VsYXRlUHJvTWFpbihyZXBvc2l0b3J5LCBvbGRDaGlsZFNjb3JlLmlkLCBhY3Rpb25zLCAhcHJvTWFpbilcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbiJdfQ==