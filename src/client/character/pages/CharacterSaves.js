/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import RuleConstants from "../../rules/RuleConstants";
import CharacterPage from "./CharacterPage";

const KEY_ARRAY = [
    {stat: RuleConstants.SAVE_FORTITUDE, mod: RuleConstants.SAVE_FORTITUDE},
    {stat: RuleConstants.SAVE_REFLEX, mod: RuleConstants.SAVE_REFLEX},
    {stat: RuleConstants.SAVE_WILL, mod: RuleConstants.SAVE_WILL}
];

export default class CharacterSaves extends React.Component {
    render() {
        return <CharacterPage rows={KEY_ARRAY}/>
    }
}