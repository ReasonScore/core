import { RepositoryLocalPure } from "../repositories/RepositoryLocalPure";
import { calculateScoreActions } from "../calculateScoreActions";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action } from "../dataModels/Action";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";

const u = undefined;

test('add a new scoretree', async () => {
  const repository = new RepositoryLocalPure();
  // Add a new claim and set it as a score tree top
  const newScore = new Score("testClaim", "testClaim");
  const result = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim", "testClaim"),
      new Action(newScore, undefined, "add_score", newScore.id)
    ],
    repository: repository,
    calculator: calculateScore
  })

  expect(repository.rsData.scoreIdsBySourceId["testClaim"].length).toEqual(1)
});

test('Add a child that does not change the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), undefined, "add_score"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("testClaim", "ChildClaim1", u, u, u, "Priority Set"), undefined, "add_claimEdge")
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
          "parentScoreId": "newScore",
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
      new Action(new Claim("", "testClaim"), u, "add_claim"),
      new Action(new Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), u, "add_score"),
      new Action(new Claim("", "ChildClaim1"), u, "add_claim"),
      new Action(new ClaimEdge("testClaim", "ChildClaim1", u, true, "ChildClaim1Edge"), u, "add_claimEdge")
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("testClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "modify_claimEdge")
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
          "topScoreId": "newScore",
          "parentScoreId": "newScore",
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
      }
    ])

});

test('Add a child that reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Score("testClaim", "testClaim", u, u, u, u, u, u, u, "newScore"), undefined, "add_score"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge")
    ],
    repository: repository,
    calculator: calculateScore
  })

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
          "parentScoreId": "newScore"
          //"dataId": "Ya3ZeuTmGUZq"
        }, "oldData": undefined,
        "type": "add_score",
        //"dataId": "Ya3ZeuTmGUZq"
      },
      {
        "newData":
        {
          "sourceClaimId": "testClaim",
          "parentScoreId": undefined,
          "reversible": false,
          "pro": true,
          "affects": "confidence",
          "confidence": 0,
          "relevance": 1,
          //"id": "Y9ZapFMMg0Bf"
        }, "oldData": undefined,
        "type": "modify_score",
        //"dataId": "Ya3ZeuTmGUZq"
      }
    ]
  )

});

test('Adding a grandchild score Reverses Scores 2 levels', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Score("testClaim", "testClaim", u, u, u, u, u, 0, u, "newScore"), undefined, "add_score"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
      new Action(new Claim("", "ChildClaim2"), undefined, "add_claim"),
      new Action(new ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"),
      new Action(new ClaimEdge("testClaim", "ChildClaim2", undefined, true, "ChildClaim2Edge"), undefined, "add_claimEdge"),
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
          "topScoreId": "newScore",
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
          "topScoreId": "newScore",
          "parentScoreId": "newScore",
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
      }
    ]
  )

});

test('Complex Test', async () => {
  const repository = new RepositoryLocalPure();
  const changedScores = await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "newScore"), u, "add_score"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["newScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topClaim"].length).toEqual(1);


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
      new Action(new Claim("Top Claim", "topClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "topScore"), u, "add_score"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topClaim"].length).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  await repository.notify(result);
  expect(repository.rsData.items["topScore"].confidence).toEqual(0);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  await repository.notify(result2);
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});

test('Partial Claim Edge Child Update', async () => {
  const repository = new RepositoryLocalPure();
  const changedScores = await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new Score("topClaim", "topClaim", u, u, u, u, u, 0, u, "topScore"), u, "add_score"),
    ],
    repository: repository
  })

  //await repository.notify(changedScores);
  expect(repository.rsData.items["topScore"].confidence).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action({ pro: false }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  //await repository.notify(result);
  expect(repository.rsData.items["topScore"].confidence).toEqual(0);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});

test('Deleting an edge should reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
      new Action(new ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge"),
      new Action(new Score("testClaim", "testClaim", u, u, u, u, u, u, u, "topScore"), undefined, "add_score"),
    ], repository: repository
  })

  expect(repository.rsData.items["topScore"].confidence).toEqual(0);

  await calculateScoreActions({
    actions: [
      new Action(u, { parentId: "testClaim" }, "delete_claimEdge", "ChildClaim1Edge")
    ], repository: repository,
  })

  expect(repository.rsData.items["topScore"].confidence).toEqual(1);
});

test('Multi level relevance test', async () => {
  const repository = new RepositoryLocalPure();

  const pro = true;
  const con = false;
  const topClaim = new Claim("Should Fiction City convert Elm Street to only pedestrian traffic?", "topClaim")
  const Claim1_0 = new Claim("The planning commission estimates this will increase foot traffic to local shops by 12% during peak hours.")
  const Claim1_1 = new Claim("The increase in revenue is expected to pay off the expense in under 2 years meeting the cities investment requirements.")
  const Claim2_0 = new Claim("This will result in traffic being diverted down residential streets.")
  const Claim2_1 = new Claim("Children safety is more important than profit for local shops.")
  const Claim2_2 = new Claim("A set of railroad tracks are no longer in use and the City can convert that to a new street.")
  const Claim3_0 = new Claim("The conversion will cost 2 Million dollars.")
  const actions = [
    new Action(topClaim, u, "add_claim"),
    new Action(Claim1_0, u, "add_claim"),
    new Action(Claim1_1, u, "add_claim"),
    new Action(Claim2_0, u, "add_claim"),
    new Action(Claim2_1, u, "add_claim"),
    new Action(Claim2_2, u, "add_claim"),
    new Action(Claim3_0, u, "add_claim"),
    new Action(new ClaimEdge(topClaim.id, Claim1_0.id, u, pro), u, "add_claimEdge"),
    new Action(new ClaimEdge(Claim1_0.id, Claim1_1.id, "relevance", pro), u, "add_claimEdge"),
    new Action(new ClaimEdge(topClaim.id, Claim2_0.id, u, con), u, "add_claimEdge"),
    new Action(new ClaimEdge(Claim2_0.id, Claim2_1.id, "relevance", con), u, "add_claimEdge"),
    new Action(new ClaimEdge(Claim2_0.id, Claim2_2.id, u, con), u, "add_claimEdge"),
    new Action(new ClaimEdge(topClaim.id, Claim3_0.id, u, con), u, "add_claimEdge"),
    new Action(new Score(topClaim.id, topClaim.id, u, u, u, u, u, 0, u, "topScore"), u, "add_score"),
  ]
  await calculateScoreActions({ actions: actions, repository: repository })
  
  expect(repository.rsData.items["topScore"].confidence).toEqual(0.3333333333333333);

});