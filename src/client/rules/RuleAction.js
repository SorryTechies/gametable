/**
 * Created by LastBerserk on 20.01.2020.
 */

import * as uuid from "uuid";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";
import {implementation, validation} from "./RuleActionKeyToImpl";

function findType(key) {
    const type = Object.keys(RuleActions.ACTION_TYPE_OBJECT).find(item => RuleActions.ACTION_TYPE_OBJECT[item].includes(key));
    if (type) return type;
    throw new Error(`Type ${key} isn't found.`);
}

function actionKeyToTarget(key) {
    switch (key) {
        case RuleActionsConstants.MOVE:
        case RuleActionsConstants.SPRINT:
        case RuleActionsConstants.FIVE_FOOT_STEP:
            return RuleActions.TARGET_TYPE.GROUND;
        case RuleActionsConstants.ATTACK:
        case RuleActionsConstants.CHARGE:
        case RuleActionsConstants.CAST_SPELL:
            return RuleActions.TARGET_TYPE.UNIT;
        default:
            return RuleActions.TARGET_TYPE.NONE;
    }
}

export default class RuleActions {
    constructor(key, id) {
        this.key = key;
        this.isHidden = false;
        this.performerId = "";
        this.id = id ? id : uuid.v1();
        this.target = null;
        this.targetType = actionKeyToTarget(key);
        this.type = findType(key);
    }

    setTarget(type, data) {
        if (this.targetType === type) {
            this.target = data;
        } else {
            throw new Error("Wrong target.");
        }
    }

    validate() {
        const func = validation[this.key];
        if (!func) throw new Error("No validation found for " + this.key);
        func(this)
    }

    doAction() {
        const func = implementation[this.key];
        if (!func) return console.log("No impl.");
        func(this);
    }

    static fromJson(json) {
        const obj = new RuleActions(json.key, json.id);
        obj.isHidden = json.isHidden;
        obj.performerId = json.performerId;
        obj.target = json.target;
        return obj;
    }
}

RuleActions.TARGET_TYPE = {
    GROUND: "ground",
    UNIT: "unit",
    NONE: "none"
};

RuleActions.MOVE_ACTIONS = [
    RuleActionsConstants.MOVE
];

RuleActions.STANDARD_ACTIONS = [
    RuleActionsConstants.ATTACK,
    RuleActionsConstants.CAST_SPELL
];

RuleActions.FULL_ROUND_ACTIONS = [
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FULL_ROUND_ATTACK,
    RuleActionsConstants.FULL_ROUND_SPELL
];

RuleActions.FREE_ACTIONS = [
    RuleActionsConstants.FIVE_FOOT_STEP
];

RuleActions.IMMEDIATE_ACTION = [];

RuleActions.SWIFT_ACTION = [];

RuleActions.ACTION_TYPE_OBJECT = {
    [RuleTypes.TYPE_MOVE]: RuleActions.MOVE_ACTIONS,
    [RuleTypes.TYPE_STANDARD]: RuleActions.STANDARD_ACTIONS,
    [RuleTypes.TYPE_FULL_ROUND]: RuleActions.FULL_ROUND_ACTIONS,
    [RuleTypes.TYPE_FREE]: RuleActions.FREE_ACTIONS,
    [RuleTypes.TYPE_IMMEDIATE]:RuleActions.IMMIDIATE_ACTION,
    [RuleTypes.TYPE_SWIFT]: RuleActions.SWIFT_ACTION
};