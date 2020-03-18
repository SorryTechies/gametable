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
        this.props.doAimAction(val);
    }

    render() {
        const arr = [RuleActionsConstants.NO_ACTION]
            .concat(this.props.allowedActions)
            .map(key => ({
                key: key,
                val: TranslationModule.getTranslation(key)
            }));
        return <div>
            <select value={this.state.selected} onChange={this.onSelection.bind(this)}>
                {arr.map(obj => <option value={obj.key} key={obj.key}>{obj.val}</option>)}
            </select>
        </div>
    }
}

ActionSelector.propTypes = {
    allowedActions: PropTypes.array.isRequired,
    doAimAction: PropTypes.func.isRequired
};