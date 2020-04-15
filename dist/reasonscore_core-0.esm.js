/**
 * Calculates a new score based on the child scores passed in.
 */
function calculateScore({
  childScores = [],
  reversible = true
} = {}) {
  const newScore = {
    confidence: 1,
    relevance: 1
  };
  let childrenConfidence = 0;
  let childrenRelevance = 0;

  if (childScores.filter(s => s.affects === 'confidence').length < 1) {
    // If there are no children that affect the confidence of the claim
    // then assume the claim is 100% confident and start strength and relevance at 1
    childrenConfidence = 1;
    childrenRelevance = 1;
  }

  childScores.forEach(score => {
    //Ensure calculations for non-reversible scores don't allow the confident to be below 0
    let confidence = score.confidence;

    if (!score.reversible && score.confidence < 0) {
      confidence = 0;
    }

    debugger; // Loop through the child scores and determine the score of the parent.

    if (score.affects === 'confidence') {
      //calculate the reduction of the relevance bease on the distance of the confidence from zero
      //TODO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
      //Like "This claim should require supporting evidence"
      let confidenceRelevanceAdjustment = 1;
      confidenceRelevanceAdjustment = Math.abs(confidence); // Process edges that affect confidence

      if (score.pro) {
        childrenConfidence += confidence * score.relevance * confidenceRelevanceAdjustment; // Add up all the strength of the children

        childrenRelevance += score.relevance * confidenceRelevanceAdjustment; //Add up the relevance separately so we can do a weighted agerage later
      } else {
        childrenConfidence -= confidence * score.relevance * confidenceRelevanceAdjustment;
        childrenRelevance += score.relevance * confidenceRelevanceAdjustment;
      }
    }

    if (score.affects === 'relevance') {
      // Process Relevance child claims
      if (newScore.relevance == undefined) {
        newScore.relevance = 1;
      }

      if (score.pro) {
        newScore.relevance += confidence; // Add up all the strength of the children
      } else {
        newScore.relevance -= confidence / 2;
      }
    }
  });

  if (childrenRelevance === 0) {
    // Protect against division by zero
    newScore.confidence = 0;
  } else {
    //Calculate the score
    newScore.confidence = childrenConfidence / childrenRelevance;
  }

  if (Object.is(newScore.confidence, -0)) {
    // Protect against negative zero 
    newScore.confidence = 0;
  }

  return newScore;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

class Messenger {
  constructor() {
    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "actionsLog", []);

    _defineProperty(this, "notify", actions => {
      this.actionsLog.push(actions);

      for (const subscriber of this.subscribers) {
        subscriber(actions);
      }
    });
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback, 0);

    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
  /** this function can be called by outside code to notfy this repository of changes */


}

function newId(when = new Date()) {
  // take the UTC date and convert to base 62
  let decimal = 5000000000000 - when.getTime();
  const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let result = '';

  while (decimal >= 1) {
    result = s[decimal - 62 * Math.floor(decimal / 62)] + result;
    decimal = Math.floor(decimal / 62);
  } // Add 5 extra random characters in case multiple ids are creates at the same time


  result += Array(5).join().split(',').map(() => s[Math.floor(Math.random() * s.length)]).join('');
  return result;
}

/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 */
class Score {
  constructor(sourceClaimId, scoreTreeId, parentScoreId = undefined, sourceEdgeId = undefined, reversible = false, pro = true, affects = "confidence", confidence = 1, relevance = 1, id = newId(), priority = "", content = "") {
    this.sourceClaimId = sourceClaimId;
    this.scoreTreeId = scoreTreeId;
    this.parentScoreId = parentScoreId;
    this.sourceEdgeId = sourceEdgeId;
    this.reversible = reversible;
    this.pro = pro;
    this.affects = affects;
    this.confidence = confidence;
    this.relevance = relevance;
    this.id = id;
    this.priority = priority;
    this.content = content;

    _defineProperty(this, "type", 'score');
  }

}
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */

function differentScores(scoreA, scoreB) {
  return !(scoreA.confidence == scoreB.confidence && scoreA.relevance == scoreB.relevance && scoreA.pro == scoreB.pro && scoreA.priority == scoreB.priority);
}

