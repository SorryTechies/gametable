/**
 * Created by LastBerserk on 10.04.2019.
 */

let core = {};
export default class CoreController {
    static addElement(instance) {
        if (!instance.getID() || !instance.getInstanceTag()) throw Error("Instance font have class id or tag.");
        if (!core[instance.getID()]) core[instance.getID()] = {};
        core[instance.getID()][instance.getInstanceTag()] = instance;
    }

    static recalculateDependents(classID, tag) {
        /** @type BaseElement */
        const instance = core[classID][tag];
        if (instance.getDependencies().length === 0) instance.setResult(instance.getDefaultValue());
        instance.getDependencies().forEach(item => {
            const dependency = core[item.classID][item.tag];
            if (dependency) {
                dependency.setResult(item.func(dependency.getCalculatedValue(), instance.getCalculatedValue()));
            }
        });
    }

    static recalculateDependencies(classID, tag) {
        /** @type BaseElement */
        const instance = core[classID][tag];
        if (instance.getDependents().length === 0) instance.setResult(instance.getDefaultValue());
        instance.getDependents().forEach(item => {
            const dependency = core[item.classID][item.tag];
            if (dependency) {
                instance.setResult(item.func(dependency.getCalculatedValue(), instance.getCalculatedValue()));
            }
        });
    }

    static recalculateAll() {
        for (let classID in core) {
            if (core.hasOwnProperty(classID)) {
                const classes = core[classID];
                for (let tag in classes) {
                    if (classes.hasOwnProperty(tag)) {
                        this.recalculateDependencies(classID, tag);
                        this.recalculateDependents(classID, tag);
                    }
                }
            }
        }
    }
}