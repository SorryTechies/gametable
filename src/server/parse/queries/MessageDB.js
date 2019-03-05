/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Message = require("../classes/Message");

module.exports.findMessages = async (access) => {
    const q1 = new Parse.Query(Message).equalTo(Message.RECEIVER_FIELD, access.toPointer())
        .include(Message.SENDER_FIELD).include(Message.RECEIVER_FIELD).find({useMasterKey: true});
    const q2 = new Parse.Query(Message).equalTo(Message.SENDER_FIELD, access)
        .include(Message.SENDER_FIELD).include(Message.RECEIVER_FIELD).find({useMasterKey: true});
    const result = await Promise.all([q1,q2]);
    return result[0].concat(result[1]);
};