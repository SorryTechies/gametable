/**
 * Created by LastBerserk on 01.02.2020.
 */

import MongoController from "../MongoController";

export default class ChatMessageDB {
    /**
     * @param {Account} account
     * @param {GameSession} session
     * @return {Promise<Array<ChatMessage>>}
     */
    static getMessagesForAccountAndSession(account, session) {
        return MongoController.select(ChatMessageDB.DB_NAME, {
            $or: [
                {[ChatMessageDB.SENDER_FIELD]: account._id},
                {[ChatMessageDB.TARGET_FIELD]: account._id},
                {[ChatMessageDB.TARGET_FIELD]: null},
            ],
            [ChatMessageDB.SESSION_FIELD]: session._id
        });
    }
}

ChatMessageDB.DB_NAME = "ChatMessage";
ChatMessageDB.TEXT_FIELD = "text";
ChatMessageDB.SENDER_FIELD = "sender_id";
ChatMessageDB.TARGET_FIELD = "target_id";
ChatMessageDB.SESSION_FIELD = "session_id";
ChatMessageDB.TIMESTAMP_FIELD = "stmp";
ChatMessageDB.IS_MESSAGE = "is_message";