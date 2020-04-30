/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import CONST from "../../rules/constants/RuleStatConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {stat: CONST.MONEY, mod: CONST.MONEY},
    {stat: CONST.STAT_STRENGTH, mod: CONST.MOD_STRENGTH},
    {stat: CONST.STAT_DEXTERITY, mod: CONST.MOD_DEXTERITY},
    {stat: CONST.STAT_CONSTITUTION, mod: CONST.MOD_CONSTITUTION},
    {stat: CONST.STAT_INTELLIGENCE, mod: CONST.MOD_INTELLIGENCE},
    {stat: CONST.STAT_WISDOM, mod: CONST.MOD_WISDOM},
    {stat: CONST.STAT_CHARISMA, mod: CONST.MOD_CHARISMA}
];

export default class CharacterStats extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}