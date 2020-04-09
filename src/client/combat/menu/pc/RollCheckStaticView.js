/**
 * Created by LastBerserk on 10.04.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import StaticController from "../../../static/StaticController";
import PopupManager from "../../../popup/PopupManager";

export default class RollCheckStaticView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            val: 0
        };
    }

    onValueChange(e) {
        this.setState({val: e.target.value});
    }

    onKeyChange(e) {
        this.setState({key: e.target.value});
    }

    onOk() {
        const value = parseInt(this.state.val);
        if (isNaN(value)) throw new Error("Value should be int.");
        if (!this.state.key) throw new Error("Key is empty.");
        const passed = StaticController.massiveRollCheck(this.state.key, value)
            .reduce((acc, obj) => {
                if (acc) acc += ", ";
                return acc + obj.name;
            }, "");

        PopupManager.push(`${this.state.key} check ${passed ? passed : "none"} passed`);
        this.props.exitCallback();
    }

    render() {
        return <div>
            <input type="text" value={this.state.key} onChange={this.onKeyChange.bind(this)}/>
            <input type="text" value={this.state.val} onChange={this.onValueChange.bind(this)}/>
            <button onClick={this.onOk.bind(this)}>ROLL</button>
        </div>
    }
}