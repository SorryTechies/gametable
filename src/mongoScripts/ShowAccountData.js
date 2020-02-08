/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import AccountDB from "../server/mongo/classes/AccountDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import GameSessionDB from "../server/mongo/classes/GameSessionDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";

(async () => {
    await MongoController.init();
    const account = await AccountDB.getByUsername("vatan");
    console.log(account);
    const characters = await MongoController.select(CharacterDB.DB_NAME, {_id: {$in: account[AccountDB.CHARACTERS_FIELD]}});
    console.log(characters);
    const sessions = await MongoController.select(GameSessionDB.DB_NAME, {_id: {$in: account[AccountDB.SESSION_FIELD]}});
    for (let i = 0; i < sessions.length; i++) {
        const session = await GameSessionDB.getById(sessions[i]._id);
        console.log(session);
        const map = await MongoController.select(SessionMapDB.DB_NAME, {_id: {$in: session[GameSessionDB.SESSION_MAPS_FIELD]}});
        console.log(map);
    }
})().catch(console.error);
