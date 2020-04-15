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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ1IiwidW5kZWZpbmVkIiwidGVzdCIsInJlcG9zaXRvcnkiLCJSZXBvc2l0b3J5TG9jYWxQdXJlIiwicmVzdWx0IiwiYWN0aW9ucyIsIkFjdGlvbiIsIkNsYWltIiwiU2NvcmVUcmVlIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwicnNEYXRhIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwibGVuZ3RoIiwidG9FcXVhbCIsInRlbXAiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0IiwiY2hhbmdlZFNjb3JlcyIsIml0ZW1zIiwiY29uZmlkZW5jZSIsIkNoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCIsImdldFNjb3Jlc0J5U291cmNlSWQiLCJwcm8iLCJjaGFuZ2VkU2NvcmVzMiIsIkNoaWxkQ2xhaW0xU2NvcmVzIiwibm90aWZ5IiwicmVzdWx0MiIsInBhcmVudElkIiwiY29uIiwidG9wQ2xhaW0iLCJDbGFpbTFfMCIsIkNsYWltMV8xIiwiQ2xhaW0yXzAiLCJDbGFpbTJfMSIsIkNsYWltMl8yIiwiQ2xhaW0zXzAiLCJDbGFpbUVkZ2UxXzAiLCJpZCIsIkNsYWltRWRnZTFfMSIsIlNjb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBRUEsTUFBTUEsQ0FBQyxHQUFHQyxTQUFWO0FBRUFDLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLGNBQWQsQ0FBWCxFQUEwQ1AsU0FB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WixjQURZLEVBRVosY0FGWSxDQUxNO0FBU3RCLHNCQUFnQixDQUNaLGNBRFksRUFFWixjQUZZO0FBVE0sS0EzR1I7QUF5SGxCLDZCQUF5QjtBQUNyQixzQkFBZ0IsQ0FDWixjQURZLENBREs7QUFJckIsc0JBQWdCLENBQ1osY0FEWSxDQUpLO0FBT3JCLHNCQUFnQixDQUNaLGNBRFksQ0FQSztBQVVyQixzQkFBZ0IsQ0FDWixjQURZLENBVks7QUFhckIsc0JBQWdCLENBQ1osY0FEWSxDQWJLO0FBZ0JyQixzQkFBZ0IsQ0FDWixjQURZO0FBaEJLLEtBekhQO0FBNklsQiwwQkFBc0IsRUE3SUo7QUE4SWxCLHlCQUFxQixFQTlJSDtBQStJbEIsb0JBQWdCLENBQ1osV0FEWSxFQUVaLGNBRlksRUFHWixVQUhZLEVBSVosY0FKWSxFQUtaLGNBTFksRUFNWixjQU5ZO0FBL0lFLEdBQXBCO0FBeUpBLFFBQU1SLE1BQU0sR0FBRyxNQUFNLGtEQUFzQjtBQUN6Q0MsSUFBQUEsT0FBTyxFQUFFLENBQ1AsSUFBSUMsY0FBSixDQUFXO0FBQUNpQyxNQUFBQSxFQUFFLEVBQUM7QUFBSixLQUFYLEVBQTRCeEMsQ0FBNUIsRUFBK0IsZUFBL0IsQ0FETyxDQURnQztBQUd0Q0csSUFBQUEsVUFBVSxFQUFFQTtBQUgwQixHQUF0QixDQUFyQjtBQU1BUyxFQUFBQSxNQUFNLENBQUMsQ0FBQyxNQUFNVCxVQUFVLENBQUNxQixtQkFBWCxDQUErQixVQUEvQixDQUFQLEVBQW1ELENBQW5ELEVBQXNERixVQUF2RCxDQUFOLENBQXlFTixPQUF6RSxDQUFpRixDQUFqRjtBQUdELENBcktHLENBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5TG9jYWxQdXJlIH0gZnJvbSBcIi4uL3JlcG9zaXRvcmllcy9SZXBvc2l0b3J5TG9jYWxQdXJlXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZUFjdGlvbnNcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbVwiO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9BY3Rpb25cIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgU2NvcmVUcmVlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvU2NvcmVUcmVlXCI7XHJcbi8vaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFJlYWN0aXZlXCI7XHJcblxyXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xyXG5cclxudGVzdCgnYWRkIGEgbmV3IHNjb3JldHJlZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICAvLyBBZGQgYSBuZXcgY2xhaW0gYW5kIHNldCBpdCBhcyBhIHNjb3JlIHRyZWUgdG9wXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcbnZhciB0ZXN0ID0gICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIik7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRvcFRlc3RDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSlcclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IGRvZXMgbm90IGNoYW5nZSB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIHUsIHUsIFwiUHJpb3JpdHkgU2V0XCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIixcclxuICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJQcmlvcml0eSBTZXRcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0NoYW5naW5nIGEgY2hpbGQgcHJvIHZhbHVlIHNob3VsZCBjaGFuZ2UgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCB0ZW1wID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJDaGlsZENsYWltMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJvbGREYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwidGVzdFRvcFNjb3JlXCIsXHJcbiAgICAgICAgICBcInNvdXJjZUVkZ2VJZFwiOiBcIkNoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRvcFRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJzY29yZVRyZWVJZFwiOiBcInRlc3RTY29yZVRyZWVcIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IC0xLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwiaWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgICAgXCJkYXRhSWRcIjogXCJ0ZXN0VG9wU2NvcmVcIlxyXG4gICAgICB9XHJcbiAgICBdKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IHJldmVyc2VzIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgdGVtcCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdSwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcInRlc3RUb3BTY29yZVwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRvcFRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogLTEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X3Njb3JlXCIsXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZGluZyBhIGdyYW5kY2hpbGQgc2NvcmUgUmV2ZXJzZXMgU2NvcmVzIDIgbGV2ZWxzJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IHRlbXAgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdW5kZWZpbmVkLCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdW5kZWZpbmVkLCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcImdyYW5kQ2hpbGQxXCIsXHJcbiAgICAgICAgICBcInNjb3JlVHJlZUlkXCI6IFwidGVzdFNjb3JlVHJlZVwiLFxyXG4gICAgICAgICAgXCJzb3VyY2VFZGdlSWRcIjogXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOiB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJzY29yZVRyZWVJZFwiOiBcInRlc3RTY29yZVRyZWVcIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcInRlc3RUb3BTY29yZVwiLFxyXG4gICAgICAgICAgXCJzb3VyY2VFZGdlSWRcIjogXCJDaGlsZENsYWltMUVkZ2VcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IC0xLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6IHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRvcFRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJzY29yZVRyZWVJZFwiOiBcInRlc3RTY29yZVRyZWVcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcImlkXCI6IFwidGVzdFRvcFNjb3JlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZVwiOiBcIm1vZGlmeV9zY29yZVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwidGVzdFRvcFNjb3JlXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQ29tcGxleCBUZXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGNvbnN0IGNoYW5nZWRTY29yZXMgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlRvcCBDbGFpbVwiLCBcInRvcFRlc3RDbGFpbVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMVwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAyXCIsIFwiQ2hpbGRDbGFpbTJcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkdyYW5kY2hpbGQgQ2xhaW0gMVwiLCBcImdyYW5kQ2hpbGQxXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdSwgZmFsc2UsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcIkNoaWxkQ2xhaW0xXCIsIFwiZ3JhbmRDaGlsZDFcIiwgdSwgZmFsc2UsIFwiR3JhbmRDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgU2NvcmVUcmVlKFwidG9wVGVzdENsYWltXCIsIFwidGVzdFRvcFNjb3JlXCIsIHUsIFwidGVzdFNjb3JlVHJlZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9zY29yZVRyZWVcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkoY2hhbmdlZFNjb3Jlcyk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLnNjb3JlSWRzQnlTb3VyY2VJZFtcInRvcFRlc3RDbGFpbVwiXS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG5cclxuICAvL1dlaXJkIHNjb3JlIG5vdCBjaGFuZ2luZ1xyXG4gIGNvbnN0IENoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbCA9IGF3YWl0IHJlcG9zaXRvcnkuZ2V0U2NvcmVzQnlTb3VyY2VJZChcIkNoaWxkQ2xhaW0xXCIpXHJcbiAgZXhwZWN0KENoaWxkQ2xhaW0xU2NvcmVzSW5pdGlhbFswXS5wcm8pLnRvRXF1YWwoZmFsc2UpO1xyXG5cclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzMiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiQ2hpbGQgQ2xhaW0gMVwiLFxyXG4gICAgICAgICAgXCJpZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInR5cGVcIjogXCJtb2RpZnlfY2xhaW1cIixcclxuICAgICAgICBcImRhdGFJZFwiOiBcIkNoaWxkQ2xhaW0xXCJcclxuICAgICAgfSBhcyBBY3Rpb24sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjoge1xyXG4gICAgICAgICAgXCJwYXJlbnRJZFwiOiBcInRvcFRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJjaGlsZElkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCIsXHJcbiAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibW9kaWZ5X2NsYWltRWRnZVwiLFxyXG4gICAgICAgIFwiZGF0YUlkXCI6IFwiQ2hpbGRDbGFpbTFFZGdlXCJcclxuICAgICAgfSBhcyBBY3Rpb25cclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzMik7XHJcbiAgY29uc3QgQ2hpbGRDbGFpbTFTY29yZXMgPSBhd2FpdCByZXBvc2l0b3J5LmdldFNjb3Jlc0J5U291cmNlSWQoXCJDaGlsZENsYWltMVwiKVxyXG4gIGV4cGVjdChDaGlsZENsYWltMVNjb3Jlc1swXS5wcm8pLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gIGV4cGVjdChjaGFuZ2VkU2NvcmVzMi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG5cclxuICAvL1RPRE86IERvIEkgd2FudCB0byBjaGVjayBhbGwgaW5kZXhlcyBmb3IgZHVwbGljYXRlIGluZGV4ZWQgaXRlbXM/XHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ1BhcnRpYWwgQ2xhaW0gRWRnZSBHcmFuZGNoaWxkIFVwZGF0ZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICBjb25zdCBjaGFuZ2VkU2NvcmVzID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJUb3AgQ2xhaW1cIiwgXCJ0b3BUZXN0Q2xhaW1cIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDFcIiwgXCJDaGlsZENsYWltMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiQ2hpbGQgQ2xhaW0gMlwiLCBcIkNoaWxkQ2xhaW0yXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJHcmFuZGNoaWxkIENsYWltIDFcIiwgXCJncmFuZENoaWxkMVwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJDaGlsZENsYWltMVwiLCBcImdyYW5kQ2hpbGQxXCIsIHUsIGZhbHNlLCBcIkdyYW5kQ2hpbGRDbGFpbTFFZGdlXCIpLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICAvL2F3YWl0IHJlcG9zaXRvcnkubm90aWZ5KGNoYW5nZWRTY29yZXMpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5zY29yZUlkc0J5U291cmNlSWRbXCJ0b3BUZXN0Q2xhaW1cIl0ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuICBhd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShyZXN1bHQpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKC0xKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0MiA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oeyBwcm86IHRydWUgfSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLFxyXG4gICAgICAvL25ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIHRydWUsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLCB1LCBcIm1vZGlmeV9jbGFpbUVkZ2VcIiksXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGF3YWl0IHJlcG9zaXRvcnkubm90aWZ5KHJlc3VsdDIpO1xyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDEpO1xyXG59KTtcclxuXHJcbnRlc3QoJ1BhcnRpYWwgQ2xhaW0gRWRnZSBDaGlsZCBVcGRhdGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcbiAgY29uc3QgY2hhbmdlZFNjb3JlcyA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiVG9wIENsYWltXCIsIFwidG9wVGVzdENsYWltXCIpLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJDaGlsZCBDbGFpbSAxXCIsIFwiQ2hpbGRDbGFpbTFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIkNoaWxkIENsYWltIDJcIiwgXCJDaGlsZENsYWltMlwiKSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiR3JhbmRjaGlsZCBDbGFpbSAxXCIsIFwiZ3JhbmRDaGlsZDFcIiksIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1LCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidG9wVGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTJcIiwgdSwgdHJ1ZSwgXCJDaGlsZENsYWltMkVkZ2VcIiksIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwiQ2hpbGRDbGFpbTFcIiwgXCJncmFuZENoaWxkMVwiLCB1LCBmYWxzZSwgXCJHcmFuZENoaWxkQ2xhaW0xRWRnZVwiKSwgdSwgXCJhZGRfY2xhaW1FZGdlXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBTY29yZVRyZWUoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJ0ZXN0VG9wU2NvcmVcIiwgdSwgXCJ0ZXN0U2NvcmVUcmVlXCIpLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JlVHJlZVwiKSxcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgLy9hd2FpdCByZXBvc2l0b3J5Lm5vdGlmeShjaGFuZ2VkU2NvcmVzKTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih7IHBybzogZmFsc2UgfSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTJFZGdlXCIpLFxyXG4gICAgICAvL25ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRvcFRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0yXCIsIHUsIGZhbHNlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG4gIC8vYXdhaXQgcmVwb3NpdG9yeS5ub3RpZnkocmVzdWx0KTtcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgtMSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdDIgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKHsgcHJvOiB0cnVlIH0sIHUsIFwibW9kaWZ5X2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSxcclxuICAgICAgLy9uZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMlwiLCB1LCB0cnVlLCBcIkNoaWxkQ2xhaW0yRWRnZVwiKSwgdSwgXCJtb2RpZnlfY2xhaW1FZGdlXCIpLFxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnlcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxufSk7XHJcblxyXG50ZXN0KCdEZWxldGluZyBhbiBlZGdlIHNob3VsZCByZXZlcnNlcyB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltKFwiXCIsIFwidG9wVGVzdENsYWltXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcIkNoaWxkQ2xhaW0xXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0b3BUZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG4gICAgXSwgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKC0xKTtcclxuXHJcbiAgYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbih1LCB7IHBhcmVudElkOiBcInRvcFRlc3RDbGFpbVwiIH0sIFwiZGVsZXRlX2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKVxyXG4gICAgXSwgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuaXRlbXNbXCJ0ZXN0VG9wU2NvcmVcIl0uY29uZmlkZW5jZSkudG9FcXVhbCgxKTtcclxufSk7XHJcblxyXG50ZXN0KCdNdWx0aSBsZXZlbCByZWxldmFuY2UgZGVsZXRlIHRlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcblxyXG4gIGNvbnN0IHBybyA9IHRydWU7XHJcbiAgY29uc3QgY29uID0gZmFsc2U7XHJcbiAgY29uc3QgdG9wQ2xhaW0gPSBuZXcgQ2xhaW0oXCJTaG91bGQgRmljdGlvbiBDaXR5IGNvbnZlcnQgRWxtIFN0cmVldCB0byBvbmx5IHBlZGVzdHJpYW4gdHJhZmZpYz9cIiwgXCJ0b3BUZXN0Q2xhaW1cIilcclxuICBjb25zdCBDbGFpbTFfMCA9IG5ldyBDbGFpbShcIlRoZSBwbGFubmluZyBjb21taXNzaW9uIGVzdGltYXRlcyB0aGlzIHdpbGwgaW5jcmVhc2UgZm9vdCB0cmFmZmljIHRvIGxvY2FsIHNob3BzIGJ5IDEyJSBkdXJpbmcgcGVhayBob3Vycy5cIiwgXCJDbGFpbTFfMFwiKVxyXG4gIGNvbnN0IENsYWltMV8xID0gbmV3IENsYWltKFwiVGhlIGluY3JlYXNlIGluIHJldmVudWUgaXMgZXhwZWN0ZWQgdG8gcGF5IG9mZiB0aGUgZXhwZW5zZSBpbiB1bmRlciAyIHllYXJzIG1lZXRpbmcgdGhlIGNpdGllcyBpbnZlc3RtZW50IHJlcXVpcmVtZW50cy5cIiwgXCJDbGFpbTFfMVwiKVxyXG4gIGNvbnN0IENsYWltMl8wID0gbmV3IENsYWltKFwiVGhpcyB3aWxsIHJlc3VsdCBpbiB0cmFmZmljIGJlaW5nIGRpdmVydGVkIGRvd24gcmVzaWRlbnRpYWwgc3RyZWV0cy5cIilcclxuICBjb25zdCBDbGFpbTJfMSA9IG5ldyBDbGFpbShcIkNoaWxkcmVuIHNhZmV0eSBpcyBtb3JlIGltcG9ydGFudCB0aGFuIHByb2ZpdCBmb3IgbG9jYWwgc2hvcHMuXCIpXHJcbiAgY29uc3QgQ2xhaW0yXzIgPSBuZXcgQ2xhaW0oXCJBIHNldCBvZiByYWlscm9hZCB0cmFja3MgYXJlIG5vIGxvbmdlciBpbiB1c2UgYW5kIHRoZSBDaXR5IGNhbiBjb252ZXJ0IHRoYXQgdG8gYSBuZXcgc3RyZWV0LlwiKVxyXG4gIGNvbnN0IENsYWltM18wID0gbmV3IENsYWltKFwiVGhlIGNvbnZlcnNpb24gd2lsbCBjb3N0IDIgTWlsbGlvbiBkb2xsYXJzLlwiKVxyXG4gIGNvbnN0IENsYWltRWRnZTFfMCA9IG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIENsYWltMV8wLmlkLCB1LCBwcm8sIFwiQ2xhaW1FZGdlMV8wXCIpO1xyXG4gIGNvbnN0IENsYWltRWRnZTFfMSA9IG5ldyBDbGFpbUVkZ2UoQ2xhaW0xXzAuaWQsIENsYWltMV8xLmlkLCBcInJlbGV2YW5jZVwiLCBwcm8sIFwiQ2xhaW1FZGdlMV8xXCIpXHJcbiAgY29uc3QgYWN0aW9ucyA9IFtcclxuICAgIG5ldyBBY3Rpb24odG9wQ2xhaW0sIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTFfMCwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMV8xLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0yXzAsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbTJfMSwgdSwgXCJhZGRfY2xhaW1cIiksXHJcbiAgICBuZXcgQWN0aW9uKENsYWltMl8yLCB1LCBcImFkZF9jbGFpbVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW0zXzAsIHUsIFwiYWRkX2NsYWltXCIpLFxyXG4gICAgbmV3IEFjdGlvbihDbGFpbUVkZ2UxXzAsIHUsIFwiYWRkX2NsYWltRWRnZVwiKSxcclxuICAgIG5ldyBBY3Rpb24oQ2xhaW1FZGdlMV8xLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIENsYWltMl8wLmlkLCB1LCBjb24pLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoQ2xhaW0yXzAuaWQsIENsYWltMl8xLmlkLCBcInJlbGV2YW5jZVwiLCBjb24pLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoQ2xhaW0yXzAuaWQsIENsYWltMl8yLmlkLCB1LCBjb24pLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UodG9wQ2xhaW0uaWQsIENsYWltM18wLmlkLCB1LCBjb24pLCB1LCBcImFkZF9jbGFpbUVkZ2VcIiksXHJcbiAgICBuZXcgQWN0aW9uKG5ldyBTY29yZSh0b3BDbGFpbS5pZCwgdG9wQ2xhaW0uaWQsIHUsIHUsIHUsIHUsIHUsIDAsIHUsIFwidGVzdFRvcFNjb3JlXCIpLCB1LCBcImFkZF9zY29yZVwiKSxcclxuICAgIG5ldyBBY3Rpb24obmV3IFNjb3JlVHJlZShcInRvcFRlc3RDbGFpbVwiLCBcInRlc3RUb3BTY29yZVwiLCB1LCBcInRlc3RTY29yZVRyZWVcIiksIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVUcmVlXCIpLFxyXG5cclxuICAgIFxyXG4gIF1cclxuICBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoeyBhY3Rpb25zOiBhY3Rpb25zLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5IH0pXHJcblxyXG4gIGV4cGVjdChyZXBvc2l0b3J5LnJzRGF0YS5pdGVtc1tcInRlc3RUb3BTY29yZVwiXS5jb25maWRlbmNlKS50b0VxdWFsKDAuMzMzMzMzMzMzMzMzMzMzMyk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24odW5kZWZpbmVkLCBDbGFpbUVkZ2UxXzEsIFwiZGVsZXRlX2NsYWltRWRnZVwiLCBDbGFpbUVkZ2UxXzEuaWQpXHJcbiAgICBdLCByZXBvc2l0b3J5OiByZXBvc2l0b3J5XHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlcG9zaXRvcnkucnNEYXRhLml0ZW1zW1widGVzdFRvcFNjb3JlXCJdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMCk7XHJcblxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdDb24gUmVsZXZhbmN5IHRlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKCk7XHJcblxyXG4gIHJlcG9zaXRvcnkucnNEYXRhID0ge1xyXG4gICAgXCJhY3Rpb25zTG9nXCI6IFtdLFxyXG4gICAgXCJpdGVtc1wiOiB7XHJcbiAgICAgICAgXCJ0b3BDbGFpbVwiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlNob3VsZCBbRGVudmVyXShodHRwczovL20ud2lraWRhdGEub3JnL3dpa2kvUTE2NTU0KSBwYXNzIGJpbGwgWzIwLTAwNzFdKGh0dHBzOi8vZGVudmVyLmxlZ2lzdGFyLmNvbS9MZWdpc2xhdGlvbkRldGFpbC5hc3B4P0lEPTQzNDg1MzEmR1VJRD1CNDRFNjI2OC0zMzI2LTQwNjEtOEY4Qi1GMjQxMTkzRjAyMDQpIHJlcGxhY2luZyBpdCdzIFxcXCJwaXQtYnVsbCBiYW5cXFwiIHdpdGggW2JyZWVkXFxucmVzdHJpY3RlZC1saWNlbnNlXShodHRwczovL3d3dy5mYWNlYm9vay5jb20vcGhvdG8/ZmJpZD0yNjgyMzUxODMxODQ4MzU0JnNldD1hLjQ2NTUzOTI4MDE5NjI5OCk/XCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJ0b3BDbGFpbVwiLFxyXG4gICAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiU2NvcmVUcmVlXCI6IHtcclxuICAgICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidG9wQ2xhaW1cIixcclxuICAgICAgICAgICAgXCJ0b3BTY29yZUlkXCI6IFwidG9wU2NvcmVcIixcclxuICAgICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJTY29yZVRyZWVcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2NvcmVUcmVlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzQU0xUkRxMDJWXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiUGl0IGJ1bGxzIGFyZSBkaXNwcm9wb3J0aW9uYXRlbHkgZGFuZ2Vyb3VzIGNvbXBhcmVkIHdpdGggb3RoZXIgZG9nIGJyZWVkcy5cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M0FNMVJEcTAyVlwiLFxyXG4gICAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzQU0xTW1YZ25OXCI6IHtcclxuICAgICAgICAgICAgXCJwYXJlbnRJZFwiOiBcInRvcENsYWltXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M0FNMVJEcTAyVlwiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzQU0xTW1YZ25OXCIsXHJcbiAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1FZGdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzeUUxdk9KeFI3XCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiIE92ZXIgMTAwIGNpdGllcyBoYXZlIHJlcGVhbGVkIHRoZWlyIGJhbnMgZW50aXJlbHkuXCIsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3lFMXRpbWdLZlwiOiB7XHJcbiAgICAgICAgICAgIFwicGFyZW50SWRcIjogXCJ0b3BDbGFpbVwiLFxyXG4gICAgICAgICAgICBcImNoaWxkSWRcIjogXCJZNjN5RTF2T0p4UjdcIixcclxuICAgICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzeUUxdGltZ0tmXCIsXHJcbiAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1FZGdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzeEY3SmlmTEhBXCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiIEEgW3JldmlldyBvZiBjb250cm9sbGVkIHN0dWRpZXNdKGh0dHBzOi8vd3d3LmF2bWEub3JnL3Jlc291cmNlcy10b29scy9saXRlcmF0dXJlLXJldmlld3MvZG9nLWJpdGUtcmlzay1hbmQtcHJldmVudGlvbi1yb2xlLWJyZWVkKSBkb2N1bWVudHMgdGhhdCBwaXQgYnVsbHMgYXJlIG5vdCBkaXNwcm9wb3J0aW9uYXRlbHkgZGFuZ2Vyb3VzIGNvbXBhcmVkIHdpdGggb3RoZXIgZG9nIGJyZWVkcy5cIixcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3hGN0ppZkxIQVwiLFxyXG4gICAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWTYzeEY3SkJPam5nXCI6IHtcclxuICAgICAgICAgICAgXCJwYXJlbnRJZFwiOiBcIlk2M0FNMVJEcTAyVlwiLFxyXG4gICAgICAgICAgICBcImNoaWxkSWRcIjogXCJZNjN4RjdKaWZMSEFcIixcclxuICAgICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlk2M3hGN0pCT2puZ1wiLFxyXG4gICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImNsYWltRWRnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlk2M3ZMT2kyRkl0a1wiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIkluIHRoZSAxNC15ZWFyIHBlcmlvZCBvZiAyMDA1IHRocm91Z2ggMjAxOCwgY2FuaW5lcyBraWxsZWQgNDcxIEFtZXJpY2Fucy4gUGl0IGJ1bGxzIGNvbnRyaWJ1dGVkIHRvIDY2JSAoMzExKSBvZiB0aGVzZSBkZWF0aHMuIENvbWJpbmVkLCBwaXQgYnVsbHMgYW5kIHJvdHR3ZWlsZXJzIGNvbnRyaWJ1dGVkIHRvIDc2JSBvZiB0aGUgdG90YWwgcmVjb3JkZWQgZGVhdGhzLiBbZG9nc2JpdGUub3JnXShodHRwczovL3d3dy5kb2dzYml0ZS5vcmcvZG9nLWJpdGUtc3RhdGlzdGljcy1mYXRhbGl0aWVzLTIwMTgucGhwKVwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzdkxPaTJGSXRrXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN2TE9pZzZZakpcIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwiWTYzQU0xUkRxMDJWXCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3ZMT2kyRkl0a1wiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2TE9pZzZZakpcIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN2OHk4V1dlU09cIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCJJdCBpcyBtb3JlIGltcG9ydGFudCB0byBtYWtlIGRlY2lzaW9ucyBiYXNlZCBvbiBldmlkZW5jZSByYXRoZXIgdGhhbiB0aGUgZGVjaXNpb25zIG90aGVyIGhhdmUgbWFkZS4gW2FyZ3VtZW50dW0gYWQgcG9wdWx1bV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXJndW1lbnR1bV9hZF9wb3B1bHVtKVwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzdjh5OFdXZVNPXCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN2OHk4aFNHMGdcIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwiWTYzeUUxdk9KeFI3XCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3Y4eThXV2VTT1wiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJyZWxldmFuY2VcIixcclxuICAgICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN2OHk4aFNHMGdcIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN1dm9mZm1MaHpcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCJPdmVyIDEwMCBjaXRpZXMgaGF2ZSByZXBlYWxlZCB0aGVpciBiYW5zIGVudGlyZWx5LlwiLFxyXG4gICAgICAgICAgICBcImlkXCI6IFwiWTYzdXZvZmZtTGh6XCIsXHJcbiAgICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZNjN1dm9mdmN4d25cIjoge1xyXG4gICAgICAgICAgICBcInBhcmVudElkXCI6IFwiWTYzeUUxdk9KeFI3XCIsXHJcbiAgICAgICAgICAgIFwiY2hpbGRJZFwiOiBcIlk2M3V2b2ZmbUxoelwiLFxyXG4gICAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJZNjN1dm9mdmN4d25cIixcclxuICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJjbGFpbUVkZ2VcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5UGFyZW50SWRcIjoge1xyXG4gICAgICAgIFwidG9wQ2xhaW1cIjogW1xyXG4gICAgICAgICAgICBcIlk2M0FNMU1tWGduTlwiLFxyXG4gICAgICAgICAgICBcIlk2M3lFMXRpbWdLZlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIlk2M0FNMVJEcTAyVlwiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzeEY3SkJPam5nXCIsXHJcbiAgICAgICAgICAgIFwiWTYzdkxPaWc2WWpKXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzeUUxdk9KeFI3XCI6IFtcclxuICAgICAgICAgICAgXCJZNjN2OHk4aFNHMGdcIixcclxuICAgICAgICAgICAgXCJZNjN1dm9mdmN4d25cIlxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5Q2hpbGRJZFwiOiB7XHJcbiAgICAgICAgXCJZNjNBTTFSRHEwMlZcIjogW1xyXG4gICAgICAgICAgICBcIlk2M0FNMU1tWGduTlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIlk2M3lFMXZPSnhSN1wiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzeUUxdGltZ0tmXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzeEY3SmlmTEhBXCI6IFtcclxuICAgICAgICAgICAgXCJZNjN4RjdKQk9qbmdcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJZNjN2TE9pMkZJdGtcIjogW1xyXG4gICAgICAgICAgICBcIlk2M3ZMT2lnNllqSlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIlk2M3Y4eThXV2VTT1wiOiBbXHJcbiAgICAgICAgICAgIFwiWTYzdjh5OGhTRzBnXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiWTYzdXZvZmZtTGh6XCI6IFtcclxuICAgICAgICAgICAgXCJZNjN1dm9mdmN4d25cIlxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcInNjb3JlSWRzQnlTb3VyY2VJZFwiOiB7fSxcclxuICAgIFwiY2hpbGRJZHNCeVNjb3JlSWRcIjoge30sXHJcbiAgICBcIlNjb3JlVHJlZUlkc1wiOiBbXHJcbiAgICAgICAgXCJTY29yZVRyZWVcIixcclxuICAgICAgICBcIlk2M0FhNXBBenFZZlwiLFxyXG4gICAgICAgIFwidG9wU2NvcmVcIixcclxuICAgICAgICBcIlk2M3hEZUpyYXBFSFwiLFxyXG4gICAgICAgIFwiWTYzeXgxSUJUZWJQXCIsXHJcbiAgICAgICAgXCJZNjN1Q1pDN2NYcmRcIlxyXG4gICAgXVxyXG59XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24oe2lkOlwiU2NvcmVUcmVlXCJ9LHUsIFwiYWRkX3Njb3JlVHJlZVwiKVxyXG4gICAgXSwgcmVwb3NpdG9yeTogcmVwb3NpdG9yeVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdCgoYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZXNCeVNvdXJjZUlkKFwidG9wQ2xhaW1cIikpWzBdLmNvbmZpZGVuY2UpLnRvRXF1YWwoMSk7XHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuIl19