/**
 * Created by LastBerserk on 20.01.2020.
 */

import * as uuid from "uuid";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";
import {implementation, validation} from "./RuleActionKeyToImpl";
import StaticController from "../static/StaticController";

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
        this.additional1 = null;
        this.additional2 = null;
        this.id = id ? id : uuid.v1();
        this.target = null;
        this.targetType = actionKeyToTarget(key);
        this.type = findType(key);

        this.targetObject = null;
        this.performerObject = null;
    }

    setPerformer(data) {
        if (typeof data !== "object") throw new Error("No game object provided.");
        this.performerObject = data;
        this.performerId = data.id;
    }

    setTarget(type, data) {
        if (this.targetType === type) {
            switch (this.targetType) {
                case RuleActions.TARGET_TYPE.UNIT:
                    if (typeof data !== "object") throw new Error("No game object provided.");
                    this.targetObject = data;
                    this.target = data.id;
                    break;
                case RuleActions.TARGET_TYPE.GROUND:
                    this.target = data;
                    break;
            }
        } else {
            throw new Error("Wrong target.");
        }
    }

    validate() {
        const func = validation[this.key];
        if (!func) throw new Error("No validation found for " + this.key);
        if (typeof func === "function") func(this);
        if (typeof func === "object") {
            if (typeof func[this.additional1] !== "function") throw new Error("No validation found for " + this.additional1 + " in " + this.key);
            func[this.additional1](this);
        }
    }

    doAction() {
        const func = implementation[this.key];
        if (!func) throw new Error("No implementation found for " + this.key);
        if (typeof func === "function") func(this);
        if (typeof func === "object") {
            if (typeof func[this.additional1] !== "function") throw new Error("No implementation found for " + this.additional1 + " in " + this.key);
            func[this.additional1](this);
        }
    }

    /**
     * @param {object} json - json object
     * @param {object} loader - static loader containing other data that can be loaded, {@link StaticController} example.
     * @return {RuleActions}
     */
    static fromJson(json, loader) {
        if (!loader) throw new Error("No loader provided.");
        const obj = new RuleActions(json.key, json.id);
        obj.isHidden = json.isHidden;
        obj.setPerformer(loader.getObject(json.performerId));
        if (obj.targetType === RuleActions.TARGET_TYPE.UNIT) {
            obj.setTarget(obj.targetType, loader.getObject(json.target));
        } else {
            obj.setTarget(obj.targetType, json.target);
        }
        if (json.additional1) obj.additional1 = json.additional1;
        if (json.additional2) obj.additional2 = json.additional2;
        return obj;
    }

    toJson() {
        return {
            key: this.key,
            isHidden: this.isHidden,
            performerId: this.performerId,
            additional1: this.additional1,
            additional2: this.additional2,
            id: this.id,
            target: this.target
        };
    }

    reset() {
        if (this.performerObject) this.performerObject.reset();
        if (this.targetObject) this.targetObject.reset();
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
    [RuleTypes.TYPE_IMMEDIATE]: RuleActions.IMMIDIATE_ACTION,
    [RuleTypes.TYPE_SWIFT]: RuleActions.SWIFT_ACTION
};