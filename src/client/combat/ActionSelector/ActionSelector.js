/**
 * Created by LastBerserk on 11.05.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import RuleActionsConstants from "../../rules/constants/RuleActionsConstants";
import TranslationModule from "../../rules/translation/TranslationModule";
import CustomSelect from "../CustomSelect/CustomSelect";
import CONST from "../../rules/constants/RuleActionsConstants";
import BUFFS from "../../rules/constants/RuleBuffConstants";
import * as RuleCombatManeuverList from "../../rules/constants/RuleCombatManeuverList";
import RuleWeaponConstants from "../../rules/items/const/RuleWeaponConstants";
import RuleConstants from "../../rules/constants/RuleStatConstants";
import {MUST_DO_ATTACK_BUFFS} from "../../rules/constants/RuleBuffGroupConstants";

function filterAllowedStates(actionList) {
    const unit = actionList.gameObject;
    return unit.ruleCharacter.getStateList().filter(key => {
        if (!actionList.canDoStandardAction && MUST_DO_ATTACK_BUFFS.includes(key)) return false;
        return true;
    });
}

function gatherSecondSelector(actionList, key) {
    const unit = actionList.gameObject;
    switch (key) {
        case CONST.COMBAT_MANEUVERS:
            if (unit.hasBuff(BUFFS.GRAPPLED)) {
                return Object.values(RuleCombatManeuverList.GRAPPLED);
            } else {
                if (unit.hasBuff(BUFFS.GRAPPLING)) {
                    return Object.values(RuleCombatManeuverList.GRAPPLING);
                } else {
                    return Object.values(RuleCombatManeuverList.NORMAL);
                }
            }
        case CONST.THROW_ATTACK:
        case CONST.IMPROVISED_ATTACK:
            return unit.items.getItemsFromHands()
                .filter(item => actionList.canAttackWithWeapon(item));
        case CONST.MELEE_ATTACK:
            return [RuleWeaponConstants.UNARMED_STRIKE]
                .concat(unit.items.getItemsFromHands()
                    .filter(item => item.isWeapon &&
                        actionList.canAttackWithWeapon(item)));
        case CONST.RANGED_ATTACK:
            return unit.items.getItemsFromHands()
                .filter(item => item.isWeapon &&
                    item.isRanged &&
                    actionList.canAttackWithWeapon(item));
        case CONST.CAST_SPELL:
            return unit.ruleCharacter.get(RuleConstants.SPELL_ARRAY);
        case CONST.ACTIVATE_STATE:
            return filterAllowedStates(actionList);
        case CONST.DEACTIVATE_STATE:
            return unit.buffs.getDispellableDebuffs();
        case CONST.EQUIP:
        case CONST.GRAB:
            return unit.items.getBackpack();
        case CONST.UNEQUIP:
            return unit.items.slots.getEquipped();
        case CONST.DROP:
            return unit.items.slots.getGrabbed();
        default:
            return null;
    }
}

export default class ActionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.rootSelect = null;
        this.state = {
            selectObject: this.props.currentlySelected ? this.props.currentlySelected : {key: RuleActionsConstants.NO_ACTION},
            currentSelector: this.props.actionList.getAllowedActionsList()
        };
    }

    onSelection(layout) {
        const nextSelector = gatherSecondSelector(this.props.actionList, layout.key);
        if (nextSelector) {
            this.rootSelect = layout;
            this.setState({currentSelector: nextSelector});
        } else {
            if (this.rootSelect) {
                this.rootSelect.next = layout;
            } else {
                this.rootSelect = layout;
            }
            this.props.onSelectComplete(this.rootSelect);
        }
    }

    render() {
        const actions = this.state.currentSelector.map(item => typeof item === "object" ? {key: item.key} : {key: item});
        return <CustomSelect currentlySelected={this.props.currentlySelected}
                             displayNames={actions.map(layout => TranslationModule.getTranslation(layout.key))}
                             onSelected={this.onSelection.bind(this)}
                             values={actions}/>
    }
}

ActionSelector.propTypes = {
    currentlySelected: PropTypes.object,
    actionList: PropTypes.object.isRequired,
    onSelectComplete: PropTypes.func.isRequired
};