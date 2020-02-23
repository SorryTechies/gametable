/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleConstants from "../RuleConstants";
import StaticController from "../../static/StaticController";

/** @return {GameObject} */
function getObj(id) {
    const obj = StaticController.getObject(id);
    if (obj) {
        return obj;
    } else {
        throw new Error("Cannot find GameObject");
    }
}

function isSpaceOccupied(action) {
    if (StaticController.getObjects().find(obj => obj.position.x === action.target.x && obj.position.y === action.target.y))
        throw new Error("Cannot move in occupied space.");
}

function calculateMoveDistance(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) + Math.floor(Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) / 2);
}

function checkTravelDistance(action) {
    const target = action.target;
    const performer = getObj(action.performerId);
    const squaresToMove = (StaticController.getCharacter(performer.character_id).get(RuleConstants.MOVE_SPEED)) / 5;
    const distance = calculateMoveDistance(target, performer.position);
    if (distance > squaresToMove) throw new Error("You cannot go so far, you can move only " + squaresToMove + " squares.");
}

export const moveValidation = action => {
    isSpaceOccupied(action);
    checkTravelDistance(action);
};

export const attackValidation = action => {

};

export const touchCheck = action => {
    const target = getObj(action.target);
    const performer = getObj(action.performerId);
    if (calculateMoveDistance(performer.position, target.position) > 1) throw new Error("Spell should be touch.");
};