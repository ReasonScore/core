"use strict";

var _CalculationInitiator = require("../CalculationInitiator");

var _Change = require("../dataModels/Change");

var _Claim = require("../dataModels/Claim");

var _Id = require("../dataModels/Id");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Repository = require("../Repository");

var _Affects = require("../dataModels/Affects");

var _ = require("..");

test('claim without any edges should have score of 1', function _callee() {
  var repo, calcInitator, claim;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          claim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("0"));
          _context.next = 5;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(claim)]));

        case 5:
          _context.t0 = expect;
          _context.next = 8;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(claim.id));

        case 8:
          _context.t1 = _context.sent.sourceClaimId;
          _context.t2 = claim.id;
          (0, _context.t0)(_context.t1).toBe(_context.t2);
          _context.t3 = expect;
          _context.next = 14;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(claim.id));

        case 14:
          _context.t4 = _context.sent.confidence;
          (0, _context.t3)(_context.t4).toBe(1);
          expect(repo.log.length).toBe(2);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
test('claim with two con descendants should have a confidence of 0', function _callee2() {
  var repo, calcInitator, measuredClaim, childClaim1, descendantClaim;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          descendantClaim = new _Claim.Claim("Descendant Claim", (0, _Id.ID)("descendantClaim"));
          _context2.next = 7;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]));

        case 7:
          debugger;
          _context2.t0 = expect;
          _context2.next = 11;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(measuredClaim.id));

        case 11:
          _context2.t1 = _context2.sent.confidence;
          (0, _context2.t0)(_context2.t1).toBe(0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
test('claim with two con descendants and other children should have a confidence of 1', function _callee3() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.async(function _callee3$(_context3) {
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
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(measuredClaim.id));

        case 10:
          _context3.t1 = _context3.sent.confidence;
          (0, _context3.t0)(_context3.t1).toBe(1);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
test('Multiple children calculation', function _callee4() {
  var repo, calcInitator, measuredClaim, childClaim1, childClaim2, descendantClaim;
  return regeneratorRuntime.async(function _callee4$(_context4) {
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
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(childClaim2), new _Change.Change(descendantClaim), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim2.id, _Affects.Affects.Confidence, false)), new _Change.Change(new _ClaimEdge.ClaimEdge(childClaim1.id, descendantClaim.id, _Affects.Affects.Confidence, false))]));

        case 8:
          _context4.t0 = expect;
          _context4.next = 11;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(measuredClaim.id));

        case 11:
          _context4.t1 = _context4.sent.confidence;
          (0, _context4.t0)(_context4.t1).toBe(0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
});
test('Default Not Reversible', function _callee5() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"));
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context5.next = 6;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]));

        case 6:
          _context5.t0 = expect;
          _context5.next = 9;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(measuredClaim.id));

        case 9:
          _context5.t1 = _context5.sent.confidence;
          (0, _context5.t0)(_context5.t1).toBe(0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
});
test('Reversible', function _callee6() {
  var repo, calcInitator, measuredClaim, childClaim1;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          repo = new _Repository.Repository();
          calcInitator = new _CalculationInitiator.CalculationInitator(repo);
          measuredClaim = new _Claim.Claim("Measured Claim", (0, _Id.ID)("measuredClaim"), undefined, undefined, undefined, true);
          childClaim1 = new _Claim.Claim("Child Claim 1", (0, _Id.ID)("childClaim1"));
          _context6.next = 6;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(measuredClaim), new _Change.Change(childClaim1), new _Change.Change(new _ClaimEdge.ClaimEdge(measuredClaim.id, childClaim1.id, _Affects.Affects.Confidence, false))]));

        case 6:
          _context6.t0 = expect;
          _context6.next = 9;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(measuredClaim.id));

        case 9:
          _context6.t1 = _context6.sent.confidence;
          _context6.t2 = -1;
          (0, _context6.t0)(_context6.t1).toBe(_context6.t2);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
});
test('Weird test case', function _callee7() {
  var repo, messenger, calcInitator, topClaim, increaseBusiness, increaseTraffic, childSafety, newStreet, costs, payoff, testEdgeId;
  return regeneratorRuntime.async(function _callee7$(_context7) {
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
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(topClaim), new _Change.Change(increaseBusiness), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseBusiness.id, _Affects.Affects.Confidence, true)), new _Change.Change(increaseTraffic), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId)), new _Change.Change(childSafety), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, childSafety.id, _Affects.Affects.Relevance, true)), new _Change.Change(newStreet), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseTraffic.id, newStreet.id, _Affects.Affects.Confidence, false)), new _Change.Change(costs), new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, costs.id, _Affects.Affects.Confidence, false)), new _Change.Change(payoff), new _Change.Change(new _ClaimEdge.ClaimEdge(increaseBusiness.id, payoff.id, _Affects.Affects.Relevance, true))]));

        case 13:
          _context7.t0 = expect;
          _context7.next = 16;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(topClaim.id));

        case 16:
          _context7.t1 = _context7.sent.confidence;
          (0, _context7.t0)(_context7.t1).toBe(0.3333333333333333);
          _context7.next = 20;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(increaseTraffic), // Sending in a claim resets it's score to 1 incorrectly
          new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, true, testEdgeId))]));

        case 20:
          _context7.t2 = expect;
          _context7.next = 23;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(topClaim.id));

        case 23:
          _context7.t3 = _context7.sent.confidence;
          (0, _context7.t2)(_context7.t3).toBe(0.3333333333333333);
          _context7.next = 27;
          return regeneratorRuntime.awrap(calcInitator.notify([new _Change.Change(new _ClaimEdge.ClaimEdge(topClaim.id, increaseTraffic.id, _Affects.Affects.Confidence, false, testEdgeId))]));

        case 27:
          _context7.t4 = expect;
          _context7.next = 30;
          return regeneratorRuntime.awrap(repo.getScoreBySourceClaimId(topClaim.id));

        case 30:
          _context7.t5 = _context7.sent.confidence;
          (0, _context7.t4)(_context7.t5).toBe(0.3333333333333333);

        case 32:
        case "end":
          return _context7.stop();
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9DYWxjdWxhdGlvbkluaXRpYXRvci50ZXN0LnRzIl0sIm5hbWVzIjpbInRlc3QiLCJyZXBvIiwiUmVwb3NpdG9yeSIsImNhbGNJbml0YXRvciIsIkNhbGN1bGF0aW9uSW5pdGF0b3IiLCJjbGFpbSIsIkNsYWltIiwibm90aWZ5IiwiQ2hhbmdlIiwiZXhwZWN0IiwiZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQiLCJpZCIsInNvdXJjZUNsYWltSWQiLCJ0b0JlIiwiY29uZmlkZW5jZSIsImxvZyIsImxlbmd0aCIsIm1lYXN1cmVkQ2xhaW0iLCJjaGlsZENsYWltMSIsImRlc2NlbmRhbnRDbGFpbSIsIkNsYWltRWRnZSIsIkFmZmVjdHMiLCJDb25maWRlbmNlIiwiY2hpbGRDbGFpbTIiLCJ1bmRlZmluZWQiLCJtZXNzZW5nZXIiLCJNZXNzZW5nZXIiLCJ0b3BDbGFpbSIsImluY3JlYXNlQnVzaW5lc3MiLCJpbmNyZWFzZVRyYWZmaWMiLCJjaGlsZFNhZmV0eSIsIm5ld1N0cmVldCIsImNvc3RzIiwicGF5b2ZmIiwidGVzdEVkZ2VJZCIsIlJlbGV2YW5jZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQUEsSUFBSSxDQUFDLGdEQUFELEVBQW1EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM3Q0MsVUFBQUEsSUFENkMsR0FDdEMsSUFBSUMsc0JBQUosRUFEc0M7QUFFN0NDLFVBQUFBLFlBRjZDLEdBRTlCLElBQUlDLHlDQUFKLENBQXdCSCxJQUF4QixDQUY4QjtBQUc3Q0ksVUFBQUEsS0FINkMsR0FHckMsSUFBSUMsWUFBSixDQUFVLGdCQUFWLEVBQTRCLFlBQUcsR0FBSCxDQUE1QixDQUhxQztBQUFBO0FBQUEsMENBSTdDSCxZQUFZLENBQUNJLE1BQWIsQ0FBb0IsQ0FDdEIsSUFBSUMsY0FBSixDQUFXSCxLQUFYLENBRHNCLENBQXBCLENBSjZDOztBQUFB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QVksQ0FBQ0ksTUFBYixDQUFvQixDQUN0QixJQUFJQyxjQUFKLENBQVdxQixlQUFYLENBRHNCLEVBQ007QUFDNUIsY0FBSXJCLGNBQUosQ0FBVyxJQUFJWSxvQkFBSixDQUFjTyxRQUFRLENBQUNoQixFQUF2QixFQUEyQmtCLGVBQWUsQ0FBQ2xCLEVBQTNDLEVBQStDVSxpQkFBUUMsVUFBdkQsRUFBbUUsSUFBbkUsRUFBeUVZLFVBQXpFLENBQVgsQ0FGc0IsQ0FBcEIsQ0EvQmM7O0FBQUE7QUFBQSx5QkFtQ3BCekIsTUFuQ29CO0FBQUE7QUFBQSwwQ0FtQ05SLElBQUksQ0FBQ1MsdUJBQUwsQ0FBNkJpQixRQUFRLENBQUNoQixFQUF0QyxDQW5DTTs7QUFBQTtBQUFBLHdDQW1DcUNHLFVBbkNyQztBQUFBLDBDQW1DaURELElBbkNqRCxDQW1Dc0Qsa0JBbkN0RDtBQUFBO0FBQUEsMENBcUNkVixZQUFZLENBQUNJLE1BQWIsQ0FBb0IsQ0FDdEIsSUFBSUMsY0FBSixDQUFXLElBQUlZLG9CQUFKLENBQWNPLFFBQVEsQ0FBQ2hCLEVBQXZCLEVBQTJCa0IsZUFBZSxDQUFDbEIsRUFBM0MsRUFBK0NVLGlCQUFRQyxVQUF2RCxFQUFtRSxLQUFuRSxFQUEwRVksVUFBMUUsQ0FBWCxDQURzQixDQUFwQixDQXJDYzs7QUFBQTtBQUFBLHlCQXdDcEJ6QixNQXhDb0I7QUFBQTtBQUFBLDBDQXdDTlIsSUFBSSxDQUFDUyx1QkFBTCxDQUE2QmlCLFFBQVEsQ0FBQ2hCLEVBQXRDLENBeENNOztBQUFBO0FBQUEsd0NBd0NxQ0csVUF4Q3JDO0FBQUEsMENBd0NpREQsSUF4Q2pELENBd0NzRCxrQkF4Q3REOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQXBCLENBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkluaXRhdG9yIH0gZnJvbSBcIi4uL0NhbGN1bGF0aW9uSW5pdGlhdG9yXCI7XHJcbmltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IElEIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvSWRcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tIFwiLi4vUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQWZmZWN0c1wiO1xyXG5pbXBvcnQgeyBuZXdJZCwgTWVzc2VuZ2VyIH0gZnJvbSBcIi4uXCI7XHJcblxyXG5cclxudGVzdCgnY2xhaW0gd2l0aG91dCBhbnkgZWRnZXMgc2hvdWxkIGhhdmUgc2NvcmUgb2YgMScsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBjbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwiMFwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKGNsYWltKSxcclxuICAgIF0pO1xyXG4gICAgZXhwZWN0KChhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKGNsYWltLmlkKSkuc291cmNlQ2xhaW1JZCkudG9CZShjbGFpbS5pZCk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQoY2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDEpO1xyXG4gICAgZXhwZWN0KHJlcG8ubG9nLmxlbmd0aCkudG9CZSgyKTtcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnY2xhaW0gd2l0aCB0d28gY29uIGRlc2NlbmRhbnRzIHNob3VsZCBoYXZlIGEgY29uZmlkZW5jZSBvZiAwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvKTtcclxuICAgIGNvbnN0IG1lYXN1cmVkQ2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIm1lYXN1cmVkQ2xhaW1cIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTEgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIElEKFwiY2hpbGRDbGFpbTFcIikpO1xyXG4gICAgY29uc3QgZGVzY2VuZGFudENsYWltID0gbmV3IENsYWltKFwiRGVzY2VuZGFudCBDbGFpbVwiLCBJRChcImRlc2NlbmRhbnRDbGFpbVwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoZGVzY2VuZGFudENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTEuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoY2hpbGRDbGFpbTEuaWQsIGRlc2NlbmRhbnRDbGFpbS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChtZWFzdXJlZENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgwKTtcclxufSk7XHJcblxyXG50ZXN0KCdjbGFpbSB3aXRoIHR3byBjb24gZGVzY2VuZGFudHMgYW5kIG90aGVyIGNoaWxkcmVuIHNob3VsZCBoYXZlIGEgY29uZmlkZW5jZSBvZiAxJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvKTtcclxuICAgIGNvbnN0IG1lYXN1cmVkQ2xhaW0gPSBuZXcgQ2xhaW0oXCJNZWFzdXJlZCBDbGFpbVwiLCBJRChcIm1lYXN1cmVkQ2xhaW1cIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTEgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIElEKFwiY2hpbGRDbGFpbTFcIikpO1xyXG4gICAgY29uc3QgY2hpbGRDbGFpbTIgPSBuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIElEKFwiY2hpbGRDbGFpbTJcIikpO1xyXG4gICAgY29uc3QgZGVzY2VuZGFudENsYWltID0gbmV3IENsYWltKFwiRGVzY2VuZGFudCBDbGFpbVwiLCBJRChcImRlc2NlbmRhbnRDbGFpbVwiKSk7XHJcbiAgICBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoZGVzY2VuZGFudENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTEuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UobWVhc3VyZWRDbGFpbS5pZCwgY2hpbGRDbGFpbTIuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgdHJ1ZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShjaGlsZENsYWltMS5pZCwgZGVzY2VuZGFudENsYWltLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChtZWFzdXJlZENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgxKTtcclxufSk7XHJcblxyXG50ZXN0KCdNdWx0aXBsZSBjaGlsZHJlbiBjYWxjdWxhdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBtZWFzdXJlZENsYWltID0gbmV3IENsYWltKFwiTWVhc3VyZWQgQ2xhaW1cIiwgSUQoXCJtZWFzdXJlZENsYWltXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0xID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBJRChcImNoaWxkQ2xhaW0xXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0yID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMlwiLCBJRChcImNoaWxkQ2xhaW0yXCIpKTtcclxuICAgIGNvbnN0IGRlc2NlbmRhbnRDbGFpbSA9IG5ldyBDbGFpbShcIkRlc2NlbmRhbnQgQ2xhaW1cIiwgSUQoXCJkZXNjZW5kYW50Q2xhaW1cIikpO1xyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZShtZWFzdXJlZENsYWltKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkQ2xhaW0xKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNoaWxkQ2xhaW0yKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGRlc2NlbmRhbnRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0xLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0yLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKGNoaWxkQ2xhaW0xLmlkLCBkZXNjZW5kYW50Q2xhaW0uaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgIF0pO1xyXG4gICAgZXhwZWN0KChhd2FpdCByZXBvLmdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKG1lYXN1cmVkQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDApO1xyXG59KTtcclxuXHJcbnRlc3QoJ0RlZmF1bHQgTm90IFJldmVyc2libGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IFJlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNhbGNJbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8pO1xyXG4gICAgY29uc3QgbWVhc3VyZWRDbGFpbSA9IG5ldyBDbGFpbShcIk1lYXN1cmVkIENsYWltXCIsIElEKFwibWVhc3VyZWRDbGFpbVwiKSk7XHJcbiAgICBjb25zdCBjaGlsZENsYWltMSA9IG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgSUQoXCJjaGlsZENsYWltMVwiKSk7XHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG1lYXN1cmVkQ2xhaW0pLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRDbGFpbTEpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShtZWFzdXJlZENsYWltLmlkLCBjaGlsZENsYWltMS5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobWVhc3VyZWRDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMCk7XHJcbn0pO1xyXG5cclxudGVzdCgnUmV2ZXJzaWJsZScsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgY2FsY0luaXRhdG9yID0gbmV3IENhbGN1bGF0aW9uSW5pdGF0b3IocmVwbyk7XHJcbiAgICBjb25zdCBtZWFzdXJlZENsYWltID0gbmV3IENsYWltKFwiTWVhc3VyZWQgQ2xhaW1cIiwgSUQoXCJtZWFzdXJlZENsYWltXCIpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgIGNvbnN0IGNoaWxkQ2xhaW0xID0gbmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBJRChcImNoaWxkQ2xhaW0xXCIpKTtcclxuICAgIGF3YWl0IGNhbGNJbml0YXRvci5ub3RpZnkoW1xyXG4gICAgICAgIG5ldyBDaGFuZ2UobWVhc3VyZWRDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShjaGlsZENsYWltMSksXHJcbiAgICAgICAgbmV3IENoYW5nZShuZXcgQ2xhaW1FZGdlKG1lYXN1cmVkQ2xhaW0uaWQsIGNoaWxkQ2xhaW0xLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChtZWFzdXJlZENsYWltLmlkKSkuY29uZmlkZW5jZSkudG9CZSgtMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnV2VpcmQgdGVzdCBjYXNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVwbyA9IG5ldyBSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBtZXNzZW5nZXIgPSBuZXcgTWVzc2VuZ2VyKCk7XHJcbiAgICBjb25zdCBjYWxjSW5pdGF0b3IgPSBuZXcgQ2FsY3VsYXRpb25Jbml0YXRvcihyZXBvLCBtZXNzZW5nZXIubm90aWZ5KTtcclxuICAgIGNvbnN0IHRvcENsYWltID0gbmV3IENsYWltKFwiRmljdGlvbiBDaXR5IHNob3VsZCBjb252ZXJ0IEVsbSBTdHJlZXQgdG8gb25seSBwZWRlc3RyaWFuIHRyYWZmaWM/XCIsIElEKFwiMVwiKSk7XHJcbiAgICBjb25zdCBpbmNyZWFzZUJ1c2luZXNzID0gbmV3IENsYWltKFwiVGhlIHBsYW5uaW5nIGNvbW1pc3Npb24gZXN0aW1hdGVzIHRoaXMgd2lsbCBpbmNyZWFzZSBmb290IHRyYWZmaWMgdG8gbG9jYWwgc2hvcHMgYnkgMTIlIGR1cmluZyBwZWFrIGhvdXJzLlwiLCBJRChcIjJcIikpO1xyXG4gICAgY29uc3QgaW5jcmVhc2VUcmFmZmljID0gbmV3IENsYWltKFwiVGhpcyB3aWxsIHJlc3VsdCBpbiB0cmFmZmljIGJlaW5nIGRpdmVydGVkIGRvd24gcmVzaWRlbnRpYWwgc3RyZWV0cy5cIiwgSUQoXCJUcmFmZmljXCIpKTtcclxuICAgIGNvbnN0IGNoaWxkU2FmZXR5ID0gbmV3IENsYWltKFwiQ2hpbGRyZW4gc2FmZXR5IGlzIG1vcmUgaW1wb3J0YW50IHRoYW4gcHJvZml0IGZvciBsb2NhbCBzaG9wcy5cIik7XHJcbiAgICBjb25zdCBuZXdTdHJlZXQgPSBuZXcgQ2xhaW0oXCJBIHNldCBvZiByYWlscm9hZCB0cmFja3MgYXJlIG5vIGxvbmdlciBpbiB1c2UgYW5kIHRoZSBDaXR5IGNhbiBjb252ZXJ0IHRoYXQgdG8gYSBuZXcgc3RyZWV0LlwiKTtcclxuICAgIGNvbnN0IGNvc3RzID0gbmV3IENsYWltKFwiVGhlIGNvbnZlcnNpb24gd2lsbCBjb3N0IDIgTWlsbGlvbiBkb2xsYXJzLlwiKTtcclxuICAgIGNvbnN0IHBheW9mZiA9IG5ldyBDbGFpbShcIlRoZSBpbmNyZWFzZSBpbiByZXZlbnVlIGlzIGV4cGVjdGVkIHRvIHBheSBvZmYgdGhlIGV4cGVuc2UgaW4gdW5kZXIgMiB5ZWFycyBtZWV0aW5nIHRoZSBjaXRpZXMgaW52ZXN0bWVudCByZXF1aXJlbWVudHMuXCIpO1xyXG5cclxuICAgIGNvbnN0IHRlc3RFZGdlSWQgPSBJRChcIlRlc3RFZGdlXCIpXHJcblxyXG4gICAgYXdhaXQgY2FsY0luaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZSh0b3BDbGFpbSksXHJcbiAgICAgICAgbmV3IENoYW5nZShpbmNyZWFzZUJ1c2luZXNzKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlQnVzaW5lc3MuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgdHJ1ZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoaW5jcmVhc2VUcmFmZmljKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSwgdGVzdEVkZ2VJZCkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UoY2hpbGRTYWZldHkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShpbmNyZWFzZVRyYWZmaWMuaWQsIGNoaWxkU2FmZXR5LmlkLCBBZmZlY3RzLlJlbGV2YW5jZSwgdHJ1ZSkpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3U3RyZWV0KSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UoaW5jcmVhc2VUcmFmZmljLmlkLCBuZXdTdHJlZXQuaWQsIEFmZmVjdHMuQ29uZmlkZW5jZSwgZmFsc2UpKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKGNvc3RzKSxcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGNvc3RzLmlkLCBBZmZlY3RzLkNvbmZpZGVuY2UsIGZhbHNlKSksXHJcbiAgICAgICAgbmV3IENoYW5nZShwYXlvZmYpLFxyXG4gICAgICAgIG5ldyBDaGFuZ2UobmV3IENsYWltRWRnZShpbmNyZWFzZUJ1c2luZXNzLmlkLCBwYXlvZmYuaWQsIEFmZmVjdHMuUmVsZXZhbmNlLCB0cnVlKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZCh0b3BDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKGluY3JlYXNlVHJhZmZpYyksLy8gU2VuZGluZyBpbiBhIGNsYWltIHJlc2V0cyBpdCdzIHNjb3JlIHRvIDEgaW5jb3JyZWN0bHlcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCB0cnVlLCB0ZXN0RWRnZUlkKSksXHJcbiAgICBdKTtcclxuICAgIGV4cGVjdCgoYXdhaXQgcmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZCh0b3BDbGFpbS5pZCkpLmNvbmZpZGVuY2UpLnRvQmUoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgICBhd2FpdCBjYWxjSW5pdGF0b3Iubm90aWZ5KFtcclxuICAgICAgICBuZXcgQ2hhbmdlKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIGluY3JlYXNlVHJhZmZpYy5pZCwgQWZmZWN0cy5Db25maWRlbmNlLCBmYWxzZSwgdGVzdEVkZ2VJZCkpLFxyXG4gICAgXSk7XHJcbiAgICBleHBlY3QoKGF3YWl0IHJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQodG9wQ2xhaW0uaWQpKS5jb25maWRlbmNlKS50b0JlKDAuMzMzMzMzMzMzMzMzMzMzMyk7XHJcblxyXG59KTsiXX0=