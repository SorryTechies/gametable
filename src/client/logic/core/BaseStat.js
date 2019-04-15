/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./BaseElement";
export default class BaseStat extends BaseElement {
    constructor(instance_tag) {
        super(BaseStat.CLASS_ID, instance_tag);
    }
}

BaseStat.CLASS_ID = "stat";