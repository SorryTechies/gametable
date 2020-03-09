/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import ChatMessageDB from "../server/mongo/classes/ChatMessageDB";
import AccountDB from "../server/mongo/classes/AccountDB";
import GameSessionDB from "../server/mongo/classes/GameSessionDB";

(async () => {
    await MongoController.init();
    const account = await AccountDB.getByUsername("alkor");
    const session = await GameSessionDB.getById(account.session_ids[0]);
    const messages = await ChatMessageDB.getMessagesForAccountAndSession(account, session);
    console.log(messages);
})().catch(console.error);
