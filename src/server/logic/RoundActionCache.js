/**
 * Created by LastBerserk on 11.02.2020.
 */

/** @type {Array<{id: string, actions: Array<RuleAction>, timeout: number}>} */
const data = [];

const DEFAULT_CLEANUP_TIMEOUT = 60 * 60 * 1000;

function initCleanupFunction(obj) {
    clearTimeout(obj.timeout);
    obj.timeout = setTimeout(() => {
        const dataIndex = data.findIndex(d => d.id.equals(obj.id));
        if (dataIndex !== -1) data.splice(dataIndex, 1);
    }, DEFAULT_CLEANUP_TIMEOUT);
}

export default class RoundActionCache {
    static storeAction(sessionId, actionData) {
        let obj = data.find(obj => obj.id.equals(sessionId));
        if (obj) {
            obj.actions.push(actionData);
        } else {
            obj = {
                id: sessionId,
                actions: [actionData]
            };
            data.push(obj);
        }
        initCleanupFunction(obj);
    }

    static removeAction(sessionId, actionData) {
        const obj = data.find(obj => obj.id.equals(sessionId));
        if (!obj) return;
        const actionIndex = obj.actions.findIndex(action => action.id === actionData.id);
        if (actionIndex !== -1) obj.actions.splice(actionIndex, 1);
        initCleanupFunction(obj);
    }

    static getActions(sessionId) {
        const obj = data.find(obj => obj.id.equals(sessionId));
        if (obj) {
            initCleanupFunction(obj);
            return obj.actions;
        } else {
            return [];
        }
    }

    static clearRound(sessionId) {
        const obj = data.find(obj => obj.id.equals(sessionId));
        if (obj) {
            initCleanupFunction(obj);
            obj.actions = [];
        }
    }
}