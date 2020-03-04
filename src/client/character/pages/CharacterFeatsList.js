/**
 * Created by LastBerserk on 04.03.2020.
 */

import * as React from "react";
import CharacterListPage from "./CharacterListPage";
import TranslationModule from "../../rules/translation/TranslationModule";
import StaticController from "../../static/StaticController";
import BrowserWebSocket from "../../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import FeatsPopup from "./list/FeatsPopup";

export default class CharacterFeatsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** @type {RuleCharacter} */
            character: StaticController.getMyCharacter(),
            popup: false
        };
    }

    sendUpdateMessage() {
        BrowserWebSocket.sendMessage(new WebSocketMessage(WebSocketMessage.TYPE_CHARACTER, [{
            _id: this.state.character.id,
            feats: this.state.character.feats
        }]));
        this.forceUpdate();
    }

    onDelete(item) {
        const index = this.state.character.feats.findIndex(key => key === item);
        if (index !== -1) this.state.character.feats.splice(index, 1);
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
        if (!this.state.character) return null;
        return <div>
            <CharacterListPage onDelete={this.onDelete.bind(this)}
                               list={TranslationModule.getFeatsTranslation(this.state.character.feats)}
                               onCreate={this.onAdd.bind(this)}/>
            {this.state.popup ? <FeatsPopup onPicked={this.onFeatAdd.bind(this)}
                                            onClose={this.onClose.bind(this)}/> : null}
        </div>
    }
}