/**
 * Created by LastBerserk on 27.01.2020.
 */
import MongoController from "../MongoController";
import * as MongoDB from "mongodb";

export default class GameObjectDB {
    /** @return Promise<GameObject> */
    static getById(id) {
        return MongoController.getById(GameObjectDB.DB_NAME, id);
    }

    /** @return Promise<Array<GameObject>> */
    static findByIdes(ids) {
        const idArray = ids.map(id =>  typeof id === "string"?  MongoDB.ObjectID(id) : id);
        return MongoController.select(GameObjectDB.DB_NAME,  {_id: {$in: idArray}});
    }
}

GameObjectDB.DB_NAME = "GameObject";
GameObjectDB.POSITION_FIELD = "position";
GameObjectDB.CHARACTERS_FIELD = "character_id";
GameObjectDB.INITIATIVE_FIELD = "initiative";
GameObjectDB.TEMPLATE_FIELD = "template_id";
GameObjectDB.DATA_FIELD = "data";
GameObjectDB.NAME_FIELD = "name";
