"use strict";

var _CalculationInitiator = require("../CalculationInitiator");

var _Change = require("../dataModels/Change");

var _Claim = require("../dataModels/Claim");

var _Id = require("../dataModels/Id");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Repository = require("../Repository");

var _Affects = require("../dataModels/Affects");

var _ = require("..");

var _Score = require("../dataModels/Score");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getScore =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(repo, id) {
    var score;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return repo.getScoreBySourceClaimId(id);

          case 2:
            score = _context.sent;

            if (!score) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", score);

          case 7:
            return _context.abrupt("return", new _Score.Score());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getScore(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

test('claim without any edges should have score of 1',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var repo, calcInitator, claim;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          claim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("0"));
          _context2.next = 5;
          return calcInitator.notify([new _Change.Change(claim)]);

        case 5:
          _context2.t0 = expect;
          _context2.next = 8;
          return getScore(repo, claim.id);

        case 8:
          _context2.t1 = _context2.sent.sourceClaimId;
          _context2.t2 = claim.id;
          (0, _context2.t0)(_context2.t1).toBe(_context2.t2);
          _context2.t3 = expect;
          _context2.next = 14;
          return getScore(repo, claim.id);

        case 14:
          _context2.t4 = _context2.sent.confidence;
          (0, _context2.t3)(_context2.t4).toBe(1);
          expect(repo.log.length).toBe(2);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('claim with two con descendants should have a confidence of 0',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var repo, calcInitator, measuredClaim, childClaim1, descendantClaim;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          _context3.next = 7;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);

        case 7:
          debugger;
          _context3.t0 = expect;
          _context3.next = 11;
          return getScore(repo, measuredClaim.id);

        case 11:
          _context3.t1 = _context3.sent.confidence;
          (0, _context3.t0)(_context3.t1).toBe(0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('claim with two con descendants and other children should have a confidence of 1',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          childClaim2 = new _Claim.Claim("Child Claim 2", (0, _Id.ID)("childClaim2"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, true)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);
          _context4.t0 = expect;
          _context4.next = 10;
          return getScore(repo, measuredClaim.id);

        case 10:
          _context4.t1 = _context4.sent.confidence;
          (0, _context4.t0)(_context4.t1).toBe(1);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('Multiple children calculation',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          childClaim2 = new _Claim.Claim("Child Claim 2", (0, _Id.ID)("childClaim2"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          _context5.next = 8;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(childClaim2), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);

        case 8:
          _context5.t0 = expect;
          _context5.next = 11;
          return getScore(repo, measuredClaim.id);

        case 11:
          _context5.t1 = _context5.sent.confidence;
          (0, _context5.t0)(_context5.t1).toBe(0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('Multiple children calculation with no scores',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          childClaim2 = new _Claim.Claim("Child Claim 2", (0, _Id.ID)("childClaim2"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          _context6.next = 8;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(childClaim2), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);

        case 8:
          //Delete all scores
          repo.rsData.scoreBySourceClaimId = {}; //Ask for score form CalculationInitator

          debugger;
          _context6.t0 = expect;
          _context6.next = 13;
          return calcInitator.CalculateByClaimId(measuredClaim.id);

        case 13:
          _context6.t1 = _context6.sent.confidence;
          (0, _context6.t0)(_context6.t1).toBe(0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test('Default Not Reversible',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context7.next = 6;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]);

        case 6:
          _context7.t0 = expect;
          _context7.next = 9;
          return getScore(repo, measuredClaim.id);

        case 9:
          _context7.t1 = _context7.sent.confidence;
          (0, _context7.t0)(_context7.t1).toBe(0);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
test('Reversible',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"), undefined, undefined, undefined, true);
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context8.next = 6;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]);

        case 6:
          _context8.t0 = expect;
          _context8.next = 9;
          return getScore(repo, measuredClaim.id);

        case 9:
          _context8.t1 = _context8.sent.confidence;
          _context8.t2 = -1;
          (0, _context8.t0)(_context8.t1).toBe(_context8.t2);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));
test('Weird test case',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee9() {
  var repo, messenger, calcInitator, topClaim, increaseBusiness, increaseTraffic, childSafety, newStreet, costs, payoff, testEdgeId;
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          repo = new _Repository.Repository();
          messenger = new _.Messenger();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo, messenger.notify);
          topClaim = new _Claim.Claim("Fiction City should convert Elm Street to only pedestrian traffic?", (0, _Id.ID)("1"));
          increaseBusiness = new _Claim.Claim("The planning commission estimates this will increase foot traffic to local shops by 12% during peak hours.", (0, _Id.ID)("2"));
          increaseTraffic = new _Claim.Claim("This will result in traffic being diverted down residential streets.", (0, _Id.ID)("Traffic"));
          childSafety = new _Claim.Claim("Children safety is more important than profit for local shops.");
          newStreet = new _Claim.Claim("A set of railroad tracks are no longer in use and the City can convert that to a new street.");
          costs = new _Claim.Claim("The conversion will cost 2 Million dollars.");
          payoff = new _Claim.Claim("The increase in revenue is expected to pay off the expense in under 2 years meeting the cities investment requirements.");
          testEdgeId = (0, _Id.ID)("TestEdge");
          _context9.next = 13;
          return calcInitator.notify([new _Change.Change(topClaim), new _Change.Change(increaseBusiness), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseBusiness.id, _Affects.Affects.Confidence, true)), new _Change.Change(increaseTraffic), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId)), new _Change.Change(childSafety), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, childSafety.id, _Affects.Affects.Relevance, true)), new _Change.Change(newStreet), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, newStreet.id, _Affects.Affects.Confidence, false)), new _Change.Change(costs), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, costs.id, _Affects.Affects.Confidence, false)), new _Change.Change(payoff), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseBusiness.id, payoff.id, _Affects.Affects.Relevance, true))]);

        case 13:
          _context9.t0 = expect;
          _context9.next = 16;
          return getScore(repo, topClaim.id);

        case 16:
          _context9.t1 = _context9.sent.confidence;
          (0, _context9.t0)(_context9.t1).toBe(0.3333333333333333);
          _context9.next = 20;
          return calcInitator.notify([new _Change.Change(increaseTraffic), // Sending in a claim resets it's score to 1 incorrectly
          new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, true, testEdgeId))]);

        case 20:
          _context9.t2 = expect;
          _context9.next = 23;
          return getScore(repo, topClaim.id);

        case 23:
          _context9.t3 = _context9.sent.confidence;
          (0, _context9.t2)(_context9.t3).toBe(0.3333333333333333);
          _context9.next = 27;
          return calcInitator.notify([new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId))]);

        case 27:
          _context9.t4 = expect;
          _context9.next = 30;
          return getScore(repo, topClaim.id);

        case 30:
          _context9.t5 = _context9.sent.confidence;
          (0, _context9.t4)(_context9.t5).toBe(0.3333333333333333);

        case 32:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9);
})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9DYWxjdWxhdGlvbkluaXRpYXRvci50ZXN0LnRzIl0sIm5hbWVzIjpbImdldFNjb3JlIiwicmVwbyIsImlkIiwiZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzY29yZSIsIlNjb3JlIiwidGVzdCIsIlJlcG9zaXRvcnkiLCJjYWxjSW5pdGF0b3IiLCJDYWxjdWxhdGlvbkluaXRhdG9yIiwiY2xhaW0iLCJDbGFpbSIsIm5vdGlmeSIsIkNoYW5nZSIsImV4cGVjdCIsInNvdXJjZUNsYWltSWQiLCJ0b0JlIiwiY29uZmlkZW5jZSIsImxvZyIsImxlbmd0aCIsIm1lYXN1cmVkQ2xhaW0iLCJjaGlsZENsYWltMSIsImRlc2NlbmRhbnRDbGFpbSIsIkNsYWltRWRnZSIsIkFmZmVjdHMiLCJDb25maWRlbmNlIiwiY2hpbGRDbGFpbTIiLCJyc0RhdGEiLCJzY29yZUJ5U291cmNlQ2xhaW1JZCIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInVuZGVmaW5lZCIsIm1lc3NlbmdlciIsIk1lc3NlbmdlciIsInRvcENsYWltIiwiaW5jcmVhc2VCdXNpbmVzcyIsImluY3JlYXNlVHJhZmZpYyIsImNoaWxkU2FmZXR5IiwibmV3U3RyZWV0IiwiY29zdHMiLCJwYXlvZmYiLCJ0ZXN0RWRnZUlkIiwiUmVsZXZhbmNlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFBT0MsSUFBUCxFQUF5QkMsRUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDS0QsSUFBSSxDQUFDRSx1QkFBTCxDQUE2QkQsRUFBN0IsQ0FETDs7QUFBQTtBQUNURSxZQUFBQSxLQURTOztBQUFBLGlCQUVUQSxLQUZTO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUdGQSxLQUhFOztBQUFB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QUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25Jbml0YXRvciB9IGZyb20gXCIuLi9DYWxjdWxhdGlvbkluaXRpYXRvclwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJRCwgSWQgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9SZXBvc2l0b3J5XCI7XHJcbmltcG9ydCB7IEFmZmVjdHMgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9BZmZlY3RzXCI7XHJcbmltcG9ydCB7IG5ld0lkLCBNZXNzZW5nZXIgfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5cclxuY29uc3QgZ2V0U2NvcmUgPSBhc3luYyAocmVwbzogUmVwb3NpdG9yeSwgaWQ6IElkKSA9PiB7XHJcbiAgICBsZXQgc2NvcmUgPSBhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGlkKVxyXG4gICAgaWYgKHNjb3JlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNjb3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnRlc3QoJ2NsYWltIHdpdGhvdXQgYW55IGVkZ2VzIHNob3VsZCBoYXZlIHNjb3JlIG9mIDEnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgY2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIjBcIikpO1xyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShjbGFpbSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgZ2V0U2NvcmUocmVwbyxjbGFpbS5pZCkpLnNvdXJjZUNsYWltSWQpLnRvQmUoY2xhaW0uaWQpO1xyXG4gICAgZXhwZWN0KChhd2FpdCAgZ2V0U2NvcmUocmVwbyxjbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMSk7XHJcbiAgICBleHBlY3QocmVwby5sb2cubGVuZ3RoKS50b0JlKDIpO1xyXG5cclxufSk7XHJcblxyXG50ZXN0KCdjbGFpbSB3aXRoIHR3byBjb24gZGVzY2VuZGFudHMgc2hvdWxkIGhhdmUgYSBjb25maWRlbmNlIG9mIDAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBjb25zdCBkZXNjZW5kYW50Q2xhaW0gPSBuZXcgQ2xhaW0oXCJEZXNjZW5kYW50IENsYWltXCIsIElEKFwiZGVzY2VuZGFudENsYWltXCIpKTtcclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShkZXNjZW5kYW50Q2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShjaGlsZENsYWltMS5pZCwgZGVzY2VuZGFudENsYWltLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgZXhwZWN0KChhd2FpdCBnZXRTY29yZShyZXBvLG1lYXN1cmVkQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDApO1xyXG59KTtcclxuXHJcbnRlc3QoJ2NsYWltIHdpdGggdHdvIGNvbiBkZXNjZW5kYW50cyBhbmQgb3RoZXIgY2hpbGRyZW4gc2hvdWxkIGhhdmUgYSBjb25maWRlbmNlIG9mIDEnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMiA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgSUQoXCJjaGlsZENsYWltMlwiKSk7XHJcbiAgICBjb25zdCBkZXNjZW5kYW50Q2xhaW0gPSBuZXcgQ2xhaW0oXCJEZXNjZW5kYW50IENsYWltXCIsIElEKFwiZGVzY2VuZGFudENsYWltXCIpKTtcclxuICAgIGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShkZXNjZW5kYW50Q2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMi5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCB0cnVlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKGNoaWxkQ2xhaW0xLmlkLCBkZXNjZW5kYW50Q2xhaW0uaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgIF0pO1xyXG4gICAgZXhwZWN0KChhd2FpdCBnZXRTY29yZShyZXBvLG1lYXN1cmVkQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ011bHRpcGxlIGNoaWxkcmVuIGNhbGN1bGF0aW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvKTtcclxuICAgIGNvbnN0IG1lYXN1cmVkQ2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIm1lYXN1cmVkQ2xhaW1cIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTEgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIElEKFwiY2hpbGRDbGFpbTFcIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTIgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIElEKFwiY2hpbGRDbGFpbTJcIikpO1xyXG4gICAgY29uc3QgZGVzY2VuZGFudENsYWltID0gbmV3IENsYWltKFwiRGVzY2VuZGFudCBDbGFpbVwiLCBJRChcImRlc2NlbmRhbnRDbGFpbVwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTIpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoZGVzY2VuZGFudENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTEuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTIuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoY2hpbGRDbGFpbTEuaWQsIGRlc2NlbmRhbnRDbGFpbS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IGdldFNjb3JlKHJlcG8sbWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMCk7XHJcbn0pO1xyXG5cclxudGVzdCgnTXVsdGlwbGUgY2hpbGRyZW4gY2FsY3VsYXRpb24gd2l0aCBubyBzY29yZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMiA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgSUQoXCJjaGlsZENsYWltMlwiKSk7XHJcbiAgICBjb25zdCBkZXNjZW5kYW50Q2xhaW0gPSBuZXcgQ2xhaW0oXCJEZXNjZW5kYW50IENsYWltXCIsIElEKFwiZGVzY2VuZGFudENsYWltXCIpKTtcclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMiksXHJcbiAgICAgICAgbmV3IENoYW5nZShkZXNjZW5kYW50Q2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMi5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShjaGlsZENsYWltMS5pZCwgZGVzY2VuZGFudENsYWltLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIC8vRGVsZXRlIGFsbCBzY29yZXNcclxuICAgICByZXBvLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZCA9IHt9O1xyXG5cclxuICAgIC8vQXNrIGZvciBzY29yZSBmb3JtIENhbGN1bGF0aW9uSW5pdGF0b3JcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgZXhwZWN0KChhd2FpdCBjYWxjSW5pdGF0b3IuQ2FsY3VsYXRlQnlDbGFpbUlkKG1lYXN1cmVkQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDApO1xyXG59KTtcclxuXHJcbnRlc3QoJ0RlZmF1bHQgTm90IFJldmVyc2libGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IGdldFNjb3JlKHJlcG8sbWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMCk7XHJcbn0pO1xyXG5cclxudGVzdCgnUmV2ZXJzaWJsZScsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBtZWFzdXJlZENsYWltID0gbmV3IENsYWltKFwiTWVhc3VyZWQgQ2xhaW1cIiwgSUQoXCJtZWFzdXJlZENsYWltXCIpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0xID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBJRChcImNoaWxkQ2xhaW0xXCIpKTtcclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0xLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgZ2V0U2NvcmUocmVwbyxtZWFzdXJlZENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgtMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnV2VpcmQgdGVzdCBjYXNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBtZXNzZW5nZXIgPSBuZXcgTWVzc2VuZ2VyKCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvLCBtZXNzZW5nZXIubm90aWZ5KTtcclxuICAgIGNvbnN0IHRvcENsYWltID0gbmV3IENsYWltKFwiRmljdGlvbiBDaXR5IHNob3VsZCBjb252ZXJ0IEVsbSBTdHJlZXQgdG8gb25seSBwZWRlc3RyaWFuIHRyYWZmaWM/XCIsIElEKFwiMVwiKSk7XHJcbiAgICBjb25zdCBpbmNyZWFzZUJ1c2luZXNzID0gbmV3IENsYWltKFwiVGhlIHBsYW5uaW5nIGNvbW1pc3Npb24gZXN0aW1hdGVzIHRoaXMgd2lsbCBpbmNyZWFzZSBmb290IHRyYWZmaWMgdG8gbG9jYWwgc2hvcHMgYnkgMTIlIGR1cmluZyBwZWFrIGhvdXJzLlwiLCBJRChcIjJcIikpO1xyXG4gICAgY29uc3QgaW5jcmVhc2VUcmFmZmljID0gbmV3IENsYWltKFwiVGhpcyB3aWxsIHJlc3VsdCBpbiB0cmFmZmljIGJlaW5nIGRpdmVydGVkIGRvd24gcmVzaWRlbnRpYWwgc3RyZWV0cy5cIiwgSUQoXCJUcmFmZmljXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkU2FmZXR5ID0gbmV3IENsYWltKFwiQ2hpbGRyZW4gc2FmZXR5IGlzIG1vcmUgaW1wb3J0YW50IHRoYW4gcHJvZml0IGZvciBsb2NhbCBzaG9wcy5cIik7XHJcbiAgICBjb25zdCBuZXdTdHJlZXQgPSBuZXcgQ2xhaW0oXCJBIHNldCBvZiByYWlscm9hZCB0cmFja3MgYXJlIG5vIGxvbmdlciBpbiB1c2UgYW5kIHRoZSBDaXR5IGNhbiBjb252ZXJ0IHRoYXQgdG8gYSBuZXcgc3RyZWV0LlwiKTtcclxuICAgIGNvbnN0IGNvc3RzID0gbmV3IENsYWltKFwiVGhlIGNvbnZlcnNpb24gd2lsbCBjb3N0IDIgTWlsbGlvbiBkb2xsYXJzLlwiKTtcclxuICAgIGNvbnN0IHBheW9mZiA9IG5ldyBDbGFpbShcIlRoZSBpbmNyZWFzZSBpbiByZXZlbnVlIGlzIGV4cGVjdGVkIHRvIHBheSBvZmYgdGhlIGV4cGVuc2UgaW4gdW5kZXIgMiB5ZWFycyBtZWV0aW5nIHRoZSBjaXRpZXMgaW52ZXN0bWVudCByZXF1aXJlbWVudHMuXCIpO1xyXG5cclxuICAgIGNvbnN0IHRlc3RFZGdlSWQgPSBJRChcIlRlc3RFZGdlXCIpXHJcblxyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZSh0b3BDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShpbmNyZWFzZUJ1c2luZXNzKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlQnVzaW5lc3MuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgdHJ1ZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoaW5jcmVhc2VUcmFmZmljKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSwgdGVzdEVkZ2VJZCkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRTYWZldHkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShpbmNyZWFzZVRyYWZmaWMuaWQsIGNoaWxkU2FmZXR5LmlkLCBBZmZlY3RzLlJlbGV2YW5jZSwgdHJ1ZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3U3RyZWV0KSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoaW5jcmVhc2VUcmFmZmljLmlkLCBuZXdTdHJlZXQuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNvc3RzKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGNvc3RzLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShwYXlvZmYpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShpbmNyZWFzZUJ1c2luZXNzLmlkLCBwYXlvZmYuaWQsIEFmZmVjdHMuUmVsZXZhbmNlLCB0cnVlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgZ2V0U2NvcmUocmVwbyx0b3BDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKGluY3JlYXNlVHJhZmZpYyksLy8gU2VuZGluZyBpbiBhIGNsYWltIHJlc2V0cyBpdCdzIHNjb3JlIHRvIDEgaW5jb3JyZWN0bHlcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCB0cnVlLCB0ZXN0RWRnZUlkKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgZ2V0U2NvcmUocmVwbyx0b3BDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSwgdGVzdEVkZ2VJZCkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IGdldFNjb3JlKHJlcG8sdG9wQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDAuMzMzMzMzMzMzMzMzMzMzMyk7XHJcblxyXG59KTsiXX0=