/**
 * Created by LastBerserk on 17.01.2020.
 */

export default class RuleBuff {
    constructor(key) {
        if (!key) throw new Error("No buff key provided.");
        this.key = key;
        this.onCreate = RuleBuff.EMPTY_FUNCTION;
        this.onTurn = RuleBuff.EMPTY_FUNCTION;
        this.onEnd = RuleBuff.EMPTY_FUNCTION;
        this.onRenew = RuleBuff.EMPTY_FUNCTION;
        this.dispellable = false;
        this.duration = -1;
        this.additional1 = undefined;
        this.additional2 = undefined;
        this.targetId = null;


        this.effects = [];
        /** @type RuleGameObject */
        this.gameObject = null;
    }

    setTarget(gameObject) {
        if (!gameObject) throw new Error("No target id provided.");
        this.targetId = gameObject.id;
        this.gameObject = gameObject;
    }

    /**
     * @param {boolean} doRemove
     * @return {BuffBean}
     */
    toJson(doRemove) {
        return {
            key: this.key,
            duration: doRemove? 0 : this.duration,
            additional1: this.additional1,
            additional2: this.additional2,
            targetId: this.targetId
        };
    }

    /**
     * @param {BuffBean} json
     * @param {RuleGameObject} obj
     * @return {RuleBuff}
     */
    static fromJson(json, obj) {
        const buff = new RuleBuff(json.key);
        buff.duration = typeof json.duration === "number" ? json.duration : -1;
        buff.additional1 = json.additional1;
        buff.additional2 = json.additional2;
        buff.setTarget(obj);
        return buff;
    }

}

RuleBuff.EMPTY_FUNCTION = () => {};