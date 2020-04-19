/**
 * Created by LastBerserk on 11.04.2020.
 */

import RuleArea from "./RuleArea";
import RuleConstants from "../constants/RuleStatConstants";
import RulePoint from "./RulePoint";

function createPoints(arr, center) {
    return mirror(arr).map(point => {
        const p = new RulePoint();
        p.x = point[0];
        p.y = point[1];
        p.add(center);
        return p;
    });
}

function mirror(arr) {
    return arr.reduce((acc, p) => {
        acc.push(p);
        acc.push([p[0], -p[1]]);
        acc.push([-p[0], p[1]]);
        acc.push([-p[0], -p[1]]);
        if (Math.abs(p[0]) !== Math.abs(p[1])) {
            acc.push([p[1], p[0]]);
            acc.push([p[1], -p[0]]);
            acc.push([-p[1], p[0]]);
            acc.push([-p[1], -p[0]]);
        }
        return acc;
    }, []);
}

function adjustForReach(obj, reach) {
    if (reach) {
        obj.radius = (obj.size + 1) * 2;
    } else {
        obj.radius = (obj.size + 1);
    }
    switch (obj.size) {
        case 1:
            if (reach) this.excluded = createPoints([[4, 4], [3, 4], [2, 4]], obj.center);
            break;
        case 2:
            // @formatter:off
            if (reach) {
                this.excluded = createPoints([
                    [6, 6], [5, 6], [4, 6], [3, 6], [2, 6],
                            [5, 5], [4, 5]
                ], obj.center);
            } else {
                this.excluded = createPoints([[3, 3], [2, 3]], obj.center);
            }
             // @formatter:on
            break;
        case 3:
            // @formatter:off
            if (reach) {
                this.excluded = createPoints([
                    [8, 8], [7, 8], [6, 8], [5, 8], [4, 8], [3, 8], [2, 8]
                            [7, 7], [6, 7], [5, 7], [4, 7],
                                    [6, 6]
                    ], obj.center);
            } else {
                this.excluded = createPoints([[4, 4], [3, 4], [2, 4]], obj.center);
            }
             // @formatter:on
            break;
        case 4:
            // @formatter:off
            if (reach) {
                this.excluded = createPoints([
                    [12, 12], [11, 12], [10, 12], [9, 12], [8, 12], [7, 12], [5, 12], [4, 12], [3, 12], [2, 12],
                              [11, 11], [10, 11], [9, 11], [8, 11], [7, 11], [6, 11], [5, 11],
                                        [10, 10], [9, 10], [8, 10], [7, 10],
                                                  [9,  9], [8,  9]
                    ], obj.center);
            } else {
                this.excluded = createPoints([
                    [6, 6], [5, 6], [4, 6], [3, 6], [2, 6],
                            [5, 5], [4, 5]
                ], obj.center);
            }
             // @formatter:on
            break;
    }
}

export default class RuleReach extends RuleArea {
    constructor(obj) {
        super();
        this.gameObject = obj;
        this.size = 0;
    }

    calculate(reach) {
        this.center = this.gameObject.movePoints.getFinalPoint();
        this.size = this.gameObject.get(RuleConstants.SIZE);
        if (this.size >= 0) adjustForReach(this, reach);
    }
}