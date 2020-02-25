/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleConstants from "../RuleConstants";
import * as RuleLoader from "../RuleLoader";

function isSpaceOccupied(action) {
    if (RuleLoader.getLoader().getObjects().find(obj => obj.id !== action.performerId && obj.movePoints.isInFinalPosition(action.target)))
        throw new Error("Cannot move in occupied space.");
}

function calculateMoveDistance(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) + Math.floor(Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) / 2);
}

function isInTouchRange(p1, p2) {
    if ((Math.abs(p1.x - p2.x) > 1) || (Math.abs(p1.y - p2.y) > 1)) throw new Error("Should be in touch range.");
}

function checkTravelDistance(action) {
    const performer = action.performerObject;
    const squaresToMove = performer.get(RuleConstants.MOVE_SPEED) / 5;
    const distance = calculateMoveDistance(action.target, performer.movePoints.getFinalPoint());
    if (distance > squaresToMove) throw new Error("You cannot go so far, you can move only " + squaresToMove + " squares.");
}

export const moveValidation = (action) => {
    isSpaceOccupied(action);
    checkTravelDistance(action);
};

export const fiveFootValidation = action => {
    isSpaceOccupied(action);
    isInTouchRange(action.performerObject.movePoints.getFinalPoint(), action.target);
};

export const attackValidation = action => {

};

export const touchCheck = action => {
    isInTouchRange(action.performerObject.movePoints.getFinalPoint(), action.targetObject.movePoints.getFinalPoint());
};

export const noValidation = () => {
};