/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import PopupManager from "../../popup/PopupManager";
import CheckDice from "../../logic/roll/CheckDice";

export default class CharacterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {character: null};
    }

    componentDidMount() {
        this.loadCharacter();
    }

    loadCharacter() {
        const character = StaticController.getCharacter();
        character.data.recalculate();
        this.setState({character: character.data});
    }

    getRollPop(obj) {
        const roller = new CheckDice();
        roller.name = obj.stat;
        roller.bonus = this.state.character.get(obj.mod);
        PopupManager.push(roller.roll().generateText());
    }

    saveCharacter(key, value) {
        const v = parseInt(value);
        if (isNaN(v)) return;
        this.state.character.setOriginal(key, v);
        StaticController.saveCharacter();
        this.state.character.recalculate();
        this.forceUpdate();
    }

    render() {
        const character = this.state.character;
        if (!character) return null;
        return <table>
            <tbody>
            {this.props.rows.map(obj =>
                <CharacterRow key={obj.stat}
                              displayName={obj.stat}
                              finalValue={character.get(obj.mod)}
                              modifiedValue={character.getOriginal(obj.stat)}
                              onSave={this.saveCharacter.bind(this, obj.stat)}
                              onClick={this.getRollPop.bind(this, obj)}/>)}
            </tbody>
        </table>;
    }
}

CharacterPage.propTypes = {rows: PropTypes.array.isRequired};