/**
 * Created by LastBerserk on 01.02.2020.
 */

export default class SessionAction {
    constructor(actionName) {
        if (!actionName) throw new Error("No action name provided.");
        this.actionName = actionName;
        this.hidden = false;
        this.target = null;
        this.caster = null;
        this.additional1 = null;
        this.additional2 = null;
    }

    /**
     * @param json
     * @return {SessionAction}
     */
    static fromJson(json) {
        const obj = new SessionAction(json.actionName);
        obj.hidden = json.hidden;
        obj.target = json.target;
        obj.caster = json.caster;
        obj.additional1 = json.additional1;
        obj.additional2 = json.additional2;
        return obj;
    }

    toJson() {
        return {
            hidden: this.hidden,
            actionName: this.actionName,
            target: this.target,
            caster: this.caster,
            additional1: this.additional1,
            additional2: this.additional2
        };
    }
}