/**
 * Created by LastBerserk on 06.02.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import RuleActionsConstants from "../../rules/constants/RuleActionsConstants";
import RuleActions from "../../rules/RuleAction";

export default class ActionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: RuleActionsConstants.NO_ACTION};
    }

    onSelection(e) {
        const val = e.target.value;
        this.setState({selected: val});
        this.props.doAimAction(val);
    }

    render() {
        return <div>
            <select value={this.state.selected} onChange={this.onSelection.bind(this)}>
                <option value={RuleActionsConstants.NO_ACTION}>NO ACTION</option>
                {this.props.allowedActions.map(key => <option value={key} key={key}>{key}</option>)}
            </select>
        </div>
    }
}

ActionSelector.propTypes = {
    allowedActions: PropTypes.array.isRequired,
    doAimAction: PropTypes.func.isRequired
};