var reasonscore_core = (function (exports) {
    'use strict';

    /**
     * How a child claim affects a parent claim
     */

    (function (Affects) {
      Affects["Confidence"] = "confidence";
      Affects["Relevance"] = "relevance";
    })(exports.Affects || (exports.Affects = {}));

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

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

    (function (Type) {
      Type["claim"] = "claim";
      Type["claimEdge"] = "claimEdge";
      Type["score"] = "score";
      Type["view"] = "view";
      Type["viewEdge"] = "viewEdge";
    })(exports.Type || (exports.Type = {}));

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

      _defineProperty(this, "type", exports.Type.score);
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
        return c.claimEdge.affects === exports.Affects.Confidence;
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
        if (claimEdge.affects === exports.Affects.Confidence) {
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

    var Change = function Change(newItem, oldItemVersion) {
      _classCallCheck(this, Change);

      this.newItem = newItem;
      this.oldItemVersion = oldItemVersion;
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
        var subscriber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, CalculationInitator);

        this.repo = repo;
        this.subscriber = subscriber;
      }
      /** this function can be called by outside code to notfy this repository of changes */


      _createClass(CalculationInitator, [{
        key: "notify",
        value: function () {
          var _notify = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(changes) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.repo.notify(changes);

                  case 2:
                    if (this.subscriber) {
                      this.subscriber(changes);
                    }

                    _context.next = 5;
                    return this.CalculationInitiator(changes);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function notify(_x) {
            return _notify.apply(this, arguments);
          }

          return notify;
        }()
      }, {
        key: "CalculationInitiator",
        value: function () {
          var _CalculationInitiator = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(changes) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, change, newItem, oldItemVersion, claimEdge, claim, score, claimseEdges, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _claimEdge;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 3;
                    _iterator = changes[Symbol.iterator]();

                  case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context2.next = 51;
                      break;
                    }

                    change = _step.value;
                    newItem = change.newItem, oldItemVersion = change.oldItemVersion; // Initiate calculations from a changed/new claim Edge

                    if (!(newItem.type == exports.Type.claimEdge)) {
                      _context2.next = 12;
                      break;
                    }

                    claimEdge = newItem;
                    _context2.next = 12;
                    return this.CalculateByClaimId(claimEdge.parentId);

                  case 12:
                    if (!(newItem.type == exports.Type.claim)) {
                      _context2.next = 16;
                      break;
                    }

                    claim = newItem;
                    _context2.next = 16;
                    return this.CalculateByClaimId(claim.id);

                  case 16:
                    if (!(newItem.type == exports.Type.score)) {
                      _context2.next = 48;
                      break;
                    }

                    score = newItem; // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them

                    _context2.next = 20;
                    return this.repo.getClaimEdgesByChildId(score.sourceClaimId);

                  case 20:
                    claimseEdges = _context2.sent;

                    if (!(score.sourceClaimId.toString() == "measuredClaim")) {
                      _context2.next = 48;
                      break;
                    }

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 25;
                    _iterator2 = claimseEdges[Symbol.iterator]();

                  case 27:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context2.next = 34;
                      break;
                    }

                    _claimEdge = _step2.value;
                    _context2.next = 31;
                    return this.CalculateByClaimId(_claimEdge.parentId);

                  case 31:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 27;
                    break;

                  case 34:
                    _context2.next = 40;
                    break;

                  case 36:
                    _context2.prev = 36;
                    _context2.t0 = _context2["catch"](25);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t0;

                  case 40:
                    _context2.prev = 40;
                    _context2.prev = 41;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 43:
                    _context2.prev = 43;

                    if (!_didIteratorError2) {
                      _context2.next = 46;
                      break;
                    }

                    throw _iteratorError2;

                  case 46:
                    return _context2.finish(43);

                  case 47:
                    return _context2.finish(40);

                  case 48:
                    _iteratorNormalCompletion = true;
                    _context2.next = 5;
                    break;

                  case 51:
                    _context2.next = 57;
                    break;

                  case 53:
                    _context2.prev = 53;
                    _context2.t1 = _context2["catch"](3);
                    _didIteratorError = true;
                    _iteratorError = _context2.t1;

                  case 57:
                    _context2.prev = 57;
                    _context2.prev = 58;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 60:
                    _context2.prev = 60;

                    if (!_didIteratorError) {
                      _context2.next = 63;
                      break;
                    }

                    throw _iteratorError;

                  case 63:
                    return _context2.finish(60);

                  case 64:
                    return _context2.finish(57);

                  case 65:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[3, 53, 57, 65], [25, 36, 40, 48], [41,, 43, 47], [58,, 60, 64]]);
          }));

          function CalculationInitiator(_x2) {
            return _CalculationInitiator.apply(this, arguments);
          }

          return CalculationInitiator;
        }()
      }, {
        key: "CalculateByClaimId",
        value: function () {
          var _CalculateByClaimId = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(parentId) {
            var scoreAndClaimEdges, reversible, parentItem, parentClaim, claimseEdges, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, claimseEdge, scoreItem, newScore, oldScore;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    scoreAndClaimEdges = []; //Is parent reversible?

                    reversible = false;
                    _context3.next = 4;
                    return this.repo.getItem(parentId);

                  case 4:
                    parentItem = _context3.sent;

                    if (parentItem) {
                      parentClaim = parentItem;
                      reversible = parentClaim.reversible;
                    } //Get all the claims for the parent to calculate the score


                    _context3.next = 8;
                    return this.repo.getClaimEdgesByParentId(parentId);

                  case 8:
                    claimseEdges = _context3.sent;
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context3.prev = 12;
                    _iterator3 = claimseEdges[Symbol.iterator]();

                  case 14:
                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                      _context3.next = 27;
                      break;
                    }

                    claimseEdge = _step3.value;
                    _context3.next = 18;
                    return this.repo.getScoreBySourceClaimId(claimseEdge.childId);

                  case 18:
                    scoreItem = _context3.sent;

                    if (scoreItem) {
                      _context3.next = 23;
                      break;
                    }

                    _context3.next = 22;
                    return this.CalculateByClaimId(claimseEdge.childId);

                  case 22:
                    scoreItem = _context3.sent;

                  case 23:
                    scoreAndClaimEdges.push(new ScoreAndClaimEdge(scoreItem, claimseEdge));

                  case 24:
                    _iteratorNormalCompletion3 = true;
                    _context3.next = 14;
                    break;

                  case 27:
                    _context3.next = 33;
                    break;

                  case 29:
                    _context3.prev = 29;
                    _context3.t0 = _context3["catch"](12);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context3.t0;

                  case 33:
                    _context3.prev = 33;
                    _context3.prev = 34;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                      _iterator3["return"]();
                    }

                  case 36:
                    _context3.prev = 36;

                    if (!_didIteratorError3) {
                      _context3.next = 39;
                      break;
                    }

                    throw _iteratorError3;

                  case 39:
                    return _context3.finish(36);

                  case 40:
                    return _context3.finish(33);

                  case 41:
                    newScore = calculateScore({
                      scoreAndClaimEdges: scoreAndClaimEdges,
                      reversible: reversible,
                      sourceClaimId: parentId
                    });
                    _context3.next = 44;
                    return this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

                  case 44:
                    oldScore = _context3.sent;

                    if (!oldScore) {
                      _context3.next = 52;
                      break;
                    }

                    if (!differentScores(oldScore, newScore)) {
                      _context3.next = 50;
                      break;
                    }

                    newScore.id = oldScore.id;
                    _context3.next = 50;
                    return this.notify([new Change(newScore, oldScore.id)]);

                  case 50:
                    _context3.next = 54;
                    break;

                  case 52:
                    _context3.next = 54;
                    return this.notify([new Change(newScore)]);

                  case 54:
                    return _context3.abrupt("return", newScore);

                  case 55:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[12, 29, 33, 41], [34,, 36, 40]]);
          }));

          function CalculateByClaimId(_x3) {
            return _CalculateByClaimId.apply(this, arguments);
          }

          return CalculateByClaimId;
        }()
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
    //Store the string for the ID
    var VersionDate = function VersionDate(ItemIdString, start, end) {
      _classCallCheck(this, VersionDate);

      this.ItemIdString = ItemIdString;
      this.start = start;
      this.end = end;
    };
    var RsData = function RsData() {
      var versions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var scoreBySourceClaimId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var claimEdgesByParentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var claimEdgesByChildId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var versionIdByItemId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      _classCallCheck(this, RsData);

      this.versions = versions;
      this.scoreBySourceClaimId = scoreBySourceClaimId;
      this.claimEdgesByParentId = claimEdgesByParentId;
      this.claimEdgesByChildId = claimEdgesByChildId;
      this.versionIdByItemId = versionIdByItemId;
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
        value: function () {
          var _notify = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(changes) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, change, newItem, idString, currentWhen, oldItems, oldItem, score;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.log.unshift(changes);
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 4;

                    for (_iterator = changes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      change = _step.value;
                      newItem = change.newItem;
                      idString = newItem.id.toString();
                      currentWhen = new Date().toISOString(); //Change the end date on the previous version of this item to now

                      oldItems = this.rsData.versionIdByItemId[idString];

                      if (oldItems && oldItems.length > 0 && oldItems[0].end === End) {
                        oldItems[0].end = currentWhen;
                        oldItem = this.rsData.versions[oldItems[0].ItemIdString];

                        if (oldItem && oldItem.end === End) {
                          oldItem.end = oldItems[0].end;
                        }
                      } else {
                        this.rsData.versionIdByItemId[idString] = [];
                      } // add the new item to the list of items


                      this.rsData.versions[newItem.version.toString()] = newItem;
                      this.rsData.versionIdByItemId[idString].unshift(new VersionDate(newItem.version.toString(), newItem.start, newItem.end)); //Index Claim Edges

                      if (change.newItem.type == exports.Type.claimEdge) {
                        this.indexClaimEdgeByParentId(change.newItem);
                        this.indexClaimEdgeByChildId(change.newItem);
                      } //Index score by source Id


                      if (newItem.type == exports.Type.score) {
                        score = newItem;
                        this.rsData.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
                      }
                    }

                    _context.next = 12;
                    break;

                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 12:
                    _context.prev = 12;
                    _context.prev = 13;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 15:
                    _context.prev = 15;

                    if (!_didIteratorError) {
                      _context.next = 18;
                      break;
                    }

                    throw _iteratorError;

                  case 18:
                    return _context.finish(15);

                  case 19:
                    return _context.finish(12);

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[4, 8, 12, 20], [13,, 15, 19]]);
          }));

          function notify(_x) {
            return _notify.apply(this, arguments);
          }

          return notify;
        }()
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
        value: function () {
          var _getItemsForArray = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(itemIds) {
            var result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, itemId, item;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    result = [];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 4;
                    _iterator2 = itemIds[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context2.next = 15;
                      break;
                    }

                    itemId = _step2.value;
                    _context2.next = 10;
                    return this.getItem(ID(itemId));

                  case 10:
                    item = _context2.sent;

                    if (item) {
                      result.push(item);
                    }

                  case 12:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 6;
                    break;

                  case 15:
                    _context2.next = 21;
                    break;

                  case 17:
                    _context2.prev = 17;
                    _context2.t0 = _context2["catch"](4);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t0;

                  case 21:
                    _context2.prev = 21;
                    _context2.prev = 22;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 24:
                    _context2.prev = 24;

                    if (!_didIteratorError2) {
                      _context2.next = 27;
                      break;
                    }

                    throw _iteratorError2;

                  case 27:
                    return _context2.finish(24);

                  case 28:
                    return _context2.finish(21);

                  case 29:
                    return _context2.abrupt("return", result);

                  case 30:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[4, 17, 21, 29], [22,, 24, 28]]);
          }));

          function getItemsForArray(_x2) {
            return _getItemsForArray.apply(this, arguments);
          }

          return getItemsForArray;
        }()
      }, {
        key: "getItem",
        value: function () {
          var _getItem = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(ItemId) {
            var versionData,
                _VersionDate;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    versionData = this.rsData.versionIdByItemId[ItemId.toString()];

                    if (!versionData) {
                      _context3.next = 6;
                      break;
                    }

                    _VersionDate = this.rsData.versionIdByItemId[ItemId.toString()].find(function (e) {
                      return e.end >= End;
                    });

                    if (!_VersionDate) {
                      _context3.next = 6;
                      break;
                    }

                    return _context3.abrupt("return", this.rsData.versions[_VersionDate.ItemIdString]);

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function getItem(_x3) {
            return _getItem.apply(this, arguments);
          }

          return getItem;
        }()
      }, {
        key: "getClaimEdgesByParentId",
        value: function () {
          var _getClaimEdgesByParentId = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4(parentId) {
            var claimEdgeIds;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];

                    if (!claimEdgeIds) {
                      _context4.next = 8;
                      break;
                    }

                    _context4.next = 5;
                    return this.getItemsForArray(claimEdgeIds);

                  case 5:
                    return _context4.abrupt("return", _context4.sent);

                  case 8:
                    return _context4.abrupt("return", []);

                  case 9:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function getClaimEdgesByParentId(_x4) {
            return _getClaimEdgesByParentId.apply(this, arguments);
          }

          return getClaimEdgesByParentId;
        }()
      }, {
        key: "getClaimEdgesByChildId",
        value: function () {
          var _getClaimEdgesByChildId = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5(childId) {
            var claimEdgeIds;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];

                    if (!claimEdgeIds) {
                      _context5.next = 8;
                      break;
                    }

                    _context5.next = 5;
                    return this.getItemsForArray(claimEdgeIds);

                  case 5:
                    return _context5.abrupt("return", _context5.sent);

                  case 8:
                    return _context5.abrupt("return", []);

                  case 9:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function getClaimEdgesByChildId(_x5) {
            return _getClaimEdgesByChildId.apply(this, arguments);
          }

          return getClaimEdgesByChildId;
        }()
      }, {
        key: "getScoreBySourceClaimId",
        value: function () {
          var _getScoreBySourceClaimId = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee6(sourceClaimId) {
            var scoreIdString,
                score;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];

                    if (!scoreIdString) {
                      _context6.next = 8;
                      break;
                    }

                    _context6.next = 5;
                    return this.getItem(ID(scoreIdString));

                  case 5:
                    score = _context6.sent;

                    if (!score) {
                      _context6.next = 8;
                      break;
                    }

                    return _context6.abrupt("return", score);

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function getScoreBySourceClaimId(_x6) {
            return _getScoreBySourceClaimId.apply(this, arguments);
          }

          return getScoreBySourceClaimId;
        }()
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

      _defineProperty(this, "type", exports.Type.claim);
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
      var affects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Affects.Confidence;
      var pro = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : newId();
      var priority = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
      var version = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : newId();
      var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Date().toISOString();
      var end = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : End;

      _classCallCheck(this, ClaimEdge);

      this.parentId = parentId;
      this.childId = childId;
      this.affects = affects;
      this.pro = pro;
      this.id = id;
      this.priority = priority;
      this.version = version;
      this.start = start;
      this.end = end;

      _defineProperty(this, "type", exports.Type.claimEdge);
    };
    /** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
    //public reversible: boolean = false,

    exports.CalculationInitator = CalculationInitator;
    exports.Change = Change;
    exports.Claim = Claim;
    exports.ClaimEdge = ClaimEdge;
    exports.ID = ID;
    exports.Messenger = Messenger;
    exports.Repository = Repository;
    exports.RsData = RsData;
    exports.Score = Score;
    exports.ScoreAndClaimEdge = ScoreAndClaimEdge;
    exports.VersionDate = VersionDate;
    exports.calculateScore = calculateScore;
    exports.differentScores = differentScores;
    exports.newId = newId;

    return exports;

}({}));
