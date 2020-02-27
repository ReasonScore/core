import { Repository } from "../Repository";
import { calculateScores } from "../calculateScores";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action } from "../dataModels/Action";
import { Score } from "../dataModels/Score";


test.only('test', async () => {
    const repository = new Repository();
    const result = await calculateScores({
        actions: [
            new Action(new Claim("", "testClaim"), {}, "add_claim", "testClaim")
        ],
        repository: repository,
        calculator: calculateScore
    })
    debugger
    //expect(result.length).toEqual(1);
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

