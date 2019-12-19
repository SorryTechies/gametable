/**
 * Created by LastBerserk on 28.04.2019.
 */

const config = require('../config/serverConfig');
const Parse = require('parse/node').Parse;
const ParseInit = require('../parse/ParseInit');
ParseInit.init(Parse, `${config.PARSE_PROTOCOL}://localhost:${config.PARSE_PORT}${config.PARSE_PATH}`);
const Characters = require('../parse/classes/Character');

(async () => {
    const characters = await new Parse.Query(Characters).find({useMasterKey: true});
    for (let i = 0; i < characters.length; i++) {
        const skills = characters[i].skills;
        Object.keys(skills).forEach(key => skills[key] = {
            value: skills[key],
            ranks: 0,
            trained: false
        });
        await characters[i].save();
    }
})().catch(console.error);