class Action {
  constructor(newData, oldData, type, dataId = "") {
    this.newData = newData;
    this.oldData = oldData;
    this.type = type;
    this.dataId = dataId;

    if (dataId === "") {
      this.dataId = newData.id;
    }
  }

}

//Store the string for the ID
//Store the string for the ID
class RsData {
  constructor(actionsLog = [], items = {}, claimEdgeIdsByParentId = {}, claimEdgeIdsByChildId = {}, scoreIdsBySourceId = {}, childIdsByScoreId = {}, ScoreTreeIds = []) {
    this.actionsLog = actionsLog;
    this.items = items;
    this.claimEdgeIdsByParentId = claimEdgeIdsByParentId;
    this.claimEdgeIdsByChildId = claimEdgeIdsByChildId;
    this.scoreIdsBySourceId = scoreIdsBySourceId;
    this.childIdsByScoreId = childIdsByScoreId;
    this.ScoreTreeIds = ScoreTreeIds;
  }

}

function claims(state, action, reverse = false) {
  switch (action.type) {
    case "add_claim":
    case "sync_claim":
      {
        return _objectSpread2({}, state, {
          items: _objectSpread2({}, state.items, {
            [action.dataId]: action.newData
          })
        });
      }

    case "modify_claim":
      {
        return _objectSpread2({}, state, {
          items: _objectSpread2({}, state.items, {
            [action.dataId]: _objectSpread2({}, state.items[action.dataId], {}, action.newData)
          })
        });
      }
    // TODO: Handle reverse (Or save state somewhere, would that be too large?)

    default:
      return state;
  }
}

function IndexReducer(state, index, keyId, id) {
  if (keyId) {
    //TODO: remove this, can I use "...state[index][keyId] || []" below?
    if (!state[index][keyId]) {
      state[index][keyId] = [];
    }

    if (state[index][keyId].indexOf(id) == -1) {
      state = _objectSpread2({}, state, {
        [index]: _objectSpread2({}, state[index], {
          [keyId]: [...state[index][keyId], id]
        })
      });
    }
  }

  return state;
}

function claimEdges(state, action, reverse = false) {
  switch (action.type) {
    case "add_claimEdge":
    case "modify_claimEdge":
    case "sync_claimEdge":
      {
        state = _objectSpread2({}, state, {
          items: _objectSpread2({}, state.items, {
            [action.dataId]: _objectSpread2({}, state.items[action.dataId], {}, action.newData)
          })
        });
        state = IndexReducer(state, "claimEdgeIdsByChildId", action.newData.childId, action.dataId);
        state = IndexReducer(state, "claimEdgeIdsByParentId", action.newData.parentId, action.dataId);
        return state;
      }

    case "delete_claimEdge":
      {
        const claimEdge = state.items[action.dataId]; //TODO: Check that I'm not deleting anythign I shouldn't or deleting something twice?
        //TODO: This leaves a lot of orphaned scores and claim and claimedges
        //TODO: Probably should comment what this is doing

        delete state.items[action.dataId];
        state = IndexDelete(state, state.claimEdgeIdsByChildId, claimEdge.childId, action.dataId);
        state = IndexDelete(state, state.claimEdgeIdsByParentId, claimEdge.parentId, action.dataId);
        const scoreIds = state.scoreIdsBySourceId[action.dataId];

        for (const scoreId of scoreIds) {
          const score = state.items[scoreId];
          delete state.items[scoreId];
          delete state.scoreIdsBySourceId[action.dataId];
          delete state.childIdsByScoreId[scoreId];

          if (score.parentScoreId) {
            state = IndexDelete(state, state.childIdsByScoreId, score.parentScoreId, scoreId);
          }

          state = IndexDelete(state, state.scoreIdsBySourceId, score.sourceClaimId, scoreId);
        }

        return state;
      }

    default:
      return state;
  }
}
function IndexDelete(state, index, keyId, id) {
  const internalIndex = index[keyId];
  const location = internalIndex.indexOf(id, 0);

  if (location > -1) {
    internalIndex.splice(location, 1);
  }

  return state;
}

class RepositoryLocalBase {
  constructor(rsData = new RsData()) {
    this.rsData = rsData;

    _defineProperty(this, "log", []);
  }

  async getClaim(id) {
    return this.rsData.items[id];
  }

