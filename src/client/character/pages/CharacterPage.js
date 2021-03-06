/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import PopupManager from "../../popup/PopupManager";
import CheckDice from "../../logic/roll/CheckDice";
import BrowserWebSocket from "../../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";

export default class CharacterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            gameObject: null
        };
    }

    componentDidMount() {
        const character = StaticController.getMyCharacter();
        const gameObject = StaticController.getObjectByCharacter(character);
        this.setState({
            gameObject: gameObject,
            character: character
        });
    }

    getRollPop(obj) {
        const roller = new CheckDice();
        roller.name = obj.stat;
        roller.bonus = this.state.gameObject.get(obj.mod);
        PopupManager.push(roller.roll().generateText());
    }

    saveCharacter(key, value) {
        const v = parseInt(value);
        if (isNaN(v)) return;
        this.state.character.set(key, v);
        BrowserWebSocket.sendMessage(new WebSocketMessage(WebSocketMessage.TYPE_CHARACTER, [{
            _id: this.state.character.id,
            data: {[key]: v}
        }]));
        this.state.gameObject.recalculate();
        this.forceUpdate();
    }

    render() {
        const gameObject = this.state.gameObject;
        const character = this.state.character;
        if (!character || !gameObject) return null;
        return <table>
            <tbody>
            {this.props.rows.map(obj =>
                <CharacterRow key={obj.stat}
                              displayName={obj.stat}
                              finalValue={gameObject.get(obj.mod)}
                              modifiedValue={character.get(obj.stat)}
                              onSave={this.saveCharacter.bind(this, obj.stat)}
                              onClick={this.getRollPop.bind(this, obj)}/>)}
            </tbody>
        </table>;
    }
}

CharacterPage.propTypes = {rows: PropTypes.array.isRequired};