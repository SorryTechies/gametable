/**
 * Created by LastBerserk on 06.02.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import RuleActionsConstants from "../../rules/constants/RuleActionsConstants";
import RuleActions from "../../rules/RuleAction";
import TranslationModule from "../../rules/translation/TranslationModule";

export default class ActionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: RuleActionsConstants.NO_ACTION};
    }

    onSelection(e) {
        const val = e.target.value;
        this.setState({selected: val});
        const obj = this.props.allowedActions.find(obj => typeof obj === "object" ? obj.key === val : obj === val);
        this.props.doAimAction(obj);
    }

    render() {
        return <div>
            <select value={this.state.selected} onChange={this.onSelection.bind(this)}>
                {[RuleActionsConstants.NO_ACTION, ...this.props.allowedActions]
                    .map(obj => {
                        const key = typeof obj === "object" ? obj.key : obj;
                        return <option value={key} key={key}>{TranslationModule.getTranslation(key)}</option>;
                    })}
            </select>
        </div>
    }
}

ActionSelector.propTypes = {
    allowedActions: PropTypes.array.isRequired,
    doAimAction: PropTypes.func.isRequired
};