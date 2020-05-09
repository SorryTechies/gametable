import * as React from "react";
import * as PropTypes from "prop-types";
import {getButtonState} from "./CommandButtonByKey";

export default class CommandButton extends React.Component {
    constructor(props) {
        super(props);
        this.timeout = null;
    }

    clear() {
        if (typeof this.timeout === "number") {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    onActionDown() {
       this.clear();
       this.timeout = setTimeout(() => {
           // TODO change button
           this.clear();
       },2000);
    }

    onActionUp(action) {
        if (typeof this.timeout === "number") {
            // TODO action
            this.clear();
        }
    }

    render() {
        const state = getButtonState(this.props.key);
        return <div>
            <img src={state.icon} alt={this.props.key}
                 onTouchStart={this.onActionDown.bind(this, state.action)}
                 onMouseDown={this.onActionDown.bind(this, state.action)}
                 onTouchEnd={this.onActionUp.bind(this, state.action)}
                 onMouseUp={this.onActionUp.bind(this, state.action)}/>
        </div>
    }
}

CommandButton.propTypes = {
    actionKey: PropTypes.string.isRequired,
    actionList: PropTypes.object.isRequired
};