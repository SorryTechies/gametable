/**
 * Created by LastBerserk on 07.09.2019.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import rootScss from '../../scss/root.scss';
import StaticSettings from "../static/StaticSettings";
import PopupManager from "../popup/PopupManager";

function allowEdit() {
    return StaticSettings.get(StaticSettings.EDITING_MODE);
}

function getType(type) {
    switch (type) {
        case "text":
        case "number":
            return type;
        default:
            return "text";
    }
}

function toArray(args, key) {
    return [key].concat(args.map(item => item[key]));
}

export default class ClickableEditableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false};
        this.isLast = index => index === (this.props.args.length);
        this.callback = e => {
            this.props.args[this.props.args.length - 1][this.props.name] = e.target.value;
            this.forceUpdate();
        }
    }

    getCell(value, index) {
        let inner;
        if (this.isLast(index) && this.state.edit) {
            inner = <input
                type={getType(this.props.type)}
                value={value}
                onBlur={() => {
                    this.props.onSave();
                    this.setState({edit: false});
                }}
                onChange={this.callback}
                autoFocus={true}
            />;
        } else {
            inner = value;
        }
        return <th
            key={index}
            className={value.length && value.length > 20 ? rootScss.big_box : null}
        >{inner}</th>
    }

    renderEditable() {
        const name = this.props.name;
        const args = this.props.args;
        const array = toArray(args, name);
        return <tr
            onDoubleClick={() => this.setState({edit: true})}>{array.map((cell, i) => this.getCell(cell, i))}</tr>;
    }

    renderClickable() {
        const name = this.props.name;
        const args = this.props.args;
        const array = toArray(args, name);
        return <tr
            onClick={() => this.props.onClick(toArray(args, name))}>{array.map((cell, i) => this.getCell(cell, i))}</tr>;
    }

    render() {
        if (allowEdit()) {
            return this.renderEditable();
        } else {
            return this.renderClickable();
        }
    }
}

ClickableEditableRow.propTypes = {
    args: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

