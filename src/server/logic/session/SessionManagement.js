/**
 * Created by LastBerserk on 01.02.2020.
 */

/** @type {Array.<SessionManagement>} */
const arr = [];

export default class SessionManagement {
    constructor(session) {
        if (!session) throw new Error("No session provided.");
        /** @type {GameSession} */
        this.session = session;
        /** @type {Array.<SessionAction>} */
        this.actions = [];
    }

    /** @param {SessionAction} sessionAction */
    add(sessionAction) {
        this.actions.push(sessionAction);
    }

    /** @return {Array.<SessionAction>} */
    getAll() {
        return this.actions;
    }

    /** @return {Array.<SessionAction>} */
    getForPlayer() {
        return this.actions.filter(action => !action.hidden);
    }

    /** @return {SessionManagement} */
    static findBySession(session) {
        return arr.find(item => item.session._id === session._id);
    }

    /** @return {SessionManagement} */
    static register(session) {
        if (!session) throw new Error("No session provided.");
        let obj = SessionManagement.findBySession(session);
        if (!obj) obj = new SessionManagement(session);
        return obj;
    }

    static unregister(session) {
        if (!session) throw new Error("No session provided.");
        const index = arr.findIndex(item => item.session._id === session._id);
        if (index === -1) return;
        arr.splice(index, 1);
    }
}