"use strict";

var _CalculationInitiator = require("../CalculationInitiator");

var _Change = require("../dataModels/Change");

var _Claim = require("../dataModels/Claim");

var _Id = require("../dataModels/Id");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Repository = require("../Repository");

var _Affects = require("../dataModels/Affects");

var _ = require("..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test('claim without any edges should have score of 1',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var repo, calcInitator, claim;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          claim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("0"));
          _context.next = 5;
          return calcInitator.notify([new _Change.Change(claim)]);

        case 5:
          _context.t0 = expect;
          _context.next = 8;
          return repo.getScoreBySourceClaimId(claim.id);

        case 8:
          _context.t1 = _context.sent.sourceClaimId;
          _context.t2 = claim.id;
          (0, _context.t0)(_context.t1).toBe(_context.t2);
          _context.t3 = expect;
          _context.next = 14;
          return repo.getScoreBySourceClaimId(claim.id);

        case 14:
          _context.t4 = _context.sent.confidence;
          (0, _context.t3)(_context.t4).toBe(1);
          expect(repo.log.length).toBe(2);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('claim with two con descendants should have a confidence of 0',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var repo, calcInitator, measuredClaim, childClaim1, descendantClaim;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          _context2.next = 7;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);

        case 7:
          debugger;
          _context2.t0 = expect;
          _context2.next = 11;
          return repo.getScoreBySourceClaimId(measuredClaim.id);

        case 11:
          _context2.t1 = _context2.sent.confidence;
          (0, _context2.t0)(_context2.t1).toBe(0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('claim with two con descendants and other children should have a confidence of 1',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          childClaim2 = new _Claim.Claim("Child Claim 2", (0, _Id.ID)("childClaim2"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, true)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);
          _context3.t0 = expect;
          _context3.next = 10;
          return repo.getScoreBySourceClaimId(measuredClaim.id);

        case 10:
          _context3.t1 = _context3.sent.confidence;
          (0, _context3.t0)(_context3.t1).toBe(1);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('Multiple children calculation',
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
          _context4.next = 8;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(childClaim2), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]);

        case 8:
          _context4.t0 = expect;
          _context4.next = 11;
          return repo.getScoreBySourceClaimId(measuredClaim.id);

        case 11:
          _context4.t1 = _context4.sent.confidence;
          (0, _context4.t0)(_context4.t1).toBe(0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('Default Not Reversible',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context5.next = 6;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]);

        case 6:
          _context5.t0 = expect;
          _context5.next = 9;
          return repo.getScoreBySourceClaimId(measuredClaim.id);

        case 9:
          _context5.t1 = _context5.sent.confidence;
          (0, _context5.t0)(_context5.t1).toBe(0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('Reversible',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"), undefined, undefined, undefined, true);
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context6.next = 6;
          return calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]);

        case 6:
          _context6.t0 = expect;
          _context6.next = 9;
          return repo.getScoreBySourceClaimId(measuredClaim.id);

        case 9:
          _context6.t1 = _context6.sent.confidence;
          _context6.t2 = -1;
          (0, _context6.t0)(_context6.t1).toBe(_context6.t2);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test('Weird test case',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var repo, messenger, calcInitator, topClaim, increaseBusiness, increaseTraffic, childSafety, newStreet, costs, payoff, testEdgeId;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
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
          _context7.next = 13;
          return calcInitator.notify([new _Change.Change(topClaim), new _Change.Change(increaseBusiness), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseBusiness.id, _Affects.Affects.Confidence, true)), new _Change.Change(increaseTraffic), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId)), new _Change.Change(childSafety), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, childSafety.id, _Affects.Affects.Relevance, true)), new _Change.Change(newStreet), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, newStreet.id, _Affects.Affects.Confidence, false)), new _Change.Change(costs), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, costs.id, _Affects.Affects.Confidence, false)), new _Change.Change(payoff), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseBusiness.id, payoff.id, _Affects.Affects.Relevance, true))]);

        case 13:
          _context7.t0 = expect;
          _context7.next = 16;
          return repo.getScoreBySourceClaimId(topClaim.id);

        case 16:
          _context7.t1 = _context7.sent.confidence;
          (0, _context7.t0)(_context7.t1).toBe(0.3333333333333333);
          _context7.next = 20;
          return calcInitator.notify([new _Change.Change(increaseTraffic), // Sending in a claim resets it's score to 1 incorrectly
          new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, true, testEdgeId))]);

        case 20:
          _context7.t2 = expect;
          _context7.next = 23;
          return repo.getScoreBySourceClaimId(topClaim.id);

        case 23:
          _context7.t3 = _context7.sent.confidence;
          (0, _context7.t2)(_context7.t3).toBe(0.3333333333333333);
          _context7.next = 27;
          return calcInitator.notify([new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId))]);

        case 27:
          _context7.t4 = expect;
          _context7.next = 30;
          return repo.getScoreBySourceClaimId(topClaim.id);

        case 30:
          _context7.t5 = _context7.sent.confidence;
          (0, _context7.t4)(_context7.t5).toBe(0.3333333333333333);

        case 32:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9DYWxjdWxhdGlvbkluaXRpYXRvci50ZXN0LnRzIl0sIm5hbWVzIjpbInRlc3QiLCJyZXBvIiwiUmVwb3NpdG9yeSIsImNhbGNJbml0YXRvciIsIkNhbGN1bGF0aW9uSW5pdGF0b3IiLCJjbGFpbSIsIkNsYWltIiwibm90aWZ5IiwiQ2hhbmdlIiwiZXhwZWN0IiwiZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQiLCJpZCIsInNvdXJjZUNsYWltSWQiLCJ0b0JlIiwiY29uZmlkZW5jZSIsImxvZyIsImxlbmd0aCIsIm1lYXN1cmVkQ2xhaW0iLCJjaGlsZENsYWltMSIsImRlc2NlbmRhbnRDbGFpbSIsIkNsYWltRWRnZSIsIkFmZmVjdHMiLCJDb25maWRlbmNlIiwiY2hpbGRDbGFpbTIiLCJ1bmRlZmluZWQiLCJtZXNzZW5nZXIiLCJNZXNzZW5nZXIiLCJ0b3BDbGFpbSIsImluY3JlYXNlQnVzaW5lc3MiLCJpbmNyZWFzZVRyYWZmaWMiLCJjaGlsZFNhZmV0eSIsIm5ld1N0cmVldCIsImNvc3RzIiwicGF5b2ZmIiwidGVzdEVkZ2VJZCIsIlJlbGV2YW5jZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBR0FBLElBQUksQ0FBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUFtRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDN0NDLFVBQUFBLElBRDZDLEdBQ3RDLElBQUlDLHNCQUFKLEVBRHNDO0FBRTdDQyxVQUFBQSxZQUY2QyxHQUU5QixJQUFJQyx5Q0FBSixDQUF3QkgsSUFBeEIsQ0FGOEI7QUFHN0NJLFVBQUFBLEtBSDZDLEdBR3JDLElBQUlDLFlBQUosQ0FBVSxnQkFBVixFQUE0QixZQUFHLEdBQUgsQ0FBNUIsQ0FIcUM7QUFBQTtBQUFBLGlCQUk3Q0gsWUFBWSxDQUFDSSxNQUFiLENBQW9CLENBQ3RCLElBQUlDLGNBQUosQ0FBV0gsS0FB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QUE7QUFBQSxDQUFwQixHQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25Jbml0YXRvciB9IGZyb20gXCIuLi9DYWxjdWxhdGlvbkluaXRpYXRvclwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBJRCB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcIi4uL1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IHsgQWZmZWN0cyB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0FmZmVjdHNcIjtcclxuaW1wb3J0IHsgbmV3SWQsIE1lc3NlbmdlciB9IGZyb20gXCIuLlwiO1xyXG5cclxuXHJcbnRlc3QoJ2NsYWltIHdpdGhvdXQgYW55IGVkZ2VzIHNob3VsZCBoYXZlIHNjb3JlIG9mIDEnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgY2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIjBcIikpO1xyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShjbGFpbSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjbGFpbS5pZCkpLnNvdXJjZUNsYWltSWQpLnRvQmUoY2xhaW0uaWQpO1xyXG4gICAgZXhwZWN0KChhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGNsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgxKTtcclxuICAgIGV4cGVjdChyZXBvLmxvZy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ2NsYWltIHdpdGggdHdvIGNvbiBkZXNjZW5kYW50cyBzaG91bGQgaGF2ZSBhIGNvbmZpZGVuY2Ugb2YgMCcsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBtZWFzdXJlZENsYWltID0gbmV3IENsYWltKFwiTWVhc3VyZWQgQ2xhaW1cIiwgSUQoXCJtZWFzdXJlZENsYWltXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0xID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBJRChcImNoaWxkQ2xhaW0xXCIpKTtcclxuICAgIGNvbnN0IGRlc2NlbmRhbnRDbGFpbSA9IG5ldyBDbGFpbShcIkRlc2NlbmRhbnQgQ2xhaW1cIiwgSUQoXCJkZXNjZW5kYW50Q2xhaW1cIikpO1xyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShtZWFzdXJlZENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkQ2xhaW0xKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGRlc2NlbmRhbnRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0xLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKGNoaWxkQ2xhaW0xLmlkLCBkZXNjZW5kYW50Q2xhaW0uaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgIF0pO1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMCk7XHJcbn0pO1xyXG5cclxudGVzdCgnY2xhaW0gd2l0aCB0d28gY29uIGRlc2NlbmRhbnRzIGFuZCBvdGhlciBjaGlsZHJlbiBzaG91bGQgaGF2ZSBhIGNvbmZpZGVuY2Ugb2YgMScsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBtZWFzdXJlZENsYWltID0gbmV3IENsYWltKFwiTWVhc3VyZWQgQ2xhaW1cIiwgSUQoXCJtZWFzdXJlZENsYWltXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0xID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBJRChcImNoaWxkQ2xhaW0xXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0yID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMlwiLCBJRChcImNoaWxkQ2xhaW0yXCIpKTtcclxuICAgIGNvbnN0IGRlc2NlbmRhbnRDbGFpbSA9IG5ldyBDbGFpbShcIkRlc2NlbmRhbnQgQ2xhaW1cIiwgSUQoXCJkZXNjZW5kYW50Q2xhaW1cIikpO1xyXG4gICAgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShtZWFzdXJlZENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkQ2xhaW0xKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGRlc2NlbmRhbnRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0xLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0yLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIHRydWUpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoY2hpbGRDbGFpbTEuaWQsIGRlc2NlbmRhbnRDbGFpbS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnTXVsdGlwbGUgY2hpbGRyZW4gY2FsY3VsYXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMiA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgSUQoXCJjaGlsZENsYWltMlwiKSk7XHJcbiAgICBjb25zdCBkZXNjZW5kYW50Q2xhaW0gPSBuZXcgQ2xhaW0oXCJEZXNjZW5kYW50IENsYWltXCIsIElEKFwiZGVzY2VuZGFudENsYWltXCIpKTtcclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMiksXHJcbiAgICAgICAgbmV3IENoYW5nZShkZXNjZW5kYW50Q2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMi5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShjaGlsZENsYWltMS5pZCwgZGVzY2VuZGFudENsYWltLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChtZWFzdXJlZENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgwKTtcclxufSk7XHJcblxyXG50ZXN0KCdEZWZhdWx0IE5vdCBSZXZlcnNpYmxlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvKTtcclxuICAgIGNvbnN0IG1lYXN1cmVkQ2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIm1lYXN1cmVkQ2xhaW1cIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTEgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIElEKFwiY2hpbGRDbGFpbTFcIikpO1xyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShtZWFzdXJlZENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkQ2xhaW0xKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTEuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgIF0pO1xyXG4gICAgZXhwZWN0KChhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG1lYXN1cmVkQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDApO1xyXG59KTtcclxuXHJcbnRlc3QoJ1JldmVyc2libGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoLTEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ1dlaXJkIHRlc3QgY2FzZScsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgbWVzc2VuZ2VyID0gbmV3IE1lc3NlbmdlcigpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbywgbWVzc2VuZ2VyLm5vdGlmeSk7XHJcbiAgICBjb25zdCB0b3BDbGFpbSA9IG5ldyBDbGFpbShcIkZpY3Rpb24gQ2l0eSBzaG91bGQgY29udmVydCBFbG0gU3RyZWV0IHRvIG9ubHkgcGVkZXN0cmlhbiB0cmFmZmljP1wiLCBJRChcIjFcIikpO1xyXG4gICAgY29uc3QgaW5jcmVhc2VCdXNpbmVzcyA9IG5ldyBDbGFpbShcIlRoZSBwbGFubmluZyBjb21taXNzaW9uIGVzdGltYXRlcyB0aGlzIHdpbGwgaW5jcmVhc2UgZm9vdCB0cmFmZmljIHRvIGxvY2FsIHNob3BzIGJ5IDEyJSBkdXJpbmcgcGVhayBob3Vycy5cIiwgSUQoXCIyXCIpKTtcclxuICAgIGNvbnN0IGluY3JlYXNlVHJhZmZpYyA9IG5ldyBDbGFpbShcIlRoaXMgd2lsbCByZXN1bHQgaW4gdHJhZmZpYyBiZWluZyBkaXZlcnRlZCBkb3duIHJlc2lkZW50aWFsIHN0cmVldHMuXCIsIElEKFwiVHJhZmZpY1wiKSk7XHJcbiAgICBjb25zdCBjaGlsZFNhZmV0eSA9IG5ldyBDbGFpbShcIkNoaWxkcmVuIHNhZmV0eSBpcyBtb3JlIGltcG9ydGFudCB0aGFuIHByb2ZpdCBmb3IgbG9jYWwgc2hvcHMuXCIpO1xyXG4gICAgY29uc3QgbmV3U3RyZWV0ID0gbmV3IENsYWltKFwiQSBzZXQgb2YgcmFpbHJvYWQgdHJhY2tzIGFyZSBubyBsb25nZXIgaW4gdXNlIGFuZCB0aGUgQ2l0eSBjYW4gY29udmVydCB0aGF0IHRvIGEgbmV3IHN0cmVldC5cIik7XHJcbiAgICBjb25zdCBjb3N0cyA9IG5ldyBDbGFpbShcIlRoZSBjb252ZXJzaW9uIHdpbGwgY29zdCAyIE1pbGxpb24gZG9sbGFycy5cIik7XHJcbiAgICBjb25zdCBwYXlvZmYgPSBuZXcgQ2xhaW0oXCJUaGUgaW5jcmVhc2UgaW4gcmV2ZW51ZSBpcyBleHBlY3RlZCB0byBwYXkgb2ZmIHRoZSBleHBlbnNlIGluIHVuZGVyIDIgeWVhcnMgbWVldGluZyB0aGUgY2l0aWVzIGludmVzdG1lbnQgcmVxdWlyZW1lbnRzLlwiKTtcclxuXHJcbiAgICBjb25zdCB0ZXN0RWRnZUlkID0gSUQoXCJUZXN0RWRnZVwiKVxyXG5cclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UodG9wQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoaW5jcmVhc2VCdXNpbmVzcyksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKHRvcENsYWltLmlkLCBpbmNyZWFzZUJ1c2luZXNzLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIHRydWUpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGluY3JlYXNlVHJhZmZpYyksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKHRvcENsYWltLmlkLCBpbmNyZWFzZVRyYWZmaWMuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UsIHRlc3RFZGdlSWQpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkU2FmZXR5KSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoaW5jcmVhc2VUcmFmZmljLmlkLCBjaGlsZFNhZmV0eS5pZCwgQWZmZWN0cy5SZWxldmFuY2UsIHRydWUpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ld1N0cmVldCksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKGluY3JlYXNlVHJhZmZpYy5pZCwgbmV3U3RyZWV0LmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjb3N0cyksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKHRvcENsYWltLmlkLCBjb3N0cy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UocGF5b2ZmKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoaW5jcmVhc2VCdXNpbmVzcy5pZCwgcGF5b2ZmLmlkLCBBZmZlY3RzLlJlbGV2YW5jZSwgdHJ1ZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQodG9wQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDAuMzMzMzMzMzMzMzMzMzMzMyk7XHJcblxyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShpbmNyZWFzZVRyYWZmaWMpLC8vIFNlbmRpbmcgaW4gYSBjbGFpbSByZXNldHMgaXQncyBzY29yZSB0byAxIGluY29ycmVjdGx5XHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKHRvcENsYWltLmlkLCBpbmNyZWFzZVRyYWZmaWMuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgdHJ1ZSwgdGVzdEVkZ2VJZCkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQodG9wQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDAuMzMzMzMzMzMzMzMzMzMzMyk7XHJcblxyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKHRvcENsYWltLmlkLCBpbmNyZWFzZVRyYWZmaWMuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UsIHRlc3RFZGdlSWQpKSxcclxuICAgIF0pO1xyXG4gICAgZXhwZWN0KChhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKHRvcENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgwLjMzMzMzMzMzMzMzMzMzMzMpO1xyXG5cclxufSk7Il19