/**
 * Created by LastBerserk on 10.04.2019.
 */

export default class ElementDependency {
    constructor(instance, func) {
        /** @type BaseElement */
        this.instance = instance;
        if (typeof func === "function") {
            this.func = func;
        } else {
            this.func = (value1, value2) => value1 + value2;
        }
    }
}