/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "../base/BaseElement";
export default class ArmorRatingsElement extends BaseElement {
    constructor(tag) {
        super(ArmorRatingsElement.category, tag);
    }
}

ArmorRatingsElement.category = "armor_rating";