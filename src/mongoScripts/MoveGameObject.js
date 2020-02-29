/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as MongoDB from "mongodb";

const ObjectId = MongoDB.ObjectID;

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";

(async () => {
    await MongoController.init();
    const characters = await MongoController.update(GameObjectDB.DB_NAME, {_id: ObjectId("5e39c9dc5f81a52fac11b6c3")},
        {
            data: {},
            buffs: {},
            name: "Biba"
        });
    console.log(characters);
})().catch(console.error);
