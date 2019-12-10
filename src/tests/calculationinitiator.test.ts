import { Score } from "../dataModels/Score";
import { Repository } from "../Repository";
import { CalculationInitator } from "../CalculationInitiator";
import { RsData } from "../dataModels/RsData";
import { Claim } from "../dataModels/Claim";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Action } from "../dataModels/Action";
import { Affects } from "../dataModels/Affects";

export class TestFormat {
    constructor(
        public testDescription: string = "Test",
        public expectedScore: Score,
        public rsData: RsData,
    ) {
    }
}


const testData: TestFormat[] =
    [
        {
            "testDescription": "base CalculateScoreTree",
            "expectedScore": {
                "parentScoreId": undefined,
                "sourceClaimId": "",
                "reversible": false,
                "pro": true,
                "affects": "confidence",
                "confidence": 0,
                "relevance": 1,
                "id": "YhCVaNKYta3x"
            },
            "rsData": {
                "claimsLog": [],
                "claims": {
                    "measuredClaim": {
                        "content": "Measured Claim",
                        "id": "measuredClaim",
                        "reversible": false,
                        "type": "claim"
                    },
                    "childClaim1": {
                        "content": "Child Claim 1",
                        "id": "childClaim1",
                        "reversible": false,
                        "type": "claim"
                    }
                },
                "claimEdges": {
                    "YhCVaNL5jNZ0": {
                        "parentId": "measuredClaim",
                        "childId": "childClaim1",
                        "affects": "confidence",
                        "pro": false,
                        "id": "YhCVaNL5jNZ0",
                        "type": "claimEdge"
                    }
                },
                "claimEdgeIdsByParentId": {
                    "measuredClaim": ["YhCVaNL5jNZ0"]
                },
                "claimEdgeIdsByChildId": {
                    "childClaim1": ["YhCVaNL5jNZ0"]
                },
                "scoresLog": [],
                "scores": {},
                "scoreIdsByClaimId": {},
                "childIdsByScoreId": {}
            }
        }
    ]
    
describe.each(testData)(
    'Tests', (t) => {
        test(t.testDescription + ' Confidence', async () => {
            const repo = new Repository(t.rsData);
            const ci = new CalculationInitator(repo);
            const measuredClaim = await repo.getClaim("measuredClaim")
            const result = await ci.CalculateScoreTree([], measuredClaim!, undefined, undefined)
            debugger
            expect(result.confidence).toBe(t.expectedScore.confidence)
        });

    },
);

// Used to generate test data
test.only(
    'Generate Data',
    async () => {
        const JsonTestData: string[] = [];
        const pro = true;
        const con = false;
        const repo = new Repository();
        const calcInitator = new CalculationInitator(repo);
        const measuredClaim = new Claim("Measured Claim", "measuredClaim");
        const childClaim1 = new Claim("Child Claim 1", "childClaim1");
        //const descendantClaim = new Claim("Descendant Claim", "descendantClaim");
        const claimEdge1 = new ClaimEdge(measuredClaim.id, childClaim1.id, 'confidence', false)
        //const claimEdge2 = new ClaimEdge(childClaim1.id, descendantClaim.id, 'confidence', false)
        await repo.notify([
            new Action(measuredClaim, undefined, 'add_claim', measuredClaim.id),
            new Action(childClaim1, undefined, 'add_claim', childClaim1.id),
            //new Action(descendantClaim, undefined, 'add_claim', descendantClaim.id),
            new Action(claimEdge1, undefined, 'add_claimEdge', claimEdge1.id),
            //new Action(claimEdge2, undefined, 'add_claimEdge', claimEdge2.id),
        ]);
        function s(confidence: number = 1, relevance: number = 1, pro: boolean = true, affects: Affects = "confidence"): Score {
            return new Score("", undefined, undefined, pro, affects, confidence, relevance);
        }
        function t(testDescription: string, expectedScore: Score, rsData: RsData, reversible: boolean = false) {
            return new TestFormat(testDescription, expectedScore, rsData)
        }
        const testData = [
            t("base CalculateScoreTree", s(0), repo.rsData),
        ]
        console.log(JSON.stringify(testData, undefined, 2))
        debugger
    },
);
