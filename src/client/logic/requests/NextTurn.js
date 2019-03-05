/**
 * Created by LastBerserk on 17.02.2019.
 */

import NormalRequest from "../NormalRequest";
/**
 * Send lock state request to server.
 */
export default class NextTurn extends NormalRequest {
    constructor() {
        super();
        this.path = '/nextTurn';
        this.method = 'POST';
    }

    /**
     * @return {Promise.<null>}
     */
    send() {
        return super.send({});
    }
}