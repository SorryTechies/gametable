/**
 * Created by LastBerserk on 11.04.2020.
 */

import RulePoint from "./RulePoint";

function isInRange(center, radius, point) {
    return (center.x - radius <= point.x) &&
        (center.x + radius >= point.x) &&
        (center.y - radius <= point.y) &&
        (center.y + radius >= point.y)
}

export default class RuleArea {
    constructor() {
        this.center = new RulePoint();
        this.excluded = [];
        this.included = [];
        this.radius = 0;
    }

    /**
     * Checks is point in square area
     * @param {RulePoint} point
     * @return {boolean}
     */
    isInArea(point) {
        if (point.equal(this.center)) return true;
        if (isInRange(this.center, this.radius, point)) {
            return !this.excluded.find(p2 => p2.equal(point));
        } else {
            return !!this.included.find(p2 => p2.equal(point));
        }
    }
}