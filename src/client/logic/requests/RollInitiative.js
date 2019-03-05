/**
 * Created by LastBerserk on 17.02.2019.
 */

import NormalRequest from "../NormalRequest";
/**
 * Post on server your initiative result.
 */
export default class RollInitiative extends NormalRequest {
    constructor() {
        super();
        this.path = '/rollInitiative';
        this.method = 'POST';
    }

    /**
     * @param {int} initiative
     * @return {Promise.<null>}
     */
    send(initiative) {
        return super.send({initiative: initiative});
    }
}