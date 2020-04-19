/**
 * Created by LastBerserk on 18.04.2020.
 */

import MapItemController from "./RuleMapItemController";
import MapGrid from "./MapGrid";
import BadArgumentsError from "../../../common/type/BadArgumentsError";

export default class RuleMap {
    constructor(id, size) {
        if (!id) throw new Error("No id provided.");
        this.id = id;
        if (!size || typeof size.x !== "number" || typeof size.y !== "number") throw new BadArgumentsError();
        this.size = {x: size.x, y: size.y};
        /** @type {Array.<string>} */
        this.objectIds = [];
        this.name = "New Map";
        this.backgroundUrl = "";
        this.backgroundDMUrl = "";

        /** @type {Array.<RuleGameObject>} */
        this.objects = [];
        this.itemController = new MapItemController();
        this.gridController = new MapGrid(this.size.x, this.size.y);
    }

    /**
     * @param {SessionMapBean} json
     * @return {RuleMap}
     */
    static fromJson(json) {
        const map = new RuleMap(json._id, json.size);
        if (Array.isArray(json.map_objects_id)) map.objectsIds = json.map_objects_id;
        if (json.name) map.name = json.name;
        if (json.url) map.backgroundUrl = json.url;
        if (json.dm_url) map.backgroundDMUrl = json.dm_url;
        if (Array.isArray(json.items)) map.itemController.processJson(json);
        return map;
    }
}