/**
 * Created by LastBerserk on 23.02.2020.
 */

import RuleDefaultValues from "./RuleDefaultValues";
import MovePointController from "../logic/MovePointController";

export default class RuleGameObject {
    constructor(id) {
        this.id = id;
        this.position = {x: 1, y: 1};
        this.character_id = "";
        this.initiative = 0;
        this.data = {};
        RuleDefaultValues.setDefaultObjectValues(this);
        this.name = "";
        this.buffs = [];
        this.icon = "";

        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
        this.gameObject = null;
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
            buffs: this.buffs
        };
    }

    reset() {
        this.movePoints = new MovePointController();
        this.movePoints.setStartingPoint(Object.assign({}, this.position));
    }

    /**
     * @param {GameObject} json
     * @param {object} loader
     * @return RuleGameObject
     */
    static fromJson(json, loader) {
        const obj = new RuleGameObject();
        if (json.name) obj.name = json.name;
        if (Array.isArray(json.buffs)) obj.buffs = json.buffs;
        if (json.data) Object.keys(json.data).forEach(key => obj.data[key] = json.data[key]);
        if (json.initiative) obj.initiative = json.initiative;
        if (json.icon) obj.icon = json.icon;
        if (json.character_id) {
            obj.character_id = json.character_id;
            obj.gameObject = loader.getCharacter(json.character_id);
        }
        if (json.position) {
            obj.position = json.position;
            obj.movePoints.setStartingPoint(Object.assign({}, json.position));
        }
        if (json._id) obj.id = json._id;
        return obj;
    }
}