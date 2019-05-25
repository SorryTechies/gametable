/**
 * Created by LastBerserk on 28.04.2019.
 */

export default class CoreCharacter {
    constructor() {
        this.core = {};
        this.categoryPriorities = {};
        this.modifiers = {};
    }

    addElement(instance) {
        if (!this.core[instance.category]) {
            this.core[instance.category] = {};
            this.categoryPriorities[instance.category] = -1;
        }
        this.core[instance.category][instance.tag] = instance;
    }

    setCore(core) {
        console.log(core.category, core.tag);
        this.core[core.category][core.tag].defaultValue = core.value;
    }

    addModifier(modifiers) {

    }

    recalculateWithPriority(number) {
        for (let categoryName in this.core) {
            const category = this.core[categoryName];
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
        for (let priority = 0; priority <= 10; priority++) {
            this.recalculateWithPriority(priority);
        }
    }

    setPriorityForCategory(category, priority) {
        this.categoryPriorities[category] = priority;
    }

    /**
     * @param {string} category
     * @param {string} tag
     * @return BaseElement
     */
    getDependency(category, tag) {
        if (!this.core[category]) return null;
        return this.core[category][tag];
    }

    getValue(category, tag) {
        if (!this.core[category] ||
            !this.core[category][tag] ||
            typeof this.core[category][tag].result !== "number") return 0;
        return this.core[category][tag].result;
    }

    getCategory(name) {
        return this.core[name];
    }

    printCharacterData() {
        console.log(this.core);
        console.log(this.modifiers);
    }
}