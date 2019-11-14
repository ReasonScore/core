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

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */

function differentScores(scoreA, scoreB) {
  return !(scoreA.confidence == scoreB.confidence && scoreA.relevance == scoreB.relevance);
}

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
      _ref$reversible = _ref.reversible,
      reversible = _ref$reversible === void 0 ? true : _ref$reversible,
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
      //calculate the reduction of the relevance bease on the distance of the confidence from zero
      //ToDO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
      //Like "This claim should require supporting evidence"
      var confidenceRelevanceAdjustment = 1;
      confidenceRelevanceAdjustment = Math.abs(score.confidence); // Process edges that affect confidence

      if (claimEdge.pro) {
        childrenConfidence += score.confidence * score.relevance * confidenceRelevanceAdjustment; // Add up all the strength of the children

        childrenRelevance += score.relevance * confidenceRelevanceAdjustment; //Add up the relevance separately so we can do a weighted agerage later
      } else {
        childrenConfidence -= score.confidence * score.relevance * confidenceRelevanceAdjustment;
        childrenRelevance += score.relevance * confidenceRelevanceAdjustment;
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

  if (!reversible && newScore.confidence < 0) {
    // If it is not reversible then do not let it go negative
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

var Change = function Change(newItem, oldItem) {
  _classCallCheck(this, Change);

  this.newItem = newItem;
  this.oldItem = oldItem;
};

/**
 * Stores a score and it's edge in one inseparable unit to reduce future searching
 */
var ScoreAndClaimEdge = function ScoreAndClaimEdge(score, claimEdge) {
  _classCallCheck(this, ScoreAndClaimEdge);

  this.score = score;
  this.claimEdge = claimEdge;
};

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

          if (newItem.type == Type.claimEdge) {
            var claimEdge = newItem;
            this.CalculateByClaimId(claimEdge.parentId);
          } // Initiate calculations from a canged/new claim


          if (newItem.type == Type.claim) {
            var claim = newItem;
            this.CalculateByClaimId(claim.id);
          } // Initiate calculations from a canged/new score


          if (newItem.type == Type.score) {
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

      var scoreAndClaimEdges = []; //Is parent reversible?

      var reversible = false;
      var parentItem = this.repo.getItem(parentId);

      if (parentItem) {
        var parentClaim = parentItem;
        reversible = parentClaim.reversible;
      } //Get all the claims for the parent to calculate the score


      var claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
      claimseEdges.forEach(function (c) {
        scoreAndClaimEdges.push(new ScoreAndClaimEdge(_this3.repo.getScoreBySourceClaimId(c.childId), c));
      });
      var newScore = calculateScore({
        scoreAndClaimEdges: scoreAndClaimEdges,
        reversible: reversible,
        sourceClaimId: parentId
      });
      var oldScore = this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

      if (oldScore) {
        if (differentScores(oldScore, newScore)) {
          newScore.id = oldScore.id;
          this.notify([new Change(newScore, oldScore)]);
        }
      } else {
        this.notify([new Change(newScore)]);
      }
    }
  }]);

  return CalculationInitator;
}();

var Messenger =
/*#__PURE__*/
function () {
  function Messenger() {
    var _this = this;

    _classCallCheck(this, Messenger);

    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "log", []);

    _defineProperty(this, "notify", function (changes) {
      _this.log.push(changes);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscriber = _step.value;
          subscriber(changes);
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
    });
  }

  _createClass(Messenger, [{
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callback) {
      var index = this.subscribers.indexOf(callback, 0);

      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }]);

  return Messenger;
}();

//Store the string for the ID
//Store the string for the ID
var RsData = function RsData() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scoreBySourceClaimId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var claimEdgesByParentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var claimEdgesByChildId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, RsData);

  this.items = items;
  this.scoreBySourceClaimId = scoreBySourceClaimId;
  this.claimEdgesByParentId = claimEdgesByParentId;
  this.claimEdgesByChildId = claimEdgesByChildId;
};

