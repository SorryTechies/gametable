/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} MapObject
 * @param {string} _id
 * @param {{}} character
 * @param {string} name
 * @param {Array.<string>} map_objects_id
 */

export default class MapObjectDB {
    static getById(id) {
        return MongoController.getById(MapObjectDB.DB_NAME, id);
    }
}

MapObjectDB.DB_NAME = "MapObject";
MapObjectDB.CHARACTER_FIELD = "character";
MapObjectDB.name = "name";
MapObjectDB.MAP_OBJECTS_FIELD = "map_objects_id";
