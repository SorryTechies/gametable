/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "../base/BaseElement";
import StatModifierElement from "../stat/StatModifierElement";
import CoreController from "../controller/CoreController";
export default class SkillPoints extends BaseElement {
    constructor(tag) {
        super(SkillPoints.category, tag);
    }
}

SkillPoints.category = "skill_points";