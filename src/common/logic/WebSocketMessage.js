/**
 * Created by LastBerserk on 01.02.2020.
 */

export default class WebSocketMessage {
    constructor(type) {
        if (!type) throw new Error("No message type given.");
        this.type = type;
        this.data = {};
    }

    toJson() {
        return JSON.stringify({
            type: this.type,
            data: this.data
        });
    }

    /**
     * @param json
     * @return {WebSocketMessage}
     */
    static fromJson(json) {
        const obj = JSON.parse(json);
        if (typeof obj !== "object") throw new Error("Bad message.");
        const message = new WebSocketMessage(obj.type);
        message.data = obj.data;
        return message;
    }

}

WebSocketMessage.TYPE_AUTH = "auth";
WebSocketMessage.TYPE_CHAT = "chat";
WebSocketMessage.TYPE_ERROR = "error";
WebSocketMessage.TYPE_INTENT = "intent";