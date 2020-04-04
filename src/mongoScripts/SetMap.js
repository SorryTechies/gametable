/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as MongoDB from "mongodb";

const ObjectId = MongoDB.ObjectID;

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";
import GameSessionDB from "../server/mongo/classes/GameSessionDB";

(async () => {
    await MongoController.init();
    await MongoController.update(SessionMapDB.DB_NAME, {_id: ObjectId("5e3965fe5b10373b0467aa2d")},{
        url: "/maps/30c92205eb672152bf263dda2f3ff5f7.jpg"
    });
})().catch(console.error);
