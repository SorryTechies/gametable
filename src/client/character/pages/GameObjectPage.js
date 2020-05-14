/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import BrowserWebSocket from "../../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import TranslationModule from "../../rules/translation/TranslationModule";
import RuleCharacterChangesBean from "../../rules/RuleCharacterChangesBean";

export default class GameObjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameObject: null};
    }

    componentDidMount() {
        this.setState({gameObject: StaticController.getObjectByCharacter(StaticController.getMyCharacter())});
    }

    sendBean(mod) {
        BrowserWebSocket.sendMessage(new WebSocketMessage(WebSocketMessage.TYPE_OBJECT,
            [RuleCharacterChangesBean.createStandaloneModification(this.state.gameObject.id, mod)]));
    }

    onObjectChanged(key, value) {
        const v = parseInt(value);
        if (isNaN(v)) return;
        const d = v - this.state.gameObject.getData(key);
        this.state.gameObject.setData(key, v);
        this.sendBean({data: {[key]: d}});
        this.state.gameObject.recalculate();
        this.forceUpdate();
    }

    render() {
        const gameObject = this.state.gameObject;
        if (!gameObject) return null;
        return <table>
            <tbody>
            {this.props.rows.map(key =>
                <CharacterRow key={key}
                              displayName={TranslationModule.getTranslation(key)}
                              modifiedValue={gameObject.getData(key)}
                              onSave={this.onObjectChanged.bind(this, key)}/>)}
            </tbody>
        </table>;
    }
}

GameObjectPage.propTypes = {rows: PropTypes.array.isRequired};