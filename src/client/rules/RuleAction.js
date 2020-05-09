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
import TARGET_TYPE from "./constants/RuleActionTargetType";
import * as ActionTranslationToArgs from "./translation/ActionTranslationToArgs";

function findType(key) {
    const type = Object.keys(RuleAction.ACTION_TYPE_OBJECT).find(item => RuleAction.ACTION_TYPE_OBJECT[item].includes(key));
    if (type) return parseInt(type);
    throw new Error(`Type ${key} isn't found.`);
}

function actionKeyToTarget(key) {
    switch (key) {
        case RuleActionsConstants.MOVE:
        case RuleActionsConstants.CHARGE:
        case RuleActionsConstants.SPRINT:
        case RuleActionsConstants.FIVE_FOOT_STEP:
            return TARGET_TYPE.GROUND;
        case RuleActionsConstants.IMPROVISED_ATTACK:
        case RuleActionsConstants.COMBAT_MANEUVERS:
        case RuleActionsConstants.MELEE_ATTACK:
        case RuleActionsConstants.THROW_ATTACK:
        case RuleActionsConstants.RANGED_ATTACK:
        case RuleActionsConstants.CAST_SPELL:
            return TARGET_TYPE.UNIT;
        case RuleActionsConstants.GRAB:
        case  RuleActionsConstants.DROP:
        case RuleActionsConstants.UNEQUIP:
        case RuleActionsConstants.EQUIP:
            return TARGET_TYPE.ITEM;
        default:
            return TARGET_TYPE.NONE;
    }
}

function getJSON(obj) {
    return obj && typeof obj.toJson === "function" ? obj.toJson() : obj;
}

export default class RuleAction {
    constructor(key, id) {
        if (!key) throw new Error("No key provided.");
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
        /** @type RuleItem */
        this.targetItem = null;
        /** @type RuleGameObject */
        this.performerObject = null;
        /** @type {Dice} */
        this.roll = null;
        this.isExecuted = false;
        this.isSuccessfull = false;
        this.consecutiveActionPenalty = 0;
    }

    setPerformer(data) {
        if (typeof data !== "object") throw new Error("No game object provided.");
        this.performerObject = data;
        this.performerId = data.id;
    }

    setTarget(type, data) {
        if (this.targetType === type) {
            switch (this.targetType) {
                case TARGET_TYPE.UNIT:
                    if (typeof data !== "object") throw new Error("No game object provided.");
                    this.targetObject = data;
                    this.target = data.id;
                    break;
                case TARGET_TYPE.GROUND:
                    this.target = data;
                    break;
                case TARGET_TYPE.ITEM:
                    if (typeof data !== "object") throw new Error("No item object provided.");
                    this.targetItem = data;
                    this.target = data.id;
                    break;
            }
        } else {
            throw new Error("Wrong target.");
        }
    }

    validate() {
        const func = validation[this.key];
        if (!func) throw new Error("No validation found for " + this.key);
        if (typeof func === "function") {
            func(this);
        } else {
            if (typeof func === "object") {
                let impl;
                if (typeof this.additional1 === "object") {
                    impl = func[this.additional1.key];
                } else {
                    impl = func[this.additional1];
                }
                if (!impl) throw new Error("No validation found for " + this.additional1 + " in " + this.key);
                impl(this);
            }
        }
    }

    doAction() {
        const func = implementation[this.key];
        if (!func) throw new Error("No implementation found for " + this.key);
        if (typeof func === "function") {
            this.isSuccessfull = true;
            func(this);
            this.isExecuted = true;
        } else {
            if (typeof func === "object") {
                let impl;
                if (typeof this.additional1 === "object") {
                    impl = func[this.additional1.key];
                } else {
                    impl = func[this.additional1];
                }
                if (!impl) throw new Error("No implementation found for " + this.additional1 + " in " + this.key);
                this.isSuccessfull = true;
                impl(this);
                this.isExecuted = true;
            }
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
        switch (obj.targetType) {
            case TARGET_TYPE.UNIT:
                obj.setTarget(obj.targetType, RuleLoader.getLoader().getObject(json.target));
                break;
            case TARGET_TYPE.ITEM:
                obj.setTarget(obj.targetType, obj.performerObject.items.getByID(json.target));
                break;
            default:
                obj.setTarget(obj.targetType, json.target);
        }
        if (json.additional1) obj.additional1 = json.additional1;
        if (json.additional2) obj.additional2 = json.additional2;
        if (json.consecutiveAction) obj.consecutiveAction = json.consecutiveAction;
        obj.consumeMoveSlot = json.consumeMoveSlot;
        obj.consumeStandartSlot = json.consumeStandartSlot;
        return obj;
    }

    toJson() {
        return {
            key: this.key,
            isHidden: this.isHidden,
            performerId: this.performerId,
            additional1: getJSON(this.additional1),
            additional2: getJSON(this.additional2),
            consumeMoveSlot: this.consumeMoveSlot,
            consumeStandartSlot: this.consumeStandartSlot,
            id: this.id,
            target: getJSON(this.target),
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
        RuleLoader.sendDescription(TranslationModule.getActionTranslation(
            ActionTranslationToArgs.getKeyForTranslation(this),
            ActionTranslationToArgs.getArgumentsForTranslation(this)
        ), this)
    }
}

RuleAction.ACTION_TYPE_OBJECT = {
    [RuleTypes.TYPE_MOVE]: CONST.MOVE_ACTIONS,
    [RuleTypes.TYPE_STANDARD]: CONST.STANDARD_ACTIONS,
    [RuleTypes.TYPE_FULL_ROUND]: CONST.FULL_ROUND_ACTIONS,
    [RuleTypes.TYPE_FREE]: CONST.FREE_ACTIONS,
    [RuleTypes.TYPE_IMMEDIATE]: CONST.IMMEDIATE_ACTION,
    [RuleTypes.TYPE_SWIFT]: CONST.SWIFT_ACTION,
    [RuleTypes.TYPE_ATTACK]: CONST.ATTACK_ACTIONS
};