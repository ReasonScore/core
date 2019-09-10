import { Score } from "./dataModels/Score";


export interface ScoresByScope { [Id: string]: Score[] }//  | undefined }

export function groupScoresByScope(scores: Score[], parentId: string, ScoresByScope: ScoresByScope) {
    scores.forEach(score => {
        let idString: string;
        if (score.scopeId != undefined) {
            idString = score.scopeId.toString();
        }
        else {
            idString = parentId;
        }
        if (ScoresByScope[idString] === undefined) {
            ScoresByScope[idString] = [];
        }
        ScoresByScope[idString].push(score);
    });
}