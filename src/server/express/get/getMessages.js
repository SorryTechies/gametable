/**
 * Created by LastBerserk on 26.01.2019.
 */

const MessageDB = require('../../parse/queries/MessageDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/loadMessages', async (req, res) => {
    try {
        const user = req.access;
        const result = await MessageDB.findMessages(user);
        let answer = [];
        result.forEach(item => {
            answer.push({
                timestamp: item.createdAt,
                content: item.content,
                sender: item.sender.username,
            });
        });
        return res.json(answer);
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});