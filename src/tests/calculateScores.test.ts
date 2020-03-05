import { PureRepository } from "../PureRepository";
import { calculateScoreActions } from "../calculateScoreActions";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action } from "../dataModels/Action";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { ReactiveRepository } from "../ReactiveRepository";
import { Score } from "../dataModels/Score";


test('add a new scoretree', async () => {
    const repository = new ReactiveRepository();
    // Add a new claim and set it as a score tree top
    const result = await calculateScoreActions({
        actions: [
            new Action(new Claim("", "testClaim"), undefined, "add_claim", "testClaim"),
            new Action(undefined, undefined, "add_scoretree", "testClaim")
        ],
        repository: repository,
        calculator: calculateScore
    })

    expect(result).toMatchObject(
        [{
            "newData":
            {
                "sourceClaimId": "testClaim",
                "reversible": false,
                "pro": true,
                "affects": "confidence",
                "confidence": 1,
                "relevance": 1,
                //"id": "Ya3ZeuTmGUZq"
            }, "oldData": {},
            "type": "add_score",
            //"dataId": "Ya3ZeuTmGUZq"
        }]
    )
});

test.only('Add a child that does not change the top score', async () => {
    const repository = new ReactiveRepository({
        "actionsLog": [],
        "claims": {
          "testClaim": {
            //"content": "",
            "id": "testClaim",
            "reversible": false,
            "type": "claim"
          },
          "ChildClaim1": {
            //"content": "",
            "id": "ChildClaim1",
            "reversible": false,
            "type": "claim"
          }
        },
        "claimEdges": {},
        "claimEdgeIdsByParentId": {},
        "claimEdgeIdsByChildId": {},
        "scores": {
           "Y9ZapFMMg0Bf": {
             "sourceClaimId": "testClaim",
             "parentScoreId" : undefined,
             "reversible": false,
             "pro": true,
             "affects": "confidence",
             "confidence": 1,
             "relevance": 1,
             "id": "Y9ZapFMMg0Bf"
           }
        },
        "scoreIdsByClaimId": {
          "testClaim": [
            "Y9ZapFMMg0Bf"
          ]
        },
        "childIdsByScoreId": {}
      });

    //Add a child that does not change the top score
    const result = await calculateScoreActions({
        actions: [
            new Action(new ClaimEdge("testClaim","ChildClaim1", undefined, undefined,"ChildClaim1Edge"), undefined, "add_claimEdge","ChildClaim1Edge")
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
                "pro": true,
                "affects": "confidence",
                "confidence": 1,
                "relevance": 1,
                "parentScoreId": "Y9ZapFMMg0Bf"
                //"dataId": "Ya3ZeuTmGUZq"
            }, "oldData": undefined,
            "type": "add_score",
            //"dataId": "Ya3ZeuTmGUZq"
         }
      ]
    )

});

