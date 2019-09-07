import { Score } from "./Score";
import { ViewEdge } from "./viewEdge";
import { View } from "./View";
import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { RsData } from "./RsData";
import { Affects } from "./Affects";
import { Id, ID } from "./Id";

export function GenerateExampleData(): RsData {

  let rsData: RsData = {
    claims: [
      //  Claim  Content                                                                  ID
      new Claim("Arctic City Should Implement the City 3000 plan                       ", ID("0")),
      new Claim("Equator City should implement the City 3000 plan                      ", ID("1")),
      new Claim("The City 3000 Plan is worth the investment                            ", ID("2")),
      new Claim("Bike lanes benefit residents                                          ", ID("3")),
      new Claim("The City 3000 plan is expensive                                       ", ID("4")),
      new Claim("Subways benefit residents                                             ", ID("5")),
      new Claim("Bikes are not recommended in minus 30 degree weather                  ", ID("6")),
      new Claim("Equator City is built on a marsh so a subway would be cost prohibitive", ID("7")),
    ],
    claimEdges: [
      //  ClaimEdge parent   child    scope    affects    pro   reversable ID
      new ClaimEdge(ID("0"), ID("2"), ID("0"), undefined, true, undefined, ID("0-2    ")),
      new ClaimEdge(ID("1"), ID("2"), ID("1"), undefined, true, undefined, ID("1-2    ")),
      new ClaimEdge(ID("2"), ID("3"), ID("2"), undefined, true, undefined, ID("2-3    ")),
      new ClaimEdge(ID("2"), ID("4"), ID("2"), undefined, false, undefined, ID("2-4    ")),
      new ClaimEdge(ID("2"), ID("5"), ID("2"), undefined, true, undefined, ID("2-5    ")),
      new ClaimEdge(ID("3"), ID("6"), ID("0"), undefined, false, undefined, ID("3-6    ")),
      new ClaimEdge(ID("5"), ID("7"), ID("1"), undefined, false, undefined, ID("5-7    ")),
    ],
    views: [
      //  View top      claim    id             content                                                                   confid  scoreId
      new View(ID("0"), ID("0"), ID("0      "), "Arctic City Should Implement the City 3000 plan                       ", " 50%", ID("0      ")),
      new View(ID("0"), ID("2"), ID("0-2    "), "The City 3000 Plan is worth the investment                            ", " 50%", ID("0-2    ")),
      new View(ID("0"), ID("3"), ID("0-2-3  "), "Bike lanes benefit residents                                          ", "  0%", ID("0-2-3  ")),
      new View(ID("0"), ID("4"), ID("0-2-4  "), "The City 3000 plan is expensive                                       ", "100%", ID("0-2-4  ")),
      new View(ID("0"), ID("6"), ID("0-2-3-6"), "Bikes are not recommended in minus 30 degree weather                  ", "100%", ID("0-2-3-6")),
      new View(ID("1"), ID("1"), ID("1      "), "Equator City should implement the City 3000 plan                      ", " 50%", ID("1      ")),
      new View(ID("1"), ID("2"), ID("1-2    "), "The City 3000 Plan is worth the investment                            ", " 50%", ID("1-2    ")),
      new View(ID("1"), ID("4"), ID("1-2-4  "), "The City 3000 plan is expensive                                       ", "100%", ID("1-2-4  ")),
      new View(ID("1"), ID("5"), ID("1-2-5  "), "Subways benefit residents                                             ", "  0%", ID("1-2-5  ")),
      new View(ID("1"), ID("7"), ID("1-2-5-7"), "Equator City is built on a marsh so a subway would be cost prohibitive", "100%", ID("1-2-5-7")),
      new View(ID("2"), ID("2"), ID("2      "), "The City 3000 Plan is worth the investment                            ", " 66%", ID("2      ")),
      new View(ID("3"), ID("3"), ID("2-3    "), "Bike lanes benefit residents                                          ", "100%", ID("2-3    ")),
      new View(ID("2"), ID("4"), ID("2-4    "), "The City 3000 plan is expensive                                       ", "100%", ID("2-4    ")),
      new View(ID("2"), ID("5"), ID("2-5    "), "Subways benefit residents                                             ", "100%", ID("2-5    ")),
    ],
    viewEdges: [
      //  ViewEdge top      parent         child          id
      new ViewEdge(ID("0"), ID("0      "), ID("0-2    "), ID("0-2    ")),
      new ViewEdge(ID("0"), ID("0-2    "), ID("0-2-3  "), ID("2-3    ")),
      new ViewEdge(ID("0"), ID("0-2    "), ID("0-2-4  "), ID("2-4    ")),
      new ViewEdge(ID("0"), ID("0-2-3  "), ID("0-2-3-6"), ID("3-6    ")),
      new ViewEdge(ID("1"), ID("1      "), ID("1-2    "), ID("1-2    ")),
      new ViewEdge(ID("1"), ID("1-2    "), ID("1-2-4  "), ID("2-4    ")),
      new ViewEdge(ID("1"), ID("1-2    "), ID("1-2-5  "), ID("2-5    ")),
      new ViewEdge(ID("1"), ID("1-2-5  "), ID("1-2-5-7"), ID("5-7    ")),
      new ViewEdge(ID("2"), ID("2      "), ID("2-3    "), ID("2-3    ")),
      new ViewEdge(ID("2"), ID("2      "), ID("2-4    "), ID("2-4    ")),
      new ViewEdge(ID("2"), ID("2      "), ID("2-5    "), ID("2-5    ")),
    ],
    scores: [
      //  Score confi rel id             claim
      //No Scopes
      new Score(1 / 3, 1, ID("2      "), ID("2")),
      new Score(+1.0, 1, ID("2-3    "), ID("3")),
      new Score(-1.0, 1, ID("2-4    "), ID("4")),
      new Score(+1.0, 1, ID("2-5    "), ID("5")),
      // Scoped to claim 0
      new Score(+0.0, 1, ID("0      "), ID("0")),
      new Score(+0.0, 1, ID("0-2    "), ID("2"), ID("0")),
      new Score(-1.0, 1, ID("0-2-3  "), ID("3"), ID("0")),
      new Score(+1.0, 1, ID("0-2-4  "), ID("4"), ID("0")),
      new Score(+1.0, 1, ID("0-2-3-6"), ID("6"), ID("0")),

      //Scoped to claim 1
      new Score(+0.0, 1, ID("1      "), ID("1")),
      new Score(+0.0, 1, ID("1-2    "), ID("2"), ID("1")),
      new Score(+1.0, 1, ID("1-2-4  "), ID("4"), ID("1")),
      new Score(-1.0, 1, ID("1-2-5  "), ID("5"), ID("1")),
      new Score(+1.0, 1, ID("1-2-5-7"), ID("7"), ID("1")),
    ],
    history: [],
  }
  return rsData
}