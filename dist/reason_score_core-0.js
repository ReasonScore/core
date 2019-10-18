var reason_score_core = (function (exports) {
    'use strict';

    /**
     * How a child claim affects a parent claim
     */
    var Affects;

    (function (Affects) {
      Affects["Confidence"] = "confidence";
      Affects["Relevance"] = "relevance";
    })(Affects || (Affects = {}));

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
     * Different types of items/ data that can be a target of an edge
     * Can we supported or discupte by claims
     */
    var Type;

    (function (Type) {
      Type["claim"] = "claim";
      Type["claimEdge"] = "claimEdge";
      Type["score"] = "score";
      Type["view"] = "view";
      Type["viewEdge"] = "viewEdge";
    })(Type || (Type = {}));

    function newId() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
      // take the UTC date and convert to base 62
      var decimal = 5000000000000 - when.getTime();
      var s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      var result = '';

      while (decimal >= 1) {
        result = s[decimal - 62 * Math.floor(decimal / 62)] + result;
        decimal = Math.floor(decimal / 62);
      } // Add 5 extra random characters in case multiple ids are creates at the same time


      result += Array(5).join().split(',').map(function () {
        return s[Math.floor(Math.random() * s.length)];
      }).join('');
      return result;
    }

    var End = "3000-01-01T00:00:00.000Z";

    /**
     * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
     * Usually within the context of a view of the claim or another claim
     */
    var Score = function Score() {
      var confidence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var relevance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : newId();
      var sourceClaimId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : newId();
      var version = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : newId();
      var start = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Date().toISOString();
      var end = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : End;

      _classCallCheck(this, Score);

      this.confidence = confidence;
      this.relevance = relevance;
      this.id = id;
      this.sourceClaimId = sourceClaimId;
      this.version = version;
      this.start = start;
      this.end = end;

      _defineProperty(this, "type", Type.score);
    };

    /**
     * How a child claim affects a parent claim
     */
    function ID(n) {
      return n;
    }

    /**
     * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
     */
    function calculateScore() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$scoreAndClaimEdg = _ref.scoreAndClaimEdges,
          scoreAndClaimEdges = _ref$scoreAndClaimEdg === void 0 ? [] : _ref$scoreAndClaimEdg,
          _ref$reversable = _ref.reversable,
          reversable = _ref$reversable === void 0 ? true : _ref$reversable,
          _ref$sourceClaimId = _ref.sourceClaimId,
          sourceClaimId = _ref$sourceClaimId === void 0 ? ID("") : _ref$sourceClaimId;

      var newScore = new Score();
      var childrenConfidence = 0;
      var childrenRelevance = 0;

      if (scoreAndClaimEdges.filter(function (c) {
        return c.claimEdge.affects === Affects.Confidence;
      }).length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
      }

      scoreAndClaimEdges.forEach(function (_ref2) {
        var score = _ref2.score,
            claimEdge = _ref2.claimEdge;

        // Loop through the child scores and determine the score of the parent.
        if (claimEdge.affects === Affects.Confidence) {
          // Process edges that affect confidence
          if (claimEdge.pro) {
            childrenConfidence += score.confidence * score.relevance; // Add up all the strength of the children

            childrenRelevance += score.relevance; //Add up the relevance separately so we can do a weighted agerage later
          } else {
            childrenConfidence -= score.confidence * score.relevance;
            childrenRelevance += score.relevance;
          }
        }

        if (claimEdge.affects === 'relevance') {
          // Process Relevance child claims
          if (claimEdge.pro) {
            newScore.relevance += score.confidence; // Add up all the strength of the children
          } else {
            newScore.relevance -= score.confidence;
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

      if (!reversable && newScore.confidence < 0) {
        // If it is not reversable then do not let it go negative
        newScore.confidence = 0;
      }

      if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
      }

      if (sourceClaimId !== undefined) {
        newScore.sourceClaimId = sourceClaimId;
      }

      return newScore;
    }

    exports.calculateScore = calculateScore;

    return exports;

}({}));
