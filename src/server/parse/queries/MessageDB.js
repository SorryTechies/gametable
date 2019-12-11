/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Message = require("../classes/Message");

module.exports.findMessages = access =>
    new Parse.Query(Message)
        .equalTo(Message.RECEIVER_FIELD, access.toPointer())
        .include(Message.SENDER_FIELD)
        .include(Message.RECEIVER_FIELD)
        .find({useMasterKey: true});