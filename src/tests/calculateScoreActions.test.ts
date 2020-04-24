import { RepositoryLocalPure } from "../repositories/RepositoryLocalPure";
import { calculateScoreActions } from "../calculateScoreActions";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action, iAction } from "../dataModels/Action";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
import { ScoreTree } from "../dataModels/ScoreTree";

const u = undefined, pro = true, con = false

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
  var test = new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree");
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
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);
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

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "modify_claimEdge")
    ],
    repository: repository
  })

  expect((await repository.getScoresBySourceId("topTestClaim"))[0].confidence).toEqual(-1);
});

test('Add a child that reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "topTestClaim"), u, "add_claim"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), u, "add_scoreTree"),
      new Action(new Claim("", "ChildClaim1"), u, "add_claim"),
    ],
    repository: repository
  })
  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge")
    ],
    repository: repository,
    calculator: calculateScore
  })

  expect((await repository.getScoresBySourceId("topTestClaim"))[0].confidence).toEqual(-1);
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

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);

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

  expect((repository.rsData.items["testTopScore"] as Score).confidence).toEqual(1);
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

  const ChildClaim1Scores = await repository.getScoresBySourceId("ChildClaim1")
  expect(ChildClaim1Scores[0].pro).toEqual(true);
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
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);
  expect(repository.rsData.scoreIdsBySourceId["topTestClaim"].length).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  await repository.notify(result);
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(-1);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  await repository.notify(result2);
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);
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
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);

  const result = await calculateScoreActions({
    actions: [
      new Action({ pro: false }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, false, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })
  //await repository.notify(result);
  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(-1);

  const result2 = await calculateScoreActions({
    actions: [
      new Action({ pro: true }, u, "modify_claimEdge", "ChildClaim2Edge"),
      //new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "modify_claimEdge"),
    ],
    repository: repository
  })

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);
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

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(-1);

  await calculateScoreActions({
    actions: [
      new Action(u, { parentId: "topTestClaim" }, "delete_claimEdge", "ChildClaim1Edge")
    ], repository: repository,
  })

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(1);
});

test('Multi level relevance delete test', async () => {
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

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(0.3333333333333333);

  const result = await calculateScoreActions({
    actions: [
      new Action(undefined, ClaimEdge1_1, "delete_claimEdge", ClaimEdge1_1.id)
    ], repository: repository
  })

  expect((await repository.getScore("testTopScore"))?.confidence).toEqual(0);


});

test('Fractions and Descendant Counts', async () => {
  const repository = new RepositoryLocalPure();
  let result;
  await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 2", "grandChild2"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, false, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, true, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, false, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild2", u, false, "GrandChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  let results: [string, any][], expectations: [string, any][]

  // Check descendantCount
  results = []
  expectations = [
    ["topTestClaim.descendantCount", 4],
    ["ChildClaim1.descendantCount", 2],
    ["ChildClaim2.descendantCount", 0],
    ["grandChild1.descendantCount", 0],
    ["grandChild2.descendantCount", 0],
    ["topTestClaim.fraction", 1],
    ["ChildClaim1.fraction", .5],
    ["ChildClaim2.fraction", .5],
    ["grandChild1.fraction", .25],
    ["grandChild2.fraction", .25],
  ]
  for (const expectation of expectations) {
    const source = expectation[0].split(".");
    const tempResult = (await repository.getScoresBySourceId(source[0])) as any;
    results.push([
      expectation[0],
      (tempResult[0])[source[1]]
    ])
  }
  expect(results).toMatchObject(expectations);
});

test('Fractions from relevance', async () => {
  const repository = new RepositoryLocalPure();
  let result;
  await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 2", "grandChild2"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, u, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, u, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, u, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild2", "relevance", con, "GrandChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  let results: [string, any][], expectations: [string, any][]

  // Check descendantCount
  results = []
  expectations = [
    ["ChildClaim1.fraction", 0.3333333333333333],
    ["ChildClaim2.fraction", 0.6666666666666666],
  ]
  for (const expectation of expectations) {
    const source = expectation[0].split(".");
    const tempResult = (await repository.getScoresBySourceId(source[0])) as any;
    results.push([
      expectation[0],
      (tempResult[0])[source[1]]
    ])
  }
  expect(results).toMatchObject(expectations);
});

