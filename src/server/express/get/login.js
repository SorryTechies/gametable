/**
 * Created by LastBerserk on 26.01.2019.
 */

require('../../logic/express').getServerExpress().get('/login', (req, res) => res.json({isDM: req.access.isDM}));