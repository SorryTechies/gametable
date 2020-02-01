/**
 * Created by LastBerserk on 01.02.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} ChatMessage
 * @param {string} _id
 * @param {string} text
 * @param {string} sender_id
 * @param {string} target_id
 * @param {string} session_id
 * @param {Date} stmp
 */

export default class ChatMessageDB {
    static getMessagesForAccountAndSession(account, session) {
        return MongoController.select(ChatMessageDB.DB_NAME, {
            $or: [
                {[ChatMessageDB.SENDER_FIELD]: account._id},
                {[ChatMessageDB.TARGET_FIELD]: account._id},
                {[ChatMessageDB.TARGET_FIELD]: {$exists: false}},
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