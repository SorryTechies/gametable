/**
 * Created by LastBerserk on 25.01.2019.
 */

const config = require('../../common/config');

module.exports = {
    SERVER_PORT: config.SERVER_PORT,
    WSS_PORT: config.WSS_PORT,

    PARSE_PORT: 1337,
    PARSE_PATH: '/parse',
    PARSE_PROTOCOL: 'http',
    PARSE_ID: 'GameTable',

    PARSE_MK: 'parse-mk-123'
};