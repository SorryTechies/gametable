/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../../scss/root.scss';
import ActionSelector from "../ActionSelector";
import ActionBar from "./ActionBar";

export default class StatusMenu extends React.Component {
    render() {
        const unit = this.props.unit;
        if (!unit) return null;
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            <ActionSelector doAimAction={action => {
                action.performerId = unit;
                this.props.doAimAction(action);
            }} allowedActions={this.props.actionList.getAllowedActionsList()}/>
            <ActionBar  actionList={this.props.actionList} onDelete={this.props.onActionDelete}/>
        </div>
    }
}

StatusMenu.propTypes = {
    unit: PropTypes.object.isRequired,
    doAimAction: PropTypes.func.isRequired,
    actionList: PropTypes.object.isRequired,
    onActionDelete: PropTypes.func.isRequired,
};