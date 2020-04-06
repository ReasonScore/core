import { RepositoryLocalPure } from "../repositories/RepositoryLocalPure";
import { calculateScoreActions } from "../calculateScoreActions";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action } from "../dataModels/Action";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
import { ScoreTree } from "../dataModels/ScoreTree";
//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";

const u = undefined;

test('add a new scoretree', async () => {
  const repository = new RepositoryLocalPure();
  // Add a new claim and set it as a score tree top
  const result = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), undefined, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository,
    calculator: calculateScore
  })

  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1)
});

test('Add a child that does not change the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), undefined, "add_claim"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, u, u, "Priority Set"), undefined, "add_claimEdge")
    ],
    repository: repository
  })

  expect(result).toMatchObject(
    [
      {
        "newData":
        {
          "sourceClaimId": "ChildClaim1",
          "reversible": false,
          "pro": true,
          "affects": "confidence",
          "confidence": 1,
          "relevance": 1,
          "parentScoreId": "testTopScore",
          "priority": "Priority Set"
        }, "oldData": undefined,
        "type": "add_score",
      }
    ]
  )

});

test('Changing a child pro value should change the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), u, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
      new Action(new Claim("", "ChildClaim1"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, true, "ChildClaim1Edge"), u, "add_claimEdge")
    ],
    repository: repository
  })
  debugger

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "modify_claimEdge")
    ],
    repository: repository
  })

  expect(result).toMatchObject(
    [
      {
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
          "relevance": 1,
        },
        "type": "modify_score",
      },
      {
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
      }
    ])

});

test('Add a child that reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), undefined, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge")
    ],
    repository: repository,
    calculator: calculateScore
  })
debugger
  expect(result).toMatchObject(
    [
      {
        "newData":
        {
          "sourceClaimId": "ChildClaim1",
          "reversible": false,
          "pro": false,
          "affects": "confidence",
          "confidence": 1,
          "relevance": 1,
          "parentScoreId": "testTopScore"
        }, "oldData": undefined,
        "type": "add_score",
      },
      {
        "newData":
        {
          "sourceClaimId": "topTestClaim",
          "parentScoreId": undefined,
          "reversible": false,
          "pro": true,
          "affects": "confidence",
          "confidence": 0,
          "relevance": 1,
        }, "oldData": undefined,
        "type": "modify_score",
      }
    ]
  )

});

test('Adding a grandchild score Reverses Scores 2 levels', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), undefined, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
      new Action(new Claim("", "ChildClaim2"), undefined, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", undefined, true, "ChildClaim2Edge"), undefined, "add_claimEdge"),
      new Action(new Claim("", "grandChild1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", undefined, false, "GrandChildClaim1Edge"), undefined, "add_claimEdge")
    ],
    repository: repository,
    calculator: calculateScore
  })

  expect(result).toMatchObject(
    [
      {
        "newData": {
          "sourceClaimId": "grandChild1",
          "scoreTreeId": "testScoreTree",
          "sourceEdgeId": "GrandChildClaim1Edge",
          "reversible": false,
          "pro": false,
          "affects": "confidence",
          "confidence": 1,
          "relevance": 1,
        },
        "type": "add_score",
      },
      {
        "newData": {
          "sourceClaimId": "ChildClaim1",
          "scoreTreeId": "testScoreTree",
          "parentScoreId": "testTopScore",
          "sourceEdgeId": "ChildClaim1Edge",
          "reversible": false,
          "pro": false,
          "affects": "confidence",
          "confidence": 0,
          "relevance": 1,
        },
        "type": "modify_score",
      },
      {
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
      }
    ]
  )

});

