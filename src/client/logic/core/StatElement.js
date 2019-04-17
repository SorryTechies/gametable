/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class StatElement extends BaseElement {
    constructor(instance_tag) {
        super(StatElement.CLASS_ID, instance_tag);
        this.defaultValue = 10;
    }
}

StatElement.CLASS_ID = "stat";