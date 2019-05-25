/**
 * Created by LastBerserk on 17.04.2019.
 */

import BaseElement from "./base/BaseElement";
export default class SaveElement extends BaseElement {
    constructor(tag) {
        super(SaveElement.category, tag);
    }
}

SaveElement.category = "save";