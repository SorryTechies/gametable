/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";

export default class ActionBar extends React.Component {
    render() {
        return <div>
            {this.props.actionList.list.map((action, i) =>
                <div key={i}>
                    {action.key}
                    <button onClick={() => this.props.onDelete(action)}>del</button>
                </div>
            )}
        </div>
    }
}

ActionBar.propTypes = {
    actionList: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};