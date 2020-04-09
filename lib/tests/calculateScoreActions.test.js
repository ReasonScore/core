"use strict";

var _RepositoryLocalPure = require("../repositories/RepositoryLocalPure");

var _calculateScoreActions = require("../calculateScoreActions");

var _calculateScore = require("../calculateScore");

var _Claim = require("../dataModels/Claim");

var _Action = require("../dataModels/Action");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Score = require("../dataModels/Score");

var _ScoreTree = require("../dataModels/ScoreTree");

//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";
const u = undefined;
test('add a new scoretree', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure(); // Add a new claim and set it as a score tree top

  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), undefined, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  var test = new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree");
  debugger;
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1);
});
test('Add a child that does not change the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), undefined, "add_claim"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, u, u, "Priority Set"), undefined, "add_claimEdge")],
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
      "parentScoreId": "testTopScore",
      "priority": "Priority Set"
    },
    "oldData": undefined,
    "type": "add_score"
  }]);
});
test('Changing a child pro value should change the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), u, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, true, "ChildClaim1Edge"), u, "add_claimEdge")],
    repository: repository
  });
  debugger;
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "modify_claimEdge")],
    repository: repository
  });
  expect(result).toMatchObject([{
    "newData": {
      "pro": false,
      "affects": "confidence"
    },
    "oldData": {
      "sourceClaimId": "ChildClaim1",
      "scoreTreeId": "testScoreTree",
      "parentScoreId": "testTopScore",
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
      "sourceClaimId": "topTestClaim",
      "scoreTreeId": "testScoreTree",
      "parentScoreId": undefined,
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1,
      "id": "testTopScore"
    },
    "type": "modify_score",
    "dataId": "testTopScore"
  }]);
});
test('Add a child that reverses the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), undefined, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim")],
    repository: repository
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  debugger;
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "reversible": false,
      "pro": false,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "parentScoreId": "testTopScore"
    },
    "oldData": undefined,
    "type": "add_score"
  }, {
    "newData": {
      "sourceClaimId": "topTestClaim",
      "parentScoreId": undefined,
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1
    },
    "oldData": undefined,
    "type": "modify_score"
  }]);
});
test('Adding a grandchild score Reverses Scores 2 levels', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const temp = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), undefined, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim"), new _Action.Action(new _Claim.Claim("", "ChildClaim2"), undefined, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim2", undefined, true, "ChildClaim2Edge"), undefined, "add_claimEdge"), new _Action.Action(new _Claim.Claim("", "grandChild1"), undefined, "add_claim")],
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
      "scoreTreeId": "testScoreTree",
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
      "scoreTreeId": "testScoreTree",
      "parentScoreId": "testTopScore",
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
      "sourceClaimId": "topTestClaim",
      "scoreTreeId": "testScoreTree",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "id": "testTopScore"
    },
    "type": "modify_score",
    "dataId": "testTopScore"
  }]);
});
test('Complex Test', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const changedScores = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topTestClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1); //Weird score not changing

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
        "parentId": "topTestClaim",
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
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topTestClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1);
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge")],
    repository: repository
  });
  await repository.notify(result);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);
  const result2 = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: true
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  });
  await repository.notify(result2);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});
