/**
 * Created by LastBerserk on 15.12.2019.
 */

export default class SkillBean {
    constructor() {
        this.values = {};
        this.ranks = {};
        this.isClassSkill = {};
    }

    toJson() {
        return Object.keys(this.values).reduce((acc, key) => {
            acc[key] = {
                value: this.values[key],
                ranks: this.ranks[key]
            };
            return acc;
        }, {});
    }
}

SkillBean.fromJson = json => {
    const bean = new SkillBean();
    Object.keys(json).forEach(key => {
        bean.values[key] = json[key].value;
        bean.ranks[key] = json[key].ranks;
    });
    return bean;
};