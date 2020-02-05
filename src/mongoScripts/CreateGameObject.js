/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";

(async () => {
    await MongoController.init();
    const character = await MongoController.getOne(CharacterDB.DB_NAME, {[CharacterDB.NAME_FIELD]: "Biba"});
    const gameObject = (await MongoController.insert(GameObjectDB.DB_NAME, [
        {
            [GameObjectDB.POSITION_FIELD]: {x: 10, y: 10},
            [GameObjectDB.CHARACTERS_FIELD]: character._id
        }
    ]))[0];
    await MongoController.pushInto(SessionMapDB.DB_NAME, {name: "test_map"}, {map_objects_id: gameObject._id});
})().catch(console.error);
