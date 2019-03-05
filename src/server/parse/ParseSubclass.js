/**
 * Created by LastBerserk on 25.01.2019.
 */

const Parse = require('./ParseInit').getParse();

class ParseSubclass extends Parse.Object {
    save() {
        return super.save(null, ParseSubclass.USE_MK);
    }

    destroy() {
        return super.destroy(ParseSubclass.USE_MK);
    }

    toPointer() {
        return super.toPointer();
    }
}

ParseSubclass.USE_MK = {useMasterKey: true};

module.exports = ParseSubclass;