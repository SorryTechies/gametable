/**
 * Created by LastBerserk on 04.03.2020.
 */

import * as React from "react";
import StaticController from "../../static/StaticController";
import BrowserWebSocket from "../../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import CONST from "../../rules/constants/RuleGameObjectConstants";
import RuleCharacterChangesBean from "../../rules/RuleCharacterChangesBean";
import RuleGameObject from "../../rules/RuleGameObject";
import GameObjectPage from "./GameObjectPage";

const KEY_ARRAY = [CONST.MONEY];

export default class CharacterItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** @type {RuleGameObject} */
            gameObject: StaticController.getObjectByCharacter(StaticController.getMyCharacter()),
            popup: false,
        };
    }

    sendBean(mod) {
        BrowserWebSocket.sendMessage(new WebSocketMessage(WebSocketMessage.TYPE_OBJECT,
            [RuleCharacterChangesBean.createStandaloneModification(this.state.gameObject.id, mod)]));
    }

    modifyItem() {

    }

    onDelete(item) {
        const index = this.state.unit.items.removeItem(item.id);
        this.sendUpdateMessage();
    }

    onClose() {
        this.setState({popup: false});
    }

    onFeatAdd(val) {
        this.onClose();
        this.state.character.feats.push(val);
        this.sendUpdateMessage();
    }

    onAdd() {
        this.setState({popup: true});
    }

    render() {
        if (!this.state.gameObject) return null;
        return <div>
            <GameObjectPage rows={KEY_ARRAY}/>
        </div>
    }
}