import { Score } from "./Score";
import { ViewEdge } from "./viewEdge";
import { View } from "./View";
import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { RsData } from "./RsData";
import { Affects } from "./Affects";

export function ExampleData(): RsData {
    var rsData: RsData = {
        "claims": [
            {
                "content": "Arctic City Should Implement the City 3000 plan                       ",
                "id": "0",
                "version": "YDhMwhRP6e84",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "Equator City should implement the City 3000 plan                      ",
                "id": "1",
                "version": "YDhMwhRNjX9V",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "The City 3000 Plan is worth the investment                            ",
                "id": "2",
                "version": "YDhMwhR7bEjp",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "Bike lanes benefit residents                                          ",
                "id": "3",
                "version": "YDhMwhRGPos1",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "The City 3000 plan is expensive                                       ",
                "id": "4",
                "version": "YDhMwhRSxpg6",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "Subways benefit residents                                             ",
                "id": "5",
                "version": "YDhMwhRcHxkm",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "Bikes are not recommended in minus 30 degree weather                  ",
                "id": "6",
                "version": "YDhMwhRe5ElC",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            },
            {
                "content": "Equator City is built on a marsh so a subway would be cost prohibitive",
                "id": "7",
                "version": "YDhMwhRkq5PH",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claim"
            }
        ],
        "claimEdges": [
            {
                "parentId": "0",
                "childId": "2",
                "scopeId": "0",
                "affects": "confidence",
                "pro": true,
                "reversable": false,
                "id": "0-2    ",
                "version": "YDhMwhRwFMUl",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "1",
                "childId": "2",
                "scopeId": "1",
                "affects": "confidence",
                "pro": true,
                "reversable": false,
                "id": "1-2    ",
                "version": "YDhMwhRHClMt",
                "start": "2019-04-23T04:32:02.941Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "2",
                "childId": "3",
                "scopeId": "2",
                "affects": "confidence",
                "pro": true,
                "reversable": false,
                "id": "2-3    ",
                "version": "YDhMwhRXNLie",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "2",
                "childId": "4",
                "scopeId": "2",
                "affects": "confidence",
                "pro": false,
                "reversable": false,
                "id": "2-4    ",
                "version": "YDhMwhQmnfR7",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "2",
                "childId": "5",
                "scopeId": "2",
                "affects": "confidence",
                "pro": true,
                "reversable": false,
                "id": "2-5    ",
                "version": "YDhMwhQaQxUZ",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "3",
                "childId": "6",
                "scopeId": "0",
                "affects": "confidence",
                "pro": false,
                "reversable": false,
                "id": "3-6    ",
                "version": "YDhMwhQMWWLn",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            },
            {
                "parentId": "5",
                "childId": "7",
                "scopeId": "1",
                "affects": "confidence",
                "pro": false,
                "reversable": false,
                "id": "5-7    ",
                "version": "YDhMwhQDl1uo",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "claimEdge"
            }
        ],
        "views": [
            {
                "topClaimId": "0",
                "claimId": "0",
                "id": "0      ",
                "content": "Arctic City Should Implement the City 3000 plan                       ",
                "scoreDisplay": " 50%",
                "scoreId": "0      ",
                "version": "YDhMwhQazaiP",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "0",
                "claimId": "2",
                "id": "0-2    ",
                "content": "The City 3000 Plan is worth the investment                            ",
                "scoreDisplay": " 50%",
                "scoreId": "0-2    ",
                "version": "YDhMwhQlyTbi",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "0",
                "claimId": "3",
                "id": "0-2-3  ",
                "content": "Bike lanes benefit residents                                          ",
                "scoreDisplay": "  0%",
                "scoreId": "0-2-3  ",
                "version": "YDhMwhQL1nDo",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "0",
                "claimId": "4",
                "id": "0-2-4  ",
                "content": "The City 3000 plan is expensive                                       ",
                "scoreDisplay": "100%",
                "scoreId": "0-2-4  ",
                "version": "YDhMwhQxUnFY",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "0",
                "claimId": "6",
                "id": "0-2-3-6",
                "content": "Bikes are not recommended in minus 30 degree weather                  ",
                "scoreDisplay": "100%",
                "scoreId": "0-2-3-6",
                "version": "YDhMwhQmh6yG",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "1",
                "claimId": "1",
                "id": "1      ",
                "content": "Equator City should implement the City 3000 plan                      ",
                "scoreDisplay": " 50%",
                "scoreId": "1      ",
                "version": "YDhMwhQy9pqI",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "1",
                "claimId": "2",
                "id": "1-2    ",
                "content": "The City 3000 Plan is worth the investment                            ",
                "scoreDisplay": " 50%",
                "scoreId": "1-2    ",
                "version": "YDhMwhQamrUM",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "1",
                "claimId": "4",
                "id": "1-2-4  ",
                "content": "The City 3000 plan is expensive                                       ",
                "scoreDisplay": "100%",
                "scoreId": "1-2-4  ",
                "version": "YDhMwhQryohj",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "1",
                "claimId": "5",
                "id": "1-2-5  ",
                "content": "Subways benefit residents                                             ",
                "scoreDisplay": "  0%",
                "scoreId": "1-2-5  ",
                "version": "YDhMwhQ491up",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "1",
                "claimId": "7",
                "id": "1-2-5-7",
                "content": "Equator City is built on a marsh so a subway would be cost prohibitive",
                "scoreDisplay": "100%",
                "scoreId": "1-2-5-7",
                "version": "YDhMwhQX3E3X",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "2",
                "claimId": "2",
                "id": "2      ",
                "content": "The City 3000 Plan is worth the investment                            ",
                "scoreDisplay": " 66%",
                "scoreId": "2      ",
                "version": "YDhMwhQoIe5T",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "3",
                "claimId": "3",
                "id": "2-3    ",
                "content": "Bike lanes benefit residents                                          ",
                "scoreDisplay": "100%",
                "scoreId": "2-3    ",
                "version": "YDhMwhQczpKM",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "2",
                "claimId": "4",
                "id": "2-4    ",
                "content": "The City 3000 plan is expensive                                       ",
                "scoreDisplay": "100%",
                "scoreId": "2-4    ",
                "version": "YDhMwhQlzKVq",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            },
            {
                "topClaimId": "2",
                "claimId": "5",
                "id": "2-5    ",
                "content": "Subways benefit residents                                             ",
                "scoreDisplay": "100%",
                "scoreId": "2-5    ",
                "version": "YDhMwhQDkCYi",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "view"
            }
        ],
        "viewEdges": [
            {
                "topClaimId": "0",
                "parentId": "0      ",
                "childId": "0-2    ",
                "claimEdgeID": "0-2    ",
                "id": "YDhMwhQfFgJP",
                "version": "YDhMwhQmyPhY",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "0",
                "parentId": "0-2    ",
                "childId": "0-2-3  ",
                "claimEdgeID": "2-3    ",
                "id": "YDhMwhQlnMyA",
                "version": "YDhMwhQhLYLi",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "0",
                "parentId": "0-2    ",
                "childId": "0-2-4  ",
                "claimEdgeID": "2-4    ",
                "id": "YDhMwhQw1vVn",
                "version": "YDhMwhQBi3We",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "0",
                "parentId": "0-2-3  ",
                "childId": "0-2-3-6",
                "claimEdgeID": "3-6    ",
                "id": "YDhMwhQrUNXX",
                "version": "YDhMwhQPxazS",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "1",
                "parentId": "1      ",
                "childId": "1-2    ",
                "claimEdgeID": "1-2    ",
                "id": "YDhMwhQtSW32",
                "version": "YDhMwhQBYoZv",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "1",
                "parentId": "1-2    ",
                "childId": "1-2-4  ",
                "claimEdgeID": "2-4    ",
                "id": "YDhMwhQpihZp",
                "version": "YDhMwhQWjfHk",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "1",
                "parentId": "1-2    ",
                "childId": "1-2-5  ",
                "claimEdgeID": "2-5    ",
                "id": "YDhMwhQMwUiz",
                "version": "YDhMwhQWmnP8",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "1",
                "parentId": "1-2-5  ",
                "childId": "1-2-5-7",
                "claimEdgeID": "5-7    ",
                "id": "YDhMwhQvRkUU",
                "version": "YDhMwhQDnOQt",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "2",
                "parentId": "2      ",
                "childId": "2-3    ",
                "claimEdgeID": "2-3    ",
                "id": "YDhMwhQbAXQM",
                "version": "YDhMwhQzbKsX",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "2",
                "parentId": "2      ",
                "childId": "2-4    ",
                "claimEdgeID": "2-4    ",
                "id": "YDhMwhQ8DQVJ",
                "version": "YDhMwhQmxL3J",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            },
            {
                "topClaimId": "2",
                "parentId": "2      ",
                "childId": "2-5    ",
                "claimEdgeID": "2-5    ",
                "id": "YDhMwhQcyFqt",
                "version": "YDhMwhQy3wPP",
                "start": "2019-04-23T04:32:02.942Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "viewEdge"
            }
        ],
        "scores": [
            {
                "confidence": 0.5,
                "relevance": 1,
                "id": "0      ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPZqCPx",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0.5,
                "relevance": 1,
                "id": "0-2    ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPOq37C",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0,
                "relevance": 1,
                "id": "0-2-3  ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPq1enr",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "0-2-4  ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPxgPyy",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "0-2-3-6",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPEAYZO",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0.5,
                "relevance": 1,
                "id": "1      ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPgmvx4",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0.5,
                "relevance": 1,
                "id": "1-2    ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhP5ivIt",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "1-2-4  ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPgrp79",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0,
                "relevance": 1,
                "id": "1-2-5  ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPwlWdo",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "1-2-5-7",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPGNH8r",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 0.66,
                "relevance": 1,
                "id": "2      ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPfnSfq",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "2-3    ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhP8pivJ",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "2-4    ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPvzngj",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            },
            {
                "confidence": 1,
                "relevance": 1,
                "id": "2-5    ",
                "affects": "confidence",
                "reversable": false,
                "version": "YDhMwhPT7VNd",
                "start": "2019-04-23T04:32:02.943Z",
                "end": "3000-01-01T00:00:00.000Z",
                "type": "score"
            }
        ],
        "history": []
    }
    return rsData;
}

