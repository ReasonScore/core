var reasonscore_core = (function (exports) {
    'use strict';

    /**
     * Calculates a new score based on the child scores passed in.
     */
    function calculateScore({
      childScores = [],
      reversible = true
    } = {}) {
      const newScore = {};
      let childrenConfidence = 0;
      let childrenRelevance = 0;

      if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
      }

      childScores.forEach(score => {
        // Loop through the child scores and determine the score of the parent.
        if (score.affects === 'confidence') {
          //calculate the reduction of the relevance bease on the distance of the confidence from zero
          //TODO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
          //Like "This claim should require supporting evidence"
          let confidenceRelevanceAdjustment = 1;
          confidenceRelevanceAdjustment = Math.abs(score.confidence); // Process edges that affect confidence

          if (score.pro) {
            childrenConfidence += score.confidence * score.relevance * confidenceRelevanceAdjustment; // Add up all the strength of the children

            childrenRelevance += score.relevance * confidenceRelevanceAdjustment; //Add up the relevance separately so we can do a weighted agerage later
          } else {
            childrenConfidence -= score.confidence * score.relevance * confidenceRelevanceAdjustment;
            childrenRelevance += score.relevance * confidenceRelevanceAdjustment;
          }
        }

        if (score.affects === 'relevance') {
          // Process Relevance child claims
          if (score.pro) {
            score.relevance += score.confidence; // Add up all the strength of the children
          } else {
            score.relevance -= score.confidence;
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

      if (!reversible && newScore.confidence < 0) {
        // If it is not reversible then do not let it go negative
        newScore.confidence = 0;
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

    class Messenger {
      constructor() {
        _defineProperty(this, "subscribers", []);

        _defineProperty(this, "log", []);

        _defineProperty(this, "notify", changes => {
          this.log.push(changes);

          for (const subscriber of this.subscribers) {
            subscriber(changes);
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

    class Action {
      constructor(newData, oldData, type, dataId) {
        this.newData = newData;
        this.oldData = oldData;
        this.type = type;
        this.dataId = dataId;
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

    //Store the string for the ID
    //Store the string for the ID
    class RsData {
      constructor(actionsLog = [], claims = {}, claimEdges = {}, claimEdgeIdsByParentId = {}, claimEdgeIdsByChildId = {}, scores = {}, scoreIdsByClaimId = {}, childIdsByScoreId = {}) {
        this.actionsLog = actionsLog;
        this.claims = claims;
        this.claimEdges = claimEdges;
        this.claimEdgeIdsByParentId = claimEdgeIdsByParentId;
        this.claimEdgeIdsByChildId = claimEdgeIdsByChildId;
        this.scores = scores;
        this.scoreIdsByClaimId = scoreIdsByClaimId;
        this.childIdsByScoreId = childIdsByScoreId;
      }

    }

    /**
     * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
     */
    class Score {
      constructor(sourceClaimId = "", parentScoreId = undefined, reversible = false, pro = true, affects = "confidence", confidence = 1, relevance = 1, id = newId()) {
        this.sourceClaimId = sourceClaimId;
        this.parentScoreId = parentScoreId;
        this.reversible = reversible;
        this.pro = pro;
        this.affects = affects;
        this.confidence = confidence;
        this.relevance = relevance;
        this.id = id;
      }

    }
    /** Compare two scores to see if they are different in what the score is.
     *  Just compares confidence and relavance
     */

    function differentScores(scoreA, scoreB) {
      return !(scoreA.confidence == scoreB.confidence && scoreA.relevance == scoreB.relevance && scoreA.pro == scoreB.pro);
    }

    exports.Action = Action;
    exports.Claim = Claim;
    exports.ClaimEdge = ClaimEdge;
    exports.Messenger = Messenger;
    exports.RsData = RsData;
    exports.Score = Score;
    exports.calculateScore = calculateScore;
    exports.differentScores = differentScores;
    exports.newId = newId;

    return exports;

}({}));
