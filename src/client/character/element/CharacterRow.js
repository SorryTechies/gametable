/**
 * Created by LastBerserk on 07.09.2019.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import StaticSettings from "../../static/StaticSettings";
import CharacterField from "./CharacterField";

export default class CharacterRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            value: this.props.modifiedValue
        };
    }

    getInput() {
        const stopRedacting = () => {
            this.props.onSave(this.state.value);
            this.setState({edit: false});
        };
        return <input
            value={this.state.value}
            onChange={e => this.setState({value: e.target.value})}
            onBlur={stopRedacting}
            onKeyPress={e => {
                const keyNum = e.keyCode ? e.keyCode : e.which;
                if (keyNum === 13) stopRedacting();
            }}
        />;
    }

    getModifiable() {
        return this.state.edit ? this.getInput() :  <CharacterField value={this.props.modifiedValue}/>;
    }

    getOnClick() {
        return StaticSettings.get(StaticSettings.EDITING_MODE) ?
            () => this.setState({edit: true}) :
            (typeof this.props.onClick === "function" ? () => this.props.onClick() : null);
    }

    render() {
        return <tr onClick={this.getOnClick()}>
            <CharacterField value={this.props.displayName}/>
            <CharacterField value={this.props.finalValue}/>
            {this.getModifiable()}
        </tr>;
    }
}

CharacterRow.propTypes = {
    displayName: PropTypes.string.isRequired,
    finalValue: PropTypes.number.isRequired,
    modifiedValue: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onClick: PropTypes.func
};

