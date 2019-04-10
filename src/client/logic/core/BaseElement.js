/**
 * Created by LastBerserk on 10.04.2019.
 */

export default class BaseElement {
    constructor(id, instancetag, default_value) {
        const class_id = id;
        const instance_tag = instancetag;
        this.getID = () => class_id;
        this.getInstanceTag = () => instance_tag;
        let value;
        if (typeof default_value === "number") {
            value = default_value;
        } else {
            value = 0;
        }
        let result = 0;
        let dependencies = [];
        let dependents = [];
        this.addDependency = dependency => {
            if (dependencies.find(item =>
                item.getID() === dependency.getID() && item.getInstanceTag() === dependency.getInstanceTag()))
                dependencies.push(dependency);
        };
        this.addDependent = dependency => {
            if (dependents.find(item =>
                item.getID() === dependency.getID() && item.getInstanceTag() === dependency.getInstanceTag()))
                dependents.push(dependency);
        };
        /**
         * @type function
         * @return [ElementDependency]
         */
        this.getDependencies = () => dependencies;
        /**
         * @type function
         * @return [ElementDependency]
         */
        this.getDependents = () => dependents;
        this.setResult = newValue => result = newValue;
        this.getDefaultValue = value;
        this.getCalculatedValue = result;
    }
}