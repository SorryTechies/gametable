/**
 * Created by LastBerserk on 27.01.2019.
 */

const CombatMap = require("../parse/classes/CombatMap");

const aPost = new CombatMap();
aPost.gridX = 10;
aPost.gridY = 10;
aPost.img = "https://db4sgowjqfwig.cloudfront.net/campaigns/60587/assets/364601/Feldgrau_Map_1000x636.jpg?1409508274";
aPost.save();

module.exports = {
    map: map
};