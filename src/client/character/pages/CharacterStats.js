/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import RuleConstants from "../../rules/RuleConstants";
import CheckDice from "../../logic/roll/CheckDice";
import PopupManager from "../../popup/PopupManager";
import CharacterPageController from "./CharacterPageController";

const KEY_ARRAY = [
    {stat: RuleConstants.STAT_STRENGTH, mod: RuleConstants.MOD_STRENGTH},
    {stat: RuleConstants.STAT_DEXTERITY, mod: RuleConstants.MOD_DEXTERITY},
    {stat: RuleConstants.STAT_CONSTITUTION, mod: RuleConstants.MOD_CONSTITUTION},
    {stat: RuleConstants.STAT_INTELLIGENCE, mod: RuleConstants.MOD_INTELLIGENCE},
    {stat: RuleConstants.STAT_WISDOM, mod: RuleConstants.MOD_WISDOM},
    {stat: RuleConstants.STAT_CHARISMA, mod: RuleConstants.MOD_WISDOM}
];

export default class CharacterStats extends React.Component {
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
                              onSave={CharacterPageController.saveCharacter(character, obj.stat)}
                              onClick={CharacterPageController.getRollPop(obj, character)}/>)}
            </tbody>
        </table>;
    }
}