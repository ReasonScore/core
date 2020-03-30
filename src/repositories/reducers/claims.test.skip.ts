import { claims } from "./claims";
import { RsData } from "../../dataModels/RsData";
import { Action } from "../../dataModels/Action";
import { Claim } from "../../dataModels/Item";

test.only('add claim to claims', () => {
    const rsData = new RsData();
    const result = claims(rsData,
        new Action(new Claim("", "testClaim"), {}, "add_claim", "testClaim")
    )
    //const result = calculateScore({ scores: t.scores, reversible: t.reversible });
    expect(result.claims["testClaim"].id).toBe("testClaim")
    //Confirm that it dies not modify the state directly
    expect(rsData.claims["testClaim"]).toBe(undefined)
});

