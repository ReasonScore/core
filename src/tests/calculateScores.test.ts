import { PureRepository } from "../PureRepository";
import { calculateScores } from "../calculateScores";
import { calculateScore } from "../calculateScore";
import { Claim } from "../dataModels/Claim";
import { Action } from "../dataModels/Action";


test.only('test', async () => {
    const repository = new PureRepository();
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

