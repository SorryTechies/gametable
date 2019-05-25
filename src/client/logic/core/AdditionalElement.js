/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class AdditionalElement extends BaseElement {
    constructor(tag) {
        super(AdditionalElement.category, tag);
    }
}

AdditionalElement.category = "additional";