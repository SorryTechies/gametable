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
        const modifiers = [];
        /** @type Character */
        const character = characters[i];
        /** @type CharacterDataT */
        const data = character.data;
        if (data) {
            core.push(createCore(PFCoreConstants.STATS.STR, PFCoreConstants.STATS.CATEGORY, data.stats.strength));
            core.push(createCore(PFCoreConstants.STATS.DEX, PFCoreConstants.STATS.CATEGORY, data.stats.dexterity));
            core.push(createCore(PFCoreConstants.STATS.CON, PFCoreConstants.STATS.CATEGORY, data.stats.constitution));
            core.push(createCore(PFCoreConstants.STATS.WIS, PFCoreConstants.STATS.CATEGORY, data.stats.wisdom));
            core.push(createCore(PFCoreConstants.STATS.INT, PFCoreConstants.STATS.CATEGORY, data.stats.intelligence));
            core.push(createCore(PFCoreConstants.STATS.CHA, PFCoreConstants.STATS.CATEGORY, data.stats.charisma));

            core.push(createCore(PFCoreConstants.SKILLS.APPRISE, PFCoreConstants.SKILLS.CATEGORY, data.skills.appraise));
            core.push(createCore(PFCoreConstants.SKILLS.ACROBATICS, PFCoreConstants.SKILLS.CATEGORY, data.skills.acrobatics));
            core.push(createCore(PFCoreConstants.SKILLS.DIPLOMACY, PFCoreConstants.SKILLS.CATEGORY, data.skills.diplomacy));
            core.push(createCore(PFCoreConstants.SKILLS.FLY, PFCoreConstants.SKILLS.CATEGORY, data.skills.fly));
            core.push(createCore(PFCoreConstants.SKILLS.SENSE_MOTIVE, PFCoreConstants.SKILLS.CATEGORY, data.skills.sense_motive));
            core.push(createCore(PFCoreConstants.SKILLS.SPELLCRAFT, PFCoreConstants.SKILLS.CATEGORY, data.skills.spellcraft));
            core.push(createCore(PFCoreConstants.SKILLS.SWIM, PFCoreConstants.SKILLS.CATEGORY, data.skills.swim));
            core.push(createCore(PFCoreConstants.SKILLS.STEALTH, PFCoreConstants.SKILLS.CATEGORY, data.skills.stealth));
            core.push(createCore(PFCoreConstants.SKILLS.SURVIVAL, PFCoreConstants.SKILLS.CATEGORY, data.skills.survival));
            core.push(createCore(PFCoreConstants.SKILLS.USE_MAGIC_DEVICE, PFCoreConstants.SKILLS.CATEGORY, data.skills.use_magic_device));
            core.push(createCore(PFCoreConstants.SKILLS.PERCEPTION, PFCoreConstants.SKILLS.CATEGORY, data.skills.perception));
            core.push(createCore(PFCoreConstants.SKILLS.PERFORM, PFCoreConstants.SKILLS.CATEGORY, data.skills.perform));

            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_ARCANA, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_arcana));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_DUNGEONEERING, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_dungeneering));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_RELIGION, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_religion));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_ENGINEERING, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_engineering));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_LOCAL, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_local));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_NATURE, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_nature));
            core.push(createCore(PFCoreConstants.SKILLS.KNOWLEDGE_PLANES, PFCoreConstants.SKILLS.CATEGORY, data.skills.knowledge_planes));

            character.core = core;
            await character.save();
        }
    }
})().catch(e => console.error(e));