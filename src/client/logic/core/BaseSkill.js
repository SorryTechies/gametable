/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./BaseElement";
export default class BaseSkill extends BaseElement {
    constructor(instance_tag) {
        super(BaseSkill.CLASS_ID, instance_tag);
    }
}

BaseSkill.CLASS_ID = "skill";