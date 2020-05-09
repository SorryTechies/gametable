/**
 * Created by LastBerserk on 23.02.2020.
 */

import MovePointController from "../logic/MovePointController";
import RuleBuffController from "./controllers/RuleBuffController";
import * as RuleImplementation from "./impl/RuleImplementation";
import RuleGameObjectConstants from "./constants/RuleGameObjectConstants";
import RuleDamageType from "./constants/RuleDamageType";
import RuleItemController from "./items/RuleItemController";
import RuleEffectController from "./controllers/RuleEffectController";
import CheckDice from "../logic/roll/CheckDice";
import RuleReach from "./objects/RuleReach";
import RulePoint from "./objects/RulePoint";
import CONST from "./constants/RuleStatConstants";

export default class RuleGameObject {
    constructor(id) {
        this.id = id;
        this.position = {x: 1, y: 1};
        this.character_id = "";
        this.initiative = 0;
        this.data = {};
        this.hidden = false;
        this.isAlive = true;
        this.isHidden = false;
        this.stealth = 0;
        this.name = "";
        this.buffs = new RuleBuffController(this);
        this.items = new RuleItemController(this);
        this.effects = new RuleEffectController(this);
        this.icon = "";
        this.weapons = [];

        this.threatArea = new RuleReach(this);
        this.calculatedData = {};
        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
        /** @type {RuleCharacter} */
        this.ruleCharacter = null;
        /** @type {Account} */
        this.owner = null;
    }

    /** @return {{}} */
    toJson() {
        return {
            _id: this.id,
            position: this.position,
            character_id: this.character_id,
            initiative: this.initiative,
            data: this.data,
            name: this.name,
            buffs: this.buffs.toJson()
        };
    }

    get(key) {
        const buffVal = this.effects.getBonus(key);
        const  val = this.calculatedData[key] ? this.calculatedData[key] : this.ruleCharacter.get(key);
        if (typeof val === "number") return buffVal + val;
        if (Array.isArray(val)) return val.concat(buffVal);
        return val;
    }

    set(key, val) {
        let charVal = this.ruleCharacter.get(key);
        if (typeof charVal === "number") {
            if (typeof this.data[key] === "number") charVal += this.data[key];
            this.calculatedData[key] = val + charVal;
        } else {
            this.calculatedData[key] = val;
        }
    }

    addModification(key, val) {
        if (key === "_id" || key === "id") return;
        if (typeof this.data[key] === "number") {
            this.data[key] += val;
            if (this.data[key] === 0) delete this.data[key];
        } else {
            this.data[key] = val;
        }
    }

    addEffect(effect) {
        if (effect.val === 0) {
            this.effects.remove(effect);
        } else {
            this.effects.add(effect);
        }
    }

    dealDamage(val, type = RuleDamageType.BLUDGEONING, isNonLethal = false) {
        if (isNonLethal) {
            this.data[RuleGameObjectConstants.NONLETHAL_DAMAGE] += val;
        } else {
            this.data[RuleGameObjectConstants.LETHAL_DAMAGE] += val;
        }
    }

    reset() {
        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
    }

    recalculate() {
        if (!this.ruleCharacter) return;
        this.calculatedData = {};
        RuleImplementation.statCalc(this);
        RuleImplementation.calculateWeight(this);
        RuleImplementation.dodgeCalc(this);
        RuleImplementation.attackBonusCalc(this);
        RuleImplementation.defenceCalc(this);
        RuleImplementation.saveCalc(this);
        RuleImplementation.combatManeuverCalc(this);
        RuleImplementation.skillCalc(this);
        RuleImplementation.healthCalc(this);
    }

    rollValue(key) {
        const val = this.get(key);
        if (typeof val === "number") {
            const roller = new CheckDice();
            roller.bonus = val ? val : 0;
            roller.name = key;
            roller.roll();
            return roller.result;
        } else {
            return -1;
        }
    }

    /**
     * @param {GameObjectBean} json
     * @return RuleGameObject
     */
    static fromJson(json) {
        const obj = new RuleGameObject(json._id);
        if (json.name) obj.name = json.name;
        if (json.buffs) obj.buffs.processJson(json.buffs);
        if (json.data) Object.keys(json.data).forEach(key => obj.data[key] = json.data[key]);
        if (json.initiative) obj.initiative = json.initiative;
        if (json.icon) obj.icon = json.icon;
        if (json.character_id) obj.character_id = json.character_id;
        if (Array.isArray(json.items)) obj.items = RuleItemController.fromJson(obj, json.items);
        if (Array.isArray(json.effects)) obj.effects = RuleEffectController.fromJson(obj, json.effects);
        if (json.position) {
            const position = new RulePoint(json.position);
            obj.position = position;
            obj.movePoints.setStartingPoint(Object.assign({}, position));
        }
        return obj;
    }

    hasBuff(key) {
        return !!this.buffs.getBuff(key);
    }

    hasWeaponProficiency(prof) {
        return this.get(CONST.WEAPON_PROFICIENCY).includes(prof);
    }

    hasArmorProficiency(prof) {
        return this.get(CONST.ARMOR_PROFICIENCY).includes(prof);
    }

    hasFeat(key) {
        return this.ruleCharacter.hasFeat(key);
    }
}