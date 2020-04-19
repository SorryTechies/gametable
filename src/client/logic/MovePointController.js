/**
 * Created by LastBerserk on 23.02.2020.
 */

export default class MovePointController {
    constructor(obj) {
        this.gameObject = obj;
        this.points = [];
    }

    setStartingPoint(position) {
        if (this.points.length === 0) {
            this.points.push(position);
        } else {
            this.points[0] = position;
        }
    }

    reset() {
        this.points = [];
    }

    add(position) {
        this.points.push(position);
    }

    remove(position) {
        const index = this.points.findIndex(obj => obj.x === position.x && obj.y === position.y);
        if (index !== -1) this.points.splice(index, 1);
    }

    getFinalPoint() {
        if (this.points.length === 0) throw new Error("No position provided.");
        return this.points[this.points.length - 1];
    }

    isInFinalPosition(point) {
        return this.getFinalPoint().x === point.x && this.getFinalPoint().y === point.y;
    }
}