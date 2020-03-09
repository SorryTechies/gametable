/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import ChatMessageDB from "../server/mongo/classes/ChatMessageDB";

(async () => {
    await MongoController.init();
    const messages = await MongoController.select(ChatMessageDB.DB_NAME);
    console.log(messages);
})().catch(console.error);
