/**
 * Created by LastBerserk on 10.04.2019.
 */

let basic = {};
/** @type [BaseElement] */
let hierarchy = [];
export default class CoreController {
    static addElement(instance) {
        if (!basic[instance.class_id]) basic[instance.class_id] = {};
        basic[instance.class_id][instance.instance_tag] = instance;
    }

    static addToRoot(instance) {
        hierarchy.push(instance);
    }

    static recalculateAll() {
        hierarchy.forEach(item => item.updateChildren());
    }

    /**
     * @param {string} class_id
     * @param {string} tag
     * @return BaseElement
     */
    static getDependency(class_id, tag) {
        if (typeof basic[class_id] !== "number") return null;
        if (typeof basic[class_id][tag] !== "number") return null;
        return basic[class_id][tag];
    }
}