  async getClaimEdge(id) {
    return this.rsData.items[id];
  }

  async getScore(id) {
    return this.rsData.items[id];
  }

  async getScoreTree(id) {
    return this.rsData.items[id];
  }

  async getClaimEdgesByParentId(parentId) {
    const claimEdgeIdStrings = this.rsData.claimEdgeIdsByParentId[parentId];
    const claimEdges = [];

    if (claimEdgeIdStrings) {
      for (const claimEdgeIdString of claimEdgeIdStrings) {
        const claimEdge = await this.getClaimEdge(claimEdgeIdString);
        if (claimEdge) claimEdges.push(claimEdge);
      }
    }

    return claimEdges;
  }

  async getClaimEdgesByChildId(childId) {
    const claimEdgeIdStrings = this.rsData.claimEdgeIdsByChildId[childId];
    const claimEdges = [];

    for (const claimEdgeIdString of claimEdgeIdStrings) {
      const claimEdge = await this.getClaimEdge(claimEdgeIdString);
      if (claimEdge) claimEdges.push(claimEdge);
    }

    return claimEdges;
  }

  async getScoresBySourceId(sourceClaimId) {
    const scoreIdStrings = this.rsData.scoreIdsBySourceId[sourceClaimId];
    const scores = [];

    if (scoreIdStrings) {
      for (const scoreIdString of scoreIdStrings) {
        const score = await this.getScore(scoreIdString);
        if (score) scores.push(score);
      }
    }

    return scores;
  }

  async getChildrenByScoreId(parentScoreId) {
    const childIdStrings = this.rsData.childIdsByScoreId[parentScoreId];
    const scores = [];

    if (childIdStrings) {
      for (const scoreIdString of childIdStrings) {
        const score = await this.getScore(scoreIdString);
        if (score) scores.push(score);
      }
    }

    return scores;
  }

}

function scores(state, action, reverse = false) {
  switch (action.type) {
    case "add_score":
    case "modify_score":
    case "sync_score":
      {
        // Since the score data might just be some of the data we need to get the current score and combine them
        const originalScore = state.items[action.dataId];
        let score = action.newData;

        if (originalScore) {
          score = _objectSpread2({}, originalScore, {}, score);
        }

        state = _objectSpread2({}, state, {
          items: _objectSpread2({}, state.items, {
            [action.dataId]: score
          })
        }); //TODO: Do I need to stop recreating the state so many times in this reducer?

        state = IndexReducer(state, "childIdsByScoreId", score.parentScoreId, action.dataId);
        state = IndexReducer(state, "scoreIdsBySourceId", score.sourceClaimId, action.dataId);
        state = IndexReducer(state, "scoreIdsBySourceId", score.sourceEdgeId, action.dataId);
        return state;
      }

    default:
      return state;
  }
}

function scoreTrees(state, action, reverse = false) {
  switch (action.type) {
    case "add_scoreTree":
    case "modify_score":
      {
        // Since the score data might just be some of the data we need to get the current score and combine them
        const originalItem = state.items[action.dataId];
        let newItem = action.newData;

        if (originalItem) {
          newItem = _objectSpread2({}, originalItem, {}, newItem);
        }

        state = _objectSpread2({}, state, {
          items: _objectSpread2({}, state.items, {
            [action.dataId]: newItem
          })
        });

        if (state.ScoreTreeIds.indexOf(action.dataId) == -1) {
          state = _objectSpread2({}, state, {
            ScoreTreeIds: [...state.ScoreTreeIds, action.dataId]
          });
        }

        return state;
      }

    default:
      return state;
  }
}

class RepositoryLocalPure extends RepositoryLocalBase {
  constructor(rsData = new RsData()) {
    super(rsData);
    this.rsData = rsData;
  }

  async notify(actions) {
    //this.rsData.actionsLog.push({actions:actions}); TODO: put logs back in
    for (const action of actions) {
      this.rsData = claims(this.rsData, action);
      this.rsData = claimEdges(this.rsData, action);
      this.rsData = scores(this.rsData, action);
      this.rsData = scoreTrees(this.rsData, action);
    }
  }

}

/**
 * Calculates the score actions based on a list of actions
 */
