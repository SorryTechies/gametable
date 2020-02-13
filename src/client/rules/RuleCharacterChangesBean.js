/**
 * Created by LastBerserk on 11.02.2020.
 */

/** @typedef {Array<{id: string, mod: {}}>} RuleCharacterChangesBeanSup */

/** @type {RuleCharacterChangesBeanSup} */
let beans = [];

function addNewBean(id) {
    const bean = {id: id, mod: {}};
    beans.push(bean);
    return bean;
}

export default class RuleCharacterChangesBean {
    static addModification(id, key, val) {
        let bean = beans.find(bean => bean.id === id);
        if (!bean) bean = addNewBean(id);
        bean.mod[key] = val;
    }

    static addDataModification(id, key, val) {
        let bean = beans.find(bean => bean.id === id);
        if (!bean) bean = addNewBean(id);
        if (!bean.mod.data) bean.mod.data = {};
        bean.mod.data[key] = val;
    }

    static initFromJson(json) {
        if (!Array.isArray(json)) throw new Error("Cannot create rule character bean.");
        beans = json;
    }

    static beansToJson() {
        return beans;
    }

    static init() {
        beans = [];
    }
}