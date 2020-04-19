/**
 * Created by LastBerserk on 18.03.2020.
 */

export default class BadArgumentsError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadArgumentsError";
    }
}