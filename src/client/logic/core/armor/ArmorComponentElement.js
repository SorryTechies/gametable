/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "../base/BaseElement";
export default class ArmorComponentElement extends BaseElement {
    constructor(tag) {
        super(ArmorComponentElement.category, tag);
    }
}

ArmorComponentElement.category = "armor_component";