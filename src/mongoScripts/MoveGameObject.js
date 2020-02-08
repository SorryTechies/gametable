/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as MongoDB from "mongodb";

const ObjectId = MongoDB.ObjectID;

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";

(async () => {
    await MongoController.init();
    const characters = await MongoController.update(GameObjectDB.DB_NAME, {_id: ObjectId("5e3ea0e72763d338d4b6b411")},
        {
            character_id: ObjectId("5e3ea18d4e8d6c311834f1b6"),
            position: {x: 11, y: 10}
        });
    console.log(characters);
})().catch(console.error);
