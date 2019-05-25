/**
 * Created by LastBerserk on 25.05.2019.
 */

import StatElement from "../logic/core/stat/StatElement";
import * as PFCoreConstants from "../../common/PFCoreConstants";
import StatModifierElement from "../logic/core/stat/StatModifierElement";
import SkillProficiency from "../logic/core/skill/SkillProficiency";
import SkillPoints from "../logic/core/skill/SkillPoints";
import SkillElement from "../logic/core/skill/SkillElement";
import SaveElement from "../logic/core/SaveElement";
import AdditionalElement from "../logic/core/AdditionalElement";
import ArmorRatingsElement from "../logic/core/armor/ArmorRatingsElement";

function classSkillToString(isClassSkill) {
    return isClassSkill > 0 ? "X" : ""
}

function classPointsToString(points) {
    return points > 0 ? points : ""
}

export default class PFDataUtils {
    static getStats(character) {
        return [['Strength',
            character.getValue(StatElement.category, PFCoreConstants.STATS.STR),
            character.getValue(StatModifierElement.category, PFCoreConstants.STATS.STR)],
            ['Dexterity',
                character.getValue(StatElement.category, PFCoreConstants.STATS.DEX),
                character.getValue(StatModifierElement.category, PFCoreConstants.STATS.DEX)],
            ['Constitution',
                character.getValue(StatElement.category, PFCoreConstants.STATS.CON),
                character.getValue(StatModifierElement.category, PFCoreConstants.STATS.CON)],
            ['Intelligence',
                character.getValue(StatElement.category, PFCoreConstants.STATS.INT),
                character.getValue(StatModifierElement.category, PFCoreConstants.STATS.INT)],
            ['Wisdom',
                character.getValue(StatElement.category, PFCoreConstants.STATS.WIS),
                character.getValue(StatModifierElement.category, PFCoreConstants.STATS.WIS)],
            ['Charisma',
                character.getValue(StatElement.category, PFCoreConstants.STATS.CHA),
                character.getValue(StatModifierElement.category, PFCoreConstants.STATS.CHA)]];
    }

    static getAdditionals(character) {
        return [
            ['Initiative', character.getValue(AdditionalElement.category, PFCoreConstants.ADDITIONALS.INITIATIVE)],
            ['Base Attack Bonus', character.getValue(AdditionalElement.category, PFCoreConstants.ADDITIONALS.BASE_ATTACK_BONUS)]
        ];
    }

    static getDefense(character ) {
        return [['Combat Maneuver Bonus', character.getValue(AdditionalElement.category, PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_BONUS)],
            ['Combat Maneuver Defense', character.getValue(AdditionalElement.category, PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_DEFENSE)],
            ['Armor Class', character.getValue(ArmorRatingsElement.category, PFCoreConstants.ARMOR_RATING.FULL)],
            ['Flat Footed', character.getValue(ArmorRatingsElement.category, PFCoreConstants.ARMOR_RATING.FLAT_FOOTED)],
            ['Touch', character.getValue(ArmorRatingsElement.category, PFCoreConstants.ARMOR_RATING.TOUCH)],
            ['Flat Touch', character.getValue(ArmorRatingsElement.category, PFCoreConstants.ARMOR_RATING.FLAT_TOUCH)]];
    }

    static getSaves(character) {
        return [
            ['Fortitude',
                character.getValue(SaveElement.category, PFCoreConstants.SAVES.FORTITUDE)],
            ['Reflex',
                character.getValue(SaveElement.category, PFCoreConstants.SAVES.REFLEX)],
            ['Will',
                character.getValue(SaveElement.category, PFCoreConstants.SAVES.WILL)]
        ];
    }

    static getSkills(character) {
        const getSkillSafe = (name, tag) =>
            [
                name,
                classSkillToString(character.getValue(SkillProficiency.category, tag)),
                classPointsToString(character.getValue(SkillPoints.category, tag)),
                character.getValue(SkillElement.category, tag)
        ];
        return [
            ['Name', 'Class Skill', 'Points', 'Value'],
            getSkillSafe('Acrobatics', PFCoreConstants.SKILLS.ACROBATICS),
            getSkillSafe('Appraise', PFCoreConstants.SKILLS.APPRISE),
            getSkillSafe('Bluff', PFCoreConstants.SKILLS.BLUFF),
            getSkillSafe('Climb', PFCoreConstants.SKILLS.CLIMB),
            getSkillSafe('Craft', PFCoreConstants.SKILLS.CRAFT),
            getSkillSafe('Diplomacy', PFCoreConstants.SKILLS.DIPLOMACY),
            getSkillSafe('Disable Device', PFCoreConstants.SKILLS.DISABLE_DEVICE),
            getSkillSafe('Disguise', PFCoreConstants.SKILLS.DISGUISE),
            getSkillSafe('Escape Artist', PFCoreConstants.SKILLS.ESCAPE_ARTIST),
            getSkillSafe('Fly',  PFCoreConstants.SKILLS.FLY),
            getSkillSafe('Heal', PFCoreConstants.SKILLS.HEAL),
            getSkillSafe('Intimidate',  PFCoreConstants.SKILLS.INTIMIDATE),
            getSkillSafe('Knowledge Arcana',  PFCoreConstants.SKILLS.KNOWLEDGE_ARCANA),
            getSkillSafe('Knowledge Dungeneering',  PFCoreConstants.SKILLS.KNOWLEDGE_DUNGEONEERING),
            getSkillSafe('Knowledge Engineering',  PFCoreConstants.SKILLS.KNOWLEDGE_ENGINEERING),
            getSkillSafe('Knowledge Local', PFCoreConstants.SKILLS.KNOWLEDGE_LOCAL),
            getSkillSafe('Knowledge Nature',  PFCoreConstants.SKILLS.KNOWLEDGE_NATURE),
            getSkillSafe('Knowledge Planes',  PFCoreConstants.SKILLS.KNOWLEDGE_PLANES),
            getSkillSafe('Knowledge Religion',  PFCoreConstants.SKILLS.KNOWLEDGE_RELIGION),
            getSkillSafe('Linguistics',  PFCoreConstants.SKILLS.LINGUISTICS),
            getSkillSafe('Perception',  PFCoreConstants.SKILLS.PERCEPTION),
            getSkillSafe('Perform', PFCoreConstants.SKILLS.PERFORM),
            getSkillSafe('Ride',  PFCoreConstants.SKILLS.RIDE),
            getSkillSafe('Sense Motive',  PFCoreConstants.SKILLS.SENSE_MOTIVE),
            getSkillSafe('Sleight of Hand',  PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS),
            getSkillSafe('Spellcraft',  PFCoreConstants.SKILLS.SPELLCRAFT),
            getSkillSafe('Stealth',  PFCoreConstants.SKILLS.STEALTH),
            getSkillSafe('Survival',  PFCoreConstants.SKILLS.SURVIVAL),
            getSkillSafe('Swim',  PFCoreConstants.SKILLS.SWIM),
            getSkillSafe('Use Magic Device',  PFCoreConstants.SKILLS.USE_MAGIC_DEVICE)
        ]
    }
}