/**
 * Created by LastBerserk on 17.02.2019.
 */

import NormalRequest from "../NormalRequest";
/**
 * Set your initiative for combat object.
 */
export default class SetInitiativeRequest extends NormalRequest {
    constructor() {
        super();
        this.path = '/setInitiative';
        this.method = 'POST';
    }

    /**
     * @param {string} id
     * @param {int} initiative
     * @return {Promise.<null>}
     */
    send(id, initiative) {
        return super.send({id: id, initiative: initiative});
    }
}