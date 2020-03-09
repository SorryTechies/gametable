/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import ChatMessageDB from "../server/mongo/classes/ChatMessageDB";

(async () => {
    await MongoController.init();
    await MongoController.remove(ChatMessageDB.DB_NAME);
})().catch(console.error);
