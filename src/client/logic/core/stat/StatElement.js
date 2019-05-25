/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "../base/BaseElement";
export default class StatElement extends BaseElement {
    constructor(tag) {
        super(StatElement.category, tag);
    }
}

StatElement.category = "stat";