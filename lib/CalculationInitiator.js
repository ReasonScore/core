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
                if (score.sourceClaimId.toString() == "measuredClaim") debugger;
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
                  _context3.next = 23;
                  break;
                }

                claimseEdge = _step3.value;
                _context3.next = 18;
                return this.repo.getScoreBySourceClaimId(claimseEdge.childId);

              case 18:
                scoreItem = _context3.sent;
                scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(scoreItem, claimseEdge));

              case 20:
                _iteratorNormalCompletion3 = true;
                _context3.next = 14;
                break;

              case 23:
                _context3.next = 29;
                break;

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](12);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 29:
                _context3.prev = 29;
                _context3.prev = 30;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 32:
                _context3.prev = 32;

                if (!_didIteratorError3) {
                  _context3.next = 35;
                  break;
                }

                throw _iteratorError3;

              case 35:
                return _context3.finish(32);

              case 36:
                return _context3.finish(29);

              case 37:
                newScore = (0, _calculateScore.calculateScore)({
                  scoreAndClaimEdges: scoreAndClaimEdges,
                  reversible: reversible,
                  sourceClaimId: parentId
                });
                _context3.next = 40;
                return this.repo.getScoreBySourceClaimId(newScore.sourceClaimId);

              case 40:
                oldScore = _context3.sent;

                if (!oldScore) {
                  _context3.next = 48;
                  break;
                }

                if (!(0, _Score.differentScores)(oldScore, newScore)) {
                  _context3.next = 46;
                  break;
                }

                newScore.id = oldScore.id;
                _context3.next = 46;
                return this.notify([new _Change.Change(newScore, oldScore.id)]);

              case 46:
                _context3.next = 50;
                break;

              case 48:
                _context3.next = 50;
                return this.notify([new _Change.Change(newScore)]);

              case 50:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[12, 25, 29, 37], [30,, 32, 36]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbVZlcnNpb24iLCJ0eXBlIiwiVHlwZSIsImNsYWltRWRnZSIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInBhcmVudElkIiwiY2xhaW0iLCJpZCIsInNjb3JlIiwiZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZCIsInNvdXJjZUNsYWltSWQiLCJjbGFpbXNlRWRnZXMiLCJ0b1N0cmluZyIsInNjb3JlQW5kQ2xhaW1FZGdlcyIsInJldmVyc2libGUiLCJnZXRJdGVtIiwicGFyZW50SXRlbSIsInBhcmVudENsYWltIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjbGFpbXNlRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsInNjb3JlSXRlbSIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBS2FBLG1COzs7QUFFVCwrQkFDV0MsSUFEWCxFQUdFO0FBQUEsUUFEU0MsVUFDVCx1RUFEaUVDLFNBQ2pFOztBQUFBOztBQUFBLFNBRlNGLElBRVQsR0FGU0EsSUFFVDtBQUFBLFNBRFNDLFVBQ1QsR0FEU0EsVUFDVDtBQUNEO0FBRUQ7Ozs7Ozs7OytDQUNhRSxPOzs7Ozs7dUJBQ0gsS0FBS0gsSUFBTCxDQUFVSSxNQUFWLENBQWlCRCxPQUFqQixDOzs7QUFDTixvQkFBSSxLQUFLRixVQUFULEVBQXFCO0FBQ2pCLHVCQUFLQSxVQUFMLENBQWdCRSxPQUFoQjtBQUNIOzs7dUJBQ0ssS0FBS0Us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bXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IFNjb3JlQW5kQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZUFuZENsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IFNjb3JlLCBkaWZmZXJlbnRTY29yZXMgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSWRcIjtcclxuaW1wb3J0IHsgaVJlcG9zaXRvcnkgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL2lSZXBvc2l0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Jbml0YXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlcG86IGlSZXBvc2l0b3J5LFxyXG4gICAgICAgIHB1YmxpYyBzdWJzY3JpYmVyOiAoKGNoYW5nZXM6IENoYW5nZVtdKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIGFzeW5jIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVwby5ub3RpZnkoY2hhbmdlcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXIoY2hhbmdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHRoaXMuQ2FsY3VsYXRpb25Jbml0aWF0b3IoY2hhbmdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBDYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBuZXdJdGVtLCBvbGRJdGVtVmVyc2lvbiB9ID0gY2hhbmdlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjaGFuZ2VkL25ldyBjbGFpbSBFZGdlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IG5ld0l0ZW0gYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IGNsYWltXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW0gPSA8Q2xhaW0+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltLmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhdGUgY2FsY3VsYXRpb25zIGZyb20gYSBjYW5nZWQvbmV3IHNjb3JlXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGhlIGNsYWltRWRnZXMgdGhhdCBoYXZlIHRoaXMgc2NvcmUncyBTb3VyY2VDbGFpbUlkIGFzIHRoZSBjaGlsZCBhbmQgcmUgY2FsY3VsYXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltc2VFZGdlcyA9IGF3YWl0IHRoaXMucmVwby5nZXRDbGFpbUVkZ2VzQnlDaGlsZElkKHNjb3JlLnNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpID09IFwibWVhc3VyZWRDbGFpbVwiKSBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2xhaW1FZGdlIG9mIGNsYWltc2VFZGdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuQ2FsY3VsYXRlQnlDbGFpbUlkKGNsYWltRWRnZS5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBDYWxjdWxhdGVCeUNsYWltSWQocGFyZW50SWQ6IElkKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVBbmRDbGFpbUVkZ2VzOiBTY29yZUFuZENsYWltRWRnZVtdID0gW107XHJcbiAgICAgICAgLy9JcyBwYXJlbnQgcmV2ZXJzaWJsZT9cclxuICAgICAgICBsZXQgcmV2ZXJzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBhd2FpdCB0aGlzLnJlcG8uZ2V0SXRlbShwYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKHBhcmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q2xhaW0gPSA8Q2xhaW0+cGFyZW50SXRlbTtcclxuICAgICAgICAgICAgcmV2ZXJzaWJsZSA9IHBhcmVudENsYWltLnJldmVyc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0dldCBhbGwgdGhlIGNsYWltcyBmb3IgdGhlIHBhcmVudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXHJcbiAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gYXdhaXQgdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNsYWltc2VFZGdlIG9mIGNsYWltc2VFZGdlcykge1xyXG4gICAgICAgICAgICBjb25zdCBzY29yZUl0ZW0gPSBhd2FpdCB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQoY2xhaW1zZUVkZ2UuY2hpbGRJZClcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NvcmVBbmRDbGFpbUVkZ2UoPFNjb3JlPnNjb3JlSXRlbSwgY2xhaW1zZUVkZ2UpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IGNhbGN1bGF0ZVNjb3JlKHtcclxuICAgICAgICAgICAgc2NvcmVBbmRDbGFpbUVkZ2VzOiBzY29yZUFuZENsYWltRWRnZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2libGU6IHJldmVyc2libGUsXHJcbiAgICAgICAgICAgIHNvdXJjZUNsYWltSWQ6IHBhcmVudElkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFNjb3JlID0gYXdhaXQgdGhpcy5yZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG5ld1Njb3JlLnNvdXJjZUNsYWltSWQpXHJcbiAgICAgICAgaWYgKG9sZFNjb3JlKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbnRTY29yZXMob2xkU2NvcmUsIG5ld1Njb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3U2NvcmUuaWQgPSBvbGRTY29yZS5pZDtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlLCBvbGRTY29yZS5pZCldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLm5vdGlmeShbbmV3IENoYW5nZShuZXdTY29yZSldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19