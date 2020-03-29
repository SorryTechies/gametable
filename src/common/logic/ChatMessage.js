/**
 * Created by LastBerserk on 29.03.2020.
 */

import NotImplementedError from "../type/NotImplementedError";

export default class ChatMessage {
    constructor() {
        this.text = "";
        this.isMessage = false;
        this.senderId = null;
        this.targets = [];
        this.sessionId = null;
        this.timestamp = new Date();
    }

    /**
     * @param {ChatMessageBean} json
     */
    fillFromJson(json) {
        this.text = json.text;
        this.isMessage = json.is_message;
        this.senderId = json.sender_id;
        this.targets = json.target_id;
        this.sessionId = json.session_id;
        this.timestamp = new Date(Date.parse(json.stmp));
    }

    toJson() {
        return {
            text: this.text,
            is_message: this.isMessage,
            sender_id: this.senderId,
            target_id: this.targets,
            session_id: this.sessionId,
            stmp: this.timestamp
        };
    }

    send() {
        throw new NotImplementedError();
    }
}