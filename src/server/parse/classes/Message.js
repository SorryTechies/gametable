/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class Message extends ParseSubclass {
    constructor() {
        super(Message.CLASS_NAME);
    }

    /** @return {string} */
    get content() {
        return this.get(Message.CONTENT_FIELD)
    }

    /** @param {string} content */
    set content(content) {
        this.set(Message.CONTENT_FIELD, content)
    }

    /** @return {Access} */
    get sender() {
        return this.get(Message.SENDER_FIELD)
    }

    /** @param {Access} sender */
    set sender(sender) {
        this.set(Message.SENDER_FIELD, sender)
    }

    /** @return {Array} */
    get receiver() {
        return this.get(Message.RECEIVER_FIELD)
    }

    /** @param {Array} receiver */
    set receiver(receiver) {
        this.set(Message.RECEIVER_FIELD, receiver)
    }
}

Message.CLASS_NAME = 'Message';
Message.CONTENT_FIELD = 'content';
Message.SENDER_FIELD = 'sender';
Message.RECEIVER_FIELD = 'receiver';

module.exports = Message;