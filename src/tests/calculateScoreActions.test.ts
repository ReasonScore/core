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
  const newScore = new Score("testClaim");
  const result = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim", "testClaim"),
      new Action(newScore, undefined, "add_score", newScore.id)
    ],
    repository: repository,
    calculator: calculateScore
  })

  expect(repository.rsData.scoreIdsByClaimId["testClaim"].length).toEqual(1)
});

test('Add a child that does not change the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Score("testClaim", u, u, u, u, u, u, "newScore"), undefined, "add_score"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("testClaim", "ChildClaim1"), undefined, "add_claimEdge")
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
          "parentScoreId": "newScore"
          //"dataId": "Ya3ZeuTmGUZq"
        }, "oldData": undefined,
        "type": "add_score",
        //"dataId": "Ya3ZeuTmGUZq"
      }
    ]
  )

});

test('Add a child that reverses the top score', async () => {
  const repository = new RepositoryLocalPure();
  const temp = await calculateScoreActions({
    actions: [
      new Action(new Claim("", "testClaim"), undefined, "add_claim"),
      new Action(new Score("testClaim", u, u, u, u, u, u, "newScore"), undefined, "add_score"),
      new Action(new Claim("", "ChildClaim1"), undefined, "add_claim"),
    ],
    repository: repository
  })

  const result = await calculateScoreActions({
    actions: [
      new Action(new ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge", "ChildClaim1Edge")
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

