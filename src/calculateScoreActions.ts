import { Score } from "./dataModels/Score";
import { hasItemChanged } from "./utils/hasItemChanged";
import { Action } from "./dataModels/Action";
import { iCalculateScore, calculateScore } from "./calculateScore";
import { iRepository } from "./dataModels/iRepository";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { RepositoryLocalPure } from "./repositories/RepositoryLocalPure";
import { ScoreTree } from ".";

/**
 * Calculates the score actions based on a list of actions
 */
export async function calculateScoreActions({ actions = [], repository = new RepositoryLocalPure(), calculator = calculateScore }: {
    /** An array of actions, usually on claims or edges that incluse no scores*/
    actions?: Action[];
    /** The repository used to get context for the actions */
    repository?: iRepository;
    /** The function used to calculate the scores */
    calculator?: iCalculateScore;
} = {},
) {
    const scoreActions: Action[] = [];
    const claimIdsToScore: string[] = [];
    const ScoreTreeIds: string[] = [];

    await repository.notify(actions);
    for (const action of actions) {

        // find claims that may need scores changed
        if (action.type == 'add_claim' || action.type == 'modify_claim') {
            claimIdsToScore.push(action.dataId)
        }

        if (action.type == "add_score") {
            let score = action.newData as Score;
            if (!score.parentScoreId) {
                const scoreTemp = await repository.getScore(action.dataId)
                if (scoreTemp) {
                    score = scoreTemp;
                }
            }

            claimIdsToScore.push(score.sourceClaimId)
        }

        //Add scores if edges adds new children to claims in score trees
        if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
            let claimEdge = action.newData as ClaimEdge;
            if (!claimEdge.parentId) {
                const claimEdgeTemp = await repository.getClaimEdge(action.dataId)
                if (claimEdgeTemp) {
                    claimEdge = claimEdgeTemp;
                }
            }
            claimIdsToScore.push(claimEdge.parentId)
        }

        //TODO: If an edge changes then modify the existing scores to match
        if (action.type == 'modify_claimEdge') {
            let claimEdge = await repository.getClaimEdge(action.dataId)
            claimEdge = { ...claimEdge, ...action.newData }
            if (claimEdge) {
                action.newData as ClaimEdge;
                const scores = await repository.getScoresBySourceId(claimEdge.id)
                for (const score of scores) {
                    //TODO: Where should I put this? It is modifying am object. If it is reactive i should just change the data. If pure it should be a new object.
                    //For now I will modify it but it may not trigger updates in a pure library (React)
                    //This change should also probably be centralized somewhere to reduce the chance of inconsistent bugs. I think it will happen in multiple paces
                    //Nope, it is an action so it should always be a new object. If it goes into a reactive respoitory then it will modify the actual object
                    //Should I group these actions or just throw them in one at a time like I am doing
                    if (score.pro != claimEdge.pro
                        || score.affects != claimEdge.affects
                        || score.priority != claimEdge.priority
                    ) {
                        const action = new Action({
                            pro: claimEdge.pro,
                            affects: claimEdge.affects,
                            priority: claimEdge.priority,
                        }, score, "modify_score", score.id)
                        scoreActions.push(action);
                        await repository.notify([action]);
                    }
                }
            }
        }

        if (action.type == 'delete_claimEdge') {
            const oldClaimEdge = action.oldData as ClaimEdge;
            claimIdsToScore.push(oldClaimEdge.parentId)
        }

        if (action.type == 'add_scoreTree') {
            const scoreTree = action.newData as ScoreTree;
            ScoreTreeIds.push(scoreTree.id)
        }

    }

    //Walk up the scores for each claim to the top
    for (const claimId of claimIdsToScore) {
        for (const claimScore of await repository.getScoresBySourceId(claimId)) {
            ScoreTreeIds.push(claimScore.scoreTreeId)
        }
    }

    //Re-calc all Score Trees with possible changed claims

    for (const scoreTreeId of ScoreTreeIds) {
        const scoreTree = await repository.getScoreTree(scoreTreeId)
        if (scoreTree) {
            const missingScoreActions: Action[] = [];

            let mainScore = await repository.getScore(scoreTree.topScoreId);
            if (!mainScore) {
                mainScore = new Score(scoreTree.sourceClaimId, scoreTree.id);
                mainScore.id = scoreTree.topScoreId;
                missingScoreActions.push(new Action(mainScore, undefined, "add_score"));
            }

            await createBlankMissingScores(repository, scoreTree.topScoreId, scoreTree.sourceClaimId || "", missingScoreActions, scoreTreeId)
            if (missingScoreActions.length > 0) {
                await repository.notify(missingScoreActions)
            }

            const scoreTreeActions: Action[] = [];
            const newMainScore = await calculateScoreDescendants(repository, mainScore, calculator, scoreTreeActions);
            if (missingScoreActions.length > 0) {
                await repository.notify(scoreTreeActions)
            }

            const fractionActions: Action[] = [];
            await calculateFractions(repository, mainScore, fractionActions)
            if (fractionActions.length > 0) {
                await repository.notify(fractionActions)
            }

            const generationActions: Action[] = [];
            await calculateGenerations(repository, mainScore.id, generationActions, 0)
            if (generationActions.length > 0) {
                await repository.notify(generationActions)
            }


            const proMainActions: Action[] = [];
            await calculateProMain(repository, mainScore.id, proMainActions, true)
            if (proMainActions.length > 0) {
                await repository.notify(proMainActions)
            }

            scoreActions.push(
                ...missingScoreActions,
                ...scoreTreeActions,
                ...fractionActions,
                ...generationActions,
                ...proMainActions,
            )

            if (scoreTree.descendantCount != newMainScore.descendantCount) {
                let newScoreTreePartial: Partial<ScoreTree> = { descendantCount: newMainScore.descendantCount }
                let oldScoreTreePartial: Partial<ScoreTree> = { descendantCount: scoreTree.descendantCount }
                scoreActions.push(
                    new Action(newScoreTreePartial, oldScoreTreePartial, "modify_scoreTree", scoreTree.id)
                )
            }
        }
    }

    //TODO: Review this decision: Feed the score actions back into the repository so this repository is up to date in case it is used 
    await repository.notify(scoreActions);

    return scoreActions;
}

