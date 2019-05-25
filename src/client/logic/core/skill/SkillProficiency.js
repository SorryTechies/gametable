/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "../base/BaseElement";
import StatModifierElement from "../stat/StatModifierElement";
import CoreController from "../controller/CoreController";
export default class SkillProficiency extends BaseElement {
    constructor(tag) {
        super(SkillProficiency.category, tag);
    }
}

SkillProficiency.category = "skill_proficiency";