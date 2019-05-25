/**
 * Created by LastBerserk on 10.04.2019.
 */

import StatElement from "./StatElement";
import BaseElement from "../base/BaseElement";
import CoreController from "../controller/CoreController";
export default class StatModifierElement extends BaseElement {
    constructor(tag) {
        super(StatModifierElement.category, tag);
    }
}

StatModifierElement.category = "stat_modifier";