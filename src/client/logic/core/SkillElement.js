/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./base/BaseElement";
import StatModifierElement from "./StatModifierElement";
import CoreController from "./controller/CoreController";
export default class SkillElement extends BaseElement {
    constructor(instance_tag) {
        super(SkillElement.CLASS_ID, instance_tag);
    }
}

SkillElement.CLASS_ID = "skill";