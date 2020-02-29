/**
 * Created by LastBerserk on 11.02.2020.
 */

/** @typedef {Array<{id: string, mod: {data: {}, buffs: {}}}>} RuleCharacterChangesBeanSup */

/** @type {RuleCharacterChangesBeanSup} */
let beans = [];

function addNewBean(id) {
    const bean = {id: id, mod: {}};
    beans.push(bean);
    return bean;
}

function getOrCreateBean(id) {
    let bean = beans.find(bean => bean.id === id);
    if (!bean) bean = addNewBean(id);
    return bean;
}

export default class RuleCharacterChangesBean {
    static addModification(id, key, val) {
        getOrCreateBean(id).mod[key] = val;
    }

    static addDataModification(id, key, val) {
        const bean = getOrCreateBean(id);
        if (!bean.mod.data) bean.mod.data = {};
        if (typeof bean.mod.data[key] === "number") {
            bean.mod.data[key] += val;
        } else {
            bean.mod.data[key] = val;
        }
    }

    static addDataModificationInstantly(obj, key, val) {
        RuleCharacterChangesBean.addDataModification(obj.id, key, val);
        obj.addModification(key, val);
    }

    static addBuffModification(id, buff) {
        const bean = getOrCreateBean(id);
        if (!bean.mod.buffs) bean.mod.buffs = {};
        bean.mod.buffs[buff.key] = buff;
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