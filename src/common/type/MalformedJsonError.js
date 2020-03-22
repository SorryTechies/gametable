/**
 * Created by LastBerserk on 18.03.2020.
 */

export default class MalformedJsonError extends Error {
    constructor(message) {
        super(message);
        this.name = "MalformedJsonError";
    }
}