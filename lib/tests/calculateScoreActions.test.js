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
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1"), undefined, "add_claimEdge")],
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
      "parentScoreId": "newScore" //"dataId": "Ya3ZeuTmGUZq"

    },
    "oldData": undefined,
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

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
  debugger; //await repository.notify(result2);

  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ1IiwidW5kZWZpbmVkIiwidGVzdCIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwibmV3U2NvcmUiLCJTY29yZSIsInJlc3VsdCIsImFjdGlvbnMiLCJBY3Rpb24iLCJDbGFpbSIsImlkIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwicnNEYXRhIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwibGVuZ3RoIiwidG9FcXVhbCIsInRlbXAiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0IiwiY2hhbmdlZFNjb3JlcyIsIml0ZW1zIiwiY29uZmlkZW5jZSIsIkNoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCIsImdldFNjb3Jlc0J5U291cmNlSWQiLCJwcm8iLCJjaGFuZ2VkU2NvcmVzMiIsIkNoaWxkQ2xhaW0xU2NvcmVzIiwibm90aWZ5IiwicmVzdWx0MiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUVBLE1BQU1BLENBQUMsR0FBR0MsU0FBVjtBQUVBQyxJQUFJLENBQUMscUJBQUQsRUFBd0IsWUFBWTtBQUN0QyxRQUFNQyxVQUFVLEdBQUcsSUFBSUMsd0NBQUosRUFBbkIsQ0FEc0MsQ0FFdEM7O0FBQ0EsUUFBTUMsUUFBUSxHQUFHLElBQUlDLFlBQUosQ0FBVSxXQUFWLEVBQXVCLFdBQXZCLENBQWpCO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3pDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSUMsWUFBSixDQUFVLEVBQVYsRUFBYyxXQUFkLENBQVgsRUFBdUNULFNBQXZDLEVBQWtELFdBQWxELEVBQStELFdBQS9ELENBRE8sRUFFUCxJQUFJUSxjQUFKLENBQVdKLFFBQVgsRUFBcUJKLFNBQXJC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UCxJQUFJQyxjQUFKLENBQVc7QUFBQ2tCLE1BQUFBLEdBQUcsRUFBQztBQUFMLEtBQVgsRUFBdUIzQixDQUF2QixFQUEwQixrQkFBMUIsRUFBNkMsaUJBQTdDLENBRE8sQ0FFUDtBQUZPLEtBRGlDO0FBSzFDRyxJQUFBQSxVQUFVLEVBQUVBO0FBTDhCLEdBQXRCLENBQXRCO0FBT0EsV0FwQ2tELENBcUNsRDs7QUFDQVcsRUFBQUEsTUFBTSxDQUFDWCxVQUFVLENBQUNZLE1BQVgsQ0FBa0JRLEtBQWxCLENBQXdCLFVBQXhCLEVBQW9DQyxVQUFyQyxDQUFOLENBQXVETixPQUF2RCxDQUErRCxDQUEvRDtBQUNELENBdkNHLENBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5TG9jYWxQdXJlIH0gZnJvbSBcIi4uL3JlcG9zaXRvcmllcy9SZXBvc2l0b3J5TG9jYWxQdXJlXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZUFjdGlvbnNcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9BY3Rpb25cIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuLy9pbXBvcnQgeyBSZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmVcIjtcclxuXHJcbmNvbnN0IHUgPSB1bmRlZmluZWQ7XHJcblxyXG50ZXN0KCdhZGQgYSBuZXcgc2NvcmV0cmVlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIC8vIEFkZCBhIG5ldyBjbGFpbSBhbmQgc2V0IGl0IGFzIGEgc2NvcmUgdHJlZSB0b3BcclxuICBjb25zdCBuZXdTY29yZSA9IG5ldyBTY29yZShcInRlc3RDbGFpbVwiLCBcInRlc3RDbGFpbVwiKTtcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiLCBcInRlc3RDbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXdTY29yZSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVwiLCBuZXdTY29yZS5pZClcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeVNvdXJjZUlkW1widGVzdENsYWltXCJdLmxlbmd0aCkudG9FcXVhbCgxKVxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgZG9lcyBub3QgY2hhbmdlIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZShcInRlc3RDbGFpbVwiLCBcInRlc3RDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCB1LCB1LCBcIm5ld1Njb3JlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQ2hhbmdpbmcgYSBjaGlsZCBwcm8gdmFsdWUgc2hvdWxkIGNoYW5nZSB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidGVzdENsYWltXCIsIFwidGVzdENsYWltXCIsIHUsIHUsIHUsIHUsIHUsIHUsIHUsIFwibmV3U2NvcmVcIiksIHUsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwib2xkRGF0YVwiOiB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJ0b3BTY29yZUlkXCI6IFwibmV3U2NvcmVcIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcIm5ld1Njb3JlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkNoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJ0b3BTY29yZUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJpZFwiOiBcIm5ld1Njb3JlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICB9XHJcbiAgICBdKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IHJldmVyc2VzIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZShcInRlc3RDbGFpbVwiLCBcInRlc3RDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCB1LCB1LCBcIm5ld1Njb3JlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICAvL1wiaWRcIjogXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZGluZyBhIGdyYW5kY2hpbGQgc2NvcmUgUmV2ZXJzZXMgU2NvcmVzIDIgbGV2ZWxzJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiwgdSwgdSwgdSwgdSwgdSwgMCwgdSwgXCJuZXdTY29yZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMlwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdW5kZWZpbmVkLCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1bmRlZmluZWQsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJncmFuZENoaWxkMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiZ3JhbmRDaGlsZDFcIixcclxuICAgICAgICAgIFwidG9wU2NvcmVJZFwiOiBcIm5ld1Njb3JlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJuZXdTY29yZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwibmV3U2NvcmVcIixcclxuICAgICAgICAgIFwic291cmNlRWRnZUlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJ0b3BTY29yZUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJpZFwiOiBcIm5ld1Njb3JlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwibmV3U2NvcmVcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDb21wbGV4IFRlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgY2hhbmdlZFNjb3JlcyA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiVG9wIENsYWltXCIsIFwidG9wQ2xhaW1cIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgXCJDaGlsZENsYWltMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMlwiLCBcIkNoaWxkQ2xhaW0yXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJHcmFuZGNoaWxkIENsYWltIDFcIiwgXCJncmFuZENoaWxkMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1LCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZShcInRvcENsYWltXCIsIFwidG9wQ2xhaW1cIiwgdSwgdSwgdSwgdSwgdSwgMCwgdSwgXCJuZXdTY29yZVwiKSwgdSwgXCJhZGRfc2NvcmVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoY2hhbmdlZFNjb3Jlcyk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1wibmV3U2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeVNvdXJjZUlkW1widG9wQ2xhaW1cIl0ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuXHJcbiAgLy9XZWlyZCBzY29yZSBub3QgY2hhbmdpbmdcclxuICBjb25zdCBDaGlsZENsYWltMVNjb3Jlc0luaXRpYWwgPSBhd2FpdCByZXBvc2l0b3J5LmdldFNjb3Jlc0J5U291cmNlSWQoXCJDaGlsZENsYWltMVwiKVxyXG4gIGV4cGVjdChDaGlsZENsYWltMVNjb3Jlc0luaXRpYWxbMF0ucHJvKS50b0VxdWFsKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgY2hhbmdlZFNjb3JlczIgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwiY29udGVudFwiOiBcIkNoaWxkIENsYWltIDFcIixcclxuICAgICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X2NsYWltXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJDaGlsZENsYWltMVwiXHJcbiAgICAgIH0gYXMgQWN0aW9uLFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwicGFyZW50SWRcIjogXCJ0b3BDbGFpbVwiLFxyXG4gICAgICAgICAgXCJjaGlsZElkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X2NsYWltRWRnZVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCJcclxuICAgICAgfSBhcyBBY3Rpb25cclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzMik7XHJcbiAgY29uc3QgQ2hpbGRDbGFpbTFTY29yZXMgPSBhd2FpdCByZXBvc2l0b3J5LmdldFNjb3Jlc0J5U291cmNlSWQoXCJDaGlsZENsYWltMVwiKVxyXG4gIGV4cGVjdChDaGlsZENsYWltMVNjb3Jlc1swXS5wcm8pLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gIGV4cGVjdChjaGFuZ2VkU2NvcmVzMi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG5cclxuICAvL1RPRE86IERvIEkgd2FudCB0byBjaGVjayBhbGwgaW5kZXhlcyBmb3IgZHVwbGljYXRlIGluZGV4ZWQgaXRlbXM/XHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ1BhcnRpYWwgQ2xhaW0gRWRnZSBHcmFuZGNoaWxkIFVwZGF0ZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidG9wQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCAwLCB1LCBcInRvcFNjb3JlXCIpLCB1LCBcImFkZF9zY29yZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5zY29yZUlkc0J5U291cmNlSWRbXCJ0b3BDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcbiAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkocmVzdWx0KTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDApO1xyXG5cclxuICBjb25zdCByZXN1bHQyID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih7cHJvOnRydWV9LCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIixcIkNoaWxkQ2xhaW0yRWRnZVwiICksXHJcbiAgICAgIC8vbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG4gIFxyXG4gIGF3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdDIpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIENoaWxkIFVwZGF0ZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKFwidG9wQ2xhaW1cIiwgXCJ0b3BDbGFpbVwiLCB1LCB1LCB1LCB1LCB1LCAwLCB1LCBcInRvcFNjb3JlXCIpLCB1LCBcImFkZF9zY29yZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0b3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHtwcm86ZmFsc2V9LCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIixcIkNoaWxkQ2xhaW0yRWRnZVwiICksXHJcbiAgICAgIC8vbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wQ2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdCk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgwKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0MiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oe3Bybzp0cnVlfSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIsXCJDaGlsZENsYWltMkVkZ2VcIiApLFxyXG4gICAgICAvL25ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICBkZWJ1Z2dlclxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkocmVzdWx0Mik7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxufSk7Il19