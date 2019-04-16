var reason_score_core = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  /**
   * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
   * Usually within the context of a view of the claim or another claim
   */
  var Score =
  /** How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score. */

  /** The total summed strength of all the children scores. */

  /** The total summed weight of all the children scores */

  /** The final score calculated for this claim in this scope. calculation: strengthTotal / weightTotal. This is usually set during the calculation of it's parent score. */

  /** The final weight of this claim on it's parent. Calculation: score * relvance. This is usually set during the calculation of it's parent score. */

  /** The final strength of this claim on it's parent. Calculation: childScore.weight * +/-childScore.score. This is usually set during the calculation of it's parent score. */

  /** The score displayed in a short text. rounded to whole % for confidence or a multiplier or division for relevance.*/
  function Score(claimId) {
    _classCallCheck(this, Score);

    this.claimId = claimId;

    _defineProperty(this, "relevance", 1);

    _defineProperty(this, "childrenStrength", 0);

    _defineProperty(this, "childrenWeight", 0);

    _defineProperty(this, "score", 1);

    _defineProperty(this, "weight", 1);

    _defineProperty(this, "strength", 1);

    _defineProperty(this, "displayText", "");
  };

  /**
   * How a child claim affects a parent claim
   */

  var Affects;

  (function (Affects) {
    Affects["Confidence"] = "confidence";
    Affects["Relevance"] = "relevance";
  })(Affects || (Affects = {}));

  /**
   * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the children and scores into this array that are within scope.
   * @param childEdges - an array of edges (aka arguments) that link an individual child to the claim this score is for. 
   * @param childScores - an array of scores for child claims linked to the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the scores into this array that are within scope.
   * @param previousScore - The previous score for this claim which may be replaced by this new score (if there are different)
   */

  function calculateScore(claimId) {
    var childEdges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var childScores = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var newScore = new Score(claimId); // ToDO: Removed the previous score. Comparisons and duplication of the previous score should be done in other places. This is so that the calcuations are as simple as possible. 
    //If there are no children that affect the truth of the claim then assume the claim is 100% true and start strength at 1

    if (childEdges === undefined || childEdges.length < 1 || childEdges.filter(function (e) {
      return e.affects === Affects.Confidence;
    }).length < 1) {
      newScore.childrenStrength = 1;
      newScore.childrenWeight = 1;
    } // Loop through the child edges and determine the score of the parent. Many of the child properties are also filled out during this calcuation
    // If there are no children that affect the confidence of the claim then assume the claim is 100% confident and start strength at 1. No code necessary as this is the default of the object


    childEdges.forEach(function (childEdge) {
      var childScore = childScores.filter(function (s) {
        return s.claimId === childEdge.childId;
      })[0]; // Process edges that affect confidence

      if (childEdge.affects === Affects.Confidence) {
        if (childEdge.reversable) {
          childScore.weight = childScore.score * childScore.relevance;
        } else {
          childScore.weight = Math.max(0, childScore.score) * childScore.relevance; // If the claim is not reversable and weight is below 0 then assume it is 0
        }

        newScore.childrenWeight += childScore.weight; // Add up all the weights of the children

        if (childEdge.pro) {
          childScore.strength = childScore.weight * childScore.score;
        } else {
          childScore.strength = childScore.weight * -childScore.score;
        }

        newScore.childrenStrength += childScore.strength; // Add up all the strength of the children

        childScore.displayText = "".concat(Math.round(childScore.weight * 100), "%"); // * (edge.pro ? 1 : -1)}%`;
      } // Process Relevance child claims


      if (childEdge.affects === 'relevance') {
        if (childEdge.pro) {
          childScore.relevance = 1 + childScore.score;
        } else {
          childScore.relevance = 1 - childScore.score / 2;
        }

        newScore.relevance *= childScore.relevance;
        childScore.displayText = "X".concat(childScore.relevance);
      }
    });

    if (newScore.childrenWeight === 0) {
      // Protect against division by zero
      newScore.score = 0;
    } else {
      newScore.score = newScore.childrenStrength / newScore.childrenWeight;
    }

    newScore.displayText = "".concat(Math.round(newScore.score * 100), "%");
    return newScore;
  }

  exports.calculateScore = calculateScore;

  return exports;

}({}));
