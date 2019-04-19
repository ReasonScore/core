var reason_score_core = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * How a child claim affects a parent claim
   */
  var Affects;

  (function (Affects) {
    Affects["Confidence"] = "confidence";
    Affects["Relevance"] = "relevance";
  })(Affects || (Affects = {}));

  /**
   * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
   * Usually within the context of a view of the claim or another claim
   */

  var Score = function Score() {
    var affects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Affects.Confidence;
    var reversable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var score = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var relevance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Score);

    this.affects = affects;
    this.reversable = reversable;
    this.score = score;
    this.relevance = relevance;
  };

  /**
   * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the children and scores into this array that are within scope.
   * @param childEdges - an array of edges (aka arguments) that link an individual child to the claim this score is for. 
   * @param childScores - an array of scores for child claims linked to the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the scores into this array that are within scope.
   * @param previousScore - The previous score for this claim which may be replaced by this new score (if there are different)
   */

  function calculateScore() {
    var childScores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var pro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var affects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Affects.Confidence;
    var reversable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var newScore = new Score(affects, reversable);
    var childrenConfidence = 0;
    var childrenRelevance = 0; //debugger;

    if (childScores.filter(function (cs) {
      return cs.affects === Affects.Confidence;
    }).length < 1) {
      // If there are no children that affect the confidence of the claim
      // then assume the claim is 100% confident and start strength and weight at 1
      childrenConfidence = 1;
      childrenRelevance = 1;
    }

    childScores.forEach(function (childScore) {
      // Loop through the child scores and determine the score of the parent.
      if (childScore.affects === Affects.Confidence) {
        // Process edges that affect confidence
        childrenConfidence += childScore.score * childScore.relevance; // Add up all the strength of the children

        childrenRelevance += childScore.relevance;
      }

      if (childScore.affects === 'relevance') {
        // Process Relevance child claims
        newScore.relevance += childScore.score; // Add up all the strength of the children
      }
    });

    if (childrenRelevance === 0) {
      // Protect against division by zero
      newScore.score = 0;
    } else {
      //Calculate the score
      newScore.score = childrenConfidence / childrenRelevance;
    }

    if (!reversable && newScore.score < 0) {
      // If it is not reversable then do not let it go negative
      newScore.score = 0;
    }

    if (!pro) {
      // Reverse the score if it is a con
      newScore.score = -newScore.score;
    }

    if (Object.is(newScore.score, -0)) {
      // Protect against negative zero 
      newScore.score = 0;
    }

    return newScore;
  }

  exports.calculateScore = calculateScore;

  return exports;

}({}));
