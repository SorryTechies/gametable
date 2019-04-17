/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class AdditionalElement extends BaseElement {
    constructor(instance_tag) {
        super(AdditionalElement.CLASS_ID, instance_tag);
    }
}

AdditionalElement.CLASS_ID = "additional";