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
import RuleActionsConstants from "../../../rules/constants/RuleActionsConstants";
import RuleConstants from "../../../rules/constants/RuleStatConstants";
import RuleWeaponConstants from "../../../rules/items/const/RuleWeaponConstants";
import RuleCombatManuverList from "../../../rules/constants/RuleCombatManuverList";
import {MUST_DO_ATTACK_BUFFS} from "../../../rules/constants/RuleBuffGroupConstants";

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
            case RuleActionsConstants.COMBAT_MANEUVERS:
            case RuleActionsConstants.MELEE_ATTACK:
            case RuleActionsConstants.RANGED_ATTACK:
            case RuleActionsConstants.CAST_SPELL:
            case RuleActionsConstants.ACTIVATE_STATE:
            case RuleActionsConstants.DEACTIVATE_STATE:
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
        switch (this.state.nextSelector) {
            case RuleActionsConstants.COMBAT_MANEUVERS:
                return Object.values(RuleCombatManuverList);
            case RuleActionsConstants.MELEE_ATTACK:
                return [
                    RuleWeaponConstants.IMPROVISED,
                    RuleWeaponConstants.UNARMED_STRIKE
                ].concat(this.props.unit.items.getItemsFromHands().map(item => item.key));
            case RuleActionsConstants.RANGED_ATTACK:
                return  [
                    // TODO remove when weapons stored on server side
                    RuleWeaponConstants.LASER_RIFLE,
                ].concat(this.props.unit.items.getItemsFromHands().map(item => item.key));
            case RuleActionsConstants.CAST_SPELL:
                return this.props.unit.ruleCharacter.get(RuleConstants.SPELL_ARRAY);
            case RuleActionsConstants.ACTIVATE_STATE:
                return filterAllowedStates(this.props.unit);
            case RuleActionsConstants.DEACTIVATE_STATE:
                return this.props.unit.buffs.getDispellableDebuffs().map(buff => buff.key);
            default:
                throw new Error("Cannot find action list for" + this.state.nextSelector);
        }
    }

    renderSecondSelector() {
        switch (this.state.nextSelector) {
            case RuleActionsConstants.MELEE_ATTACK:
            case RuleActionsConstants.RANGED_ATTACK:
                return <ActionSelector doAimAction={val1 => {
                    this.action.additional1 = val1;
                    return this.props.doAimAction(this.action);
                }} allowedActions={this.getSecondActionList()}/>;
            case RuleActionsConstants.COMBAT_MANEUVERS:
            case RuleActionsConstants.CAST_SPELL:
            case RuleActionsConstants.ACTIVATE_STATE:
            case RuleActionsConstants.DEACTIVATE_STATE:
                return <ActionSelector doAimAction={val1 => {
                    this.action.additional1 = val1;
                    return this.props.doAimAction(this.action);
                }} allowedActions={this.getSecondActionList()}/>;
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