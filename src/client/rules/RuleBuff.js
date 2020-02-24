/**
 * Created by LastBerserk on 17.01.2020.
 */

export default class RuleBuff {
    constructor(key) {
        this.onCreate = RuleBuff.EMPTY_FUNCTION;
        this.onTurn = RuleBuff.EMPTY_FUNCTION;
        this.onEnd = RuleBuff.EMPTY_FUNCTION;
        this.onRenew = RuleBuff.DEFAULT_ON_RENEW;
        this.duration = -1;
        this.timer = 0;
        this.key = key;
        this.gameObject = null;
    }
}

RuleBuff.EMPTY_FUNCTION = () => {};
RuleBuff.DEFAULT_ON_RENEW = () => {
    if (this.duration !== -1) this.duration += this.timer;
};