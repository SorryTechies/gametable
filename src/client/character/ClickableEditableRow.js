/**
 * Created by LastBerserk on 07.09.2019.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import rootScss from '../../scss/root.scss';
import StaticSettings from "../static/StaticSettings";
import PopupManager from "../popup/PopupManager";

function toArray(args, key) {
    return [key].concat(args.map(item => item[key]));
}

export default class ClickableEditableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false};
        this.isFist = index => index === 0;
        this.callback = (index, e) => {
            this.props.args[index - 1][this.props.name] = parseInt(e.target.value);
            this.forceUpdate();
        };
        this.stopRedacting = () => {
            this.props.onSave();
            this.setState({edit: false});
        }
    }

    getCell(value, index) {
        let inner = value;
        if (!this.isFist(index) && this.state.edit) {
            inner = <input
                value={value}
                onChange={this.callback.bind(this, index)}
                onBlur={this.stopRedacting}
                onKeyPress={e => {
                    const keyNum = e.keyCode ? e.keyCode : e.which;
                    if (keyNum === 13) this.stopRedacting();
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
        const onClick = typeof this.props.onClick === "function" ? () => this.props.onClick(array) : null;
        return <tr onClick={onClick}>{array.map(this.getCell.bind(this))}</tr>;
    }

    render() {
        return StaticSettings.get(StaticSettings.EDITING_MODE) ? this.renderEditable() : this.renderClickable();
    }
}

ClickableEditableRow.propTypes = {
    args: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    displayName: PropTypes.string
};

