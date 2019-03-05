/**
 * Created by LastBerserk on 26.01.2019.
 */

const MessageDB = require('../../parse/queries/MessageDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/loadMessages', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    MessageDB.findMessages(user)
        .then(result => {
            let answer = [];
            result.forEach(item => {
                answer.push({
                    timestamp: item.createdAt,
                    content: item.content,
                    sender: item.sender.username,
                });
            });
            return res.json(answer);
        })
        .catch((e) => error.send(e))
});