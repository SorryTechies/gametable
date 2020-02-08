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

export default class StatusMenu extends React.Component {
    render() {
        /** @type GameObject */
        const unit = this.props.unit;
        if (!unit) return null;
        const myUnit = LoginController.isDM() || StaticController.isMyCharacter(unit.character_id);
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            {myUnit ? <ActionSelector doAimAction={action => {
                action.performerId = unit._id;
                this.props.doAimAction(action);
            }} allowedActions={this.props.actionList.getAllowedActionsList()}/> : null}
            <ActionBar  actionList={this.props.actionList} onDelete={this.props.onActionDelete} isMine={myUnit}/>
        </div>
    }
}

StatusMenu.propTypes = {
    unit: PropTypes.object.isRequired,
    doAimAction: PropTypes.func.isRequired,
    actionList: PropTypes.object.isRequired,
    onActionDelete: PropTypes.func.isRequired,
};