//Create Blank Missing Scores
async function createBlankMissingScores(repository: iRepository, currentScoreId: string, currentClaimId: string, actions: Action[], scoreTreeId: string) {
    const edges = await repository.getClaimEdgesByParentId(currentClaimId)
    const scores = await repository.getChildrenByScoreId(currentScoreId)
    for (const edge of edges) {
        //see if there is a matching child score for the child edge
        let score = scores.find(({ sourceClaimId }) => sourceClaimId === edge.childId);
        if (!score) {
            //Create a new Score and attach it to it's parent
            const u = undefined;
            score = new Score(edge.childId, scoreTreeId, currentScoreId, edge.id, undefined, edge.pro, edge.affects, u, u, u, edge.priority);
            actions.push(new Action(score, undefined, "add_score", score.id));
        }
        //Recurse and through children
        await createBlankMissingScores(repository, score.id, edge.childId, actions, scoreTreeId);
    }
}

//This function assume that all scores already exist
async function calculateScoreDescendants(repository: iRepository, currentScore: Score, calculator: iCalculateScore = calculateScore, actions: Action[]) {
    const oldChildScores = await repository.getChildrenByScoreId(currentScore.id)
    const newChildScores: Score[] = [];
    let newDescendantCount = 0;

    for (const oldChildScore of oldChildScores) { //Calculate Children
        //TODO: remove any scores to calculate based on formulas that exclude scores
        const newScore = await calculateScoreDescendants(repository, oldChildScore, calculator, actions);
        newChildScores.push(newScore);
        newDescendantCount += newScore.descendantCount + 1;
    }

    const newScoreFragment = calculator({
        childScores: newChildScores,
    })

    //update any newChildScores that changed
    for (const newChildScore of newChildScores) {
        // TODO: Is this slow accessing the data store again for this data or do we assume it is cached if it is in an external DB
        const oldChildScore = await repository.getScore(newChildScore.id);
        if (oldChildScore && hasItemChanged(oldChildScore, newChildScore)) {
            actions.push(new Action(newChildScore, undefined, "modify_score"));
        }
    }

    //TODO: Modify the newScore based on any formulas
    const newScore = {
        ...currentScore,
        ...newScoreFragment,
        descendantCount: newDescendantCount
    }
    if (hasItemChanged(currentScore, newScore)) {
        actions.push(new Action(newScore, undefined, "modify_score"));
    }

    return newScore;
}