var Repository =
/*#__PURE__*/
function () {
  function Repository() {
    _classCallCheck(this, Repository);

    _defineProperty(this, "rsData", new RsData());

    _defineProperty(this, "log", []);
  }

  _createClass(Repository, [{
    key: "notify",

    /** this function can be called by outside code to notfy this repository of changes */
    value: function notify(changes) {
      this.log.unshift(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;
          var newItem = change.newItem;
          var idString = newItem.id.toString(); //Change the end date on the previous version of this item to now

          var oldItems = this.rsData.items[idString];

          if (oldItems && oldItems.length > 0) {
            oldItems[0].end = new Date().toISOString();
          } else {
            this.rsData.items[idString] = [];
          } // add the new item to the list of items


          this.rsData.items[idString].unshift(change.newItem); //Index Claim Edges

          if (change.newItem.type == Type.claimEdge) {
            this.indexClaimEdgeByParentId(change.newItem);
            this.indexClaimEdgeByChildId(change.newItem);
          } //Index score by source Id


          if (newItem.type == Type.score) {
            var score = newItem;
            this.rsData.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
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
    key: "indexClaimEdgeByParentId",
    value: function indexClaimEdgeByParentId(claimEdge) {
      var destination = this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()];

      if (!destination) {
        destination = [];
        this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
      }

      if (!destination.includes(claimEdge.id.toString())) {
        destination.push(claimEdge.id.toString());
      }
    }
  }, {
    key: "indexClaimEdgeByChildId",
    value: function indexClaimEdgeByChildId(claimEdge) {
      var destination = this.rsData.claimEdgesByChildId[claimEdge.childId.toString()];

      if (!destination) {
        destination = [];
        this.rsData.claimEdgesByChildId[claimEdge.childId.toString()] = destination;
      }

      if (!destination.includes(claimEdge.id.toString())) {
        destination.push(claimEdge.id.toString());
      }
    }
  }, {
    key: "getItemsForArray",
    value: function getItemsForArray(itemIds) {
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = itemIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var itemId = _step2.value;
          result.push(this.rsData.items[itemId][0]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
  }, {
    key: "getItem",
    value: function getItem(ItemId) {
      return this.rsData.items[ItemId.toString()].find(function (e) {
        return e.end >= End;
      });
    }
  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      var claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];

      if (claimEdgeIds) {
        return this.getItemsForArray(claimEdgeIds);
      } else {
        return [];
      }
    }
  }, {
    key: "getClaimEdgesByChildId",
    value: function getClaimEdgesByChildId(childId) {
      var claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];

      if (claimEdgeIds) {
        return this.getItemsForArray(claimEdgeIds);
      } else {
        return [];
      }
    }
  }, {
    key: "getScoreBySourceClaimId",
    value: function getScoreBySourceClaimId(sourceClaimId) {
      var scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];

      if (scoreIdString) {
        var score = this.getItem(ID(scoreIdString));

        if (score) {
          return score;
        }
      } //If there is not an existing score then create it


      var newScore = new Score(undefined, undefined, undefined, sourceClaimId);
      this.notify([new Change(newScore)]);
      return newScore;
    }
  }]);

  return Repository;
}();

var Claim = function Claim() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : newId();
  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : newId();
  var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date().toISOString();
  var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : End;
  var reversible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  _classCallCheck(this, Claim);

  this.content = content;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;
  this.reversible = reversible;

  _defineProperty(this, "type", Type.claim);
};

/**
 * Stores the relationship between two claims.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */

var ClaimEdge = function ClaimEdge() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ID("");
  var childId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ID("");
  var affects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Affects.Confidence;
  var pro = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : newId();
  var version = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : newId();
  var start = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Date().toISOString();
  var end = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : End;

  _classCallCheck(this, ClaimEdge);

  this.parentId = parentId;
  this.childId = childId;
  this.affects = affects;
  this.pro = pro;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", Type.claimEdge);
};
/** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
//public reversible: boolean = false,

export { Affects, CalculationInitator, Change, Claim, ClaimEdge, ID, Messenger, Repository, RsData, Score, ScoreAndClaimEdge, Type, calculateScore, differentScores, newId };
