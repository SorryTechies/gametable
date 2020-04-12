/**
 * Created by LastBerserk on 20.01.2020.
 */

import * as uuid from "uuid";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";
import {implementation, validation} from "./table/RuleActionKeyToImpl";
import * as RuleLoader from "./RuleLoader";
import * as CONST from "./constants/RuleActionListConstants";
import * as SUPP from "./constants/RuleActionListSupportConstants";
import TranslationModule from "./translation/TranslationModule";

function findType(key) {
    const type = Object.keys(RuleAction.ACTION_TYPE_OBJECT).find(item => RuleAction.ACTION_TYPE_OBJECT[item].includes(key));
    if (type) return type;
    throw new Error(`Type ${key} isn't found.`);
}

function actionKeyToTarget(key) {
    switch (key) {
        case RuleActionsConstants.MOVE:
        case RuleActionsConstants.CHARGE:
        case RuleActionsConstants.SPRINT:
        case RuleActionsConstants.FIVE_FOOT_STEP:
            return RuleAction.TARGET_TYPE.GROUND;
        case RuleActionsConstants.COMBAT_MANEUVERS:
        case RuleActionsConstants.MELEE_ATTACK:
        case RuleActionsConstants.RANGED_ATTACK:
        case RuleActionsConstants.CAST_SPELL:
            return RuleAction.TARGET_TYPE.UNIT;
        default:
            return RuleAction.TARGET_TYPE.NONE;
    }
}

export default class RuleAction {
    constructor(key, id) {
        this.key = key;
        this.isHidden = 0;
        this.dmOnly = false;
        this.performerId = "";
        /** @type {*} */
        this.additional1 = null;
        /** @type {*} */
        this.additional2 = null;
        this.id = id ? id : uuid.v1();
        this.target = null;
        this.targetType = actionKeyToTarget(key);
        this.type = findType(key);
        this.consumeMoveSlot = false;
        this.consumeStandartSlot = false;

        /** @type RuleGameObject */
        this.targetObject = null;
        /** @type RuleGameObject */
        this.performerObject = null;
        /** @type {Dice} */
        this.roll = null;
        this.isExecuted = false;
        this.isSuccessfull = false;
    }

    setPerformer(data) {
        if (typeof data !== "object") throw new Error("No game object provided.");
        this.performerObject = data;
        this.performerId = data.id;
    }

    setTarget(type, data) {
        if (this.targetType === type) {
            switch (this.targetType) {
                case RuleAction.TARGET_TYPE.UNIT:
                    if (typeof data !== "object") throw new Error("No game object provided.");
                    this.targetObject = data;
                    this.target = data.id;
                    break;
                case RuleAction.TARGET_TYPE.GROUND:
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
            this.isSuccessfull = true;
            func[this.additional1](this);
            this.isExecuted = true;
        }
    }

    /**
     * @param {object} json - json object
     * @return {RuleAction}
     */
    static fromJson(json) {
        const obj = new RuleAction(json.key, json.id);
        obj.isHidden = json.isHidden ? json.isHidden : 0;
        obj.setPerformer(RuleLoader.getLoader().getObject(json.performerId));
        if (obj.targetType === RuleAction.TARGET_TYPE.UNIT) {
            obj.setTarget(obj.targetType, RuleLoader.getLoader().getObject(json.target));
        } else {
            obj.setTarget(obj.targetType, json.target);
        }
        if (json.additional1) obj.additional1 = json.additional1;
        if (json.additional2) obj.additional2 = json.additional2;
        obj.consumeMoveSlot = json.consumeMoveSlot;
        obj.consumeStandartSlot = json.consumeStandartSlot;
        return obj;
    }

    toJson() {
        return {
            key: this.key,
            isHidden: this.isHidden,
            performerId: this.performerId,
            additional1: this.additional1,
            additional2: this.additional2,
            consumeMoveSlot: this.consumeMoveSlot,
            consumeStandartSlot: this.consumeStandartSlot,
            id: this.id,
            target: this.target,
            dmOnly: this.dmOnly
        };
    }

    reset() {
        if (this.performerObject) this.performerObject.reset();
        if (this.targetObject) this.targetObject.reset();
    }

    isRepositionAction() {
        return SUPP.REPOSITION_ACTIONS.includes(this.key);
    }

    sendDescriptionText() {
        if (!this.isExecuted) throw new Error("Action isn't finished.");
        RuleLoader.sendDescription(TranslationModule.getActionTranslation(this), this)
    }
}

RuleAction.TARGET_TYPE = {
    GROUND: "ground",
    UNIT: "unit",
    NONE: "none"
};

RuleAction.ACTION_TYPE_OBJECT = {
    [RuleTypes.TYPE_MOVE]: CONST.MOVE_ACTIONS,
    [RuleTypes.TYPE_STANDARD]: CONST.STANDARD_ACTIONS,
    [RuleTypes.TYPE_FULL_ROUND]: CONST.FULL_ROUND_ACTIONS,
    [RuleTypes.TYPE_FREE]: CONST.FREE_ACTIONS,
    [RuleTypes.TYPE_IMMEDIATE]: CONST.IMMEDIATE_ACTION,
    [RuleTypes.TYPE_SWIFT]: CONST.SWIFT_ACTION
};