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
    {stat: RuleConstants.BAB, mod: RuleConstants.BAB},
    {stat: RuleConstants.COMBAT_MANEUVER_BONUS, mod: RuleConstants.COMBAT_MANEUVER_BONUS}
];

export default class CharacterOffense extends React.Component {
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