import * as React from "react";
import * as PropTypes from "prop-types";
import CommandButton from "./CommandButton";
import CommandButtonAdditional from "./CommandButtonAdditional";

const BUTTON_AMOUNT = 4;

export default class CommandBar extends React.Component {
    render() {
        const buttons = [];
        for (let i = 0; i < BUTTON_AMOUNT; ++i) {
            buttons.push(<CommandButton key={i} index={i} actionList={this.props.actionList}/>);
        }
        return <div>
            {buttons}
            <CommandButtonAdditional index={BUTTON_AMOUNT} actionList={this.props.actionList}/>
        </div>
    }
}

CommandBar.propTypes = {
    actionList: PropTypes.object.isRequired
};