/**
 * Created by LastBerserk on 29.03.2020.
 */

import ChatMessage from "../../common/logic/ChatMessage";

export default class ServerChatMessage extends ChatMessage {
    /**
     * @param {ChatMessageBean} json
     * @return {ServerChatMessage}
     */
    static fromJson(json) {
        const m = new ServerChatMessage();
        m.fillFromJson(json);
        return m;
    }
}