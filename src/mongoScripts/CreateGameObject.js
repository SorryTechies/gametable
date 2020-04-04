/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";
import * as uuid from "uuid";

(async () => {
    await MongoController.init();
    const character = await MongoController.getOne(CharacterDB.DB_NAME, {[CharacterDB.NAME_FIELD]: "Rat slave"});
    const gameObject = (await MongoController.insert(GameObjectDB.DB_NAME, [
        {
            [GameObjectDB.DATA_FIELD]: {},
            [GameObjectDB.POSITION_FIELD]: {x: 1, y: 3},
            [GameObjectDB.NAME_FIELD]: "Ratling",
            [GameObjectDB.CHARACTERS_FIELD]: character._id,
            [GameObjectDB.ICON_FIELD]: '/icons/Ratling.PNG',
            [GameObjectDB.ITEMS_FIELD]: [{
                "id": uuid.v1(),
                "key": "spear",
                "health": 1,
                "slot": 3
            }]
        }
    ]))[0];
    await MongoController.pushInto(SessionMapDB.DB_NAME, {name: "test_map"}, {map_objects_id: gameObject._id});
})().catch(console.error);
