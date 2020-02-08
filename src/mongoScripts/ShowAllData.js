/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import AccountDB from "../server/mongo/classes/AccountDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import GameSessionDB from "../server/mongo/classes/GameSessionDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";

(async () => {
    await MongoController.init();
    const account = await MongoController.select(AccountDB.DB_NAME);
    console.log(account);
    const characters = await MongoController.select(CharacterDB.DB_NAME);
    console.log(characters);
    const sessions = await MongoController.select(GameSessionDB.DB_NAME);
    console.log(sessions);
    const map = await MongoController.select(SessionMapDB.DB_NAME);
    console.log(map);
    const objs = await MongoController.select(GameObjectDB.DB_NAME);
    console.log(objs);
})().catch(console.error);
