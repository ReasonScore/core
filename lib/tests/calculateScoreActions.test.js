"use strict";

var _RepositoryLocalPure = require("../repositories/RepositoryLocalPure");

var _calculateScoreActions = require("../calculateScoreActions");

var _calculateScore = require("../calculateScore");

var _Claim = require("../dataModels/Claim");

var _Action = require("../dataModels/Action");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Score = require("../dataModels/Score");

//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";
const u = undefined;
test('add a new scoretree', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure(); // Add a new claim and set it as a score tree top

  const newScore = new _Score.Score("testClaim", "testClaim");
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim", "testClaim"), new _Action.Action(newScore, undefined, "add_score", newScore.id)],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  expect(repository.rsData.scoreIdsBySourceId["testClaim"].length).toEqual(1);
});
test('Add a child that does not change the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim"), new _Action.Action(new _Score.Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), undefined, "add_score"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", u, u, u, "Priority Set"), undefined, "add_claimEdge")],
    repository: repository
  });
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "parentScoreId": "newScore",
      "priority": "Priority Set"
    },
    "oldData": undefined,
    "type": "add_score"
  }]);
});
test('Changing a child pro value should change the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), u, "add_claim"), new _Action.Action(new _Score.Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), u, "add_score"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", u, true, "ChildClaim1Edge"), u, "add_claimEdge")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "modify_claimEdge")],
    repository: repository
  });
  expect(result).toMatchObject([{
    "newData": {
      "pro": false,
      "affects": "confidence"
    },
    "oldData": {
      "sourceClaimId": "ChildClaim1",
      "topScoreId": "newScore",
      "parentScoreId": "newScore",
      "sourceEdgeId": "ChildClaim1Edge",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1
    },
    "type": "modify_score"
  }, {
    "newData": {
      "sourceClaimId": "testClaim",
      "topScoreId": "testClaim",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1,
      "id": "newScore"
    },
    "type": "modify_score",
    "dataId": "newScore"
  }]);
});
test('Add a child that reverses the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim"), new _Action.Action(new _Score.Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), undefined, "add_score"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "reversible": false,
      "pro": false,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "parentScoreId": "newScore" //"dataId": "Ya3ZeuTmGUZq"

    },
    "oldData": undefined,
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

  }, {
    "newData": {
      "sourceClaimId": "testClaim",
      "parentScoreId": undefined,
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1 //"id": "Y9ZapFMMg0Bf"

    },
    "oldData": undefined,
    "type": "modify_score" //"dataId": "Ya3ZeuTmGUZq"

  }]);
});
test('Adding a grandchild score Reverses Scores 2 levels', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim"), new _Action.Action(new _Score.Score("testClaim", "testClaim", u, u, u, u, u, 0, u, "newScore"), undefined, "add_score"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim"), new _Action.Action(new _Claim.Claim("", "ChildClaim2"), undefined, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim2", undefined, true, "ChildClaim2Edge"), undefined, "add_claimEdge"), new _Action.Action(new _Claim.Claim("", "grandChild1"), undefined, "add_claim")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", undefined, false, "GrandChildClaim1Edge"), undefined, "add_claimEdge")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "grandChild1",
      "topScoreId": "newScore",
      "sourceEdgeId": "GrandChildClaim1Edge",
      "reversible": false,
      "pro": false,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1
    },
    "type": "add_score"
  }, {
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "topScoreId": "newScore",
      "parentScoreId": "newScore",
      "sourceEdgeId": "ChildClaim1Edge",
      "reversible": false,
      "pro": false,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1
    },
    "type": "modify_score"
  }, {
    "newData": {
      "sourceClaimId": "testClaim",
      "topScoreId": "testClaim",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "id": "newScore"
    },
    "type": "modify_score",
    "dataId": "newScore"
  }]);
});
test('Complex Test', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const changedScores = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _Score.Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "newScore"), u, "add_score")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["newScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topClaim"].length).toEqual(1); //Weird score not changing

  const ChildClaim1ScoresInitial = await repository.getScoresBySourceId("ChildClaim1");
  expect(ChildClaim1ScoresInitial[0].pro).toEqual(false);
  const changedScores2 = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [{
      "newData": {
        "content": "Child Claim 1",
        "id": "ChildClaim1",
        "reversible": false,
        "type": "claim"
      },
      "type": "modify_claim",
      "dataId": "ChildClaim1"
    }, {
      "newData": {
        "parentId": "topClaim",
        "childId": "ChildClaim1",
        "affects": "confidence",
        "pro": true,
        "id": "ChildClaim1Edge",
        "priority": "",
        "type": "claimEdge"
      },
      "type": "modify_claimEdge",
      "dataId": "ChildClaim1Edge"
    }],
    repository: repository
  }); //await repository.notify(changedScores2);

  const ChildClaim1Scores = await repository.getScoresBySourceId("ChildClaim1");
  expect(ChildClaim1Scores[0].pro).toEqual(true);
  expect(changedScores2.length).toEqual(1); //TODO: Do I want to check all indexes for duplicate indexed items?
});
test('Partial Claim Edge Grandchild Update', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const changedScores = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _Score.Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "topScore"), u, "add_score")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topClaim"].length).toEqual(1);
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge")],
    repository: repository
  });
  await repository.notify(result);
  expect(repository.rsData.items["topScore"].confidence).toEqual(0);
  const result2 = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: true
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  });
  await repository.notify(result2);
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});
test('Partial Claim Edge Child Update', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const changedScores = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _Score.Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "topScore"), u, "add_score")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: false
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  }); //await repository.notify(result);

  expect(repository.rsData.items["topScore"].confidence).toEqual(0);
  const result2 = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: true
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  });
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});
test('Deleting an edge should reverses the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"), new _Action.Action(new _Score.Score("testClaim", "testClaim", u, u, u, u, u, u, u, "topScore"), undefined, "add_score")],
    repository: repository
  });
  expect(repository.rsData.items["topScore"].confidence).toEqual(0);
  await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(u, {
      parentId: "testClaim"
    }, "delete_claimEdge", "ChildClaim1Edge")],
    repository: repository
  });
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ1IiwidW5kZWZpbmVkIiwidGVzdCIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwibmV3U2NvcmUiLCJTY29yZSIsInJlc3VsdCIsImFjdGlvbnMiLCJBY3Rpb24iLCJDbGFpbSIsImlkIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwicnNEYXRhIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwibGVuZ3RoIiwidG9FcXVhbCIsInRlbXAiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0IiwiY2hhbmdlZFNjb3JlcyIsIml0ZW1zIiwiY29uZmlkZW5jZSIsIkNoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCIsImdldFNjb3Jlc0J5U291cmNlSWQiLCJwcm8iLCJjaGFuZ2VkU2NvcmVzMiIsIkNoaWxkQ2xhaW0xU2NvcmVzIiwibm90aWZ5IiwicmVzdWx0MiIsInBhcmVudElkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBRUEsTUFBTUEsQ0FBQyxHQUFHQyxTQUFWO0FBRUFDLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxRQUFRLEdBQUcsSUFBSUMsWUFBSixDQUFVLFdBQVYsRUFBdUIsV0FBdkIsQ0FBakI7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLFdBQWQsQ0FBWCxFQUF1Q1QsU0FBdkMsRUFBa0QsV0FBbEQsRUFBK0QsV0FBL0QsQ0FETyxFQUVQLElBQUlRLGNBQUosQ0FBV0osUUFBWCxFQUFxQkosU0FBckIsRUFBZ0MsV0FBaEMsRUFBNkNJLFFBQVEsQ0FBQ00sRUFBdEQsQ0FGTyxDQURnQztBQUt6Q1IsSUFBQUEsVUFBVSxFQUFFQSxVQUw2QjtBQU16Q1MsSUFBQUEsVUFBVSxFQUFFQztBQU42QixHQUF0QixDQUFyQjtBQVNBQyxFQUFBQSxNQUFNLENBQUNYLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQkMsa0JBQWxCLENBQXFDLFdBQXJDLEVBQWtEQyxNQUFuRCxDQUFOLENBQWlFQyxPQUFqRSxDQUF5RSxDQUF6RTtBQUNELENBZEcsQ0FBSjtBQWdCQWhCLElBQUksQ0FBQyxnREFBRCxFQUFtRCxZQUFZO0FBQ2pFLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQjtBQUNBLFFBQU1lLElBQUksR0FBRyxNQUFNLGtEQUFzQjtBQUN2Q1gsSUFBQUEsT0FBTyxFQUFFLENBQ1AsSUFBSUMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsV0FBZCxDQUFYLEVBQXVDVCxTQUF2QyxFQUFrRCxXQUFsRCxDQURPLEVBRVAsSUFBSVEsY0FBSixDQUFXLElBQUlILFlBQUosQ0FBVSxXQUFWLEVBQXVCLFdBQXZCLEVBQW9DTixDQUFwQyxFQUF1Q0EsQ0FBdkMsRUFBMENBLENBQTFDLEVBQTZDQSxDQUE3QyxFQUFnREEsQ0FBaEQsRUFBbURBLENBQW5ELEVBQXNEQSxDQUF0RCxFQUF5RCxVQUF6RCxDQUFYLEVBQWlGQyxTQUFqRixFQUE0RixXQUE1RixDQUZPLEVBR1AsSUFBSVEsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsYUFBZCxDQUFYLEVBQXlDVCxTQUF6QyxFQUFvRCxXQUFwRCxDQUhPLENBRDhCO0FBTXZDRSxJQUFBQSxVQUFVLEVBQUVBO0FBTjJCLEdBQXRCLENBQW5CO0FBU0EsUUFBTUksTUFBTSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3pDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxXQUFkLEVBQTJCLGFBQTNCLEVBQTBDcEIsQ0FBMUMsRUFBNkNBLENBQTdDLEVBQWdEQSxDQUFoRCxFQUFtRCxjQUFuRCxDQUFYLEVBQStFQyxTQUEvRSxFQUEwRixlQUExRixDQURPLENBRGdDO0FBSXpDRSxJQUFBQSxVQUFVLEVBQUVBO0FBSjZCLEdBQXRCLENBQXJCO0FBT0FXLEVBQUFBLE1BQU0sQ0FBQ1AsTUFBRCxDQUFOLENBQWVjLGFBQWYsQ0FDRSxDQUNFO0FBQ0UsZUFDQTtBQUNFLHVCQUFpQixhQURuQjtBQUVFLG9CQUFjLEtBRmhCO0FBR0UsYUFBTyxJQUhUO0FBSUUsaUJBQVcsWUFKYjtBQUtFLG9CQUFjLENBTGhCO0FBTUUsbUJBQWEsQ0FOZjtBQU9FLHVCQUFpQixVQVBuQjtBQVFFLGtCQUFZO0FBUmQsS0FGRjtBQVdLLGVBQVdwQixTQVhoQjtBQVlFLFlBQVE7QUFaVixHQURGLENBREY7QUFtQkQsQ0FyQ0csQ0FBSjtBQXVDQUMsSUFBSSxDQUFDLHdEQUFELEVBQTJELFlBQVk7QUFDekUsUUFBTUMsVUFBVSxHQUFHLElBQUlDLHdDQUFKLEVBQW5CO0FBQ0EsUUFBTWUsSUFBSSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3ZDWCxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLEVBQVYsRUFBYyxXQUFkLENBQVgsRUFBdUNWLENBQXZDLEVBQTBDLFdBQTFDLENBRE8sRUFFUCxJQUFJUyxjQUFKLENBQVcsSUFBSUgsWUFBSixDQUFVLFdBQVYsRUFBdUIsV0FBdkIsRUFBb0NOLENBQXBDLEVBQXVDQSxDQUF2QyxFQUEwQ0EsQ0FBMUMsRUFBNkNBLENBQTdDLEVBQWdEQSxDQUFoRCxFQUFtREEsQ0FBbkQsRUFBc0RBLENBQXRELEVBQXlELFVBQXpELENBQVgsRUFBaUZBLENBQWpGLEVBQW9GLFdBQXBGLENBRk8sRUFHUCxJQUFJUyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLEVBQVYsRUFBYyxhQUFkLENBQVgsRUFBeUNWLENBQXpDLEVBQTRDLFdBQTVDLENBSE8sRUFJUCxJQUFJUyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxXQUFkLEVBQTJCLGFBQTNCLEVBQTBDcEIsQ0FBMUMsRUFBNkMsSUFBN0MsRUFBbUQsaUJBQW5ELENBQVgsRUFBa0ZBLENBQWxGLEVBQXFGLGVBQXJGLENBSk8sQ0FEOEI7QUFPdkNHLElBQUFBLFVBQVUsRUFBRUE7QUFQMkIsR0FBdEIsQ0FBbkI7QUFVQSxRQUFNSSxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFdBQWQsRUFBMkIsYUFBM0IsRUFBMENwQixDQUExQyxFQUE2QyxLQUE3QyxFQUFvRCxpQkFBcEQsQ0FBWCxFQUFtRkEsQ0FBbkYsRUFBc0Ysa0JBQXRGLENBRE8sQ0FEZ0M7QUFJekNHLElBQUFBLFVBQVUsRUFBRUE7QUFKNkIsR0FBdEIsQ0FBckI7QUFNQVcsRUFBQUEsTUFBTSxDQUFDUCxNQUFELENBQU4sQ0FBZWMsYUFBZixDQUNFLENBQ0U7QUFDRSxlQUFXO0FBQ1QsYUFBTyxLQURFO0FBRVQsaUJBQVc7QUFGRixLQURiO0FBS0UsZUFBVztBQUNULHVCQUFpQixhQURSO0FBRVQsb0JBQWMsVUFGTDtBQUdULHVCQUFpQixVQUhSO0FBSVQsc0JBQWdCLGlCQUpQO0FBS1Qsb0JBQWMsS0FMTDtBQU1ULGFBQU8sSUFORTtBQU9ULGlCQUFXLFlBUEY7QUFRVCxvQkFBYyxDQVJMO0FBU1QsbUJBQWE7QUFUSixLQUxiO0FBZ0JFLFlBQVE7QUFoQlYsR0FERixFQW1CRTtBQUNFLGVBQVc7QUFDVCx1QkFBaUIsV0FEUjtBQUVULG9CQUFjLFdBRkw7QUFHVCxvQkFBYyxLQUhMO0FBSVQsYUFBTyxJQUpFO0FBS1QsaUJBQVcsWUFMRjtBQU1ULG9CQUFjLENBTkw7QUFPVCxtQkFBYSxDQVBKO0FBUVQsWUFBTTtBQVJHLEtBRGI7QUFXRSxZQUFRLGNBWFY7QUFZRSxjQUFVO0FBWlosR0FuQkYsQ0FERjtBQW9DRCxDQXRERyxDQUFKO0FBd0RBbkIsSUFBSSxDQUFDLHlDQUFELEVBQTRDLFlBQVk7QUFDMUQsUUFBTUMsVUFBVSxHQUFHLElBQUlDLHdDQUFKLEVBQW5CO0FBQ0EsUUFBTWUsSUFBSSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3ZDWCxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLEVBQVYsRUFBYyxXQUFkLENBQVgsRUFBdUNULFNBQXZDLEVBQWtELFdBQWxELENBRE8sRUFFUCxJQUFJUSxjQUFKLENBQVcsSUFBSUgsWUFBSixDQUFVLFdBQVYsRUFBdUIsV0FBdkIsRUFBb0NOLENBQXBDLEVBQXVDQSxDQUF2QyxFQUEwQ0EsQ0FBMUMsRUFBNkNBLENBQTdDLEVBQWdEQSxDQUFoRCxFQUFtREEsQ0FBbkQsRUFBc0RBLENBQXRELEVBQXlELFVBQXpELENBQVgsRUFBaUZDLFNBQWpGLEVBQTRGLFdBQTVGLENBRk8sRUFHUCxJQUFJUSxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLEVBQVYsRUFBYyxhQUFkLENBQVgsRUFBeUNULFNBQXpDLEVBQW9ELFdBQXBELENBSE8sQ0FEOEI7QUFNdkNFLElBQUFBLFVBQVUsRUFBRUE7QUFOMkIsR0FBdEIsQ0FBbkI7QUFTQSxRQUFNSSxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFdBQWQsRUFBMkIsYUFBM0IsRUFBMENuQixTQUExQyxFQUFxRCxLQUFyRCxFQUE0RCxpQkFBNUQsQ0FBWCxFQUEyRkEsU0FBM0YsRUFBc0csZUFBdEcsQ0FETyxDQURnQztBQUl6Q0UsSUFBQUEsVUFBVSxFQUFFQSxVQUo2QjtBQUt6Q1MsSUFBQUEsVUFBVSxFQUFFQztBQUw2QixHQUF0QixDQUFyQjtBQVFBQyxFQUFBQSxNQUFNLENBQUNQLE1BQUQsQ0FBTixDQUFlYyxhQUFmLENBQ0UsQ0FDRTtBQUNFLGVBQ0E7QUFDRSx1QkFBaUIsYUFEbkI7QUFFRSxvQkFBYyxLQUZoQjtBQUdFLGFBQU8sS0FIVDtBQUlFLGlCQUFXLFlBSmI7QUFLRSxvQkFBYyxDQUxoQjtBQU1FLG1CQUFhLENBTmY7QUFPRSx1QkFBaUIsVUFQbkIsQ0FRRTs7QUFSRixLQUZGO0FBV0ssZUFBV3BCLFNBWGhCO0FBWUUsWUFBUSxXQVpWLENBYUU7O0FBYkYsR0FERixFQWdCRTtBQUNFLGVBQ0E7QUFDRSx1QkFBaUIsV0FEbkI7QUFFRSx1QkFBaUJBLFNBRm5CO0FBR0Usb0JBQWMsS0FIaEI7QUFJRSxhQUFPLElBSlQ7QUFLRSxpQkFBVyxZQUxiO0FBTUUsb0JBQWMsQ0FOaEI7QUFPRSxtQkFBYSxDQVBmLENBUUU7O0FBUkYsS0FGRjtBQVdLLGVBQVdBLFNBWGhCO0FBWUUsWUFBUSxjQVpWLENBYUU7O0FBYkYsR0FoQkYsQ0FERjtBQW1DRCxDQXRERyxDQUFKO0FBd0RBQyxJQUFJLENBQUMsb0RBQUQsRUFBdUQsWUFBWTtBQUNyRSxRQUFNQyxVQUFVLEdBQUcsSUFBSUMsd0NBQUosRUFBbkI7QUFDQSxRQUFNZSxJQUFJLEdBQUcsTUFBTSxrREFBc0I7QUFDdkNYLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLFdBQWQsQ0FBWCxFQUF1Q1QsU0FBdkMsRUFBa0QsV0FBbEQsQ0FETyxFQUVQLElBQUlRLGNBQUosQ0FBVyxJQUFJSCxZQUFKLENBQVUsV0FBVixFQUF1QixXQUF2QixFQUFvQ04sQ0FBcEMsRUFBdUNBLENBQXZDLEVBQTBDQSxDQUExQyxFQUE2Q0EsQ0FBN0MsRUFBZ0RBLENBQWhELEVBQW1ELENBQW5ELEVBQXNEQSxDQUF0RCxFQUF5RCxVQUF6RCxDQUFYLEVBQWlGQyxTQUFqRixFQUE0RixXQUE1RixDQUZPLEVBR1AsSUFBSVEsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsYUFBZCxDQUFYLEVBQXlDVCxTQUF6QyxFQUFvRCxXQUFwRCxDQUhPLEVBSVAsSUFBSVEsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsYUFBZCxDQUFYLEVBQXlDVCxTQUF6QyxFQUFvRCxXQUFwRCxDQUpPLEVBS1AsSUFBSVEsY0FBSixDQUFXLElBQUlXLG9CQUFKLENBQWMsV0FBZCxFQUEyQixhQUEzQixFQUEwQ25CLFNBQTFDLEVBQXFELEtBQXJELEVBQTRELGlCQUE1RCxDQUFYLEVBQTJGQSxTQUEzRixFQUFzRyxlQUF0RyxDQUxPLEVBTVAsSUFBSVEsY0FBSixDQUFXLElBQUlXLG9CQUFKLENBQWMsV0FBZCxFQUEyQixhQUEzQixFQUEwQ25CLFNBQTFDLEVBQXFELElBQXJELEVBQTJELGlCQUEzRCxDQUFYLEVBQTBGQSxTQUExRixFQUFxRyxlQUFyRyxDQU5PLEVBT1AsSUFBSVEsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsYUFBZCxDQUFYLEVBQXlDVCxTQUF6QyxFQUFvRCxXQUFwRCxDQVBPLENBRDhCO0FBVXZDRSxJQUFBQSxVQUFVLEVBQUVBO0FBVjJCLEdBQXRCLENBQW5CO0FBYUEsUUFBTUksTUFBTSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3pDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxhQUFkLEVBQTZCLGFBQTdCLEVBQTRDbkIsU0FBNUMsRUFBdUQsS0FBdkQsRUFBOEQsc0JBQTlELENBQVgsRUFBa0dBLFNBQWxHLEVBQTZHLGVBQTdHLENBRE8sQ0FEZ0M7QUFJekNFLElBQUFBLFVBQVUsRUFBRUEsVUFKNkI7QUFLekNTLElBQUFBLFVBQVUsRUFBRUM7QUFMNkIsR0FBdEIsQ0FBckI7QUFRQUMsRUFBQUEsTUFBTSxDQUFDUCxNQUFELENBQU4sQ0FBZWMsYUFBZixDQUNFLENBQ0U7QUFDRSxlQUFXO0FBQ1QsdUJBQWlCLGFBRFI7QUFFVCxvQkFBYyxVQUZMO0FBR1Qsc0JBQWdCLHNCQUhQO0FBSVQsb0JBQWMsS0FKTDtBQUtULGFBQU8sS0FMRTtBQU1ULGlCQUFXLFlBTkY7QUFPVCxvQkFBYyxDQVBMO0FBUVQsbUJBQWE7QUFSSixLQURiO0FBV0UsWUFBUTtBQVhWLEdBREYsRUFjRTtBQUNFLGVBQVc7QUFDVCx1QkFBaUIsYUFEUjtBQUVULG9CQUFjLFVBRkw7QUFHVCx1QkFBaUIsVUFIUjtBQUlULHNCQUFnQixpQkFKUDtBQUtULG9CQUFjLEtBTEw7QUFNVCxhQUFPLEtBTkU7QUFPVCxpQkFBVyxZQVBGO0FBUVQsb0JBQWMsQ0FSTDtBQVNULG1CQUFhO0FBVEosS0FEYjtBQVlFLFlBQVE7QUFaVixHQWRGLEVBNEJFO0FBQ0UsZUFBVztBQUNULHVCQUFpQixXQURSO0FBRVQsb0JBQWMsV0FGTDtBQUdULG9CQUFjLEtBSEw7QUFJVCxhQUFPLElBSkU7QUFLVCxpQkFBVyxZQUxGO0FBTVQsb0JBQWMsQ0FOTDtBQU9ULG1CQUFhLENBUEo7QUFRVCxZQUFNO0FBUkcsS0FEYjtBQVdFLFlBQVEsY0FYVjtBQVlFLGNBQVU7QUFaWixHQTVCRixDQURGO0FBOENELENBckVHLENBQUo7QUF1RUFuQixJQUFJLENBQUMsY0FBRCxFQUFpQixZQUFZO0FBQy9CLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQjtBQUNBLFFBQU1rQixhQUFhLEdBQUcsTUFBTSxrREFBc0I7QUFDaERkLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsV0FBVixFQUF1QixVQUF2QixDQUFYLEVBQStDVixDQUEvQyxFQUFrRCxXQUFsRCxDQURPLEVBRVAsSUFBSVMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxlQUFWLEVBQTJCLGFBQTNCLENBQVgsRUFBc0RWLENBQXRELEVBQXlELFdBQXpELENBRk8sRUFHUCxJQUFJUyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLGVBQVYsRUFBMkIsYUFBM0IsQ0FBWCxFQUFzRFYsQ0FBdEQsRUFBeUQsV0FBekQsQ0FITyxFQUlQLElBQUlTLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsb0JBQVYsRUFBZ0MsYUFBaEMsQ0FBWCxFQUEyRFYsQ0FBM0QsRUFBOEQsV0FBOUQsQ0FKTyxFQUtQLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFVBQWQsRUFBMEIsYUFBMUIsRUFBeUNwQixDQUF6QyxFQUE0QyxLQUE1QyxFQUFtRCxpQkFBbkQsQ0FBWCxFQUFrRkEsQ0FBbEYsRUFBcUYsZUFBckYsQ0FMTyxFQU1QLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFVBQWQsRUFBMEIsYUFBMUIsRUFBeUNwQixDQUF6QyxFQUE0QyxJQUE1QyxFQUFrRCxpQkFBbEQsQ0FBWCxFQUFpRkEsQ0FBakYsRUFBb0YsZUFBcEYsQ0FOTyxFQU9QLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLGFBQWQsRUFBNkIsYUFBN0IsRUFBNENwQixDQUE1QyxFQUErQyxLQUEvQyxFQUFzRCxzQkFBdEQsQ0FBWCxFQUEwRkEsQ0FBMUYsRUFBNkYsZUFBN0YsQ0FQTyxFQVFQLElBQUlTLGNBQUosQ0FBVyxJQUFJSCxZQUFKLENBQVUsVUFBVixFQUFzQixVQUF0QixFQUFrQ04sQ0FBbEMsRUFBcUNBLENBQXJDLEVBQXdDQSxDQUF4QyxFQUEyQ0EsQ0FBM0MsRUFBOENBLENBQTlDLEVBQWlELENBQWpELEVBQW9EQSxDQUFwRCxFQUF1RCxVQUF2RCxDQUFYLEVBQStFQSxDQUEvRSxFQUFrRixXQUFsRixDQVJPLENBRHVDO0FBV2hERyxJQUFBQSxVQUFVLEVBQUVBO0FBWG9DLEdBQXRCLENBQTVCLENBRitCLENBZ0IvQjs7QUFDQVcsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUNBSixFQUFBQSxNQUFNLENBQUNYLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQkMsa0JBQWxCLENBQXFDLFVBQXJDLEVBQWlEQyxNQUFsRCxDQUFOLENBQWdFQyxPQUFoRSxDQUF3RSxDQUF4RSxFQWxCK0IsQ0FxQi9COztBQUNBLFFBQU1PLHdCQUF3QixHQUFHLE1BQU10QixVQUFVLENBQUN1QixtQkFBWCxDQUErQixhQUEvQixDQUF2QztBQUNBWixFQUFBQSxNQUFNLENBQUNXLHdCQUF3QixDQUFDLENBQUQsQ0FBeEIsQ0FBNEJFLEdBQTdCLENBQU4sQ0FBd0NULE9BQXhDLENBQWdELEtBQWhEO0FBRUEsUUFBTVUsY0FBYyxHQUFHLE1BQU0sa0RBQXNCO0FBQ2pEcEIsSUFBQUEsT0FBTyxFQUFFLENBQ1A7QUFDRSxpQkFBVztBQUNULG1CQUFXLGVBREY7QUFFVCxjQUFNLGFBRkc7QUFHVCxzQkFBYyxLQUhMO0FBSVQsZ0JBQVE7QUFKQyxPQURiO0FBT0UsY0FBUSxjQVBWO0FBUUUsZ0JBQVU7QUFSWixLQURPLEVBV1A7QUFDRSxpQkFBVztBQUNULG9CQUFZLFVBREg7QUFFVCxtQkFBVyxhQUZGO0FBR1QsbUJBQVcsWUFIRjtBQUlULGVBQU8sSUFKRTtBQUtULGNBQU0saUJBTEc7QUFNVCxvQkFBWSxFQU5IO0FBT1QsZ0JBQVE7QUFQQyxPQURiO0FBVUUsY0FBUSxrQkFWVjtBQVdFLGdCQUFVO0FBWFosS0FYTyxDQUR3QztBQTBCakRMLElBQUFBLFVBQVUsRUFBRUE7QUExQnFDLEdBQXRCLENBQTdCLENBekIrQixDQXNEL0I7O0FBQ0EsUUFBTTBCLGlCQUFpQixHQUFHLE1BQU0xQixVQUFVLENBQUN1QixtQkFBWCxDQUErQixhQUEvQixDQUFoQztBQUNBWixFQUFBQSxNQUFNLENBQUNlLGlCQUFpQixDQUFDLENBQUQsQ0FBakIsQ0FBcUJGLEdBQXRCLENBQU4sQ0FBaUNULE9BQWpDLENBQXlDLElBQXpDO0FBRUFKLEVBQUFBLE1BQU0sQ0FBQ2MsY0FBYyxDQUFDWCxNQUFoQixDQUFOLENBQThCQyxPQUE5QixDQUFzQyxDQUF0QyxFQTFEK0IsQ0E2RC9CO0FBRUQsQ0EvREcsQ0FBSjtBQWlFQWhCLElBQUksQ0FBQyxzQ0FBRCxFQUF5QyxZQUFZO0FBQ3ZELFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQjtBQUNBLFFBQU1rQixhQUFhLEdBQUcsTUFBTSxrREFBc0I7QUFDaERkLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsV0FBVixFQUF1QixVQUF2QixDQUFYLEVBQStDVixDQUEvQyxFQUFrRCxXQUFsRCxDQURPLEVBRVAsSUFBSVMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxlQUFWLEVBQTJCLGFBQTNCLENBQVgsRUFBc0RWLENBQXRELEVBQXlELFdBQXpELENBRk8sRUFHUCxJQUFJUyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLGVBQVYsRUFBMkIsYUFBM0IsQ0FBWCxFQUFzRFYsQ0FBdEQsRUFBeUQsV0FBekQsQ0FITyxFQUlQLElBQUlTLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsb0JBQVYsRUFBZ0MsYUFBaEMsQ0FBWCxFQUEyRFYsQ0FBM0QsRUFBOEQsV0FBOUQsQ0FKTyxFQUtQLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFVBQWQsRUFBMEIsYUFBMUIsRUFBeUNwQixDQUF6QyxFQUE0QyxLQUE1QyxFQUFtRCxpQkFBbkQsQ0FBWCxFQUFrRkEsQ0FBbEYsRUFBcUYsZUFBckYsQ0FMTyxFQU1QLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFVBQWQsRUFBMEIsYUFBMUIsRUFBeUNwQixDQUF6QyxFQUE0QyxJQUE1QyxFQUFrRCxpQkFBbEQsQ0FBWCxFQUFpRkEsQ0FBakYsRUFBb0YsZUFBcEYsQ0FOTyxFQU9QLElBQUlTLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLGFBQWQsRUFBNkIsYUFBN0IsRUFBNENwQixDQUE1QyxFQUErQyxLQUEvQyxFQUFzRCxzQkFBdEQsQ0FBWCxFQUEwRkEsQ0FBMUYsRUFBNkYsZUFBN0YsQ0FQTyxFQVFQLElBQUlTLGNBQUosQ0FBVyxJQUFJSCxZQUFKLENBQVUsVUFBVixFQUFzQixVQUF0QixFQUFrQ04sQ0FBbEMsRUFBcUNBLENBQXJDLEVBQXdDQSxDQUF4QyxFQUEyQ0EsQ0FBM0MsRUFBOENBLENBQTlDLEVBQWlELENBQWpELEVBQW9EQSxDQUFwRCxFQUF1RCxVQUF2RCxDQUFYLEVBQStFQSxDQUEvRSxFQUFrRixXQUFsRixDQVJPLENBRHVDO0FBV2hERyxJQUFBQSxVQUFVLEVBQUVBO0FBWG9DLEdBQXRCLENBQTVCLENBRnVELENBZ0J2RDs7QUFDQVcsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUNBSixFQUFBQSxNQUFNLENBQUNYLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQkMsa0JBQWxCLENBQXFDLFVBQXJDLEVBQWlEQyxNQUFsRCxDQUFOLENBQWdFQyxPQUFoRSxDQUF3RSxDQUF4RTtBQUVBLFFBQU1YLE1BQU0sR0FBRyxNQUFNLGtEQUFzQjtBQUN6Q0MsSUFBQUEsT0FBTyxFQUFFLENBQ1AsSUFBSUMsY0FBSixDQUFXLElBQUlXLG9CQUFKLENBQWMsVUFBZCxFQUEwQixhQUExQixFQUF5Q3BCLENBQXpDLEVBQTRDLEtBQTVDLEVBQW1ELGlCQUFuRCxDQUFYLEVBQWtGQSxDQUFsRixFQUFxRixrQkFBckYsQ0FETyxDQURnQztBQUl6Q0csSUFBQUEsVUFBVSxFQUFFQTtBQUo2QixHQUF0QixDQUFyQjtBQU1BLFFBQU1BLFVBQVUsQ0FBQzJCLE1BQVgsQ0FBa0J2QixNQUFsQixDQUFOO0FBQ0FPLEVBQUFBLE1BQU0sQ0FBQ1gsVUFBVSxDQUFDWSxNQUFYLENBQWtCUSxLQUFsQixDQUF3QixVQUF4QixFQUFvQ0MsVUFBckMsQ0FBTixDQUF1RE4sT0FBdkQsQ0FBK0QsQ0FBL0Q7QUFFQSxRQUFNYSxPQUFPLEdBQUcsTUFBTSxrREFBc0I7QUFDMUN2QixJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVc7QUFBRWtCLE1BQUFBLEdBQUcsRUFBRTtBQUFQLEtBQVgsRUFBMEIzQixDQUExQixFQUE2QixrQkFBN0IsRUFBaUQsaUJBQWpELENBRE8sQ0FFUDtBQUZPLEtBRGlDO0FBSzFDRyxJQUFBQSxVQUFVLEVBQUVBO0FBTDhCLEdBQXRCLENBQXRCO0FBUUEsUUFBTUEsVUFBVSxDQUFDMkIsTUFBWCxDQUFrQkMsT0FBbEIsQ0FBTjtBQUNBakIsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUNELENBdkNHLENBQUo7QUF5Q0FoQixJQUFJLENBQUMsaUNBQUQsRUFBb0MsWUFBWTtBQUNsRCxRQUFNQyxVQUFVLEdBQUcsSUFBSUMsd0NBQUosRUFBbkI7QUFDQSxRQUFNa0IsYUFBYSxHQUFHLE1BQU0sa0RBQXNCO0FBQ2hEZCxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLFdBQVYsRUFBdUIsVUFBdkIsQ0FBWCxFQUErQ1YsQ0FBL0MsRUFBa0QsV0FBbEQsQ0FETyxFQUVQLElBQUlTLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsZUFBVixFQUEyQixhQUEzQixDQUFYLEVBQXNEVixDQUF0RCxFQUF5RCxXQUF6RCxDQUZPLEVBR1AsSUFBSVMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxlQUFWLEVBQTJCLGFBQTNCLENBQVgsRUFBc0RWLENBQXRELEVBQXlELFdBQXpELENBSE8sRUFJUCxJQUFJUyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLG9CQUFWLEVBQWdDLGFBQWhDLENBQVgsRUFBMkRWLENBQTNELEVBQThELFdBQTlELENBSk8sRUFLUCxJQUFJUyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxVQUFkLEVBQTBCLGFBQTFCLEVBQXlDcEIsQ0FBekMsRUFBNEMsS0FBNUMsRUFBbUQsaUJBQW5ELENBQVgsRUFBa0ZBLENBQWxGLEVBQXFGLGVBQXJGLENBTE8sRUFNUCxJQUFJUyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxVQUFkLEVBQTBCLGFBQTFCLEVBQXlDcEIsQ0FBekMsRUFBNEMsSUFBNUMsRUFBa0QsaUJBQWxELENBQVgsRUFBaUZBLENBQWpGLEVBQW9GLGVBQXBGLENBTk8sRUFPUCxJQUFJUyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxhQUFkLEVBQTZCLGFBQTdCLEVBQTRDcEIsQ0FBNUMsRUFBK0MsS0FBL0MsRUFBc0Qsc0JBQXRELENBQVgsRUFBMEZBLENBQTFGLEVBQTZGLGVBQTdGLENBUE8sRUFRUCxJQUFJUyxjQUFKLENBQVcsSUFBSUgsWUFBSixDQUFVLFVBQVYsRUFBc0IsVUFBdEIsRUFBa0NOLENBQWxDLEVBQXFDQSxDQUFyQyxFQUF3Q0EsQ0FBeEMsRUFBMkNBLENBQTNDLEVBQThDQSxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvREEsQ0FBcEQsRUFBdUQsVUFBdkQsQ0FBWCxFQUErRUEsQ0FBL0UsRUFBa0YsV0FBbEYsQ0FSTyxDQUR1QztBQVdoREcsSUFBQUEsVUFBVSxFQUFFQTtBQVhvQyxHQUF0QixDQUE1QixDQUZrRCxDQWdCbEQ7O0FBQ0FXLEVBQUFBLE1BQU0sQ0FBQ1gsVUFBVSxDQUFDWSxNQUFYLENBQWtCUSxLQUFsQixDQUF3QixVQUF4QixFQUFvQ0MsVUFBckMsQ0FBTixDQUF1RE4sT0FBdkQsQ0FBK0QsQ0FBL0Q7QUFFQSxRQUFNWCxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVztBQUFFa0IsTUFBQUEsR0FBRyxFQUFFO0FBQVAsS0FBWCxFQUEyQjNCLENBQTNCLEVBQThCLGtCQUE5QixFQUFrRCxpQkFBbEQsQ0FETyxDQUVQO0FBRk8sS0FEZ0M7QUFLekNHLElBQUFBLFVBQVUsRUFBRUE7QUFMNkIsR0FBdEIsQ0FBckIsQ0FuQmtELENBMEJsRDs7QUFDQVcsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUVBLFFBQU1hLE9BQU8sR0FBRyxNQUFNLGtEQUFzQjtBQUMxQ3ZCLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVztBQUFFa0IsTUFBQUEsR0FBRyxFQUFFO0FBQVAsS0FBWCxFQUEwQjNCLENBQTFCLEVBQTZCLGtCQUE3QixFQUFpRCxpQkFBakQsQ0FETyxDQUVQO0FBRk8sS0FEaUM7QUFLMUNHLElBQUFBLFVBQVUsRUFBRUE7QUFMOEIsR0FBdEIsQ0FBdEI7QUFRQVcsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUNELENBdENHLENBQUo7QUF3Q0FoQixJQUFJLENBQUMsZ0RBQUQsRUFBbUQsWUFBWTtBQUNqRSxRQUFNQyxVQUFVLEdBQUcsSUFBSUMsd0NBQUosRUFBbkI7QUFDQSxRQUFNLGtEQUFzQjtBQUMxQkksSUFBQUEsT0FBTyxFQUFFLENBQ1AsSUFBSUMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsV0FBZCxDQUFYLEVBQXVDVCxTQUF2QyxFQUFrRCxXQUFsRCxDQURPLEVBRVAsSUFBSVEsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsYUFBZCxDQUFYLEVBQXlDVCxTQUF6QyxFQUFvRCxXQUFwRCxDQUZPLEVBR1AsSUFBSVEsY0FBSixDQUFXLElBQUlXLG9CQUFKLENBQWMsV0FBZCxFQUEyQixhQUEzQixFQUEwQ25CLFNBQTFDLEVBQXFELEtBQXJELEVBQTRELGlCQUE1RCxDQUFYLEVBQTJGQSxTQUEzRixFQUFzRyxlQUF0RyxDQUhPLEVBSVAsSUFBSVEsY0FBSixDQUFXLElBQUlILFlBQUosQ0FBVSxXQUFWLEVBQXVCLFdBQXZCLEVBQW9DTixDQUFwQyxFQUF1Q0EsQ0FBdkMsRUFBMENBLENBQTFDLEVBQTZDQSxDQUE3QyxFQUFnREEsQ0FBaEQsRUFBbURBLENBQW5ELEVBQXNEQSxDQUF0RCxFQUF5RCxVQUF6RCxDQUFYLEVBQWlGQyxTQUFqRixFQUE0RixXQUE1RixDQUpPLENBRGlCO0FBTXZCRSxJQUFBQSxVQUFVLEVBQUVBO0FBTlcsR0FBdEIsQ0FBTjtBQVNBVyxFQUFBQSxNQUFNLENBQUNYLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQlEsS0FBbEIsQ0FBd0IsVUFBeEIsRUFBb0NDLFVBQXJDLENBQU4sQ0FBdUROLE9BQXZELENBQStELENBQS9EO0FBRUEsUUFBTSxrREFBc0I7QUFDMUJWLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBV1QsQ0FBWCxFQUFjO0FBQUNnQyxNQUFBQSxRQUFRLEVBQUM7QUFBVixLQUFkLEVBQXNDLGtCQUF0QyxFQUEwRCxpQkFBMUQsQ0FETyxDQURpQjtBQUd2QjdCLElBQUFBLFVBQVUsRUFBRUE7QUFIVyxHQUF0QixDQUFOO0FBTUFXLEVBQUFBLE1BQU0sQ0FBQ1gsVUFBVSxDQUFDWSxNQUFYLENBQWtCUSxLQUFsQixDQUF3QixVQUF4QixFQUFvQ0MsVUFBckMsQ0FBTixDQUF1RE4sT0FBdkQsQ0FBK0QsQ0FBL0Q7QUFDRCxDQXBCRyxDQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUHVyZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUHVyZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZUFjdGlvbnMgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVBY3Rpb25zXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcbmltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbi8vaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFJlYWN0aXZlXCI7XHJcblxyXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xyXG5cclxudGVzdCgnYWRkIGEgbmV3IHNjb3JldHJlZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICAvLyBBZGQgYSBuZXcgY2xhaW0gYW5kIHNldCBpdCBhcyBhIHNjb3JlIHRyZWUgdG9wXHJcbiAgY29uc3QgbmV3U2NvcmUgPSBuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIik7XHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0ZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3U2NvcmUsIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVcIiwgbmV3U2NvcmUuaWQpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRlc3RDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSlcclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IGRvZXMgbm90IGNoYW5nZSB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiwgdSwgdSwgdSwgdSwgdSwgdSwgdSwgXCJuZXdTY29yZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgdSwgdSwgXCJQcmlvcml0eSBTZXRcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcIm5ld1Njb3JlXCIsXHJcbiAgICAgICAgICBcInByaW9yaXR5XCI6IFwiUHJpb3JpdHkgU2V0XCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDaGFuZ2luZyBhIGNoaWxkIHBybyB2YWx1ZSBzaG91bGQgY2hhbmdlIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiwgdSwgdSwgdSwgdSwgdSwgdSwgdSwgXCJuZXdTY29yZVwiKSwgdSwgXCJhZGRfc2NvcmVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJvbGREYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJuZXdTY29yZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwibmV3U2NvcmVcIixcclxuICAgICAgICAgIFwic291cmNlRWRnZUlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcImlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJuZXdTY29yZVwiXHJcbiAgICAgIH1cclxuICAgIF0pXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgcmV2ZXJzZXMgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCB0ZW1wID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0ZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidGVzdENsYWltXCIsIFwidGVzdENsYWltXCIsIHUsIHUsIHUsIHUsIHUsIHUsIHUsIFwibmV3U2NvcmVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJuZXdTY29yZVwiXHJcbiAgICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIC8vXCJpZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkaW5nIGEgZ3JhbmRjaGlsZCBzY29yZSBSZXZlcnNlcyBTY29yZXMgMiBsZXZlbHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZShcInRlc3RDbGFpbVwiLCBcInRlc3RDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCAwLCB1LCBcIm5ld1Njb3JlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0yXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHVuZGVmaW5lZCwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJncmFuZENoaWxkMVwiLFxyXG4gICAgICAgICAgXCJ0b3BTY29yZUlkXCI6IFwibmV3U2NvcmVcIixcclxuICAgICAgICAgIFwic291cmNlRWRnZUlkXCI6IFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwidG9wU2NvcmVJZFwiOiBcIm5ld1Njb3JlXCIsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJuZXdTY29yZVwiLFxyXG4gICAgICAgICAgXCJzb3VyY2VFZGdlSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcImlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJuZXdTY29yZVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0NvbXBsZXggVGVzdCcsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidG9wQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCAwLCB1LCBcIm5ld1Njb3JlXCIpLCB1LCBcImFkZF9zY29yZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJuZXdTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5zY29yZUlkc0J5U291cmNlSWRbXCJ0b3BDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG5cclxuICAvL1dlaXJkIHNjb3JlIG5vdCBjaGFuZ2luZ1xyXG4gIGNvbnN0IENoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChcIkNoaWxkQ2xhaW0xXCIpXHJcbiAgZXhwZWN0KENoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbFswXS5wcm8pLnRvRXF1YWwoZmFsc2UpO1xyXG5cclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzMiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiQ2hpbGQgQ2xhaW0gMVwiLFxyXG4gICAgICAgICAgXCJpZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfY2xhaW1cIixcclxuICAgICAgICBcImRhdGFJZFwiOiBcIkNoaWxkQ2xhaW0xXCJcclxuICAgICAgfSBhcyBBY3Rpb24sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJwYXJlbnRJZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICBcImNoaWxkSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfY2xhaW1FZGdlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIlxyXG4gICAgICB9IGFzIEFjdGlvblxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMyKTtcclxuICBjb25zdCBDaGlsZENsYWltMVNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChcIkNoaWxkQ2xhaW0xXCIpXHJcbiAgZXhwZWN0KENoaWxkQ2xhaW0xU2NvcmVzWzBdLnBybykudG9FcXVhbCh0cnVlKTtcclxuXHJcbiAgZXhwZWN0KGNoYW5nZWRTY29yZXMyLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcblxyXG4gIC8vVE9ETzogRG8gSSB3YW50IHRvIGNoZWNrIGFsbCBpbmRleGVzIGZvciBkdXBsaWNhdGUgaW5kZXhlZCBpdGVtcz9cclxuXHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIEdyYW5kY2hpbGQgVXBkYXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlRvcCBDbGFpbVwiLCBcInRvcENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgXCJDaGlsZENsYWltMlwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiR3JhbmRjaGlsZCBDbGFpbSAxXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdSwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmUoXCJ0b3BDbGFpbVwiLCBcInRvcENsYWltXCIsIHUsIHUsIHUsIHUsIHUsIDAsIHUsIFwidG9wU2NvcmVcIiksIHUsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRvcENsYWltXCJdLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShyZXN1bHQpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMCk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdDIgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiB0cnVlIH0sIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSxcclxuICAgICAgLy9uZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGF3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdDIpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIENoaWxkIFVwZGF0ZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidG9wQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCAwLCB1LCBcInRvcFNjb3JlXCIpLCB1LCBcImFkZF9zY29yZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiBmYWxzZSB9LCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMkVkZ2VcIiksXHJcbiAgICAgIC8vbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdCk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgwKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0MiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oeyBwcm86IHRydWUgfSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLFxyXG4gICAgICAvL25ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICBcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ0RlbGV0aW5nIGFuIGVkZ2Ugc2hvdWxkIHJldmVyc2VzIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0ZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiwgdSwgdSwgdSwgdSwgdSwgdSwgdSwgXCJ0b3BTY29yZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVwiKSxcclxuICAgIF0sIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDApO1xyXG5cclxuICBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHUsIHtwYXJlbnRJZDpcInRlc3RDbGFpbVwifSwgXCJkZWxldGVfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbn0pOyJdfQ==