/**
 * Created by LastBerserk on 19.04.2020.
 */

import TERRAIN from "./TerrainType";
import BadArgumentsError from "../../../common/type/BadArgumentsError";

export default class MapGrid {
    constructor(x, y) {
        if (!x || !y) throw new Error("No size provided.");
        this.x = x;
        this.y = y;
        this.plainSize = x * y;
        this.grid = new Array(this.plainSize).fill(TERRAIN.PASSABLE);
    }

    xyToPlain(x, y) {
        if (typeof x !== "number" || typeof y !== "number") throw new BadArgumentsError();
        if (x >= this.x || x < 0 || y >= this.y || y < 0) throw new Error("Position is out of bounds.");
        return this.y * y + x;
    }

    plainToPosition(plain) {
        if (typeof plain !== "number") throw new BadArgumentsError();
        if (plain < 0 || plain >= this.plainSize) throw new Error("Position is out of bounds.");
        const mod = plain % this.y;
        const div = (plain - mod) / this.y;
        return {x: mod, y: div};
    }

    pathOk(arr, moveType) {
        return !arr.find(position => this.grid[this.xyToPlain(position.x, position.y)] !== TERRAIN.PASSABLE);
    }
}