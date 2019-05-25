/**
 * Created by LastBerserk on 10.04.2019.
 */

export default class BaseElement {
    /**
     * @param {string} id - category, where to put this object
     * @param {string} instanceTag - tag of the instance
     * @param {number} [defaultValue]
     */
    constructor(id, instanceTag, defaultValue) {
        if (typeof id !== "string" || typeof instanceTag !== "string") throw Error("Class id and tag should be string.");
        this.category = id;
        this.tag = instanceTag;
        if (typeof defaultValue === "number") {
            this.defaultValue = defaultValue;
        } else {
            this.defaultValue = 0;
        }

        /**
         * @type function
         * @return number
         */
        this.calculate = () => this.result = this.defaultValue;
        /** @type [BaseModifier] */
        this.modifiers = [];
        this.result = 0;
        this.priority = 10;

        /** @type [BaseElement] */
        this.dependents = [];
    }

    addModifiers() {
        this.modifiers.forEach(item => item.calculate());
    }

    recalculate() {
        this.calculate();
        this.addModifiers();
    }
}