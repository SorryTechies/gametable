/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../../scss/root.scss';
import ActionSelector from "../ActionSelector";
import ActionBar from "./ActionBar";
import LoginController from "../../../logic/LoginController";
import StaticController from "../../../static/StaticController";
import RuleAction from "../../../rules/RuleAction";
import CONST from "../../../rules/constants/RuleActionsConstants";
import RuleConstants from "../../../rules/constants/RuleStatConstants";
import RuleWeaponConstants from "../../../rules/items/const/RuleWeaponConstants";
import RuleCombatManuverList from "../../../rules/constants/RuleCombatManuverList";
import {MUST_DO_ATTACK_BUFFS} from "../../../rules/constants/RuleBuffGroupConstants";
import SLOTS from "../../../rules/items/const/RuleWearSlots";
import TARGET_TYPE from "../../../rules/constants/RuleActionTargetType";

const NO = "no";

function filterAllowedStates(unit) {
    const actionList = StaticController.getRound().getObject(unit.id).actionList;
    return unit.ruleCharacter.getStateList().filter(key => {
        if (!actionList.canDoStandardAction && MUST_DO_ATTACK_BUFFS.includes(key)) return false;
        return true;
    });
}

export default class StatusMenu extends React.Component {
    constructor(props) {
        super(props);
        this.action = null;
        this.state = {nextSelector: NO};
    }

    processAction(action) {
        this.action = action;
        switch (action.key) {
            case CONST.COMBAT_MANEUVERS:
            case CONST.MELEE_ATTACK:
            case CONST.RANGED_ATTACK:
            case CONST.IMPROVISED_ATTACK:
            case CONST.CAST_SPELL:
            case CONST.ACTIVATE_STATE:
            case CONST.DEACTIVATE_STATE:
            case CONST.EQUIP:
            case CONST.UNEQUIP:
            case CONST.DROP:
            case CONST.GRAB:
                return this.setState({nextSelector: action.key});
            default:
                return this.props.doAimAction(action);
        }
    }

    renderFirstSelector() {
        return <ActionSelector doAimAction={val1 => {
            if (val1 === NO) return;
            const action = new RuleAction(val1);
            action.setPerformer(this.props.unit);
            this.processAction(action);
        }} allowedActions={this.props.actionList.getAllowedActionsList()}/>
    }

    getSecondActionList() {
        /** @type {RuleGameObject} */
        const unit = this.props.unit;
        switch (this.state.nextSelector) {
            case CONST.COMBAT_MANEUVERS:
                return Object.values(RuleCombatManuverList);
            case CONST.IMPROVISED_ATTACK:
                return unit.items.getItemsFromHands()
                    .filter(item => this.props.actionList.canAttackWithWeapon(item));
            case CONST.MELEE_ATTACK:
                return [RuleWeaponConstants.UNARMED_STRIKE]
                    .concat(unit.items.getItemsFromHands()
                        .filter(item => item.isWeapon &&
                        this.props.actionList.canAttackWithWeapon(item)));
            case CONST.RANGED_ATTACK:
                return  unit.items.getItemsFromHands()
                    .filter(item => item.isWeapon &&
                    item.isRanged &&
                    this.props.actionList.canAttackWithWeapon(item));
            case CONST.CAST_SPELL:
                return unit.ruleCharacter.get(RuleConstants.SPELL_ARRAY);
            case CONST.ACTIVATE_STATE:
                return filterAllowedStates(this.props.unit);
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
                throw new Error("Cannot find action list for" + this.state.nextSelector);
        }
    }

    renderAction(func) {
        return <ActionSelector doAimAction={func} allowedActions={this.getSecondActionList()}/>;
    }

    renderSecondSelector() {
        switch (this.state.nextSelector) {
            case CONST.DROP:
            case CONST.UNEQUIP:
                return this.renderAction(val1 => {
                    this.action.setTarget(TARGET_TYPE.ITEM, val1);
                    this.action.additional1 = val1.slot;
                    return this.props.doAimAction(this.action);
                });
            case CONST.GRAB:
                return this.renderAction(val1 => {
                    this.action.setTarget(TARGET_TYPE.ITEM, val1);
                    this.action.additional1 = SLOTS.RIGHT_HAND;
                    return this.props.doAimAction(this.action);
                });
            case CONST.EQUIP:
                return this.renderAction(val1 => {
                    this.action.setTarget(TARGET_TYPE.ITEM, val1);
                    // TODO select slot
                    this.action.additional1 = val1.allowedSlots[0];
                    return this.props.doAimAction(this.action);
                });
            case CONST.IMPROVISED_ATTACK:
            case CONST.MELEE_ATTACK:
            case CONST.RANGED_ATTACK:
                return this.renderAction(val1 => {
                    this.action.additional1 = val1;
                    return this.props.doAimAction(this.action);
                });
            case CONST.COMBAT_MANEUVERS:
            case CONST.CAST_SPELL:
            case CONST.ACTIVATE_STATE:
            case CONST.DEACTIVATE_STATE:
                return this.renderAction(val1 => {
                    this.action.additional1 = val1;
                    return this.props.doAimAction(this.action);
                });
            default:
                return null;
        }
    }

    renderSelectors() {
        return <div>
            {this.renderFirstSelector()}
            {this.renderSecondSelector()}
        </div>
    }

    render() {
        /** @type {RuleGameObject} */
        const unit = this.props.unit;
        if (!unit) return null;
        const canControl = LoginController.isDM() || StaticController.isMyCharacter(unit.character_id);
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            {unit.name}
            {canControl ? this.renderSelectors() : null}
            <ActionBar actionList={this.props.actionList} onDelete={this.props.onActionDelete} isMine={canControl}/>
        </div>
    }
}

StatusMenu.propTypes = {
    unit: PropTypes.object.isRequired,
    doAimAction: PropTypes.func.isRequired,
    actionList: PropTypes.object.isRequired,
    onActionDelete: PropTypes.func.isRequired,
};