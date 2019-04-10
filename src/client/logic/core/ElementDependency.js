/**
 * Created by LastBerserk on 10.04.2019.
 */

export default class ElementDependency {
    constructor(classID, tag, func) {
        if (!classID || !tag) throw Error('ClassID or tag does not exist.');
        this.classID = classID;
        this.tag = tag;
        if (typeof func === "function") {
            this.func = func;
        } else {
            this.func = (value1, value2) => value1 + value2;
        }
    }
}