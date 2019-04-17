/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class ArmorRatingsElement extends BaseElement {
    constructor(instance_tag) {
        super(ArmorRatingsElement.CLASS_ID, instance_tag);
    }
}

ArmorRatingsElement.CLASS_ID = "armor_rating";