/**
 * Created by LastBerserk on 11.12.2019.
 */

import NormalRequest from "../NormalRequest";

/**
 * Send lock state request to server.
 */
export default class PostRollRequest extends NormalRequest {
    constructor() {
        super();
        this.path = '/postRollResult';
        this.method = 'POST';
    }

    /**
     * @param {string} description
     * @param {number} result
     * @param {number} rawResult
     * @return Promise
     */
    send(description, result, rawResult) {
        return super.send({
            description: description,
            result: result,
            rawResult: rawResult
        });
    }
}