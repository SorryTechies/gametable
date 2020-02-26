/**
 * Created by LastBerserk on 23.02.2020.
 */

import RuleDefaultValues from "./RuleDefaultValues";
import MovePointController from "../logic/MovePointController";
import RuleBuffController from "./RuleBuffController";
import * as RuleImplementation from "./impl/RuleImplementation";

export default class RuleGameObject {
    constructor(id) {
        this.id = id;
        this.position = {x: 1, y: 1};
        this.character_id = "";
        this.initiative = 0;
        this.data = {};
        this.name = "";
        this.buffs = new RuleBuffController(this);
        this.icon = "";

        this.calculatedData = {};
        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
        /** @type RuleCharacter */
        this.ruleCharacter = null;
    }

    finish() {
        this.buffs.turn();
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
            //buffs: this.buffs
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
            if (this.calculatedData[key] === "number") {
                charVal += this.calculatedData[key] + this.buffs.getBuffBonus(key);
            } else {
                charVal += this.buffs.getBuffBonus(key);
            }
            this.calculatedData[key] = val + charVal;
        } else {
            this.calculatedData[key] = val;
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
     * @param {object} loader
     * @return RuleGameObject
     */
    static fromJson(json, loader) {
        const obj = new RuleGameObject();
        if (json.name) obj.name = json.name;
        //if (json.buffs) obj.buffs = json.buffs;
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