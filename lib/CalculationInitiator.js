"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculationInitator = void 0;

var _Change = require("./dataModels/Change");

var _Type = require("./dataModels/Type");

var _ScoreAndClaimEdge = require("./dataModels/ScoreAndClaimEdge");

var _calculateScore = require("./calculateScore");

var _Score = require("./dataModels/Score");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

                if (!(newItem.type == _Type.Type.claimEdge)) {
                  _context2.next = 12;
                  break;
                }

                claimEdge = newItem;
                _context2.next = 12;
                return this.CalculateByClaimId(claimEdge.parentId);

              case 12:
                if (!(newItem.type == _Type.Type.claim)) {
                  _context2.next = 16;
                  break;
                }

                claim = newItem;
                _context2.next = 16;
                return this.CalculateByClaimId(claim.id);

              case 16:
                if (!(newItem.type == _Type.Type.score)) {
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
                scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(scoreItem, claimseEdge));

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
                newScore = (0, _calculateScore.calculateScore)({
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

                if (!(0, _Score.differentScores)(oldScore, newScore)) {
                  _context3.next = 50;
                  break;
                }

                newScore.id = oldScore.id;
                _context3.next = 50;
                return this.notify([new _Change.Change(newScore, oldScore.id)]);

              case 50:
                _context3.next = 54;
                break;

              case 52:
                _context3.next = 54;
                return this.notify([new _Change.Change(newScore)]);

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

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbVZlcnNpb24iLCJ0eXBlIiwiVHlwZSIsImNsYWltRWRnZSIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInBhcmVudElkIiwiY2xhaW0iLCJpZCIsInNjb3JlIiwiZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZCIsInNvdXJjZUNsYWltSWQiLCJjbGFpbXNlRWRnZXMiLCJ0b1N0cmluZyIsInNjb3JlQW5kQ2xhaW1FZGdlcyIsInJldmVyc2libGUiLCJnZXRJdGVtIiwicGFyZW50SXRlbSIsInBhcmVudENsYWltIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjbGFpbXNlRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsInNjb3JlSXRlbSIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBS2FBLG1COzs7QUFFVCwrQkFDV0MsSUFEWCxFQUdFO0FBQUEsUUFEU0MsVUFDVCx1RUFEaUVDLFNBQ2pFOztBQUFBOztBQUFBLFNBRlNGLElBRVQsR0FGU0EsSUFFVDtBQUFBLFNBRFNDLFVBQ1QsR0FEU0EsVUFDVDtBQUNEO0FBRUQ7Ozs7Ozs7OytDQUNhRSxPOzs7Ozs7dUJBQ0gsS0FBS0gsSUFBTCxDQUFVSSxNQUFWLENBQWlCRCxPQUFqQixDOzs7QUFDTixvQkFBSSxLQUFLRixVQUFULEVBQXFCO0FBQ2pCLHVCQUFLQSxVQUFMLENBQWdCRSxPQUFoQjtBQUNIOzs7dUJBQ0ssS0FBS0Us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TCxDQUFZLENBQUMsSUFBSStCLGNBQUosQ0FBV0YsUUFBWCxDQUFELENBQVosQzs7O2tEQUdIQSxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBTY29yZUFuZENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSwgZGlmZmVyZW50U2NvcmVzIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uSW5pdGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZXBvOiBpUmVwb3NpdG9yeSxcclxuICAgICAgICBwdWJsaWMgc3Vic2NyaWJlcjogKChjaGFuZ2VzOiBDaGFuZ2VbXSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBhc3luYyBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlcG8ubm90aWZ5KGNoYW5nZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCB0aGlzLkNhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3SXRlbSwgb2xkSXRlbVZlcnNpb24gfSA9IGNoYW5nZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2hhbmdlZC9uZXcgY2xhaW0gRWRnZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2UgPSBuZXdJdGVtIGFzIENsYWltRWRnZTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2FuZ2VkL25ldyBjbGFpbVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltID0gPENsYWltPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYXRlIGNhbGN1bGF0aW9ucyBmcm9tIGEgY2FuZ2VkL25ldyBzY29yZVxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIHRoZSBjbGFpbUVkZ2VzIHRoYXQgaGF2ZSB0aGlzIHNjb3JlJ3MgU291cmNlQ2xhaW1JZCBhcyB0aGUgY2hpbGQgYW5kIHJlIGNhbGN1bGF0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSBhd2FpdCB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZChzY29yZS5zb3VyY2VDbGFpbUlkKTtcclxuICAgICAgICAgICAgICAgIGlmKHNjb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKSA9PSBcIm1lYXN1cmVkQ2xhaW1cIilcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2xhaW1FZGdlIG9mIGNsYWltc2VFZGdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgQ2FsY3VsYXRlQnlDbGFpbUlkKHBhcmVudElkOiBJZCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlQW5kQ2xhaW1FZGdlczogU2NvcmVBbmRDbGFpbUVkZ2VbXSA9IFtdO1xyXG4gICAgICAgIC8vSXMgcGFyZW50IHJldmVyc2libGU/XHJcbiAgICAgICAgbGV0IHJldmVyc2libGUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBwYXJlbnRJdGVtID0gYXdhaXQgdGhpcy5yZXBvLmdldEl0ZW0ocGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudENsYWltID0gPENsYWltPnBhcmVudEl0ZW07XHJcbiAgICAgICAgICAgIHJldmVyc2libGUgPSBwYXJlbnRDbGFpbS5yZXZlcnNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9HZXQgYWxsIHRoZSBjbGFpbXMgZm9yIHRoZSBwYXJlbnQgdG8gY2FsY3VsYXRlIHRoZSBzY29yZVxyXG4gICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IGF3YWl0IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBjbGFpbXNlRWRnZSBvZiBjbGFpbXNlRWRnZXMpIHtcclxuICAgICAgICAgICAgbGV0IHNjb3JlSXRlbSA9IGF3YWl0IHRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjbGFpbXNlRWRnZS5jaGlsZElkKVxyXG4gICAgICAgICAgICBpZiAoIXNjb3JlSXRlbSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZUl0ZW0gPSBhd2FpdCB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbXNlRWRnZS5jaGlsZElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZSg8U2NvcmU+c2NvcmVJdGVtLCBjbGFpbXNlRWRnZSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgcmV2ZXJzaWJsZTogcmV2ZXJzaWJsZSxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSBhd2FpdCB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlLmlkKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1Njb3JlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==