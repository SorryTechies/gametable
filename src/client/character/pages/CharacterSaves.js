/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import RuleConstants from "../../rules/RuleConstants";
import PopupManager from "../../popup/PopupManager";
import CheckDice from "../../logic/roll/CheckDice";
import CharacterPageController from "./CharacterPageController";

const KEY_ARRAY = [
    {stat: RuleConstants.SAVE_FORTITUDE, mod: RuleConstants.SAVE_FORTITUDE},
    {stat: RuleConstants.SAVE_REFLEX, mod: RuleConstants.SAVE_REFLEX},
    {stat: RuleConstants.SAVE_WILL, mod: RuleConstants.SAVE_WILL}
];

export default class CharacterSaves extends React.Component {
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

    render() {
        const character = this.state.character;
        if (!character) return null;
        return <table>
            <tbody>
            {KEY_ARRAY.map(obj =>
                <CharacterRow key={obj.stat}
                              displayName={obj.stat}
                              finalValue={character.get(obj.mod)}
                              modifiedValue={character.getOriginal(obj.stat)}
                              onSave={CharacterPageController.saveCharacter(character, obj.mod)}
                              onClick={CharacterPageController.getRollPop(obj, character)}/>)}
            </tbody>
        </table>;
    }
}