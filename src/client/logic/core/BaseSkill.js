/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./BaseElement";
import CoreController from "./CoreController";
export default class BaseSkill extends BaseElement {
    constructor(instance_tag, stat) {
        super(BaseSkill.CLASS_ID, instance_tag);
        const statModifier = CoreController.getDependency(BaseStatModifier.CLASS_ID, stat);
        if (!statModifier) throw Error(`Can't find stat with id '${statModifier}'.`);
        statModifier.dependents.push(this);
        this.calculate = () => this.result = statModifier.result;
    }
}

BaseSkill.CLASS_ID = "skill";