export function GenerateExampleData(): RsData {

    let rsData: RsData = {
        claims: [
            new Claim("Arctic City Should Implement the City 3000 plan                       ", "0"),
            new Claim("Equator City should implement the City 3000 plan                      ", "1"),
            new Claim("The City 3000 Plan is worth the investment                            ", "2"),
            new Claim("Bike lanes benefit residents                                          ", "3"),
            new Claim("The City 3000 plan is expensive                                       ", "4"),
            new Claim("Subways benefit residents                                             ", "5"),
            new Claim("Bikes are not recommended in minus 30 degree weather                  ", "6"),
            new Claim("Equator City is built on a marsh so a subway would be cost prohibitive", "7"),
        ],
        claimEdges: [
            new ClaimEdge("0", "2", "0", undefined, undefined, undefined, "0-2    "),
            new ClaimEdge("1", "2", "1", undefined, undefined, undefined, "1-2    "),
            new ClaimEdge("2", "3", "2", undefined, undefined, undefined, "2-3    "),
            new ClaimEdge("2", "4", "2", Affects.Confidence, false, undefined, "2-4    "),
            new ClaimEdge("2", "5", "2", undefined, undefined, undefined, "2-5    "),
            new ClaimEdge("3", "6", "0", Affects.Confidence, false, undefined, "3-6    "),
            new ClaimEdge("5", "7", "1", Affects.Confidence, false, undefined, "5-7    "),
        ],
        views: [
            new View("0", "0", "0      ", "Arctic City Should Implement the City 3000 plan                       ", " 50%", "0      "),
            new View("0", "2", "0-2    ", "The City 3000 Plan is worth the investment                            ", " 50%", "0-2    "),
            new View("0", "3", "0-2-3  ", "Bike lanes benefit residents                                          ", "  0%", "0-2-3  "),
            new View("0", "4", "0-2-4  ", "The City 3000 plan is expensive                                       ", "100%", "0-2-4  "),
            new View("0", "6", "0-2-3-6", "Bikes are not recommended in minus 30 degree weather                  ", "100%", "0-2-3-6"),
            new View("1", "1", "1      ", "Equator City should implement the City 3000 plan                      ", " 50%", "1      "),
            new View("1", "2", "1-2    ", "The City 3000 Plan is worth the investment                            ", " 50%", "1-2    "),
            new View("1", "4", "1-2-4  ", "The City 3000 plan is expensive                                       ", "100%", "1-2-4  "),
            new View("1", "5", "1-2-5  ", "Subways benefit residents                                             ", "  0%", "1-2-5  "),
            new View("1", "7", "1-2-5-7", "Equator City is built on a marsh so a subway would be cost prohibitive", "100%", "1-2-5-7"),
            new View("2", "2", "2      ", "The City 3000 Plan is worth the investment                            ", " 66%", "2      "),
            new View("3", "3", "2-3    ", "Bike lanes benefit residents                                          ", "100%", "2-3    "),
            new View("2", "4", "2-4    ", "The City 3000 plan is expensive                                       ", "100%", "2-4    "),
            new View("2", "5", "2-5    ", "Subways benefit residents                                             ", "100%", "2-5    "),
        ],
        viewEdges: [
            new ViewEdge("0", "0      ", "0-2    ", "0-2    "),
            new ViewEdge("0", "0-2    ", "0-2-3  ", "2-3    "),
            new ViewEdge("0", "0-2    ", "0-2-4  ", "2-4    "),
            new ViewEdge("0", "0-2-3  ", "0-2-3-6", "3-6    "),
            new ViewEdge("1", "1      ", "1-2    ", "1-2    "),
            new ViewEdge("1", "1-2    ", "1-2-4  ", "2-4    "),
            new ViewEdge("1", "1-2    ", "1-2-5  ", "2-5    "),
            new ViewEdge("1", "1-2-5  ", "1-2-5-7", "5-7    "),
            new ViewEdge("2", "2      ", "2-3    ", "2-3    "),
            new ViewEdge("2", "2      ", "2-4    ", "2-4    "),
            new ViewEdge("2", "2      ", "2-5    ", "2-5    "),
        ],
        scores: [
            new Score(.50, 1, "0      "),
            new Score(.50, 1, "0-2    "),
            new Score(0.0, 1, "0-2-3  "),
            new Score(1.0, 1, "0-2-4  "),
            new Score(1.0, 1, "0-2-3-6"),
            new Score(.50, 1, "1      "),
            new Score(.50, 1, "1-2    "),
            new Score(1.0, 1, "1-2-4  "),
            new Score(0.0, 1, "1-2-5  "),
            new Score(1.0, 1, "1-2-5-7"),
            new Score(.66, 1, "2      "),
            new Score(1.0, 1, "2-3    "),
            new Score(1.0, 1, "2-4    "),
            new Score(1.0, 1, "2-5    "),
        ],
        history: [],
    }
    return rsData
}