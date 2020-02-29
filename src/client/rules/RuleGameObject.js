/**
 * Created by LastBerserk on 23.02.2020.
 */

import MovePointController from "../logic/MovePointController";
import RuleBuffController from "./RuleBuffController";
import * as RuleImplementation from "./impl/RuleImplementation";
import RuleGameObjectConstants from "./constants/RuleGameObjectConstants";

export default class RuleGameObject {
    constructor(id) {
        this.id = id;
        this.position = {x: 1, y: 1};
        this.character_id = "";
        this.initiative = 0;
        this.data = {};
        this.isAlive = true;
        this.name = "";
        this.buffs = new RuleBuffController(this);
        this.icon = "";

        this.calculatedData = {};
        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
        /** @type RuleCharacter */
        this.ruleCharacter = null;
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
        if (this.calculatedData[key]) {
            return this.calculatedData[key];
        } else {
            return this.ruleCharacter.get(key);
        }
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

    dealDamage(val, isNonLethal) {
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
        RuleImplementation.dodgeCalc(this);
        RuleImplementation.attackBonusCalc(this);
        RuleImplementation.defenceCalc(this);
        RuleImplementation.saveCalc(this);
        RuleImplementation.combatManeuverCalc(this);
        RuleImplementation.skillCalc(this);
    }

    /**
     * @param {GameObject} json
     * @return RuleGameObject
     */
    static fromJson(json) {
        const obj = new RuleGameObject();
        if (json.name) obj.name = json.name;
        if (json.buffs) obj.buffs.processJson(json.buffs);
        if (json.data) Object.keys(json.data).forEach(key => obj.data[key] = json.data[key]);
        if (json.initiative) obj.initiative = json.initiative;
        if (json.icon) obj.icon = json.icon;
        if (json.character_id) obj.character_id = json.character_id;
        if (json.position) {
            obj.position = json.position;
            obj.movePoints.setStartingPoint(Object.assign({}, json.position));
        }
        if (json._id) obj.id = json._id;
        return obj;
    }
}