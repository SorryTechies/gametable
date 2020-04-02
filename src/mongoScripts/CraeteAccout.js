/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import AccountDB from "../server/mongo/classes/AccountDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import GameSessionDB from "../server/mongo/classes/GameSessionDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";

async function getGame(map) {
    const game = await MongoController.select(GameSessionDB.DB_NAME);
    if (game.length > 0) {
        return game;
    } else {
        return MongoController.insert(GameSessionDB.DB_NAME, [{
            [GameSessionDB.PARTICIPANTS_CHARACTER_FIELD]: [],
            [GameSessionDB.SESSION_MAPS_FIELD]: [map._id]
        }]);
    }
}

async function getMap() {
    const map = await MongoController.select(SessionMapDB.DB_NAME);
    if (map.length > 0) {
        return map;
    } else {
        return MongoController.insert(SessionMapDB.DB_NAME, [{
            [SessionMapDB.URL_FIELD]: "",
            [SessionMapDB.DM_URL_FIELD]: "",
            [SessionMapDB.MAP_OBJECTS_FIELD]: [],
            [SessionMapDB.SIZE_FIELD]: {x: 40, y: 40},
            [SessionMapDB.NAME_FIELD]: "test_map"
        }]);
    }
}

(async () => {
    await MongoController.init();
    const map = (await getMap())[0];
    const game = (await getGame(map))[0];
    const character = (await MongoController.insert(CharacterDB.DB_NAME, [{
        [CharacterDB.DATA_FIELD]: {},
        [CharacterDB.NAME_FIELD]: "Grul"
    }]))[0];
    const gameObject = (await MongoController.insert(GameObjectDB.DB_NAME, [{
        [GameObjectDB.DATA_FIELD]: {},
        [GameObjectDB.POSITION_FIELD]: {x: 4, y: 4},
        [GameObjectDB.NAME_FIELD]: "Grul",
        [GameObjectDB.CHARACTERS_FIELD]: character._id,
        [GameObjectDB.ICON_FIELD]: '/icons/Temp.png'
    }]))[0];
    const account = (await MongoController.insert(AccountDB.DB_NAME, [{
        [AccountDB.USERNAME_FIELD]: "sasha",
        [AccountDB.CHARACTERS_FIELD]: [character._id],
        [AccountDB.SESSION_FIELD]: [game._id]
    }]))[0];
    MongoController.updateRaw(
        SessionMapDB.DB_NAME,
        {_id: map._id},
        {$push: {[SessionMapDB.MAP_OBJECTS_FIELD]: gameObject._id}}
    );
    MongoController.updateRaw(
        GameSessionDB.DB_NAME,
        {_id: game._id},
        {$push: {[GameSessionDB.PARTICIPANTS_CHARACTER_FIELD]: account._id}}
    );
})().catch(console.error);
