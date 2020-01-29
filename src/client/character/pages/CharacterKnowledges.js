/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleSkillConstants from "../../rules/constants/RuleSkillConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA, stat: RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING, stat: RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY, stat: RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING, stat: RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY, stat: RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL, stat: RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_NATURE, stat: RuleSkillConstants.SKILL_KNOWLEDGE_NATURE_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY, stat: RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_PLANES, stat: RuleSkillConstants.SKILL_KNOWLEDGE_PLANES_RANKS},
    {mod: RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION, stat: RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION_RANKS}
];

export default class CharacterKnowledges extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>;
    }
}