async function calculateFractions(repository: iRepository, parentScore: Partial<Score>, actions: Action[]) {
    if (parentScore.id != undefined &&
        parentScore.fraction != undefined &&
        parentScore.fractionSimple != undefined) {
        const oldChildScores = await repository.getChildrenByScoreId(parentScore.id)

        //Count up total relevance
        let totalRelevance = 0
        for (const oldScore of oldChildScores) {
            if (oldScore.affects === "confidence") {
                totalRelevance += oldScore.relevance
            }
        }
        if (totalRelevance === 0) {
            totalRelevance = 1;
        }

        for (const oldChildScore of oldChildScores) {
            const newChildScore: Partial<Score> = {
                ...oldChildScore,
                fractionSimple: (oldChildScore.relevance / totalRelevance) * parentScore.fractionSimple,
                fraction: parentScore.fraction * oldChildScore.percentOfWeight,
                // parentFractionSimple: parentScore.fractionSimple,
            }
            if (newChildScore.fractionSimple != oldChildScore.fractionSimple ||
                newChildScore.fraction != oldChildScore.fraction) {
                actions.push(new Action(newChildScore, undefined, "modify_score"));
            }
            await calculateFractions(repository, newChildScore, actions);

        }
    }

}

// TODO: factor out duplicate code of these calculate functions. maybe make an array of items to process...
async function calculateGenerations(repository: iRepository, parentScoreId: string, actions: Action[], generation: number) {
    const oldChildScores = await repository.getChildrenByScoreId(parentScoreId)
    generation++;

    for (const oldChildScore of oldChildScores) {
        if (oldChildScore.generation != generation) {
            const newChildScore = { ...oldChildScore, generation: generation }
            actions.push(new Action(newChildScore, undefined, "modify_score"));
        }
        await calculateGenerations(repository, oldChildScore.id, actions, generation)
    }
}

// TODO: factor out duplicate code of these calculate functions. maybe make an array of items to process...
async function calculateProMain(repository: iRepository, parentScoreId: string, actions: Action[], proMain: boolean) {
    const oldChildScores = await repository.getChildrenByScoreId(parentScoreId)

    for (const oldChildScore of oldChildScores) {
        // const newChildScore = { ...oldChildScore, proMain: false }
        // actions.push(new Action(newChildScore, undefined, "modify_score"));
        // await calculateProMain(repository, oldChildScore.id, actions, proMain)
        if (oldChildScore.pro === true){// && oldChildScore.proMain !== proMain) {
            const newChildScore = { ...oldChildScore, proMain: proMain }
            actions.push(new Action(newChildScore, undefined, "modify_score"));
            await calculateProMain(repository, oldChildScore.id, actions, proMain)
        }

        if (oldChildScore.pro === false){// && oldChildScore.proMain === proMain) {
            const newChildScore = { ...oldChildScore, proMain: !proMain }
            actions.push(new Action(newChildScore, undefined, "modify_score"));
            await calculateProMain(repository, oldChildScore.id, actions, !proMain)
        }

    }
}
