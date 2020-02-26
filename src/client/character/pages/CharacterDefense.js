/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleConstants from "../../rules/RuleConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {stat: RuleConstants.DEFENCE_AC, mod: RuleConstants.DEFENCE_AC},
    {stat: RuleConstants.DEFENCE_TOUCH_AC, mod: RuleConstants.DEFENCE_TOUCH_AC},
    {stat: RuleConstants.DEFENCE_TFF_AC, mod: RuleConstants.DEFENCE_TFF_AC},
    {stat: RuleConstants.DEFENCE_FLAT_FOOTED_AC, mod: RuleConstants.DEFENCE_FLAT_FOOTED_AC}
];

export default class CharacterDefense extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}