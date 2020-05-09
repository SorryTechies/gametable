import * as React from "react";
import * as PropTypes from "prop-types";
import CommandButton from "./CommandButton";

const BUTTON_AMOUNT = 9;

export default class CommandBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {arr: []};
        for (let i = 0; i < BUTTON_AMOUNT; i++) this.state.arr.push("");
    }

    render() {
        return <div>
            {this.state.arr.map((key, index) => <CommandButton key={index} actionKey={key} actionList={this.props.actionList}/>)}
        </div>
    }
}

CommandBar.propTypes = {
    actionList: PropTypes.object.isRequired
};