/**
 * Created by LastBerserk on 01.02.2020.
 */

export default class WebSocketMessage {
    /**
     * @param {string} type - action type, {@link WebSocketMessage.TYPE_AUTH} for example.
     * @param {object|string} [data] - data to transfer
     * @param {string} [game_id] - id of the game
     */
    constructor(type, data, game_id) {
        if (!type) throw new Error("No message type given.");
        this.type = type;
        this.game_id = game_id;
        this.data = data ? data : {};
        this.action = undefined;
    }

    toJson() {
        return JSON.stringify({
            type: this.type,
            data: this.data,
            game_id: this.game_id,
            action: this.action
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
        message.game_id = obj.game_id;
        message.action = obj.action;
        return message;
    }

}

WebSocketMessage.TYPE_AUTH = "auth";
WebSocketMessage.TYPE_CHAT = "chat";
WebSocketMessage.TYPE_ERROR = "error";
WebSocketMessage.TYPE_INTENT = "intent";
WebSocketMessage.TYPE_MAP = "map";
WebSocketMessage.TYPE_OBJECT = "object";
WebSocketMessage.TYPE_CHARACTER = "character";
WebSocketMessage.TYPE_ACTION_DEMAND = "demand";
WebSocketMessage.TYPE_LAYOUT_CHANGE = "layout";