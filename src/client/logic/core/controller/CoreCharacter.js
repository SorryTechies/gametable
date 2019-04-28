/**
 * Created by LastBerserk on 28.04.2019.
 */

export default class CoreCharacter {
    constructor() {
        this.stats = {};
        this.categoryPriorities = {};
    }

    addElement(instance) {
        if (!this.stats[instance.class_id]) {
            this.stats[instance.class_id] = {};
            this.categoryPriorities[instance.class_id] = -1;
        }
        this.stats[instance.class_id][instance.instance_tag] = instance;
    }

    recalculateWithPriority(number) {
        for (let categoryName in this.stats) {
            const category = this.stats[categoryName];
            if (this.categoryPriorities[categoryName] === number) {
                for (let tag in category) {
                    category[tag].recalculate();
                }
            } else {
                if (this.categoryPriorities[categoryName] === -1) {
                    for (let tag in category) {
                        if (category[tag].priority === number) category[tag].recalculate();
                    }
                }
            }
        }
    }

    recalculateAll() {
        for (let priority = 0; priority < 10; priority++) {
            this.recalculateWithPriority(priority);
        }
        console.log(this.stats);
    }

    setPriorityForCategory(category, priority) {
        this.categoryPriorities[category] = priority;
    }

    /**
     * @param {string} class_id
     * @param {string} tag
     * @return BaseElement
     */
    getDependency(class_id, tag) {
        if (!this.stats[class_id]) return null;
        return this.stats[class_id][tag];
    }
}