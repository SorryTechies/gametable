/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleConstants from "../../rules/RuleConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {stat: RuleConstants.BAB, mod: RuleConstants.BAB},
    {stat: RuleConstants.COMBAT_MANEUVER_BONUS, mod: RuleConstants.COMBAT_MANEUVER_BONUS}
];

export default class CharacterOffense extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}