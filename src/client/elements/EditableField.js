/**
 * Created by LastBerserk on 07.09.2019.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import PopupManager from "../popup/PopupManager";

function getType(type) {
    switch (type) {
        case "text":
        case "number":
            return type;
        default:
            return "text";
    }
}

export default class EditableField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false};
    }

    render() {
        const editCallback = this.props.allowEdit ? () => {
            if (typeof this.props.callback === "function") {
                this.setState({edit: true})
            } else {
                PopupManager.push("Это поле нельзя изменить.");
            }
        } : null;
        if (this.state.edit) {
            return <input
                type={getType(this.props.type)}
                value={this.props.value}
                onBlur={() => this.setState({edit: false})}
                onChange={this.props.callback}
                autoFocus={true}
            />
        } else {
            return <div onDoubleClick={editCallback}>{this.props.value}</div>
        }
    }
}

EditableField.propTypes = {
    allowEdit: PropTypes.bool,
    type: PropTypes.string,
    callback: PropTypes.func
};