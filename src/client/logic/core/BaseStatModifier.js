/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./BaseElement";
import CoreController from "./CoreController";
export default class BaseStatModifier extends BaseElement {
    constructor(instance_tag) {
        super(BaseSkill.CLASS_ID, instance_tag);
        const stat = CoreController.getDependency(BaseStat.CLASS_ID, instance_tag);
        if (!stat) throw Error(`Can't find stat with id '${stat}'.`);
        stat.dependents.push(this);
        this.calculate = () => this.result = Math.floor((stat.result - 10) / 2);
    }
}

BaseStat.CLASS_ID = "stat_modifier";