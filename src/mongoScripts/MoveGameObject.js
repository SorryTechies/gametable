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
            effects: [],
            data: {},
            buffs: {},
            name: "Vatan"
        });
    console.log(characters);
})().catch(console.error);
