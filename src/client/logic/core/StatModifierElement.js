/**
 * Created by LastBerserk on 10.04.2019.
 */

import StatElement from "./StatElement";
import BaseElement from "./base/BaseElement";
import CoreController from "./controller/CoreController";
export default class StatModifierElement extends BaseElement {
    constructor(instance_tag) {
        super(StatModifierElement.CLASS_ID, instance_tag);
        const stat = CoreController.getDependency(StatElement.CLASS_ID, instance_tag);
        if (!stat) throw Error(`Can't find stat with id '${instance_tag}'.`);
        stat.dependents.push(this);
        this.calculate = () => this.result = Math.floor((stat.result - 10) / 2);
    }
}

StatModifierElement.CLASS_ID = "stat_modifier";