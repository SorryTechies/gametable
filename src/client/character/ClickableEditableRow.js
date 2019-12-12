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
        this.isFist = index => index === 0;
        this.callback = e => {
            const value = this.props.type === "number" ? parseInt(e.target.value) : e.target.value;
            this.props.args[this.props.args.length - 1][this.props.name] = value;
            this.forceUpdate();
        };
        this.stopRedacting = () => {
            this.props.onSave();
            this.setState({edit: false});
        }
    }

    getCell(value, index) {
        let inner = value;
        if (this.isLast(index) && this.state.edit) {
            inner = <input
                type={getType(this.props.type)}
                value={value}
                onBlur={this.stopRedacting}
                onChange={this.callback}
                autoFocus={true}
                onKeyPress={e => {
                    const keyNum = e.keyCode ? e.keyCode : e.which;
                    if (keyNum === 13) {
                        this.stopRedacting();
                    }
                }}
            />;
        } else {
            if (this.isFist(index) && this.props.displayName) inner = this.props.displayName;
        }
        return <th
            key={index}
            className={value.length > 20 ? rootScss.big_box : null}
        >{inner}</th>
    }

    renderEditable() {
        const name = this.props.name;
        const args = this.props.args;
        const array = toArray(args, name);
        return <tr onClick={() => this.setState({edit: true})}>{array.map((cell, i) => this.getCell(cell, i))}</tr>;
    }

    renderClickable() {
        const name = this.props.name;
        const args = this.props.args;
        const array = toArray(args, name);
        const onClick = typeof this.props.onClick === "function" ? () => this.props.onClick(toArray(args, name)) : null;
        return <tr onClick={onClick}>{array.map(this.getCell.bind(this))}</tr>;
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
    onSave: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    displayName: PropTypes.string
};

