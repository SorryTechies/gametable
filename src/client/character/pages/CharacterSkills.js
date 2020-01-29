/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleSkillConstants from "../../rules/constants/RuleSkillConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {mod: RuleSkillConstants.SKILL_ACROBATICS, stat: RuleSkillConstants.SKILL_ACROBATICS_RANKS},
    {mod: RuleSkillConstants.SKILL_APPRAISE, stat: RuleSkillConstants.SKILL_APPRAISE_RANKS},
    {mod: RuleSkillConstants.SKILL_BLUFF, stat: RuleSkillConstants.SKILL_BLUFF_RANKS},
    {mod: RuleSkillConstants.SKILL_CLIMB, stat: RuleSkillConstants.SKILL_CLIMB_RANKS},
    {mod: RuleSkillConstants.SKILL_CRAFT, stat: RuleSkillConstants.SKILL_CRAFT_RANKS},
    {mod: RuleSkillConstants.SKILL_DIPLOMACY, stat: RuleSkillConstants.SKILL_DIPLOMACY_RANKS},
    {mod: RuleSkillConstants.SKILL_DISABLE_DEVICE, stat: RuleSkillConstants.SKILL_DISABLE_DEVICE_RANKS},
    {mod: RuleSkillConstants.SKILL_DISGUISE, stat: RuleSkillConstants.SKILL_DISGUISE_RANKS},
    {mod: RuleSkillConstants.SKILL_ESCAPE_ARTIST, stat: RuleSkillConstants.SKILL_ESCAPE_ARTIST_RANKS},
    {mod: RuleSkillConstants.SKILL_FLY, stat: RuleSkillConstants.SKILL_FLY_RANKS},
    {mod: RuleSkillConstants.SKILL_HANDLE_ANIMAL, stat: RuleSkillConstants.SKILL_HANDLE_ANIMAL_RANKS},
    {mod: RuleSkillConstants.SKILL_HEAL, stat: RuleSkillConstants.SKILL_HEAL_RANKS},
    {mod: RuleSkillConstants.SKILL_INTIMIDATE, stat: RuleSkillConstants.SKILL_INTIMIDATE_RANKS},
    {mod: RuleSkillConstants.SKILL_LINGUISTICS, stat: RuleSkillConstants.SKILL_LINGUISTICS_RANKS},
    {mod: RuleSkillConstants.SKILL_PERCEPTION, stat: RuleSkillConstants.SKILL_PERCEPTION_RANKS},
    {mod: RuleSkillConstants.SKILL_PERFORM, stat: RuleSkillConstants.SKILL_PERFORM_RANKS},
    {mod: RuleSkillConstants.SKILL_PROFESSION, stat: RuleSkillConstants.SKILL_PROFESSION_RANKS},
    {mod: RuleSkillConstants.SKILL_RIDE, stat: RuleSkillConstants.SKILL_RIDE_RANKS},
    {mod: RuleSkillConstants.SKILL_SENSE_MOTIVE, stat: RuleSkillConstants.SKILL_SENSE_MOTIVE_RANKS},
    {mod: RuleSkillConstants.SKILL_SLEIGHT_OF_HAND, stat: RuleSkillConstants.SKILL_SLEIGHT_OF_HAND_RANKS},
    {mod: RuleSkillConstants.SKILL_SPELLCRAFT, stat: RuleSkillConstants.SKILL_SPELLCRAFT_RANKS},
    {mod: RuleSkillConstants.SKILL_STEALTH, stat: RuleSkillConstants.SKILL_STEALTH_RANKS},
    {mod: RuleSkillConstants.SKILL_SURVIVAL, stat: RuleSkillConstants.SKILL_SURVIVAL_RANKS},
    {mod: RuleSkillConstants.SKILL_SWIM, stat: RuleSkillConstants.SKILL_SWIM_RANKS},
    {mod: RuleSkillConstants.SKILL_USE_MAGIC_DEVICE, stat: RuleSkillConstants.SKILL_USE_MAGIC_DEVICE_RANKS}
];

export default class CharacterSkills extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}