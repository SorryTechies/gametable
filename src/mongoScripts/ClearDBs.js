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
    await MongoController.remove(AccountDB.DB_NAME);
    await MongoController.remove(CharacterDB.DB_NAME);
    await MongoController.remove(GameSessionDB.DB_NAME);
    await MongoController.remove(SessionMapDB.DB_NAME);
})().catch(console.error);