test('Partial Claim Edge Child Update', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const changedScores = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("Top Claim", "topTestClaim"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"), new _Action.Action(new _Claim.Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository
  }); //await repository.notify(changedScores);

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: false
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  }); //await repository.notify(result);

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);
  const result2 = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      pro: true
    }, u, "modify_claimEdge", "ChildClaim2Edge") //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  });
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});
test('Deleting an edge should reverses the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), undefined, "add_claim"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), undefined, "add_claim"), new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")],
    repository: repository
  });
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);
  await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(u, {
      parentId: "topTestClaim"
    }, "delete_claimEdge", "ChildClaim1Edge")],
    repository: repository
  });
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});
test('Multi level relevance delete test', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  const pro = true;
  const con = false;
  const topClaim = new _Claim.Claim("Should Fiction City convert Elm Street to only pedestrian traffic?", "topTestClaim");
  const Claim1_0 = new _Claim.Claim("The planning commission estimates this will increase foot traffic to local shops by 12% during peak hours.", "Claim1_0");
  const Claim1_1 = new _Claim.Claim("The increase in revenue is expected to pay off the expense in under 2 years meeting the cities investment requirements.", "Claim1_1");
  const Claim2_0 = new _Claim.Claim("This will result in traffic being diverted down residential streets.");
  const Claim2_1 = new _Claim.Claim("Children safety is more important than profit for local shops.");
  const Claim2_2 = new _Claim.Claim("A set of railroad tracks are no longer in use and the City can convert that to a new street.");
  const Claim3_0 = new _Claim.Claim("The conversion will cost 2 Million dollars.");
  const ClaimEdge1_0 = new _ClaimEdge.ClaimEdge(topClaim.id, Claim1_0.id, u, pro, "ClaimEdge1_0");
  const ClaimEdge1_1 = new _ClaimEdge.ClaimEdge(Claim1_0.id, Claim1_1.id, "relevance", pro, "ClaimEdge1_1");
  const actions = [new _Action.Action(topClaim, u, "add_claim"), new _Action.Action(Claim1_0, u, "add_claim"), new _Action.Action(Claim1_1, u, "add_claim"), new _Action.Action(Claim2_0, u, "add_claim"), new _Action.Action(Claim2_1, u, "add_claim"), new _Action.Action(Claim2_2, u, "add_claim"), new _Action.Action(Claim3_0, u, "add_claim"), new _Action.Action(ClaimEdge1_0, u, "add_claimEdge"), new _Action.Action(ClaimEdge1_1, u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge(topClaim.id, Claim2_0.id, u, con), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge(Claim2_0.id, Claim2_1.id, "relevance", con), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge(Claim2_0.id, Claim2_2.id, u, con), u, "add_claimEdge"), new _Action.Action(new _ClaimEdge.ClaimEdge(topClaim.id, Claim3_0.id, u, con), u, "add_claimEdge"), new _Action.Action(new _Score.Score(topClaim.id, topClaim.id, u, u, u, u, u, 0, u, "testTopScore"), u, "add_score"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree")];
  await (0, _calculateScoreActions.calculateScoreActions)({
    actions: actions,
    repository: repository
  });
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0.3333333333333333);
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(undefined, ClaimEdge1_1, "delete_claimEdge", ClaimEdge1_1.id)],
    repository: repository
  });
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);
});
test('Con Relevancy test', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure();
  repository.rsData = {
    "actionsLog": [],
    "items": {
      "topClaim": {
        "content": "Should [Denver](https://m.wikidata.org/wiki/Q16554) pass bill [20-0071](https://denver.legistar.com/LegislationDetail.aspx?ID=4348531&GUID=B44E6268-3326-4061-8F8B-F241193F0204) replacing it's \"pit-bull ban\" with [breed\nrestricted-license](https://www.facebook.com/photo?fbid=2682351831848354&set=a.465539280196298)?",
        "id": "topClaim",
        "reversible": false,
        "type": "claim"
      },
      "ScoreTree": {
        "sourceClaimId": "topClaim",
        "topScoreId": "topScore",
        "confidence": 1,
        "id": "ScoreTree",
        "type": "scoreTree"
      },
      "Y63AM1RDq02V": {
        "content": "Pit bulls are disproportionately dangerous compared with other dog breeds.",
        "id": "Y63AM1RDq02V",
        "reversible": false,
        "type": "claim"
      },
      "Y63AM1MmXgnN": {
        "parentId": "topClaim",
        "childId": "Y63AM1RDq02V",
        "affects": "confidence",
        "pro": false,
        "id": "Y63AM1MmXgnN",
        "priority": "",
        "type": "claimEdge"
      },
      "Y63yE1vOJxR7": {
        "content": " Over 100 cities have repealed their bans entirely.",
        "id": "Y63yE1vOJxR7",
        "reversible": false,
        "type": "claim"
      },
      "Y63yE1timgKf": {
        "parentId": "topClaim",
        "childId": "Y63yE1vOJxR7",
        "affects": "confidence",
        "pro": true,
        "id": "Y63yE1timgKf",
        "priority": "",
        "type": "claimEdge"
      },
      "Y63xF7JifLHA": {
        "content": " A [review of controlled studies](https://www.avma.org/resources-tools/literature-reviews/dog-bite-risk-and-prevention-role-breed) documents that pit bulls are not disproportionately dangerous compared with other dog breeds.",
        "id": "Y63xF7JifLHA",
        "reversible": false,
        "type": "claim"
      },
      "Y63xF7JBOjng": {
        "parentId": "Y63AM1RDq02V",
        "childId": "Y63xF7JifLHA",
        "affects": "confidence",
        "pro": false,
        "id": "Y63xF7JBOjng",
        "priority": "",
        "type": "claimEdge"
      },
      "Y63vLOi2FItk": {
        "content": "In the 14-year period of 2005 through 2018, canines killed 471 Americans. Pit bulls contributed to 66% (311) of these deaths. Combined, pit bulls and rottweilers contributed to 76% of the total recorded deaths. [dogsbite.org](https://www.dogsbite.org/dog-bite-statistics-fatalities-2018.php)",
        "id": "Y63vLOi2FItk",
        "reversible": false,
        "type": "claim"
      },
      "Y63vLOig6YjJ": {
        "parentId": "Y63AM1RDq02V",
        "childId": "Y63vLOi2FItk",
        "affects": "confidence",
        "pro": true,
        "id": "Y63vLOig6YjJ",
        "priority": "",
        "type": "claimEdge"
      },
      "Y63v8y8WWeSO": {
        "content": "It is more important to make decisions based on evidence rather than the decisions other have made. [argumentum ad populum](https://en.wikipedia.org/wiki/Argumentum_ad_populum)",
        "id": "Y63v8y8WWeSO",
        "reversible": false,
        "type": "claim"
      },
      "Y63v8y8hSG0g": {
        "parentId": "Y63yE1vOJxR7",
        "childId": "Y63v8y8WWeSO",
        "affects": "relevance",
        "pro": false,
        "id": "Y63v8y8hSG0g",
        "priority": "",
        "type": "claimEdge"
      },
      "Y63uvoffmLhz": {
        "content": "Over 100 cities have repealed their bans entirely.",
        "id": "Y63uvoffmLhz",
        "reversible": false,
        "type": "claim"
      },
      "Y63uvofvcxwn": {
        "parentId": "Y63yE1vOJxR7",
        "childId": "Y63uvoffmLhz",
        "affects": "confidence",
        "pro": true,
        "id": "Y63uvofvcxwn",
        "priority": "",
        "type": "claimEdge"
      }
    },
    "claimEdgeIdsByParentId": {
      "topClaim": ["Y63AM1MmXgnN", "Y63yE1timgKf"],
      "Y63AM1RDq02V": ["Y63xF7JBOjng", "Y63vLOig6YjJ"],
      "Y63yE1vOJxR7": ["Y63v8y8hSG0g", "Y63uvofvcxwn"]
    },
    "claimEdgeIdsByChildId": {
      "Y63AM1RDq02V": ["Y63AM1MmXgnN"],
      "Y63yE1vOJxR7": ["Y63yE1timgKf"],
      "Y63xF7JifLHA": ["Y63xF7JBOjng"],
      "Y63vLOi2FItk": ["Y63vLOig6YjJ"],
      "Y63v8y8WWeSO": ["Y63v8y8hSG0g"],
      "Y63uvoffmLhz": ["Y63uvofvcxwn"]
    },
    "scoreIdsBySourceId": {},
    "childIdsByScoreId": {},
    "ScoreTreeIds": ["ScoreTree", "Y63Aa5pAzqYf", "topScore", "Y63xDeJrapEH", "Y63yx1IBTebP", "Y63uCZC7cXrd"]
  };
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action({
      id: "ScoreTree"
    }, u, "add_scoreTree")],
    repository: repository
  });
  expect((await repository.getScoresBySourceId("topClaim"))[0].confidence).toEqual(1);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ1IiwidW5kZWZpbmVkIiwidGVzdCIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwicmVzdWx0IiwiYWN0aW9ucyIsIkFjdGlvbiIsIkNsYWltIiwiU2NvcmVUcmVlIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwicnNEYXRhIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwibGVuZ3RoIiwidG9FcXVhbCIsInRlbXAiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0IiwiY2hhbmdlZFNjb3JlcyIsIml0ZW1zIiwiY29uZmlkZW5jZSIsIkNoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCIsImdldFNjb3Jlc0J5U291cmNlSWQiLCJwcm8iLCJjaGFuZ2VkU2NvcmVzMiIsIkNoaWxkQ2xhaW0xU2NvcmVzIiwibm90aWZ5IiwicmVzdWx0MiIsInBhcmVudElkIiwiY29uIiwidG9wQ2xhaW0iLCJDbGFpbTFfMCIsIkNsYWltMV8xIiwiQ2xhaW0yXzAiLCJDbGFpbTJfMSIsIkNsYWltMl8yIiwiQ2xhaW0zXzAiLCJDbGFpbUVkZ2UxXzAiLCJpZCIsIkNsYWltRWRnZTFfMSIsIlNjb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBRUEsTUFBTUEsQ0FBQyxHQUFHQyxTQUFWO0FBRUFDLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLGNBQWQsQ0FBWCxFQUEwQ1AsU0FB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RlksQ0FMTTtBQVN0QixzQkFBZ0IsQ0FDWixjQURZLEVBRVosY0FGWTtBQVRNLEtBM0dSO0FBeUhsQiw2QkFBeUI7QUFDckIsc0JBQWdCLENBQ1osY0FEWSxDQURLO0FBSXJCLHNCQUFnQixDQUNaLGNBRFksQ0FKSztBQU9yQixzQkFBZ0IsQ0FDWixjQURZLENBUEs7QUFVckIsc0JBQWdCLENBQ1osY0FEWSxDQVZLO0FBYXJCLHNCQUFnQixDQUNaLGNBRFksQ0FiSztBQWdCckIsc0JBQWdCLENBQ1osY0FEWTtBQWhCSyxLQXpIUDtBQTZJbEIsMEJBQXNCLEVBN0lKO0FBOElsQix5QkFBcUIsRUE5SUg7QUErSWxCLG9CQUFnQixDQUNaLFdBRFksRUFFWixjQUZZLEVBR1osVUFIWSxFQUlaLGNBSlksRUFLWixjQUxZLEVBTVosY0FOWTtBQS9JRSxHQUFwQjtBQXlKQSxRQUFNUixNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVztBQUFDaUMsTUFBQUEsRUFBRSxFQUFDO0FBQUosS0FBWCxFQUE0QnhDLENBQTVCLEVBQStCLGVBQS9CLENBRE8sQ0FEZ0M7QUFHdENHLElBQUFBLFVBQVUsRUFBRUE7QUFIMEIsR0FBdEIsQ0FBckI7QUFNQVMsRUFBQUEsTUFBTSxDQUFDLENBQUMsTUFBTVQsVUFBVSxDQUFDcUIsbUJBQVgsQ0FBK0IsVUFBL0IsQ0FBUCxFQUFtRCxDQUFuRCxFQUFzREYsVUFBdkQsQ0FBTixDQUF5RU4sT0FBekUsQ0FBaUYsQ0FBakY7QUFHRCxDQXJLRyxDQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUHVyZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUHVyZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZUFjdGlvbnMgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVBY3Rpb25zXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcbmltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IFNjb3JlVHJlZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL1Njb3JlVHJlZVwiO1xyXG4vL2ltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFJlYWN0aXZlIH0gZnJvbSBcIi4uL3JlcG9zaXRvcmllcy9SZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZVwiO1xyXG5cclxuY29uc3QgdSA9IHVuZGVmaW5lZDtcclxuXHJcbnRlc3QoJ2FkZCBhIG5ldyBzY29yZXRyZWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgLy8gQWRkIGEgbmV3IGNsYWltIGFuZCBzZXQgaXQgYXMgYSBzY29yZSB0cmVlIHRvcFxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG52YXIgdGVzdCA9ICAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpO1xyXG5kZWJ1Z2dlclxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5zY29yZUlkc0J5U291cmNlSWRbXCJ0b3BUZXN0Q2xhaW1cIl0ubGVuZ3RoKS50b0VxdWFsKDEpXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkIGEgY2hpbGQgdGhhdCBkb2VzIG5vdCBjaGFuZ2UgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCB0ZW1wID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCB1LCB1LCBcIlByaW9yaXR5IFNldFwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwidGVzdFRvcFNjb3JlXCIsXHJcbiAgICAgICAgICBcInByaW9yaXR5XCI6IFwiUHJpb3JpdHkgU2V0XCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDaGFuZ2luZyBhIGNoaWxkIHBybyB2YWx1ZSBzaG91bGQgY2hhbmdlIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcbiAgZGVidWdnZXJcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJvbGREYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwidGVzdFRvcFNjb3JlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkNoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRvcFRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJzY29yZVRyZWVJZFwiOiBcInRlc3RTY29yZVRyZWVcIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJpZFwiOiBcInRlc3RUb3BTY29yZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfc2NvcmVcIixcclxuICAgICAgICBcImRhdGFJZFwiOiBcInRlc3RUb3BTY29yZVwiXHJcbiAgICAgIH1cclxuICAgIF0pXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgcmV2ZXJzZXMgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCB0ZW1wID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5kZWJ1Z2dlclxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJ0b3BUZXN0Q2xhaW1cIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZGluZyBhIGdyYW5kY2hpbGQgc2NvcmUgUmV2ZXJzZXMgU2NvcmVzIDIgbGV2ZWxzJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdW5kZWZpbmVkLCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdW5kZWZpbmVkLCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcImdyYW5kQ2hpbGQxXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJzb3VyY2VFZGdlSWRcIjogXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJzY29yZVRyZWVJZFwiOiBcInRlc3RTY29yZVRyZWVcIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcInRlc3RUb3BTY29yZVwiLFxyXG4gICAgICAgICAgXCJzb3VyY2VFZGdlSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwiaWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDb21wbGV4IFRlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgY2hhbmdlZFNjb3JlcyA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiVG9wIENsYWltXCIsIFwidG9wVGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgXCJDaGlsZENsYWltMlwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiR3JhbmRjaGlsZCBDbGFpbSAxXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1LCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeVNvdXJjZUlkW1widG9wVGVzdENsYWltXCJdLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcblxyXG4gIC8vV2VpcmQgc2NvcmUgbm90IGNoYW5naW5nXHJcbiAgY29uc3QgQ2hpbGRDbGFpbTFTY29yZXNJbml0aWFsID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZXNCeVNvdXJjZUlkKFwiQ2hpbGRDbGFpbTFcIilcclxuICBleHBlY3QoQ2hpbGRDbGFpbTFTY29yZXNJbml0aWFsWzBdLnBybykudG9FcXVhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMyID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJDaGlsZCBDbGFpbSAxXCIsXHJcbiAgICAgICAgICBcImlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9jbGFpbVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwiQ2hpbGRDbGFpbTFcIlxyXG4gICAgICB9IGFzIEFjdGlvbixcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInBhcmVudElkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcImNoaWxkSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfY2xhaW1FZGdlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIlxyXG4gICAgICB9IGFzIEFjdGlvblxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMyKTtcclxuICBjb25zdCBDaGlsZENsYWltMVNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChcIkNoaWxkQ2xhaW0xXCIpXHJcbiAgZXhwZWN0KENoaWxkQ2xhaW0xU2NvcmVzWzBdLnBybykudG9FcXVhbCh0cnVlKTtcclxuXHJcbiAgZXhwZWN0KGNoYW5nZWRTY29yZXMyLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcblxyXG4gIC8vVE9ETzogRG8gSSB3YW50IHRvIGNoZWNrIGFsbCBpbmRleGVzIGZvciBkdXBsaWNhdGUgaW5kZXhlZCBpdGVtcz9cclxuXHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIEdyYW5kY2hpbGQgVXBkYXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlRvcCBDbGFpbVwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdSwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoY2hhbmdlZFNjb3Jlcyk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRvcFRlc3RDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG4gIGF3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdCk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMCk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdDIgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiB0cnVlIH0sIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSxcclxuICAgICAgLy9uZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShyZXN1bHQyKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxufSk7XHJcblxyXG50ZXN0KCdQYXJ0aWFsIENsYWltIEVkZ2UgQ2hpbGQgVXBkYXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlRvcCBDbGFpbVwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdSwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoY2hhbmdlZFNjb3Jlcyk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oeyBwcm86IGZhbHNlIH0sIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSxcclxuICAgICAgLy9uZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdCk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMCk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdDIgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiB0cnVlIH0sIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSxcclxuICAgICAgLy9uZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxufSk7XHJcblxyXG50ZXN0KCdEZWxldGluZyBhbiBlZGdlIHNob3VsZCByZXZlcnNlcyB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSwgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDApO1xyXG5cclxuICBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHUsIHsgcGFyZW50SWQ6IFwidG9wVGVzdENsYWltXCIgfSwgXCJkZWxldGVfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ011bHRpIGxldmVsIHJlbGV2YW5jZSBkZWxldGUgdGVzdCcsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuXHJcbiAgY29uc3QgcHJvID0gdHJ1ZTtcclxuICBjb25zdCBjb24gPSBmYWxzZTtcclxuICBjb25zdCB0b3BDbGFpbSA9IG5ldyBDbGFpbShcIlNob3VsZCBGaWN0aW9uIENpdHkgY29udmVydCBFbG0gU3RyZWV0IHRvIG9ubHkgcGVkZXN0cmlhbiB0cmFmZmljP1wiLCBcInRvcFRlc3RDbGFpbVwiKVxyXG4gIGNvbnN0IENsYWltMV8wID0gbmV3IENsYWltKFwiVGhlIHBsYW5uaW5nIGNvbW1pc3Npb24gZXN0aW1hdGVzIHRoaXMgd2lsbCBpbmNyZWFzZSBmb290IHRyYWZmaWMgdG8gbG9jYWwgc2hvcHMgYnkgMTIlIGR1cmluZyBwZWFrIGhvdXJzLlwiLCBcIkNsYWltMV8wXCIpXHJcbiAgY29uc3QgQ2xhaW0xXzEgPSBuZXcgQ2xhaW0oXCJUaGUgaW5jcmVhc2UgaW4gcmV2ZW51ZSBpcyBleHBlY3RlZCB0byBwYXkgb2ZmIHRoZSBleHBlbnNlIGluIHVuZGVyIDIgeWVhcnMgbWVldGluZyB0aGUgY2l0aWVzIGludmVzdG1lbnQgcmVxdWlyZW1lbnRzLlwiLCBcIkNsYWltMV8xXCIpXHJcbiAgY29uc3QgQ2xhaW0yXzAgPSBuZXcgQ2xhaW0oXCJUaGlzIHdpbGwgcmVzdWx0IGluIHRyYWZmaWMgYmVpbmcgZGl2ZXJ0ZWQgZG93biByZXNpZGVudGlhbCBzdHJlZXRzLlwiKVxyXG4gIGNvbnN0IENsYWltMl8xID0gbmV3IENsYWltKFwiQ2hpbGRyZW4gc2FmZXR5IGlzIG1vcmUgaW1wb3J0YW50IHRoYW4gcHJvZml0IGZvciBsb2NhbCBzaG9wcy5cIilcclxuICBjb25zdCBDbGFpbTJfMiA9IG5ldyBDbGFpbShcIkEgc2V0IG9mIHJhaWxyb2FkIHRyYWNrcyBhcmUgbm8gbG9uZ2VyIGluIHVzZSBhbmQgdGhlIENpdHkgY2FuIGNvbnZlcnQgdGhhdCB0byBhIG5ldyBzdHJlZXQuXCIpXHJcbiAgY29uc3QgQ2xhaW0zXzAgPSBuZXcgQ2xhaW0oXCJUaGUgY29udmVyc2lvbiB3aWxsIGNvc3QgMiBNaWxsaW9uIGRvbGxhcnMuXCIpXHJcbiAgY29uc3QgQ2xhaW1FZGdlMV8wID0gbmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0xXzAuaWQsIHUsIHBybywgXCJDbGFpbUVkZ2UxXzBcIik7XHJcbiAgY29uc3QgQ2xhaW1FZGdlMV8xID0gbmV3IENsYWltRWRnZShDbGFpbTFfMC5pZCwgQ2xhaW0xXzEuaWQsIFwicmVsZXZhbmNlXCIsIHBybywgXCJDbGFpbUVkZ2UxXzFcIilcclxuICBjb25zdCBhY3Rpb25zID0gW1xyXG4gICAgbmV3IEFjdGlvbih0b3BDbGFpbSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMV8wLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0xXzEsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTJfMCwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMl8xLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0yXzIsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTNfMCwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltRWRnZTFfMCwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbUVkZ2UxXzEsIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0yXzAuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShDbGFpbTJfMC5pZCwgQ2xhaW0yXzEuaWQsIFwicmVsZXZhbmNlXCIsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShDbGFpbTJfMC5pZCwgQ2xhaW0yXzIuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0zXzAuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKHRvcENsYWltLmlkLCB0b3BDbGFpbS5pZCwgdSwgdSwgdSwgdSwgdSwgMCwgdSwgXCJ0ZXN0VG9wU2NvcmVcIiksIHUsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcblxyXG4gICAgXHJcbiAgXVxyXG4gIGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7IGFjdGlvbnM6IGFjdGlvbnMsIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnkgfSlcclxuXHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih1bmRlZmluZWQsIENsYWltRWRnZTFfMSwgXCJkZWxldGVfY2xhaW1FZGdlXCIsIENsYWltRWRnZTFfMS5pZClcclxuICAgIF0sIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgwKTtcclxuXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0NvbiBSZWxldmFuY3kgdGVzdCcsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuXHJcbiAgcmVwb3NpdG9yeS5yc0RhdGEgPSB7XHJcbiAgICBcImFjdGlvbnNMb2dcIjogW10sXHJcbiAgICBcIml0ZW1zXCI6IHtcclxuICAgICAgICBcInRvcENsYWltXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiU2hvdWxkIFtEZW52ZXJdKGh0dHBzOi8vbS53aWtpZGF0YS5vcmcvd2lraS9RMTY1NTQpIHBhc3MgYmlsbCBbMjAtMDA3MV0oaHR0cHM6Ly9kZW52ZXIubGVnaXN0YXIuY29tL0xlZ2lzbGF0aW9uRGV0YWlsLmFzcHg/SUQ9NDM0ODUzMSZHVUlEPUI0NEU2MjY4LTMzMjYtNDA2MS04RjhCLUYyNDExOTNGMDIwNCkgcmVwbGFjaW5nIGl0J3MgXFxcInBpdC1idWxsIGJhblxcXCIgd2l0aCBbYnJlZWRcXG5yZXN0cmljdGVkLWxpY2Vuc2VdKGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9waG90bz9mYmlkPTI2ODIzNTE4MzE4NDgzNTQmc2V0PWEuNDY1NTM5MjgwMTk2Mjk4KT9cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJTY29yZVRyZWVcIjoge1xyXG4gICAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJ0b3BDbGFpbVwiLFxyXG4gICAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJ0b3BTY29yZVwiLFxyXG4gICAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJzY29yZVRyZWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjNBTTFSRHEwMlZcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCJQaXQgYnVsbHMgYXJlIGRpc3Byb3BvcnRpb25hdGVseSBkYW5nZXJvdXMgY29tcGFyZWQgd2l0aCBvdGhlciBkb2cgYnJlZWRzLlwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjNBTTFNbVhnbk5cIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwidG9wQ2xhaW1cIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjNBTTFNbVhnbk5cIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN5RTF2T0p4UjdcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCIgT3ZlciAxMDAgY2l0aWVzIGhhdmUgcmVwZWFsZWQgdGhlaXIgYmFucyBlbnRpcmVseS5cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3lFMXZPSnhSN1wiLFxyXG4gICAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzeUUxdGltZ0tmXCI6IHtcclxuICAgICAgICAgICAgXCJwYXJlbnRJZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3lFMXZPSnhSN1wiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN5RTF0aW1nS2ZcIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN4RjdKaWZMSEFcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCIgQSBbcmV2aWV3IG9mIGNvbnRyb2xsZWQgc3R1ZGllc10oaHR0cHM6Ly93d3cuYXZtYS5vcmcvcmVzb3VyY2VzLXRvb2xzL2xpdGVyYXR1cmUtcmV2aWV3cy9kb2ctYml0ZS1yaXNrLWFuZC1wcmV2ZW50aW9uLXJvbGUtYnJlZWQpIGRvY3VtZW50cyB0aGF0IHBpdCBidWxscyBhcmUgbm90IGRpc3Byb3BvcnRpb25hdGVseSBkYW5nZXJvdXMgY29tcGFyZWQgd2l0aCBvdGhlciBkb2cgYnJlZWRzLlwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzeEY3SmlmTEhBXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN4RjdKQk9qbmdcIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3hGN0ppZkxIQVwiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzeEY3SkJPam5nXCIsXHJcbiAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1FZGdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzdkxPaTJGSXRrXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiSW4gdGhlIDE0LXllYXIgcGVyaW9kIG9mIDIwMDUgdGhyb3VnaCAyMDE4LCBjYW5pbmVzIGtpbGxlZCA0NzEgQW1lcmljYW5zLiBQaXQgYnVsbHMgY29udHJpYnV0ZWQgdG8gNjYlICgzMTEpIG9mIHRoZXNlIGRlYXRocy4gQ29tYmluZWQsIHBpdCBidWxscyBhbmQgcm90dHdlaWxlcnMgY29udHJpYnV0ZWQgdG8gNzYlIG9mIHRoZSB0b3RhbCByZWNvcmRlZCBkZWF0aHMuIFtkb2dzYml0ZS5vcmddKGh0dHBzOi8vd3d3LmRvZ3NiaXRlLm9yZy9kb2ctYml0ZS1zdGF0aXN0aWNzLWZhdGFsaXRpZXMtMjAxOC5waHApXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2TE9pMkZJdGtcIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3ZMT2lnNllqSlwiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjNBTTFSRHEwMlZcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdkxPaTJGSXRrXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3ZMT2lnNllqSlwiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3Y4eThXV2VTT1wiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIkl0IGlzIG1vcmUgaW1wb3J0YW50IHRvIG1ha2UgZGVjaXNpb25zIGJhc2VkIG9uIGV2aWRlbmNlIHJhdGhlciB0aGFuIHRoZSBkZWNpc2lvbnMgb3RoZXIgaGF2ZSBtYWRlLiBbYXJndW1lbnR1bSBhZCBwb3B1bHVtXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Bcmd1bWVudHVtX2FkX3BvcHVsdW0pXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2OHk4V1dlU09cIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3Y4eThoU0cwZ1wiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdjh5OFdXZVNPXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcInJlbGV2YW5jZVwiLFxyXG4gICAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3Y4eThoU0cwZ1wiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3V2b2ZmbUxoelwiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIk92ZXIgMTAwIGNpdGllcyBoYXZlIHJlcGVhbGVkIHRoZWlyIGJhbnMgZW50aXJlbHkuXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN1dm9mZm1MaHpcIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdXZvZmZtTGh6XCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3V2b2Z2Y3h3blwiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiOiB7XHJcbiAgICAgICAgXCJ0b3BDbGFpbVwiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzQU0xTW1YZ25OXCIsXHJcbiAgICAgICAgICAgIFwiWTYzeUUxdGltZ0tmXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzQU0xUkRxMDJWXCI6IFtcclxuICAgICAgICAgICAgXCJZNjN4RjdKQk9qbmdcIixcclxuICAgICAgICAgICAgXCJZNjN2TE9pZzZZakpcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN5RTF2T0p4UjdcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3Y4eThoU0cwZ1wiLFxyXG4gICAgICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCI6IHtcclxuICAgICAgICBcIlk2M0FNMVJEcTAyVlwiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzQU0xTW1YZ25OXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzeUUxdk9KeFI3XCI6IFtcclxuICAgICAgICAgICAgXCJZNjN5RTF0aW1nS2ZcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN4RjdKaWZMSEFcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3hGN0pCT2puZ1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIlk2M3ZMT2kyRkl0a1wiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzdkxPaWc2WWpKXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzdjh5OFdXZVNPXCI6IFtcclxuICAgICAgICAgICAgXCJZNjN2OHk4aFNHMGdcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN1dm9mZm1MaHpcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwic2NvcmVJZHNCeVNvdXJjZUlkXCI6IHt9LFxyXG4gICAgXCJjaGlsZElkc0J5U2NvcmVJZFwiOiB7fSxcclxuICAgIFwiU2NvcmVUcmVlSWRzXCI6IFtcclxuICAgICAgICBcIlNjb3JlVHJlZVwiLFxyXG4gICAgICAgIFwiWTYzQWE1cEF6cVlmXCIsXHJcbiAgICAgICAgXCJ0b3BTY29yZVwiLFxyXG4gICAgICAgIFwiWTYzeERlSnJhcEVIXCIsXHJcbiAgICAgICAgXCJZNjN5eDFJQlRlYlBcIixcclxuICAgICAgICBcIlk2M3VDWkM3Y1hyZFwiXHJcbiAgICBdXHJcbn1cclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih7aWQ6XCJTY29yZVRyZWVcIn0sdSwgXCJhZGRfc2NvcmVUcmVlXCIpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KChhd2FpdCByZXBvc2l0b3J5LmdldFNjb3Jlc0J5U291cmNlSWQoXCJ0b3BDbGFpbVwiKSlbMF0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG4iXX0=