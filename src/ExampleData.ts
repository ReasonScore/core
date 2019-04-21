import { Score } from "./Score";
import { ViewEdge } from "./viewEdge";
import { View } from "./View";
import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { RSData } from "./RsData";

export function ExampleData(): RSData {

    let rsData: RSData = {
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
            new ClaimEdge("0", "2", "0"),
            new ClaimEdge("1", "2", "1"),
            new ClaimEdge("2", "3", "2"),
            new ClaimEdge("2", "4", "2"),
            new ClaimEdge("2", "5", "2"),
            new ClaimEdge("3", "6", "0"),
            new ClaimEdge("5", "7", "1"),
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
            new ViewEdge("0", "0      ", "0-2    "),
            new ViewEdge("0", "0-2    ", "0-2-3  "),
            new ViewEdge("0", "0-2    ", "0-2-4  "),
            new ViewEdge("0", "0-2-3  ", "0-2-3-6"),
            new ViewEdge("1", "1      ", "1-2    "),
            new ViewEdge("1", "1-2    ", "1-2-4  "),
            new ViewEdge("1", "1-2    ", "1-2-5  "),
            new ViewEdge("1", "1-2-5  ", "1-2-5-7"),
            new ViewEdge("2", "2      ", "2-3    "),
            new ViewEdge("2", "2      ", "2-4    "),
            new ViewEdge("2", "2      ", "2-5    "),
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