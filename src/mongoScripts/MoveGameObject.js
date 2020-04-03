/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as MongoDB from "mongodb";

const ObjectId = MongoDB.ObjectID;

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import * as uuid from "uuid";

(async () => {
    await MongoController.init();
    const characters = await MongoController.update(GameObjectDB.DB_NAME, {name: "Ratling"},
        {
            [GameObjectDB.ITEMS_FIELD]: [{
                "id": uuid.v1(),
                "key": "spear",
                "health": 1,
                "slot": 3
            }]
        });
    console.log(characters);
})().catch(console.error);
