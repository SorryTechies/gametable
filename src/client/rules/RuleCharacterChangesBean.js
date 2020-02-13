/**
 * Created by LastBerserk on 11.02.2020.
 */

/** @typedef {Array<{id: string, mod: {}}>} RuleCharacterChangesBeanSup */

/** @type {RuleCharacterChangesBeanSup} */
let beans = [];

export default class RuleCharacterChangesBean {
    static addModification(id, key, val) {
        const bean = beans.find(bean => bean.id === id);
        if (bean) bean.mod[key] = val;
    }

    static addDataModification(id, key, val) {
        const bean = beans.find(bean => bean.id === id);
        if (bean) bean.mod.data[key] = val;
    }

    static initFromJson(json) {
        if (!Array.isArray(json)) throw new Error("Cannot create rule character bean.");
        beans = json;
    }

    static beansToJson() {
        return JSON.stringify(beans);
    }

    static init() {
        beans = [];
    }
}