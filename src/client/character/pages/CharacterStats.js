/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleConstants from "../../rules/constants/RuleStatConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {stat: RuleConstants.STAT_STRENGTH, mod: RuleConstants.MOD_STRENGTH},
    {stat: RuleConstants.STAT_DEXTERITY, mod: RuleConstants.MOD_DEXTERITY},
    {stat: RuleConstants.STAT_CONSTITUTION, mod: RuleConstants.MOD_CONSTITUTION},
    {stat: RuleConstants.STAT_INTELLIGENCE, mod: RuleConstants.MOD_INTELLIGENCE},
    {stat: RuleConstants.STAT_WISDOM, mod: RuleConstants.MOD_WISDOM},
    {stat: RuleConstants.STAT_CHARISMA, mod: RuleConstants.MOD_CHARISMA}
];

export default class CharacterStats extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}