test('Complex Test', async () => {
  const repository = new RepositoryLocalPure();
  const changedScores = await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1);


  //Weird score not changing
  const ChildClaim1ScoresInitial = await repository.getScoresBySourceId("ChildClaim1")
  expect(ChildClaim1ScoresInitial[0].pro).toEqual(false);

  const changedScores2 = await calculateScoreActions({
    actions: [
      {
        "newData": {
          "content": "Child Claim 1",
          "id": "ChildClaim1",
          "reversible": false,
          "type": "claim"
        },
        "type": "modify_claim",
        "dataId": "ChildClaim1"
      } as Action,
      {
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
      } as Action
    ],
    repository: repository
  })

  //await repository.notify(changedScores2);
  const ChildClaim1Scores = await repository.getScoresBySourceId("ChildClaim1")
  expect(ChildClaim1Scores[0].pro).toEqual(true);

  expect(changedScores2.length).toEqual(1);


  //TODO: Do I want to check all indexes for duplicate indexed items?

});

test('Partial Claim Edge Grandchild Update', async () => {
  const repository = new RepositoryLocalPure();
  const changedScores = await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  await repository.notify(result);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  await repository.notify(result2);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});

test('Partial Claim Edge Child Update', async () => {
  const repository = new RepositoryLocalPure();
  const changedScores = await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action({ pro: false }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  //await repository.notify(result);
  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});

test('Deleting an edge should reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), undefined, "add_claim"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ], repository: repository
  })

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);

  await calculateScoreActions({
    actions: [
      new Action(u, { parentId: "topTestClaim" }, "delete_claimEdge", "ChildClaim1Edge")
    ], repository: repository,
  })

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(1);
});

test('Multi level relevance test', async () => {
  const repository = new RepositoryLocalPure();

  const pro = true;
  const con = false;
  const topClaim = new Claim("Should Fiction City convert Elm Street to only pedestrian traffic?", "topTestClaim")
  const Claim1_0 = new Claim("The planning commission estimates this will increase foot traffic to local shops by 12% during peak hours.", "Claim1_0")
  const Claim1_1 = new Claim("The increase in revenue is expected to pay off the expense in under 2 years meeting the cities investment requirements.", "Claim1_1")
  const Claim2_0 = new Claim("This will result in traffic being diverted down residential streets.")
  const Claim2_1 = new Claim("Children safety is more important than profit for local shops.")
  const Claim2_2 = new Claim("A set of railroad tracks are no longer in use and the City can convert that to a new street.")
  const Claim3_0 = new Claim("The conversion will cost 2 Million dollars.")
  const ClaimEdge1_0 = new ClaimEdge(topClaim.id, Claim1_0.id, u, pro, "ClaimEdge1_0");
  const ClaimEdge1_1 = new ClaimEdge(Claim1_0.id, Claim1_1.id, "relevance", pro, "ClaimEdge1_1")
  const actions = [
    new Action(topClaim, u, "add_claim"),
    new Action(Claim1_0, u, "add_claim"),
    new Action(Claim1_1, u, "add_claim"),
    new Action(Claim2_0, u, "add_claim"),
    new Action(Claim2_1, u, "add_claim"),
    new Action(Claim2_2, u, "add_claim"),
    new Action(Claim3_0, u, "add_claim"),
    new Action(ClaimEdge1_0, u, "add_claimEdge"),
    new Action(ClaimEdge1_1, u, "add_claimEdge"),
    new Action(new ClaimEdge(topClaim.id, Claim2_0.id, u, con), u, "add_claimEdge"),
    new Action(new ClaimEdge(Claim2_0.id, Claim2_1.id, "relevance", con), u, "add_claimEdge"),
    new Action(new ClaimEdge(Claim2_0.id, Claim2_2.id, u, con), u, "add_claimEdge"),
    new Action(new ClaimEdge(topClaim.id, Claim3_0.id, u, con), u, "add_claimEdge"),
    new Action(new Score(topClaim.id, topClaim.id, u, u, u, u, u, 0, u, "testTopScore"), u, "add_score"),
    new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),

    
  ]
  await calculateScoreActions({ actions: actions, repository: repository })

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0.3333333333333333);

  const result = await calculateScoreActions({
    actions: [
      new Action(undefined, ClaimEdge1_1, "delete_claimEdge", ClaimEdge1_1.id)
    ], repository: repository
  })

  expect(repository.rsData.items["testTopScore"].confidence).toEqual(0);


});
