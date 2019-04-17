/**
 * Created by LastBerserk on 10.04.2019.
 */

let basic = {};
let categoryPriorities = {};
export default class CoreController {
    static addElement(instance) {
        if (!basic[instance.class_id]) {
            basic[instance.class_id] = {};
            categoryPriorities[instance.class_id] = -1;
        }
        basic[instance.class_id][instance.instance_tag] = instance;
    }

    static recalculateWithPriority(number) {
        for (let categoryName in basic) {
            const category = basic[categoryName];
            if (categoryPriorities[categoryName] === number) {
                for (let tag in category) {
                    category[tag].recalculate();
                }
            } else {
                if (categoryPriorities[categoryName] === -1) {
                    for (let tag in category) {
                        if (category[tag].priority === number) category[tag].recalculate();
                    }
                }
            }
        }
    }

    static recalculateAll() {
        for (let priority = 0; priority < 10; priority++) {
            this.recalculateWithPriority(priority);
        }
        console.log(basic);
    }

    static setPriorityForCategory(category, priority) {
        categoryPriorities[category] = priority;
    }

    /**
     * @param {string} class_id
     * @param {string} tag
     * @return BaseElement
     */
    static getDependency(class_id, tag) {
        if (!basic[class_id]) return null;
        return basic[class_id][tag];
    }
}