test('Relevance test', async () => {
  const repository = new RepositoryLocalPure();
  let result;
  await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, pro, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, con, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", "relevance", pro, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  let results: [string, any][], expectations: [string, any][]

  // Check descendantCount
  results = []
  expectations = [
    ["topTestClaim.confidence", 0.3333333333333333],
    ["grandChild1.affects", "relevance"],
  ]
  for (const expectation of expectations) {
    const source = expectation[0].split(".");
    const tempResult = (await repository.getScoresBySourceId(source[0])) as any;
    results.push([
      expectation[0],
      (tempResult[0])[source[1]]
    ])
  }
  expect(results).toMatchObject(expectations);
});

test('Points Tests', async () => {
  const repository = new RepositoryLocalPure();
  let result;
  await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Child Claim 3", "ChildClaim3"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 2", "grandChild2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 3", "grandChild3"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, pro, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, pro, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim3", u, con, "ChildClaim3Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, pro, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild2", u, pro, "GrandChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild3", u, con, "GrandChildClaim3Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  let results: [string, any][], expectations: [string, any][]
  results = []
  expectations = [
    ["grandChild1.childrenPointsPro", 1],
    ["grandChild1.childrenPointsCon", 0],
    ["grandChild1.pointsPro", 0.3333333333333333],
    ["grandChild1.pointsCon", 0],
    ["ChildClaim1.childrenPointsPro", 0.6666666666666666],
    ["ChildClaim1.childrenPointsCon", 0.3333333333333333],
    ["ChildClaim1.pointsPro", 0.09523809523809525],
    ["ChildClaim1.pointsCon", 0.04761904761904762],
    ["topTestClaim.childrenPointsPro", 0.5238095238095238],
    ["topTestClaim.childrenPointsCon", 0.4761904761904762],
  ]
  for (const expectation of expectations) {
    const source = expectation[0].split(".");
    const tempResult = (await repository.getScoresBySourceId(source[0])) as any;
    results.push([
      expectation[0],
      (tempResult[0])[source[1]]
    ])
  }
  expect(results).toMatchObject(expectations);
});

test('Descendant Count Tests', async () => {
  const repository = new RepositoryLocalPure();
  let result;
  await calculateScoreActions({
    actions: [
      new Action(new Claim("Top Claim", "topTestClaim"), u, "add_claim"),
      new Action(new Claim("Child Claim 1", "ChildClaim1"), u, "add_claim"),
      new Action(new Claim("Child Claim 2", "ChildClaim2"), u, "add_claim"),
      new Action(new Claim("Child Claim 3", "ChildClaim3"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 1", "grandChild1"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 2", "grandChild2"), u, "add_claim"),
      new Action(new Claim("Grandchild Claim 3", "grandChild3"), u, "add_claim"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim1", u, pro, "ChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim2", u, pro, "ChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("topTestClaim", "ChildClaim3", u, con, "ChildClaim3Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild1", u, pro, "GrandChildClaim1Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild2", u, pro, "GrandChildClaim2Edge"), u, "add_claimEdge"),
      new Action(new ClaimEdge("ChildClaim1", "grandChild3", u, con, "GrandChildClaim3Edge"), u, "add_claimEdge"),
      new Action(new ScoreTree("topTestClaim", "testTopScore", u, "testScoreTree"), undefined, "add_scoreTree"),
    ],
    repository: repository
  })

  expect((repository.rsData.items["testScoreTree"] as ScoreTree).descendantCount).toEqual(6);

  let results: [string, any][], expectations: [string, any][]
  results = []
  expectations = [
    ["topTestClaim.descendantCount", 6],
    ["ChildClaim1.descendantCount", 3],
    ["ChildClaim2.descendantCount", 0],
  ]
  for (const expectation of expectations) {
    const source = expectation[0].split(".");
    const tempResult = (await repository.getScoresBySourceId(source[0])) as any;
    results.push([
      expectation[0],
      (tempResult[0])[source[1]]
    ])
  }
  expect(results).toMatchObject(expectations);
});