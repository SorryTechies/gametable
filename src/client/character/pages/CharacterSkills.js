/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import StaticController from "../../static/StaticController";
import CharacterRow from "../element/CharacterRow";
import CharacterPageController from "./CharacterPageController";
import RuleSkillConstants from "../../rules/constants/RuleSkillConstants";

const KEY_ARRAY = [
    {stat: RuleSkillConstants.SKILL_ACROBATICS_RANKS, mod: RuleSkillConstants.SKILL_ACROBATICS_RANKS},
    {stat: RuleSkillConstants.SKILL_APPRAISE, mod: RuleSkillConstants.SKILL_APPRAISE_RANKS},
    {stat: RuleSkillConstants.SKILL_BLUFF, mod: RuleSkillConstants.SKILL_BLUFF_RANKS},
    {stat: RuleSkillConstants.SKILL_CLIMB, mod: RuleSkillConstants.SKILL_CLIMB_RANKS},
    {stat: RuleSkillConstants.SKILL_CRAFT, mod: RuleSkillConstants.SKILL_CRAFT_RANKS},
    {stat: RuleSkillConstants.SKILL_DIPLOMACY, mod: RuleSkillConstants.SKILL_DIPLOMACY_RANKS},
    {stat: RuleSkillConstants.SKILL_DISABLE_DEVICE, mod: RuleSkillConstants.SKILL_DISABLE_DEVICE_RANKS},
    {stat: RuleSkillConstants.SKILL_DISGUISE, mod: RuleSkillConstants.SKILL_DISGUISE_RANKS},
    {stat: RuleSkillConstants.SKILL_ESCAPE_ARTIST, mod: RuleSkillConstants.SKILL_ESCAPE_ARTIST_RANKS},
    {stat: RuleSkillConstants.SKILL_FLY, mod: RuleSkillConstants.SKILL_FLY_RANKS},
    {stat: RuleSkillConstants.SKILL_HANDLE_ANIMAL, mod: RuleSkillConstants.SKILL_HANDLE_ANIMAL_RANKS},
    {stat: RuleSkillConstants.SKILL_HEAL, mod: RuleSkillConstants.SKILL_HEAL_RANKS},
    {stat: RuleSkillConstants.SKILL_INTIMIDATE, mod: RuleSkillConstants.SKILL_INTIMIDATE_RANKS},
    {stat: RuleSkillConstants.SKILL_LINGUISTICS, mod: RuleSkillConstants.SKILL_LINGUISTICS_RANKS},
    {stat: RuleSkillConstants.SKILL_PERCEPTION, mod: RuleSkillConstants.SKILL_PERCEPTION_RANKS},
    {stat: RuleSkillConstants.SKILL_PERFORM, mod: RuleSkillConstants.SKILL_PERFORM_RANKS},
    {stat: RuleSkillConstants.SKILL_PROFESSION, mod: RuleSkillConstants.SKILL_PROFESSION_RANKS},
    {stat: RuleSkillConstants.SKILL_RIDE, mod: RuleSkillConstants.SKILL_RIDE_RANKS},
    {stat: RuleSkillConstants.SKILL_SENSE_MOTIVE, mod: RuleSkillConstants.SKILL_SENSE_MOTIVE_RANKS},
    {stat: RuleSkillConstants.SKILL_SLEIGHT_OF_HAND, mod: RuleSkillConstants.SKILL_SLEIGHT_OF_HAND_RANKS},
    {stat: RuleSkillConstants.SKILL_SPELLCRAFT, mod: RuleSkillConstants.SKILL_SPELLCRAFT_RANKS},
    {stat: RuleSkillConstants.SKILL_STEALTH, mod: RuleSkillConstants.SKILL_STEALTH_RANKS},
    {stat: RuleSkillConstants.SKILL_SURVIVAL, mod: RuleSkillConstants.SKILL_SURVIVAL_RANKS},
    {stat: RuleSkillConstants.SKILL_SWIM, mod: RuleSkillConstants.SKILL_SWIM_RANKS},
    {stat: RuleSkillConstants.SKILL_USE_MAGIC_DEVICE, mod: RuleSkillConstants.SKILL_USE_MAGIC_DEVICE_RANKS}
];

export default class CharacterSkills extends React.Component {
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