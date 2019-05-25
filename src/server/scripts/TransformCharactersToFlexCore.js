/**
 * Created by LastBerserk on 28.04.2019.
 */

const Parse = require('../parse/ParseInit').getParse();
const Characters = require('../parse/classes/Character');
const PFCoreConstants = require('../../common/PFCoreConstants');

function createCore(tag, category, value) {
    if (!value) return;
    /** @type CharacterCoreT */
    const core = {};
    core.category = category;
    core.tag = tag;
    core.value = value;
    return core;
}

(async () => {
    const characters = await new Parse.Query(Characters)
        .find({useMasterKey: true});
    for (let i = 0; i < characters.length; i++) {
        const core = [];
        const safePush = value => {
            if (value) core.push(value);
        };
        const createSkill = (skillName, skillObject) => {
            if (skillObject) {
                safePush(createCore(skillName, PFCoreConstants.SKILLS.CATEGORY, skillObject.modifier));
                safePush(createCore(skillName, PFCoreConstants.SKILLS.PROFICIENCY, skillObject.classSkill ? 1 : 0));
                safePush(createCore(skillName, PFCoreConstants.SKILLS.POINTS, skillObject.points));
            }
        };
        const modifiers = [];
        /** @type Character */
        const character = characters[i];
        /** @type CharacterDataT */
        const data = character.data;
        if (data) {
            safePush(createCore(PFCoreConstants.STATS.STR, PFCoreConstants.STATS.CATEGORY, data.stats.strength));
            safePush(createCore(PFCoreConstants.STATS.DEX, PFCoreConstants.STATS.CATEGORY, data.stats.dexterity));
            safePush(createCore(PFCoreConstants.STATS.CON, PFCoreConstants.STATS.CATEGORY, data.stats.constitution));
            safePush(createCore(PFCoreConstants.STATS.WIS, PFCoreConstants.STATS.CATEGORY, data.stats.wisdom));
            safePush(createCore(PFCoreConstants.STATS.INT, PFCoreConstants.STATS.CATEGORY, data.stats.intelligence));
            safePush(createCore(PFCoreConstants.STATS.CHA, PFCoreConstants.STATS.CATEGORY, data.stats.charisma));

            createSkill(PFCoreConstants.SKILLS.APPRISE, data.skills.appraise);
            createSkill(PFCoreConstants.SKILLS.ACROBATICS, data.skills.acrobatics);
            createSkill(PFCoreConstants.SKILLS.BLUFF, data.skills.bluff);
            createSkill(PFCoreConstants.SKILLS.DIPLOMACY, data.skills.diplomacy);
            createSkill(PFCoreConstants.SKILLS.DISABLE_DEVICE, data.skills.disable_device);
            createSkill(PFCoreConstants.SKILLS.DISGUISE, data.skills.disguise);
            createSkill(PFCoreConstants.SKILLS.ESCAPE_ARTIST, data.skills.escape_artist);
            createSkill(PFCoreConstants.SKILLS.FLY, data.skills.fly);
            createSkill(PFCoreConstants.SKILLS.HEAL, data.skills.heal);
            createSkill(PFCoreConstants.SKILLS.SENSE_MOTIVE, data.skills.sense_motive);
            createSkill(PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS, data.skills.sleight_of_hand);
            createSkill(PFCoreConstants.SKILLS.SPELLCRAFT, data.skills.spellcraft);
            createSkill(PFCoreConstants.SKILLS.SWIM, data.skills.swim);
            createSkill(PFCoreConstants.SKILLS.STEALTH, data.skills.stealth);
            createSkill(PFCoreConstants.SKILLS.SURVIVAL, data.skills.survival);
            createSkill(PFCoreConstants.SKILLS.USE_MAGIC_DEVICE, data.skills.use_magic_device);
            createSkill(PFCoreConstants.SKILLS.PERCEPTION, data.skills.perception);
            createSkill(PFCoreConstants.SKILLS.PERFORM, data.skills.perform);
            createSkill(PFCoreConstants.SKILLS.LINGUISTICS, data.skills.linguistics);
            createSkill(PFCoreConstants.SKILLS.RIDE, data.skills.ride);

            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_ARCANA, data.skills.knowledge_arcana);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_DUNGEONEERING, data.skills.knowledge_dungeneering);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_RELIGION, data.skills.knowledge_religion);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_ENGINEERING, data.skills.knowledge_engineering);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_LOCAL, data.skills.knowledge_local);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_NATURE, data.skills.knowledge_nature);
            createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_PLANES, data.skills.knowledge_planes);

            safePush(createCore(PFCoreConstants.SAVES.FORTITUDE, PFCoreConstants.SAVES.CATEGORY, data.saves.fortitude));
            safePush(createCore(PFCoreConstants.SAVES.REFLEX, PFCoreConstants.SAVES.CATEGORY, data.saves.reflex));
            safePush(createCore(PFCoreConstants.SAVES.WILL, PFCoreConstants.SAVES.CATEGORY, data.saves.will));

            safePush(createCore(PFCoreConstants.ADDITIONALS.BASE_ATTACK_BONUS, PFCoreConstants.ADDITIONALS.CATEGORY, data.attack_bonus));

            character.core = core;
            await character.save();
        }
    }
})().catch(e => console.error(e));