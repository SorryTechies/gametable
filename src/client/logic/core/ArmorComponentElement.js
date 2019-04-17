/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class ArmorComponentElement extends BaseElement {
    constructor(instance_tag) {
        super(ArmorComponentElement.CLASS_ID, instance_tag);
    }
}

ArmorComponentElement.CLASS_ID = "armor_component";