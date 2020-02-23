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
import RuleConstants from "../../../rules/RuleConstants";

const NO = "no";
const SPELLS = "spells";

export default class StatusMenu extends React.Component {
    constructor(props) {
        super(props);
        this.action = null;
        this.state = {nextSelector: NO};
    }

    processAction(action) {
        this.action = action;
        switch (action.key) {
            case RuleActionsConstants.CAST_SPELL:
                return this.setState({nextSelector: SPELLS});
            default:
                return this.props.doAimAction(action);
        }
    }

    renderFirstSelector() {
        return <ActionSelector doAimAction={val1 => {
            const action = new RuleAction(val1);
            action.performerId = this.props.unit._id;
            this.processAction(action);
        }} allowedActions={this.props.actionList.getAllowedActionsList()}/>
    }

    getSecondActionList() {
        switch (this.state.nextSelector) {
            case SPELLS:
                return StaticController.getCharacter(this.props.unit.character_id).get(RuleConstants.SPELL_ARRAY);
            default:
                throw new Error("Cannot find action list for" + this.state.nextSelector);
        }
    }

    renderSecondSelector() {
        switch (this.state.nextSelector) {
            case SPELLS:
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
        /** @type GameObject */
        const unit = this.props.unit;
        if (!unit) return null;
        const canControll = LoginController.isDM() || StaticController.isMyCharacter(unit.character_id);
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            {unit.name}
            {canControll ? this.renderSelectors() : null}
            <ActionBar actionList={this.props.actionList} onDelete={this.props.onActionDelete} isMine={canControll}/>
        </div>
    }
}

StatusMenu.propTypes = {
    unit: PropTypes.object.isRequired,
    doAimAction: PropTypes.func.isRequired,
    actionList: PropTypes.object.isRequired,
    onActionDelete: PropTypes.func.isRequired,
};