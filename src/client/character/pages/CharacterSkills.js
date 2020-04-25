/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import SKILLS from "../../rules/constants/RuleSkillConstants";
import CharacterPage from "./CharacterPage";
import * as SUPP from "../../rules/constants/RuleSkillSupportConst";

export default class CharacterSkills extends React.Component {
    render() {
        return <CharacterPage rows={Object.values(SKILLS).map(key =>
            ({mod: key, stat: SUPP.getRankKey(key), displayName: key}))}/>
    }
}