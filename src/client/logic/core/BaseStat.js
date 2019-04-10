/**
 * Created by LastBerserk on 10.04.2019.
 */

import BaseElement from "./BaseElement";
export default class BaseStat extends BaseElement {
    constructor(instancetag) {
        super(BaseStat.CLASS_ID, instancetag);
    }
}

BaseStat.CLASS_ID = "stat";