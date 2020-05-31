import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../scss/root.scss';
import {getButtonState} from "./CommandButtonByKey";
import FloatElement from "../../popup/FloatElement";
import StaticClicker from "../../static/StaticClicker";
import ActionSelector from "../ActionSelector/ActionSelector";
import StaticController from "../../static/StaticController";
import CONST from "../../rules/constants/RuleActionsConstants";
import BUFFS from "../../rules/constants/RuleBuffConstants";
import * as RuleCombatManeuverList from "../../rules/constants/RuleCombatManeuverList";
import RuleWeaponConstants from "../../rules/items/const/RuleWeaponConstants";
import RuleConstants from "../../rules/constants/RuleStatConstants";
import {MUST_DO_ATTACK_BUFFS} from "../../rules/constants/RuleBuffGroupConstants";
import RuleAction from "../../rules/RuleAction";
import TARGET_TYPE from "../../rules/constants/RuleActionTargetType";
import SLOTS from "../../rules/items/const/RuleWearSlots";

function filterAllowedStates(actionList) {
    return actionList.gameObject.getStateList().filter(key =>
        // filter states, that require an attack
        actionList.canDoStandardAction && MUST_DO_ATTACK_BUFFS.includes(key)
    );
}

function secondListProcessor(key, actionList) {
    // prepare objects and key for second select
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
                .filter(item => this.props.actionList.canAttackWithWeapon(item));
        case CONST.MELEE_ATTACK:
            return [RuleWeaponConstants.UNARMED_STRIKE]
                .concat(unit.items.getItemsFromHands()
                    .filter(item => item.isWeapon &&
                        this.props.actionList.canAttackWithWeapon(item)));
        case CONST.RANGED_ATTACK:
            return unit.items.getItemsFromHands()
                .filter(item => item.isWeapon &&
                    item.isRanged &&
                    this.props.actionList.canAttackWithWeapon(item));
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
            throw new Error("Cannot find action list for " + key);
    }
}

function setValuesFromSecondSelector(key, obj, action) {
    // iterate by key and set up additional parameters
    switch (key) {
        case CONST.DROP:
        case CONST.UNEQUIP:
            action.setTarget(TARGET_TYPE.ITEM, obj);
            action.additional1 = obj.slot;
            break;
        case CONST.GRAB:
            action.setTarget(TARGET_TYPE.ITEM, obj);
            action.additional1 = SLOTS.RIGHT_HAND;
            break;
        case CONST.EQUIP:
            action.setTarget(TARGET_TYPE.ITEM, obj);
            // TODO select slot
            action.additional1 = obj.allowedSlots[0];
            break;
        case CONST.MELEE_ATTACK:
            if (obj === RuleWeaponConstants.UNARMED_STRIKE) {
                action.additional1 = null;
            } else {
                action.additional1 = obj;
            }
            break;
        case CONST.RANGED_ATTACK:
        case CONST.IMPROVISED_ATTACK:
        case CONST.THROW_ATTACK:
        case CONST.COMBAT_MANEUVERS:
        case CONST.CAST_SPELL:
        case CONST.ACTIVATE_STATE:
        case CONST.DEACTIVATE_STATE:
            this.action.additional1 = obj;
            break;
    }
}

export default class CommandButton extends React.Component {
    constructor(props) {
        super(props);
        this.id = "comb" + (this.props.index).toString();
        this.clickBlock = false;
        this.timeout = null;
        this.layout = null;
        this.active = false;
        this.secondObject = null;
        this.state = {float: null};
    }

    clear() {
        if (typeof this.timeout === "number") {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    onMouseClicked(event) {
        if (this.state.float) {
            // is blocked
            if (this.clickBlock) {
                // clear block with delay, needed to stop immediate float close
                setTimeout(() => this.clickBlock = false, 100);
            } else {
                // close float if clicked outside of it
                if (!event.target.closest(`.${rootScss.floatElement}`)) {
                    this.setState({float: null});
                }
            }
        }
    }

    componentDidMount() {
        StaticClicker.subscribe({id: this, func: this.onMouseClicked.bind(this)});
    }

    componentWillUnmount() {
        StaticClicker.unSubscribe(this);
    }

    clearFloat() {
        this.setState({float: null});
    }

    onSavedChanged(newLayout) {
        this.props.actionList.gameObject.commandButtonLayout[this.props.index] = newLayout;
        StaticController.saveLayout(this.props.actionList.gameObject)
        this.clearFloat();
        this.forceUpdate();
    }

    setUpFloat() {
        this.setState({
            float: <div id={this.id}><FloatElement element={
                <ActionSelector
                    currentlySelected={this.layout}
                    actionList={this.props.actionList}
                    onSelectComplete={this.onSavedChanged.bind(this)}/>
            }/></div>
        });
    }

    onActionDown() {
        this.clear();
        this.timeout = setTimeout(() => {
            this.clickBlock = true;
            this.setUpFloat();
            this.clear();
        }, 1000);
    }

    onActionUp(action) {
        // Blocker for first mUp
        if (typeof this.timeout === "number") {
            this.clear();
        }
        if (!this.clickBlock && this.active) {
            // do action
            const action = new RuleAction(this.layout.key);
            action.setPerformer(this.props.actionList.gameObject);
            if (this.secondObject) {
                setValuesFromSecondSelector(this.layout.key, this.secondObject, action);
            }
            this.props.doAimAction(action);
        }
    }

    getClassName() {
        if (this.active) {
            return rootScss.commandButton;
        } else {
            return rootScss.commandButton + " " + rootScss.commandButtonDisabled;
        }
    }

    processActions() {
        // layout key is in the allowed actions
        if (this.layout && this.list.includes(this.layout.key)) {
            if (this.layout.next) {
                this.secondList = secondListProcessor(this.layout.key, this.props.actionList);
                // map next key to actual object
                this.secondObject = this.secondList.find(item => item === this.layout.next.key || item.key === this.layout.next.key);
                if (this.secondObject) {
                    return true;
                }
            } else {
                return true;
            }
        }
        // default
        return false;
    }

    render() {
        this.list = this.props.actionList.getAllowedActionsList();
        this.layout = this.props.actionList.gameObject.commandButtonLayout[this.props.index];
        this.active = this.processActions();
        const state = getButtonState(this.layout);
        return <div className={this.getClassName()}>
            <img src={state.icon} alt={state.name}
                 // onTouchStart={this.onActionDown.bind(this, state.action)}
                 onMouseDown={this.onActionDown.bind(this, state.action)}
                 // onTouchEnd={this.onActionUp.bind(this, state.action)}
                 onMouseUp={this.onActionUp.bind(this, state.action)}/>
            {this.state.float}
        </div>
    }
}

CommandButton.propTypes = {
    index: PropTypes.number.isRequired,
    actionList: PropTypes.object.isRequired,
    doAimAction: PropTypes.func.isRequired
};