/**
 * Created by LastBerserk on 09.03.2020.
 */

export default class RuleItem {
    constructor(key) {
        if (!key) throw new Error("No key for item provided.");
        this.key = key;
        this.weight = 1;
        this.hardeness = 0;
        this.isArmor = false;
        this.isWeapon = false;
        this.isShield = false;
        this.isRanged = false;

        this.health = 1;
    }

    toJson() {
        return {
            key: this.key,
            health: this.health,
        };
    }

    static fromJson(json) {
       const item = new RuleItem(json.key);
       item.health = json.health;
       return item;
    }
}