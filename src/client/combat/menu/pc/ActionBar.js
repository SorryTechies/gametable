/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import StaticController from "../../../static/StaticController";

function toDisplay(action) {
    let result = action.key;
    switch (action.targetType) {
        case "ground":
            result += ` to {${action.target.x}, ${action.target.y}}`;
            break;
        case "unit":
            result += " " + action.targetObject.name;
            break;
        case "none":
            break;
    }
    return result;
}

export default class ActionBar extends React.Component {
    render() {
        const isMine = this.props.isMine;
        const actions = isMine ? this.props.actionList.list : this.props.actionList.list.filter(action => !action.isHidden);
        return <div>
            {actions.map((action, i) =>
                <div key={i}>
                    {toDisplay(action)}
                    {isMine ? <button onClick={() => this.props.onDelete(action)}>del</button> : null}
                </div>
            )}
        </div>
    }
}

ActionBar.propTypes = {
    actionList: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isMine: PropTypes.bool
};