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
      "confidence": -1,
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
    actions: [new _Action.Action(new _Claim.Claim("", "topTestClaim"), u, "add_claim"), new _Action.Action(new _ScoreTree.ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), u, "add_scoreTree"), new _Action.Action(new _Claim.Claim("", "ChildClaim1"), u, "add_claim")],
    repository: repository
  });
  debugger;
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge")],
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
      "confidence": -1,
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
      "confidence": -1,
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
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(-1);
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

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(-1);
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
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(-1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ1IiwidW5kZWZpbmVkIiwidGVzdCIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwicmVzdWx0IiwiYWN0aW9ucyIsIkFjdGlvbiIsIkNsYWltIiwiU2NvcmVUcmVlIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwicnNEYXRhIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwibGVuZ3RoIiwidG9FcXVhbCIsInRlbXAiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0IiwiY2hhbmdlZFNjb3JlcyIsIml0ZW1zIiwiY29uZmlkZW5jZSIsIkNoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCIsImdldFNjb3Jlc0J5U291cmNlSWQiLCJwcm8iLCJjaGFuZ2VkU2NvcmVzMiIsIkNoaWxkQ2xhaW0xU2NvcmVzIiwibm90aWZ5IiwicmVzdWx0MiIsInBhcmVudElkIiwiY29uIiwidG9wQ2xhaW0iLCJDbGFpbTFfMCIsIkNsYWltMV8xIiwiQ2xhaW0yXzAiLCJDbGFpbTJfMSIsIkNsYWltMl8yIiwiQ2xhaW0zXzAiLCJDbGFpbUVkZ2UxXzAiLCJpZCIsIkNsYWltRWRnZTFfMSIsIlNjb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBRUEsTUFBTUEsQ0FBQyxHQUFHQyxTQUFWO0FBRUFDLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLGNBQWQsQ0FBWCxFQUEwQ1AsU0FB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QixDQUNaLGNBRFksRUFFWixjQUZZLENBTE07QUFTdEIsc0JBQWdCLENBQ1osY0FEWSxFQUVaLGNBRlk7QUFUTSxLQTNHUjtBQXlIbEIsNkJBQXlCO0FBQ3JCLHNCQUFnQixDQUNaLGNBRFksQ0FESztBQUlyQixzQkFBZ0IsQ0FDWixjQURZLENBSks7QUFPckIsc0JBQWdCLENBQ1osY0FEWSxDQVBLO0FBVXJCLHNCQUFnQixDQUNaLGNBRFksQ0FWSztBQWFyQixzQkFBZ0IsQ0FDWixjQURZLENBYks7QUFnQnJCLHNCQUFnQixDQUNaLGNBRFk7QUFoQkssS0F6SFA7QUE2SWxCLDBCQUFzQixFQTdJSjtBQThJbEIseUJBQXFCLEVBOUlIO0FBK0lsQixvQkFBZ0IsQ0FDWixXQURZLEVBRVosY0FGWSxFQUdaLFVBSFksRUFJWixjQUpZLEVBS1osY0FMWSxFQU1aLGNBTlk7QUEvSUUsR0FBcEI7QUF5SkEsUUFBTVIsTUFBTSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3pDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVc7QUFBQ2lDLE1BQUFBLEVBQUUsRUFBQztBQUFKLEtBQVgsRUFBNEJ4QyxDQUE1QixFQUErQixlQUEvQixDQURPLENBRGdDO0FBR3RDRyxJQUFBQSxVQUFVLEVBQUVBO0FBSDBCLEdBQXRCLENBQXJCO0FBTUFTLEVBQUFBLE1BQU0sQ0FBQyxDQUFDLE1BQU1ULFVBQVUsQ0FBQ3FCLG1CQUFYLENBQStCLFVBQS9CLENBQVAsRUFBbUQsQ0FBbkQsRUFBc0RGLFVBQXZELENBQU4sQ0FBeUVOLE9BQXpFLENBQWlGLENBQWpGO0FBR0QsQ0FyS0csQ0FBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFB1cmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFB1cmVcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmVBY3Rpb25zIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlQWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0FjdGlvblwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZVRyZWUgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9TY29yZVRyZWVcIjtcclxuLy9pbXBvcnQgeyBSZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmVcIjtcclxuXHJcbmNvbnN0IHUgPSB1bmRlZmluZWQ7XHJcblxyXG50ZXN0KCdhZGQgYSBuZXcgc2NvcmV0cmVlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIC8vIEFkZCBhIG5ldyBjbGFpbSBhbmQgc2V0IGl0IGFzIGEgc2NvcmUgdHJlZSB0b3BcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxudmFyIHRlc3QgPSAgICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeVNvdXJjZUlkW1widG9wVGVzdENsYWltXCJdLmxlbmd0aCkudG9FcXVhbCgxKVxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgZG9lcyBub3QgY2hhbmdlIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgdSwgdSwgXCJQcmlvcml0eSBTZXRcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcInRlc3RUb3BTY29yZVwiLFxyXG4gICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlByaW9yaXR5IFNldFwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQ2hhbmdpbmcgYSBjaGlsZCBwcm8gdmFsdWUgc2hvdWxkIGNoYW5nZSB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm9sZERhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwic2NvcmVUcmVlSWRcIjogXCJ0ZXN0U2NvcmVUcmVlXCIsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIixcclxuICAgICAgICAgIFwic291cmNlRWRnZUlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogLTEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJpZFwiOiBcInRlc3RUb3BTY29yZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfc2NvcmVcIixcclxuICAgICAgICBcImRhdGFJZFwiOiBcInRlc3RUb3BTY29yZVwiXHJcbiAgICAgIH1cclxuICAgIF0pXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgcmV2ZXJzZXMgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCB0ZW1wID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1LCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5kZWJ1Z2dlclxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwidGVzdFRvcFNjb3JlXCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAtMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfc2NvcmVcIixcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkaW5nIGEgZ3JhbmRjaGlsZCBzY29yZSBSZXZlcnNlcyBTY29yZXMgMiBsZXZlbHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMlwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdW5kZWZpbmVkLCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1bmRlZmluZWQsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJncmFuZENoaWxkMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiZ3JhbmRDaGlsZDFcIixcclxuICAgICAgICAgIFwic2NvcmVUcmVlSWRcIjogXCJ0ZXN0U2NvcmVUcmVlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwidGVzdFRvcFNjb3JlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkNoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogLTEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwiaWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDb21wbGV4IFRlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgY2hhbmdlZFNjb3JlcyA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiVG9wIENsYWltXCIsIFwidG9wVGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgXCJDaGlsZENsYWltMlwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiR3JhbmRjaGlsZCBDbGFpbSAxXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1LCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeVNvdXJjZUlkW1widG9wVGVzdENsYWltXCJdLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcblxyXG4gIC8vV2VpcmQgc2NvcmUgbm90IGNoYW5naW5nXHJcbiAgY29uc3QgQ2hpbGRDbGFpbTFTY29yZXNJbml0aWFsID0gYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZXNCeVNvdXJjZUlkKFwiQ2hpbGRDbGFpbTFcIilcclxuICBleHBlY3QoQ2hpbGRDbGFpbTFTY29yZXNJbml0aWFsWzBdLnBybykudG9FcXVhbChmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMyID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJDaGlsZCBDbGFpbSAxXCIsXHJcbiAgICAgICAgICBcImlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9jbGFpbVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwiQ2hpbGRDbGFpbTFcIlxyXG4gICAgICB9IGFzIEFjdGlvbixcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInBhcmVudElkXCI6IFwidG9wVGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcImNoaWxkSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfY2xhaW1FZGdlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIlxyXG4gICAgICB9IGFzIEFjdGlvblxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMyKTtcclxuICBjb25zdCBDaGlsZENsYWltMVNjb3JlcyA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChcIkNoaWxkQ2xhaW0xXCIpXHJcbiAgZXhwZWN0KENoaWxkQ2xhaW0xU2NvcmVzWzBdLnBybykudG9FcXVhbCh0cnVlKTtcclxuXHJcbiAgZXhwZWN0KGNoYW5nZWRTY29yZXMyLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuXHJcblxyXG4gIC8vVE9ETzogRG8gSSB3YW50IHRvIGNoZWNrIGFsbCBpbmRleGVzIGZvciBkdXBsaWNhdGUgaW5kZXhlZCBpdGVtcz9cclxuXHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIEdyYW5kY2hpbGQgVXBkYXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlRvcCBDbGFpbVwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdSwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoY2hhbmdlZFNjb3Jlcyk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRvcFRlc3RDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG4gIGF3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdCk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoLTEpO1xyXG5cclxuICBjb25zdCByZXN1bHQyID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih7IHBybzogdHJ1ZSB9LCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMkVkZ2VcIiksXHJcbiAgICAgIC8vbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkocmVzdWx0Mik7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbn0pO1xyXG5cclxudGVzdCgnUGFydGlhbCBDbGFpbSBFZGdlIENoaWxkIFVwZGF0ZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgXCJDaGlsZENsYWltMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMlwiLCBcIkNoaWxkQ2xhaW0yXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJHcmFuZGNoaWxkIENsYWltIDFcIiwgXCJncmFuZENoaWxkMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiBmYWxzZSB9LCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMkVkZ2VcIiksXHJcbiAgICAgIC8vbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShyZXN1bHQpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKC0xKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0MiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oeyBwcm86IHRydWUgfSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLFxyXG4gICAgICAvL25ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ0RlbGV0aW5nIGFuIGVkZ2Ugc2hvdWxkIHJldmVyc2VzIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoLTEpO1xyXG5cclxuICBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHUsIHsgcGFyZW50SWQ6IFwidG9wVGVzdENsYWltXCIgfSwgXCJkZWxldGVfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ011bHRpIGxldmVsIHJlbGV2YW5jZSBkZWxldGUgdGVzdCcsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuXHJcbiAgY29uc3QgcHJvID0gdHJ1ZTtcclxuICBjb25zdCBjb24gPSBmYWxzZTtcclxuICBjb25zdCB0b3BDbGFpbSA9IG5ldyBDbGFpbShcIlNob3VsZCBGaWN0aW9uIENpdHkgY29udmVydCBFbG0gU3RyZWV0IHRvIG9ubHkgcGVkZXN0cmlhbiB0cmFmZmljP1wiLCBcInRvcFRlc3RDbGFpbVwiKVxyXG4gIGNvbnN0IENsYWltMV8wID0gbmV3IENsYWltKFwiVGhlIHBsYW5uaW5nIGNvbW1pc3Npb24gZXN0aW1hdGVzIHRoaXMgd2lsbCBpbmNyZWFzZSBmb290IHRyYWZmaWMgdG8gbG9jYWwgc2hvcHMgYnkgMTIlIGR1cmluZyBwZWFrIGhvdXJzLlwiLCBcIkNsYWltMV8wXCIpXHJcbiAgY29uc3QgQ2xhaW0xXzEgPSBuZXcgQ2xhaW0oXCJUaGUgaW5jcmVhc2UgaW4gcmV2ZW51ZSBpcyBleHBlY3RlZCB0byBwYXkgb2ZmIHRoZSBleHBlbnNlIGluIHVuZGVyIDIgeWVhcnMgbWVldGluZyB0aGUgY2l0aWVzIGludmVzdG1lbnQgcmVxdWlyZW1lbnRzLlwiLCBcIkNsYWltMV8xXCIpXHJcbiAgY29uc3QgQ2xhaW0yXzAgPSBuZXcgQ2xhaW0oXCJUaGlzIHdpbGwgcmVzdWx0IGluIHRyYWZmaWMgYmVpbmcgZGl2ZXJ0ZWQgZG93biByZXNpZGVudGlhbCBzdHJlZXRzLlwiKVxyXG4gIGNvbnN0IENsYWltMl8xID0gbmV3IENsYWltKFwiQ2hpbGRyZW4gc2FmZXR5IGlzIG1vcmUgaW1wb3J0YW50IHRoYW4gcHJvZml0IGZvciBsb2NhbCBzaG9wcy5cIilcclxuICBjb25zdCBDbGFpbTJfMiA9IG5ldyBDbGFpbShcIkEgc2V0IG9mIHJhaWxyb2FkIHRyYWNrcyBhcmUgbm8gbG9uZ2VyIGluIHVzZSBhbmQgdGhlIENpdHkgY2FuIGNvbnZlcnQgdGhhdCB0byBhIG5ldyBzdHJlZXQuXCIpXHJcbiAgY29uc3QgQ2xhaW0zXzAgPSBuZXcgQ2xhaW0oXCJUaGUgY29udmVyc2lvbiB3aWxsIGNvc3QgMiBNaWxsaW9uIGRvbGxhcnMuXCIpXHJcbiAgY29uc3QgQ2xhaW1FZGdlMV8wID0gbmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0xXzAuaWQsIHUsIHBybywgXCJDbGFpbUVkZ2UxXzBcIik7XHJcbiAgY29uc3QgQ2xhaW1FZGdlMV8xID0gbmV3IENsYWltRWRnZShDbGFpbTFfMC5pZCwgQ2xhaW0xXzEuaWQsIFwicmVsZXZhbmNlXCIsIHBybywgXCJDbGFpbUVkZ2UxXzFcIilcclxuICBjb25zdCBhY3Rpb25zID0gW1xyXG4gICAgbmV3IEFjdGlvbih0b3BDbGFpbSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMV8wLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0xXzEsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTJfMCwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMl8xLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0yXzIsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTNfMCwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltRWRnZTFfMCwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbUVkZ2UxXzEsIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0yXzAuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShDbGFpbTJfMC5pZCwgQ2xhaW0yXzEuaWQsIFwicmVsZXZhbmNlXCIsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShDbGFpbTJfMC5pZCwgQ2xhaW0yXzIuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZSh0b3BDbGFpbS5pZCwgQ2xhaW0zXzAuaWQsIHUsIGNvbiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlKHRvcENsYWltLmlkLCB0b3BDbGFpbS5pZCwgdSwgdSwgdSwgdSwgdSwgMCwgdSwgXCJ0ZXN0VG9wU2NvcmVcIiksIHUsIFwiYWRkX3Njb3JlXCIpLFxyXG4gICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcblxyXG4gICAgXHJcbiAgXVxyXG4gIGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7IGFjdGlvbnM6IGFjdGlvbnMsIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnkgfSlcclxuXHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMC4zMzMzMzMzMzMzMzMzMzMzKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih1bmRlZmluZWQsIENsYWltRWRnZTFfMSwgXCJkZWxldGVfY2xhaW1FZGdlXCIsIENsYWltRWRnZTFfMS5pZClcclxuICAgIF0sIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgwKTtcclxuXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0NvbiBSZWxldmFuY3kgdGVzdCcsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuXHJcbiAgcmVwb3NpdG9yeS5yc0RhdGEgPSB7XHJcbiAgICBcImFjdGlvbnNMb2dcIjogW10sXHJcbiAgICBcIml0ZW1zXCI6IHtcclxuICAgICAgICBcInRvcENsYWltXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiU2hvdWxkIFtEZW52ZXJdKGh0dHBzOi8vbS53aWtpZGF0YS5vcmcvd2lraS9RMTY1NTQpIHBhc3MgYmlsbCBbMjAtMDA3MV0oaHR0cHM6Ly9kZW52ZXIubGVnaXN0YXIuY29tL0xlZ2lzbGF0aW9uRGV0YWlsLmFzcHg/SUQ9NDM0ODUzMSZHVUlEPUI0NEU2MjY4LTMzMjYtNDA2MS04RjhCLUYyNDExOTNGMDIwNCkgcmVwbGFjaW5nIGl0J3MgXFxcInBpdC1idWxsIGJhblxcXCIgd2l0aCBbYnJlZWRcXG5yZXN0cmljdGVkLWxpY2Vuc2VdKGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9waG90bz9mYmlkPTI2ODIzNTE4MzE4NDgzNTQmc2V0PWEuNDY1NTM5MjgwMTk2Mjk4KT9cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJTY29yZVRyZWVcIjoge1xyXG4gICAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJ0b3BDbGFpbVwiLFxyXG4gICAgICAgICAgICBcInRvcFNjb3JlSWRcIjogXCJ0b3BTY29yZVwiLFxyXG4gICAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJzY29yZVRyZWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjNBTTFSRHEwMlZcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCJQaXQgYnVsbHMgYXJlIGRpc3Byb3BvcnRpb25hdGVseSBkYW5nZXJvdXMgY29tcGFyZWQgd2l0aCBvdGhlciBkb2cgYnJlZWRzLlwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjNBTTFNbVhnbk5cIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwidG9wQ2xhaW1cIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjNBTTFNbVhnbk5cIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN5RTF2T0p4UjdcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCIgT3ZlciAxMDAgY2l0aWVzIGhhdmUgcmVwZWFsZWQgdGhlaXIgYmFucyBlbnRpcmVseS5cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3lFMXZPSnhSN1wiLFxyXG4gICAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzeUUxdGltZ0tmXCI6IHtcclxuICAgICAgICAgICAgXCJwYXJlbnRJZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3lFMXZPSnhSN1wiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN5RTF0aW1nS2ZcIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN4RjdKaWZMSEFcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCIgQSBbcmV2aWV3IG9mIGNvbnRyb2xsZWQgc3R1ZGllc10oaHR0cHM6Ly93d3cuYXZtYS5vcmcvcmVzb3VyY2VzLXRvb2xzL2xpdGVyYXR1cmUtcmV2aWV3cy9kb2ctYml0ZS1yaXNrLWFuZC1wcmV2ZW50aW9uLXJvbGUtYnJlZWQpIGRvY3VtZW50cyB0aGF0IHBpdCBidWxscyBhcmUgbm90IGRpc3Byb3BvcnRpb25hdGVseSBkYW5nZXJvdXMgY29tcGFyZWQgd2l0aCBvdGhlciBkb2cgYnJlZWRzLlwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzeEY3SmlmTEhBXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN4RjdKQk9qbmdcIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3hGN0ppZkxIQVwiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzeEY3SkJPam5nXCIsXHJcbiAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1FZGdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzdkxPaTJGSXRrXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiSW4gdGhlIDE0LXllYXIgcGVyaW9kIG9mIDIwMDUgdGhyb3VnaCAyMDE4LCBjYW5pbmVzIGtpbGxlZCA0NzEgQW1lcmljYW5zLiBQaXQgYnVsbHMgY29udHJpYnV0ZWQgdG8gNjYlICgzMTEpIG9mIHRoZXNlIGRlYXRocy4gQ29tYmluZWQsIHBpdCBidWxscyBhbmQgcm90dHdlaWxlcnMgY29udHJpYnV0ZWQgdG8gNzYlIG9mIHRoZSB0b3RhbCByZWNvcmRlZCBkZWF0aHMuIFtkb2dzYml0ZS5vcmddKGh0dHBzOi8vd3d3LmRvZ3NiaXRlLm9yZy9kb2ctYml0ZS1zdGF0aXN0aWNzLWZhdGFsaXRpZXMtMjAxOC5waHApXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2TE9pMkZJdGtcIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3ZMT2lnNllqSlwiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjNBTTFSRHEwMlZcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdkxPaTJGSXRrXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3ZMT2lnNllqSlwiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3Y4eThXV2VTT1wiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIkl0IGlzIG1vcmUgaW1wb3J0YW50IHRvIG1ha2UgZGVjaXNpb25zIGJhc2VkIG9uIGV2aWRlbmNlIHJhdGhlciB0aGFuIHRoZSBkZWNpc2lvbnMgb3RoZXIgaGF2ZSBtYWRlLiBbYXJndW1lbnR1bSBhZCBwb3B1bHVtXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Bcmd1bWVudHVtX2FkX3BvcHVsdW0pXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2OHk4V1dlU09cIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3Y4eThoU0cwZ1wiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdjh5OFdXZVNPXCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcInJlbGV2YW5jZVwiLFxyXG4gICAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3Y4eThoU0cwZ1wiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3V2b2ZmbUxoelwiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIk92ZXIgMTAwIGNpdGllcyBoYXZlIHJlcGVhbGVkIHRoZWlyIGJhbnMgZW50aXJlbHkuXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN1dm9mZm1MaHpcIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJjaGlsZElkXCI6IFwiWTYzdXZvZmZtTGh6XCIsXHJcbiAgICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3V2b2Z2Y3h3blwiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiOiB7XHJcbiAgICAgICAgXCJ0b3BDbGFpbVwiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzQU0xTW1YZ25OXCIsXHJcbiAgICAgICAgICAgIFwiWTYzeUUxdGltZ0tmXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzQU0xUkRxMDJWXCI6IFtcclxuICAgICAgICAgICAgXCJZNjN4RjdKQk9qbmdcIixcclxuICAgICAgICAgICAgXCJZNjN2TE9pZzZZakpcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN5RTF2T0p4UjdcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3Y4eThoU0cwZ1wiLFxyXG4gICAgICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCI6IHtcclxuICAgICAgICBcIlk2M0FNMVJEcTAyVlwiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzQU0xTW1YZ25OXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzeUUxdk9KeFI3XCI6IFtcclxuICAgICAgICAgICAgXCJZNjN5RTF0aW1nS2ZcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN4RjdKaWZMSEFcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3hGN0pCT2puZ1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIlk2M3ZMT2kyRkl0a1wiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzdkxPaWc2WWpKXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzdjh5OFdXZVNPXCI6IFtcclxuICAgICAgICAgICAgXCJZNjN2OHk4aFNHMGdcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN1dm9mZm1MaHpcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3V2b2Z2Y3h3blwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwic2NvcmVJZHNCeVNvdXJjZUlkXCI6IHt9LFxyXG4gICAgXCJjaGlsZElkc0J5U2NvcmVJZFwiOiB7fSxcclxuICAgIFwiU2NvcmVUcmVlSWRzXCI6IFtcclxuICAgICAgICBcIlNjb3JlVHJlZVwiLFxyXG4gICAgICAgIFwiWTYzQWE1cEF6cVlmXCIsXHJcbiAgICAgICAgXCJ0b3BTY29yZVwiLFxyXG4gICAgICAgIFwiWTYzeERlSnJhcEVIXCIsXHJcbiAgICAgICAgXCJZNjN5eDFJQlRlYlBcIixcclxuICAgICAgICBcIlk2M3VDWkM3Y1hyZFwiXHJcbiAgICBdXHJcbn1cclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih7aWQ6XCJTY29yZVRyZWVcIn0sdSwgXCJhZGRfc2NvcmVUcmVlXCIpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KChhd2FpdCByZXBvc2l0b3J5LmdldFNjb3Jlc0J5U291cmNlSWQoXCJ0b3BDbGFpbVwiKSlbMF0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG4iXX0=