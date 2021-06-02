var reasonscore_core = (function (exports) {
    'use strict';

    /**
     * Calculates a new score based on the child scores passed in.
     */
    function calculateScore({
      childScores = [],
      reversible = true
    } = {}) {
      // TODO: Simplify all this math and maybe break it up between base functionality and additional scoring (like the points)
      const newScore = {};
      newScore.confidence = 0;
      newScore.relevance = 1;
      newScore.childrenAveragingWeight = 0;
      newScore.childrenConfidenceWeight = 0;
      newScore.childrenRelevanceWeight = 0;
      newScore.childrenWeight = 0; // newScore.childrenProWeight = 0;
      // newScore.childrenConWeight = 0;

      if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // Defaults if there are no children
        newScore.confidence = 1; // assume 100% confident

        newScore.relevance = 1; // assume 100% relevant

        newScore.childrenAveragingWeight = 1;
        newScore.childrenConfidenceWeight = 1;
        newScore.childrenRelevanceWeight = 1;
        newScore.childrenWeight = 1;
      } //Gather children Weights totals for processing further down


      for (const childScore of childScores) {
        //Ensure calculations for non-reversible scores don't allow the confidence to be below 0
        //TODO: Is this needed in the totals seciton?
        let confidence = childScore.confidence;

        if (!childScore.reversible && childScore.confidence < 0) {
          confidence = 0;
        }

        childScore.weight = Math.abs(confidence) * childScore.relevance; // confidenceWeight * RelevanceWeight

        newScore.childrenAveragingWeight += 1;
        newScore.childrenConfidenceWeight += Math.abs(confidence);
        newScore.childrenRelevanceWeight += childScore.relevance;
        newScore.childrenWeight += childScore.weight; // //TODO: Experimantal
        // if (confidence > 0) {
        //     if (childScore.pro) {
        //         newScore.childrenProWeight += confidence
        //     }
        //     if (!childScore.pro) {
        //         newScore.childrenConWeight += confidence
        //     }
        // } else if (confidence < 0) {
        //     if (childScore.pro) {
        //         newScore.childrenConWeight += confidence
        //     }
        //     if (!childScore.pro) {
        //         newScore.childrenProWeight += confidence
        //     }
        // }
      } // Loop through to calculate the final scores


      for (const childScore of childScores) {
        const polarity = childScore.pro ? 1 : -1;

        if (childScore.affects === "confidence") {
          if (newScore.childrenWeight === 0) {
            childScore.percentOfWeight = 0;
            newScore.confidence = 0;
          } else {
            childScore.percentOfWeight = childScore.weight / // @ts-ignore
            newScore.childrenWeight; // @ts-ignore

            newScore.confidence += childScore.percentOfWeight * childScore.confidence * polarity;
          }
        }

        if (childScore.affects === "relevance") {
          // Process Relevance child claims
          let confidence = childScore.confidence;

          if (!childScore.reversible && childScore.confidence < 0) {
            confidence = 0;
          }

          if (newScore.relevance == undefined) {
            newScore.relevance = 1;
          }

          if (childScore.pro) {
            newScore.relevance += confidence;
          } else {
            newScore.relevance -= confidence / 2;
          }
        }

        childScore.confidence;

        if (!childScore.reversible && childScore.confidence < 0) ; // if (childScore.pro) {
        //     childScore.percentAgreeWeight = confidence / newScore.childrenProWeight
        // } else {
        //     childScore.percentAgreeWeight = confidence / newScore.childrenConWeight
        // }

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
      constructor(
      /** The claim to which this score belongs */
      sourceClaimId,
      /** The top of the tree of scores that this belongs to. Used for indexing */
      scoreTreeId,
      /** The parent of this score in the score tree graph */
      parentScoreId = null, // Use null because Firestore does not allow undefined

      /** The Edge to which this score belongs */
      sourceEdgeId = null, reversible = false,
      /** Is this score a pro of it's parent (false if it is a con) */
      pro = true,
      /** how confident we sould be in the claim. (AKA True) */

      /** How the child affects the parent score */
      affects = "confidence", confidence = 1,
      /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
       * A multiplier set by all the child edges that affect 'relevance'*/
      relevance = 1, id = newId(), priority = "", content = "") {
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

        _defineProperty(this, "descendantCount", 0);

        _defineProperty(this, "generation", 0);

        _defineProperty(this, "fractionSimple", 1);

        _defineProperty(this, "fraction", 1);

        _defineProperty(this, "childrenAveragingWeight", 1);

        _defineProperty(this, "childrenConfidenceWeight", 1);

        _defineProperty(this, "childrenRelevanceWeight", 1);

        _defineProperty(this, "childrenWeight", 1);

        _defineProperty(this, "weight", 1);

        _defineProperty(this, "percentOfWeight", 1);
      } // //TODO:Experimental
      // public childrenProWeight: number = 0;
      // public childrenConWeight: number = 0;
      // public percentAgreeWeight: number = 0;
      // public parentFractionSimple: number = 0;


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

    /** Compare two scores to see if they are different in what the score is.
     *  Just compares confidence and relavance
     */
    function hasItemChanged(scoreA, scoreB) {
      return !(JSON.stringify(scoreA, Object.keys(scoreA).sort()) === JSON.stringify(scoreB, Object.keys(scoreB).sort()));
    }

    //Store the string for the ID
    //Store the string for the ID
    class RsData {
      constructor(actionsLog = [], // Claim data

      /** Stores all the current items */
      items = {}, // Claim Indexes - Local
      claimEdgeIdsByParentId = {}, claimEdgeIdsByChildId = {}, //Score Indexes - Local
      scoreIdsBySourceId = {}, childIdsByScoreId = {}, ScoreTreeIds = []) {
        this.actionsLog = actionsLog;
        this.items = items;
        this.claimEdgeIdsByParentId = claimEdgeIdsByParentId;
        this.claimEdgeIdsByChildId = claimEdgeIdsByChildId;
        this.scoreIdsBySourceId = scoreIdsBySourceId;
        this.childIdsByScoreId = childIdsByScoreId;
        this.ScoreTreeIds = ScoreTreeIds;
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

    function claims(state, action, reverse = false) {
      switch (action.type) {
        case "add_claim":
        case "sync_claim":
        case "modify_claim":
          {
            let newItem = state.items[action.dataId];

            if (!newItem) {
              newItem = new Claim("", "");
              newItem.id = action.dataId;
            }

            newItem = _objectSpread2(_objectSpread2({}, newItem), action.newData);
            return _objectSpread2(_objectSpread2({}, state), {}, {
              items: _objectSpread2(_objectSpread2({}, state.items), {}, {
                [action.dataId]: newItem
              })
            });
          }

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
          state = _objectSpread2(_objectSpread2({}, state), {}, {
            [index]: _objectSpread2(_objectSpread2({}, state[index]), {}, {
              [keyId]: [...state[index][keyId], id]
            })
          });
        }
      }

      return state;
    }

    /**
     * Stores the relationship between a claim and an item (usually another claim).
     * This is directional as the edge points from one claim to it's parent.
     * This is just a data transfer object so it should have no logic in it
     * and only JSON compatible types string, number, object, array, boolean
     */

    class ClaimEdge {
      constructor(
      /** The ID for the parent claim this edge points to */
      parentId,
      /** The ID for the child claim this edge points from */
      childId,
      /** How the child affects the parent score */
      affects = 'confidence',
      /** Is the child claim a pro of it's parent (false if it is a con) */
      pro = true, id = newId(), priority = "") {
        this.parentId = parentId;
        this.childId = childId;
        this.affects = affects;
        this.pro = pro;
        this.id = id;
        this.priority = priority;

        _defineProperty(this, "type", 'claimEdge');
      }

    }

    function claimEdges(state, action, reverse = false) {
      switch (action.type) {
        case "add_claimEdge":
        case "modify_claimEdge":
        case "sync_claimEdge":
          {
            let newItem = state.items[action.dataId];

            if (!newItem) {
              newItem = new ClaimEdge("", "");
              newItem.id = action.dataId;
            }

            newItem = _objectSpread2(_objectSpread2({}, newItem), action.newData);
            state = _objectSpread2(_objectSpread2({}, state), {}, {
              items: _objectSpread2(_objectSpread2({}, state.items), {}, {
                [action.dataId]: newItem
              })
            });
            state = IndexReducer(state, "claimEdgeIdsByChildId", newItem.childId, action.dataId);
            state = IndexReducer(state, "claimEdgeIdsByParentId", newItem.parentId, action.dataId);
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
            let newItem = state.items[action.dataId];

            if (!newItem) {
              newItem = new Score("", "");
              newItem.id = action.dataId;
            }

            newItem = _objectSpread2(_objectSpread2({}, newItem), action.newData);
            state = _objectSpread2(_objectSpread2({}, state), {}, {
              items: _objectSpread2(_objectSpread2({}, state.items), {}, {
                [action.dataId]: newItem
              })
            }); //TODO: Do I need to stop recreating the state so many times in this reducer?

            state = IndexReducer(state, "childIdsByScoreId", newItem.parentScoreId, action.dataId);
            state = IndexReducer(state, "scoreIdsBySourceId", newItem.sourceClaimId, action.dataId);
            state = IndexReducer(state, "scoreIdsBySourceId", newItem.sourceEdgeId, action.dataId);
            return state;
          }

        default:
          return state;
      }
    }

    /**
     * Represents an intentional top of a tree of scores.
     */
    class ScoreTree {
      constructor(
      /** The claim to which this score belongs */
      sourceClaimId,
      /** The top of the tree of scores that this belongs to. Used for indexing */
      topScoreId,
      /** how confident we sould be in the claim. (AKA True) */
      confidence = 1, id = newId(), descendantCount = 0) {
        this.sourceClaimId = sourceClaimId;
        this.topScoreId = topScoreId;
        this.confidence = confidence;
        this.id = id;
        this.descendantCount = descendantCount;

        _defineProperty(this, "type", 'scoreTree');
      }

    }

    function scoreTrees(state, action, reverse = false) {
      switch (action.type) {
        case "add_scoreTree":
        case "modify_scoreTree":
          {
            let newItem = state.items[action.dataId];

            if (!newItem) {
              newItem = new ScoreTree("", "");
              newItem.id = action.dataId;
            }

            newItem = _objectSpread2(_objectSpread2({}, newItem), action.newData);
            state = _objectSpread2(_objectSpread2({}, state), {}, {
              items: _objectSpread2(_objectSpread2({}, state.items), {}, {
                [action.dataId]: newItem
              })
            }); //TODO: Do I need to stop recreating the state so many times in this reducer?

            state = IndexReducer(state, "ScoreTreeIds", newItem.id, action.dataId);
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
        this.rsData.actionsLog.push({
          actions: actions
        }); //TODO: put logs back in

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
          claimEdge = _objectSpread2(_objectSpread2({}, claimEdge), action.newData);

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
          const missingScoreActions = [];
          let mainScore = await repository.getScore(scoreTree.topScoreId);

          if (!mainScore) {
            mainScore = new Score(scoreTree.sourceClaimId, scoreTree.id);
            mainScore.id = scoreTree.topScoreId;
            missingScoreActions.push(new Action(mainScore, undefined, "add_score"));
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
          }

          scoreActions.push(...missingScoreActions, ...scoreTreeActions, ...fractionActions, ...generationActions);

          if (scoreTree.descendantCount != newMainScore.descendantCount) {
            let newScoreTreePartial = {
              descendantCount: newMainScore.descendantCount
            };
            let oldScoreTreePartial = {
              descendantCount: scoreTree.descendantCount
            };
            scoreActions.push(new Action(newScoreTreePartial, oldScoreTreePartial, "modify_scoreTree", scoreTree.id));
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
          score = new Score(edge.childId, scoreTreeId, currentScoreId, edge.id, undefined, edge.pro, edge.affects, u, u, u, edge.priority);
          actions.push(new Action(score, undefined, "add_score", score.id));
        } //Recurse and through children


        await createBlankMissingScores(repository, score.id, edge.childId, actions, scoreTreeId);
      }
    } //This function assume that all scores already exist


    async function calculateScoreDescendants(repository, currentScore, calculator = calculateScore, actions) {
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

        if (oldChildScore && hasItemChanged(oldChildScore, newChildScore)) {
          actions.push(new Action(newChildScore, undefined, "modify_score"));
        }
      } //TODO: Modify the newScore based on any formulas


      const newScore = _objectSpread2(_objectSpread2(_objectSpread2({}, currentScore), newScoreFragment), {}, {
        descendantCount: newDescendantCount
      });

      if (hasItemChanged(currentScore, newScore)) {
        actions.push(new Action(newScore, undefined, "modify_score"));
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
          const newChildScore = _objectSpread2(_objectSpread2({}, oldChildScore), {}, {
            fractionSimple: oldChildScore.relevance / totalRelevance * parentScore.fractionSimple,
            fraction: parentScore.fraction * oldChildScore.percentOfWeight // parentFractionSimple: parentScore.fractionSimple,

          });

          if (newChildScore.fractionSimple != oldChildScore.fractionSimple || newChildScore.fraction != oldChildScore.fraction) {
            actions.push(new Action(newChildScore, undefined, "modify_score"));
          }

          await calculateFractions(repository, newChildScore, actions);
        }
      }
    } // TODO: factor out duplicate code of these calculate functions. maybe mae an array of items to process...


    async function calculateGenerations(repository, parentScoreId, actions, generation) {
      const oldChildScores = await repository.getChildrenByScoreId(parentScoreId);
      generation++;

      for (const oldChildScore of oldChildScores) {
        if (oldChildScore.generation != generation) {
          const newChildScore = _objectSpread2(_objectSpread2({}, oldChildScore), {}, {
            generation: generation
          });

          actions.push(new Action(newChildScore, undefined, "modify_score"));
        }

        await calculateGenerations(repository, oldChildScore.id, actions, generation);
      }
    }

    function deepClone(item) {
      return JSON.parse(JSON.stringify(item));
    }

    function selectNode(selectedId, rsData) {
      var _rsData$items$selecte;

      const result = [];
      result.push({
        itemId: selectedId,
        status: "selected"
      }); // Walk up the tree and get ancestors
      let parentScoreId = (_rsData$items$selecte = rsData.items[selectedId]) === null || _rsData$items$selecte === void 0 ? void 0 : _rsData$items$selecte.parentScoreId;

      while (parentScoreId != undefined) {
        result.push({
          itemId: parentScoreId,
          status: "ancestor"
        });
        parentScoreId = rsData.items[parentScoreId].parentScoreId;
      } //get the children


      const children = rsData.childIdsByScoreId[selectedId];

      if (children) {
        for (const childId of rsData.childIdsByScoreId[selectedId]) {
          result.push({
            itemId: childId,
            status: "child"
          });
        }
      }

      return result;
    }

    exports.Action = Action;
    exports.Claim = Claim;
    exports.ClaimEdge = ClaimEdge;
    exports.Messenger = Messenger;
    exports.RepositoryLocalPure = RepositoryLocalPure;
    exports.RsData = RsData;
    exports.Score = Score;
    exports.ScoreTree = ScoreTree;
    exports.calculateScore = calculateScore;
    exports.calculateScoreActions = calculateScoreActions;
    exports.deepClone = deepClone;
    exports.newId = newId;
    exports.selectNode = selectNode;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
