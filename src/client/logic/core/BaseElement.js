/**
 * Created by LastBerserk on 10.04.2019.
 */

import CoreController from "./CoreController";
export default class BaseElement {
    constructor(id, instancetag, default_value) {
        if (typeof id !== "string" || typeof instancetag !== "string") throw Error("Class id and tag should be string.");
        this.class_id = id;
        this.instance_tag = instancetag;
        if (typeof default_value === "number") {
            this.defaultValue = default_value;
        } else {
            this.defaultValue = 0;
        }
        CoreController.addElement(this);

        /**
         * @type function
         * @return number
         */
        this.calculate = () => {
        };
        /** @type [BaseModifier] */
        this.modifiers = [];
        this.result = 0;

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

    recalculateTree() {
        this.recalculate();
        this.dependents.forEach(dependent => this.recalculateTree());
    }
}