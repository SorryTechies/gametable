/**
 * Created by LastBerserk on 04.03.2020.
 */

import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import SupportedLanguages from "./SupportedLanguages";

export default {
    [SupportedLanguages.ENG]: {
        [RuleFeatsConstants.AXE_TO_GRIND]: {
            name: "Axe to grind",
            description: "You gain a +1 trait bonus on damage against foes who are threatened by only you."
        },
        [RuleFeatsConstants.CARETAKER]: {
            name: "Caretaker",
            description: "You gain a +1 trait bonus on Heal checks, and Heal is always a class skill for you."
        },
        [RuleFeatsConstants.COMBAT_EXPERTISE]: {
            name: "Combat Expertise (Combat)",
            description: "You can choose to take a –1 penalty on melee attack rolls and combat maneuver checks to gain a +1 dodge bonus to your Armor Class. When your base attack bonus reaches +4, and every +4 thereafter, the penalty increases by –1 and the dodge bonus increases by +1. You can only choose to use this feat when you declare that you are making an attack or a full-attack action with a melee weapon. The effects of this feat last until your next turn."
             },
        [RuleFeatsConstants.IMPROVED_UNARMED_STRIKE]: {
            name: "Improved Unarmed Strike (Combat)",
            description: "Benefit: You are considered to be armed even when unarmed—you do not provoke attacks of opportunity when you attack foes while unarmed. Your unarmed strikes can deal lethal or nonlethal damage, at your choice.Normal: Without this feat, you are considered unarmed when attacking with an unarmed strike, and you can deal only nonlethal damage with such an attack."
        },
        [RuleFeatsConstants.ENDURANCE]: {
            name: "Endurance",
            description: "Benefit: You gain a +4 bonus on the following checks and saves: Swim checks made to resist nonlethal damage from exhaustion; Constitution checks made to continue running; Constitution checks made to avoid nonlethal damage from a forced march; Constitution checks made to hold your breath; Constitution checks made to avoid nonlethal damage from starvation or thirst; Fortitude saves made to avoid nonlethal damage from hot or cold environments; and Fortitude saves made to resist damage from suffocation.You may sleep in light or medium armor without becoming fatigued.Normal: A character without this feat who sleeps in medium or heavier armor is fatigued the next day."
        },
         [RuleFeatsConstants.DIEHARD]: {
            name: "Diehard",
            description: "Prerequisite: Endurance. Benefit: When your hit point total is below 0, but you are not dead, you automatically stabilize. You do not need to make a Constitution check each round to avoid losing additional hit points. You may choose to act as if you were disabled, rather than dying. You must make this decision as soon as you are reduced to negative hit points (even if it isn’t your turn). If you do not choose to act as if you were disabled, you immediately fall unconscious. When using this feat, you are staggered. You can take a move action without further injuring yourself, but if you perform any standard action (or any other action deemed as strenuous, including some swift actions, such as casting a quickened spell) you take 1 point of damage after completing the act. If your negative hit points are equal to or greater than your Constitution score, you immediately die.Normal: A character without this feat who is reduced to negative hit points is unconscious and dying."
        },
         [RuleFeatsConstants.CATCH_OF_GUARD]: {
            name: "Catch Off-Guard (Combat)",
            description: "Benefit: You do not suffer any penalties for using an improvised melee weapon. Unarmed opponents are flat-footed against any attacks you make with an improvised melee weapon. Normal: You take a –4 penalty on attack rolls made with an improvised weapon."
        },
        [RuleFeatsConstants.IMPROVISATIONAL_FOCUS]: {
            name: "Improvisational Focus (Combat)",
            description: "Prerequisite(s): Catch Off-Guard or Throw Anything, base attack bonus +1. Benefit(s): You gain a +1 bonus on attack rolls you make using an improvised weapon. You are considered proficient with the improvised weapon and are considered to have Weapon Focus with improvised weapons for the purpose of meeting the prerequisites of feats that specifically select a weapon, such as Weapon Specialization. Special: Thrown splash weapons are not considered improvised weapons for the purposes of this feat."
        },
         [RuleFeatsConstants.THROW_ANYTHING]: {
            name: "Throw Anything (Combat)",
            description: "Benefit: You do not suffer any penalties for using an improvised ranged weapon. You receive a +1 circumstance bonus on attack rolls made with thrown splash weapons. Normal: You take a –4 penalty on attack rolls made with an improvised weapon."
        },
        [RuleFeatsConstants.TOUGHNESS]: {
            name: "Toughness",
            description: "Benefit: You gain +3 hit points. For every Hit Die you possess beyond 3, you gain an additional +1 hit point. If you have more than 3 Hit Dice, you gain +1 hit points whenever you gain a Hit Die (such as when you gain a level)."
        },
         [RuleFeatsConstants.POWER_ATTACK]: {
            name: "Power Attack (Combat)",
            description: "Prerequisites: Str 13, base attack bonus +1. Benefit: You can choose to take a –1 penalty on all melee attack rolls and combat maneuver checks to gain a +2 bonus on all melee damage rolls. This bonus to damage is increased by half (+50%) if you are making an attack with a two-handed weapon, a one handed weapon using two hands, or a primary natural weapon that adds 1-1/2 times your Strength modifier on damage rolls. This bonus to damage is halved (–50%) if you are making an attack with an off-hand weapon or secondary natural weapon.When your base attack bonus reaches +4, and every 4 points thereafter, the penalty increases by –1 and the bonus to damage increases by +2. You must choose to use this feat before making an attack roll, and its effects last until your next turn. The bonus damage does not apply to touch attacks or effects that do not deal hit point damage."
        },
        [RuleFeatsConstants.CLEAVE]: {
            name: "Cleave (Combat)",
            description: "Prerequisites: Str 13, Power Attack, base attack bonus +1. Benefit: As a standard action, you can make a single attack at your full base attack bonus against a foe within reach. If you hit, you deal damage normally and can make an additional attack (using your full base attack bonus) against a foe that is adjacent to the first and also within reach. You can only make one additional attack per round with this feat. When you use this feat, you take a –2 penalty to your Armor Class until your next turn."
        },
         [RuleFeatsConstants.GREAT_CLEAVE]: {
            name: "Great Cleave (Combat)",
            description: " Prerequisites: Str 13, Cleave, Power Attack, base attack bonus +4. Benefit: As a standard action, you can make a single attack at your full base attack bonus against a foe within reach. If you hit, you deal damage normally and can make an additional attack (using your full base attack bonus) against a foe that is adjacent to the previous foe and also within reach. If you hit, you can continue to make attacks against foes adjacent to the previous foe, so long as they are within your reach. You cannot attack an individual foe more than once during this attack action. When you use this feat, you take a –2 penalty to your Armor Class until your next turn."
        },
        [RuleFeatsConstants.VITAL_STRIKE]: {
            name: "Vital Strike (Combat)",
            description: " Prerequisites: Base attack bonus +6. Benefit: When you use the attack action, you can make one attack at your highest base attack bonus that deals additional damage. Roll the weapon’s damage dice for the attack twice and add the results together before adding bonuses from Strength, weapon abilities (such as flaming), precision-based damage, and other damage bonuses. These extra weapon damage dice are not multiplied on a critical hit, but are added to the total. "
        },
         [RuleFeatsConstants.ARMOR_EXPERT_TRAIT]: {
            name: "Armor Expert",
            description: "Benefit: When you wear armor of any sort, reduce that suit’s armor check penalty by 1, to a minimum check penalty of 0."
        },
        [RuleFeatsConstants.SHIPS_SURGEON]: {
            name: "Ship’s Surgeon",
            description: " Benefit You begin play with a fully stocked healer’s kit and gain a +1 trait bonus on Craft (carpentry) and Heal checks, and Heal is a class skill for you."
        },
        [RuleFeatsConstants.POINT_BLANK_SHOT]: {
            name: "Point-Blank Shot (Combat)",
            description: " Benefit: You get a +1 bonus on attack and damage rolls with ranged weapons at ranges of up to 30 feet."
        },
        [RuleFeatsConstants.STARTOSS_STYLE]: {
            name: "Startoss Style (Combat, Style)",
            description: " Prerequisite(s): Dex 13, Point-Blank Shot, Weapon Focus with the chosen weapon. Benefit(s): Choose one weapon from the thrown fighter weapon group. While using this style and the chosen weapon, you gain a bonus on damage rolls made with the weapon equal to 2 + 2 per style feat you possess that lists Startoss Style as a prerequisite (maximum +6 damage). You cannot use this ability if you are carrying a weapon or a shield in your off hand (except for a buckler). Special: In addition to the chosen weapon, a character with this feat and the weapon training (thrown) class feature can use Startoss Style with any thrown weapons that she wields in one hand."
        },
         [RuleFeatsConstants.STARTOSS_COMET]: {
            name: "Startoss Comet (Combat)",
            description: "Prerequisite(s): Dex 13, Point-Blank Shot, Startoss Style, Weapon Focus with the chosen weapon. Benefit(s): As a standard action, you can make a single ranged thrown weapon attack at your full attack bonus with the chosen weapon. If you hit, you deal damage normally and can make a second attack (at your full attack bonus) against a target within one range increment of the first. You determine cover for this attack from the first target’s space instead of your space. You can make only one additional attack per round with this feat. If you have Vital Strike, Improved Vital Strike, or Greater Vital Strike, you can add the additional damage from those feats to the initial ranged attack (but not the second attack)."
        },
         [RuleFeatsConstants.STARTOSS_SHOWER]: {
            name: "Startoss Shower (Combat)",
            description: "Prerequisite(s): Dex 13, Point-Blank Shot, Startoss Comet, Startoss Style, Weapon Focus with the chosen weapon, base attack bonus +4. Benefit(s): When you hit an opponent while using the Startoss Comet feat, you can continue to make attacks against foes that are within one range increment of all previous opponents. You determine cover for each attack from the most recently hit foe’s space instead of your space, and you cannot attack an individual foe more than once during this attack action. You can make a maximum number of attacks equal to 1 + 1 per 5 points of base attack bonus you possess. If you have Vital Strike, Improved Vital Strike, or Greater Vital Strike, you can add the additional damage from those feats to the initial ranged attack (but not any subsequent attacks)."
        },
         [RuleFeatsConstants.TWO_WEAPON_FIGHTING]: {
            name: "Two-Weapon Fighting (Combat)",
            description: "Prerequisite: Dex 15. Benefit: Your penalties on attack rolls for fighting with two weapons are reduced. The penalty for your primary hand lessens by 2 and the one for your off hand lessens by 6. See Two-Weapon Fighting. Normal: If you wield a second weapon in your off hand, you can get one extra attack per round with that weapon. When fighting in this way you suffer a –6 penalty with your regular attack or attacks with your primary hand and a –10 penalty to the attack with your off hand. If your off-hand weapon is light, the penalties are reduced by 2 each. An unarmed strike is always considered light."
        },
          [RuleFeatsConstants.MIND_ARSENAL]: {
            name: "Mind Arsenal (Su)",
            description: "At 2nd level, a mind sword can make a telekinetic attack with a melee weapon. This functions as the hand of the apprentice universalist wizard school ability, but any calculations of that ability based on Intelligence are instead based on Charisma. At 6th level, a mind sword can expend two uses of this ability as a full-round action to attack the same opponent multiple times, as if using the full-attack action. At 12th level, a mind sword can expend one use of this ability as a full-round action to combine melee attacks and ranged attacks aimed at different targets within 60 feet as part of a single full-attack action. This ability replaces lay on hands."
        },
        [RuleFeatsConstants.IMPROVED_GRAPPLE]: {
            name: "Improved Grapple (Combat)",
            description: "Prerequisite: Dex 13, Improved Unarmed Strike. Benefit: You do not provoke an attack of opportunity when performing a grapple combat maneuver. In addition, you receive a +2 bonus on checks made to grapple a foe. You also receive a +2 bonus to your Combat Maneuver Defense whenever an opponent tries to grapple you. Normal: You provoke an attack of opportunity when performing a grapple combat maneuver."
        },
},
    [SupportedLanguages.RU]: {
        [RuleFeatsConstants.AXE_TO_GRIND]: {
            name: "Axe to grind",
            description: " Ты полуяаешь +1 трейт бонус к урону против врагов которые находятся в радиусе твоей атаки. "
        },
        [RuleFeatsConstants.CARETAKER]: {
            name: "Caretaker",
            description: "Ты получаешь +1  трейт бонус на лечение и лечение становится классвым навыком."
        },
        [RuleFeatsConstants.COMBAT_EXPERTISE]: {
            name: "Combat Expertise (Combat)",
            description: " Ты можешь выбрать получить -1 к атаке в ближнем бою и к боевым маневрам, чтобы получить +1 бонус уворота к броне.Когда бонус к атаке становится +4 и каждые +4 почле него, твой штраф увеличивется на -1, а уворот увеличивается на +1.  Вы можете использовать это умение только тогда, когда заявляете, что совершаете атаку или действие полной атаки с использованием оружия ближнего боя. Эффект этого умения длится до вашего следующего хода."
    }
};
