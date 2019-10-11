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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
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
  var scopeId = arguments.length > 4 ? arguments[4] : undefined;
  var version = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : newId();
  var start = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Date().toISOString();
  var end = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : End;

  _classCallCheck(this, Score);

  this.confidence = confidence;
  this.relevance = relevance;
  this.id = id;
  this.sourceClaimId = sourceClaimId;
  this.scopeId = scopeId;
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
 * This function does not take into account scopes.
 * The caller of this fuction should only put the children and scores into this array that are within scope.
 */
function calculateScore() {
  var scoreAndClaimEdges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var reversable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var sourceClaimId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ID("");
  var newScore = new Score(); // newScore.affects = affects;
  // newScore.reversable = reversable

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

  scoreAndClaimEdges.forEach(function (scoreAndClaimEdge) {
    // Loop through the child scores and determine the score of the parent.
    if (scoreAndClaimEdge.claimEdge.affects === Affects.Confidence) {
      // Process edges that affect confidence
      if (scoreAndClaimEdge.claimEdge.pro) {
        childrenConfidence += scoreAndClaimEdge.score.confidence * scoreAndClaimEdge.score.relevance; // Add up all the strength of the children

        childrenRelevance += scoreAndClaimEdge.score.relevance; //Add up the relevance separately so we can do a weighted agerage later
      } else {
        childrenConfidence -= scoreAndClaimEdge.score.confidence * scoreAndClaimEdge.score.relevance;
        childrenRelevance += scoreAndClaimEdge.score.relevance;
      }
    }

    if (scoreAndClaimEdge.claimEdge.affects === 'relevance') {
      // Process Relevance child claims
      if (scoreAndClaimEdge.claimEdge.pro) {
        newScore.relevance += scoreAndClaimEdge.score.confidence; // Add up all the strength of the children
      } else {
        newScore.relevance -= scoreAndClaimEdge.score.confidence;
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

var End$1 = "3000-01-01T00:00:00.000Z";

//Store the string for the ID
var Indexes = function Indexes() {
  _classCallCheck(this, Indexes);

  _defineProperty(this, "scoreByClaimIdAndScope", {});

  _defineProperty(this, "scoresByClaimId", {});

  _defineProperty(this, "claimEdgesByParentId", {});
};
var Repository =
/*#__PURE__*/
function () {
  function Repository() {
    _classCallCheck(this, Repository);

    _defineProperty(this, "items", {});

    _defineProperty(this, "indexes", new Indexes());

    _defineProperty(this, "log", []);
  }

  _createClass(Repository, [{
    key: "notify",

    /** this function can be called by outside code to notfy this repository of changes */
    value: function notify(changes) {
      this.log.push(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;

          var _idString = change.newItem.id.toString(); //Change the end date on the previous version of this item to now


          var oldItems = this.items[_idString];

          if (oldItems && oldItems.length > 0) {
            oldItems[0].end = new Date().toISOString();
          } else {
            this.items[_idString] = [];
          }

          this.items[_idString].unshift(change.newItem);

          if (change.newItem.type == Type.score) {
            this.indexScore(change.newItem);
          }

          if (change.newItem.type == Type.claimEdge) {
            this.indexClaimEdgeByParentId(change.newItem);
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
    key: "indexScore",
    value: function indexScore(score) {
      //scoreByClaimIdAndScope
      if (score.scopeId) {
        this.indexes.scoreByClaimIdAndScope[score.sourceClaimId.toString() + "-" + score.scopeId.toString()] = score.id.toString();
      } //scoreByClaimId


      var destination = this.indexes.scoresByClaimId[score.sourceClaimId.toString()];

      if (!destination) {
        destination = [];
        this.indexes.scoresByClaimId[score.sourceClaimId.toString()] = destination;
      }

      if (!destination.includes(score.id.toString())) {
        destination.push(score.id.toString());
      }
    }
  }, {
    key: "indexClaimEdgeByParentId",
    value: function indexClaimEdgeByParentId(claimEdge) {
      var destination = this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()];

      if (!destination) {
        destination = [];
        this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
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
          result.push(this.items[itemId][0]);
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
    } // getClaimEdge(id: Id, when: string = End): ClaimEdge {
    //     // let tempClaimEdge = this.rsData.claimEdges.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaimEdge ? tempClaimEdge : new ClaimEdge();
    //     return new ClaimEdge();
    // }

  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      return this.getItemsForArray(this.indexes.claimEdgesByParentId[parentId.toString()]);
    } // getScore(id: Id, when: string = End): Score {
    //     // let tempScore = this.rsData.scores.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempScore ? tempScore : new Score();
    //     return new Score();
    // }

  }, {
    key: "getScoresByClaimId",
    value: function getScoresByClaimId(claimId) {
      var scores = this.indexes.scoresByClaimId[claimId.toString()];

      if (scores) {
        return this.getItemsForArray(scores);
      } else {
        return [];
      }
    }
    /** Will create a new score if it does not already exist */

  }, {
    key: "getScoreByClaimIdAndScope",
    value: function getScoreByClaimIdAndScope(claimId, scopeId) {
      var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : End$1;
      var scores = this.getScoresByClaimId(claimId, when);
      var score = scores.find(function (s) {
        return s.scopeId == scopeId;
      });

      if (score) {
        return score;
      } else {
        return new Score();
      }
    } // getClaim(id: Id, when: string = End): Claim {
    //     // let tempClaim = this.rsData.claims.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaim ? tempClaim : new Claim();
    //     return new Claim();
    // }

  }]);

  return Repository;
}();

var Messenger =
/*#__PURE__*/
function () {
  function Messenger() {
    _classCallCheck(this, Messenger);

    _defineProperty(this, "subscribers", []);

    _defineProperty(this, "log", []);
  }

  _createClass(Messenger, [{
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
    /** this function can be called by outside code to notfy this repository of changes */

  }, {
    key: "notify",
    value: function notify(changes) {
      this.log.push(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    }
  }]);

  return Messenger;
}();

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

//  | undefined }
//  | undefined }
function FindScopes(scoreAndClaimEdges) {
  var scoreAndClaimEdgesByScoreScopeIds = {};
  scoreAndClaimEdges.forEach(function (claimEdgeScore) {
    var score = claimEdgeScore.score;
    var idString;

    if (score.scopeId != undefined && score.scopeId != score.sourceClaimId //If the scope ID is the same then that score ID it should not propogate up the hierarchy any further.
    ) {
        idString = score.scopeId.toString();
      } else {
      //idString = claimEdgeScore.claimEdge.parentId.toString();
      idString = claimEdgeScore.claimEdge.scopeId.toString();
    }

    if (scoreAndClaimEdgesByScoreScopeIds[idString] === undefined) {
      scoreAndClaimEdgesByScoreScopeIds[idString] = [];
    }
  });
  return scoreAndClaimEdgesByScoreScopeIds;
}

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

          if (change.newItem.type == Type.claimEdge) {
            this.calculateFromClaimEdge(change.newItem);
          }

          if (change.newItem.type == Type.claim) {
            var claim = change.newItem;
            this.repo.notify([new Change(new Score(undefined, undefined, undefined, claim.id, claim.id))]);
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
          scoreAndClaimEdges.push(new ScoreAndClaimEdge(score, claimEdge));
        });
      });
      var scoreAndClaimEdgesByScoreScopeIds = FindScopes(scoreAndClaimEdges); //Check each Scope and ClaimEdge and create any missing scores

      Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            scopeIdString = _ref2[0];

        claimEdges.forEach(function (claimEdge) {
          if (scoreAndClaimEdgesByScoreScopeIds[scopeIdString].find(function (sce) {
            return sce.claimEdge == claimEdge;
          }) == undefined) {
            //Look for already existing scores
            var foundScore = _this.repo.getScoreByClaimIdAndScope(claimEdge.childId, ID(scopeIdString));

            scoreAndClaimEdgesByScoreScopeIds[scopeIdString].push(new ScoreAndClaimEdge(foundScore, claimEdge));
          }
        });
      }); //For each scope, loop through and create a score

      Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            scopeIdString = _ref4[0],
            scoreAndClaimEdges = _ref4[1];

        var newScore = calculateScore(scoreAndClaimEdges);
        newScore.scopeId = ID(scopeIdString);
        newScore.sourceClaimId = scoreAndClaimEdges[0].claimEdge.parentId; //ToDo: Is there a better way to get this?

        var oldScore = _this.repo.getScoreByClaimIdAndScope(newScore.sourceClaimId, newScore.scopeId);

        if (oldScore) {
          newScore.id = oldScore.id;
        }

        _this.repo.notify([new Change(newScore)]);
      }); //If there are no edges below it then create a base score

      if (claimEdges.length === 0) {
        this.repo.notify([new Change(new Score(undefined, undefined, undefined, sourceClaimEdge.parentId, sourceClaimEdge.scopeId))]);
      }
    }
  }]);

  return CalculationLooper;
}();

var Claim = function Claim() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : newId();
  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : newId();
  var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date().toISOString();
  var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : End;
  var reversable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  _classCallCheck(this, Claim);

  this.content = content;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;
  this.reversable = reversable;

  _defineProperty(this, "type", Type.claim);
};

/**
 * Stores the relationship between two claims in a specific scope.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */

var ClaimEdge = function ClaimEdge() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ID("");
  var childId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ID("");
  var scopeId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ID("");
  var affects = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Affects.Confidence;
  var pro = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : newId();
  var version = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : newId();
  var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Date().toISOString();
  var end = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : End;

  _classCallCheck(this, ClaimEdge);

  this.parentId = parentId;
  this.childId = childId;
  this.scopeId = scopeId;
  this.affects = affects;
  this.pro = pro;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;

  _defineProperty(this, "type", Type.claimEdge);
};
/** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
//public reversable: boolean = false,

export { Affects, CalculationLooper, Change, Claim, ClaimEdge, ID, Indexes, Messenger, Repository, Score, ScoreAndClaimEdge, Type, calculateScore };
