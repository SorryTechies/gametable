/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Access = require("../classes/Access");
module.exports.getUser = (username) =>
    new Parse.Query(Access.CLASS_NAME).equalTo(Access.USER_NAME_FIELD, username).first({useMasterKey: true});
