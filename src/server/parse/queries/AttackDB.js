/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Attack = require("../classes/Attack");

module.exports.loadAttacks = (attacks) =>
    new Parse.Query(Attack).containedIn("objectId", attacks).find({useMasterKey: true});