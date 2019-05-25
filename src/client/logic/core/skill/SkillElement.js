/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "../base/BaseElement";
import StatModifierElement from "../stat/StatModifierElement";
import CoreController from "../controller/CoreController";
export default class SkillElement extends BaseElement {
    constructor(tag) {
        super(SkillElement.category, tag);
    }
}

SkillElement.category = "skill";