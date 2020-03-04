/**
 * Created by LastBerserk on 05.03.2020.
 */

import StaticController from "../../../static/StaticController";
import {handleCharacterChange} from "../../../../common/logic/ws/WsCharacterChangeProcessor";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";

export function handle(message) {
    const character = StaticController.getCharacter(message._id);
    if (!character) return;
    handleCharacterChange(character, message);
    StaticController.notifySubscribed(WebSocketMessage.TYPE_CHARACTER);
}