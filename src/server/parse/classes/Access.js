/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class Access extends ParseSubclass {
    constructor() {
        super(Access.CLASS_NAME);
    }

    get username() {
        return this.get(Access.USER_NAME_FIELD)
    }

    set username(name) {
        this.set(Access.USER_NAME_FIELD, name)
    }

    /** @return {boolean} */
    get isDM() {
        return this.get(Access.IS_DM_FIELD)
    }

    /** @param {boolean} isDM */
    set isDM(isDM) {
        this.set(Access.IS_DM_FIELD, isDM)
    }
}

Access.CLASS_NAME = 'Access';
Access.USER_NAME_FIELD = 'username';
Access.IS_DM_FIELD = 'isDM';

module.exports = Access;