async function calculateScoreActions({
  actions = [],
  repository = new RepositoryLocalPure(),
  calculator = calculateScore
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

      if (!score.parentId) {
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
      claimEdge = _objectSpread2({}, claimEdge, {}, action.newData);

      if (claimEdge) {
        action.newData;
        const scores = await repository.getScoresBySourceId(claimEdge.id);

        for (const score of scores) {
          //TODO: Where should I put this? It is modifying am object. If it is reactive i should just change the data. If pure it should be a new object.
          //For now I will modify it but it may not trigger updates in a pure library (React)
          //This change should also probably be centralized somewhere to reduce the chance of inconsistent bugs. I think it will happen in multiple paces
          //Nope, it is an action so it should always be a new object. If it goes into a reactive respoitory then it will modify the actual object
          //Should I group these actions or just throw them in one at a time like I am doing
          if (score.pro != claimEdge.pro || score.affects != claimEdge.affects) {
            const action = new Action({
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
      const tempMissingScoreActions = [];
      let topScore = await repository.getScore(scoreTree.topScoreId);

      if (!topScore) {
        topScore = new Score(scoreTree.sourceClaimId, scoreTree.id);
        topScore.id = scoreTree.topScoreId;
        tempMissingScoreActions.push(new Action(topScore, undefined, "add_score"));
      }

      await createBlankMissingScores(repository, scoreTree.topScoreId, scoreTree.sourceClaimId || "", tempMissingScoreActions, scoreTreeId);

      if (tempMissingScoreActions.length > 0) {
        await repository.notify(tempMissingScoreActions);
      }

      const tempcalculateScoreTreeActions = [];
      await calculateScoreTree(repository, topScore, calculator, tempMissingScoreActions);
      scoreActions.push(...tempMissingScoreActions, ...tempcalculateScoreTreeActions);
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
      score = new Score(edge.childId, scoreTreeId, currentScoreId, edge.id, undefined, edge.pro, edge.affects, u, u, u, edge.priority);
      actions.push(new Action(score, undefined, "add_score", score.id));
    } //Recurse and through children


    await createBlankMissingScores(repository, score.id, edge.childId, actions, scoreTreeId);
  }
} //This function assume that all scores already exist


async function calculateScoreTree(repository, currentScore, calculator = calculateScore, actions) {
  const oldScores = await repository.getChildrenByScoreId(currentScore.id);
  const newScores = [];

  for (const oldScore of oldScores) {
    //Calculate Children
    //TODO: remove any scores to calculate based on formulas that exclude scores
    newScores.push((await calculateScoreTree(repository, oldScore, calculator, actions)));
  }

  const newScoreFragment = calculator({
    childScores: newScores
  }); //TODO: Modify the newScore based on any formulas

  const newScore = _objectSpread2({}, currentScore, {}, newScoreFragment);

  if (differentScores(currentScore, newScore)) {
    actions.push(new Action(newScore, undefined, "modify_score", newScore.id));
  }

  return newScore;
}

function deepClone(item) {
  return JSON.parse(JSON.stringify(item));
}

/**
 * Stores the relationship between a claim and an item (usually another claim).
 * This is directional as the edge points from one claim to it's parent.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */

class ClaimEdge {
  constructor(parentId, childId, affects = 'confidence', pro = true, id = newId(), priority = "") {
    this.parentId = parentId;
    this.childId = childId;
    this.affects = affects;
    this.pro = pro;
    this.id = id;
    this.priority = priority;

    _defineProperty(this, "type", 'claimEdge');
  }

}

/**
 * Represents an intentional top of a tree of scores.
 */
class ScoreTree {
  constructor(sourceClaimId, topScoreId, confidence = 1, id = newId()) {
    this.sourceClaimId = sourceClaimId;
    this.topScoreId = topScoreId;
    this.confidence = confidence;
    this.id = id;

    _defineProperty(this, "type", 'scoreTree');
  }

}

class Claim {
  constructor(content = "", id = newId(), reversible = false) {
    this.content = content;
    this.id = id;
    this.reversible = reversible;

    _defineProperty(this, "type", 'claim');
  }

}

export { Action, Claim, ClaimEdge, Messenger, RepositoryLocalPure, RsData, Score, ScoreTree, calculateScore, calculateScoreActions, deepClone, differentScores, newId };
