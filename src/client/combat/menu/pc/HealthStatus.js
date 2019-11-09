/**
 * Created by LastBerserk on 09.11.2019.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import StaticController from "../../../static/StaticController";
import PopupManager from "../../../popup/PopupManager";
import * as WsConstants from "../../../../common/WsConstants";

function getType(type) {
    switch (type) {
        case "text":
        case "number":
            return type;
        default:
            return "text";
    }
}

export default class HealthStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            focus: ""
        };
        this.changeField = (field, e) => {
            const num = parseInt(e.target.value);
            if (isNaN(num)) return PopupManager.push("Можно только целое число.");
            this.props.unit.data[field] = num;
            StaticController.notifySubscribed(WsConstants.STATIC_MAP);
        };
        this.getInput = (characterField) => {
            if (!this.props.unit || !this.props.unit.data) return null;
            return <input
                type="number"
                value={this.props.unit.data[characterField]}
                onChange={this.changeField.bind(this, characterField)}
                autoFocus={this.state.focus === characterField}
            />
        };
    }

    renderHealth() {
        /** @type CombatData */
        const data = this.props.unit.data;
        const maxHealth = data.health + data.aHealth;
        const currentHealth = maxHealth - data.lDamage - data.nDamage;
        const lDam = data.lDamage > 0 ? "- " + data.lDamage.toString() : "";
        const nDam = data.nDamage > 0 ? (lDam ? lDam : "- 0") + "/" + data.nDamage.toString() + " damage" : lDam;
        const aHp = (data.aHealth > 0 ? "+ " + data.aHealth.toString() + " bonus" : "");
        return <div>{`Health: ${currentHealth}/${maxHealth}hp ${nDam} ${aHp}`}</div>
    }

    save() {
        StaticController.saveObject(this.props.unit).catch(console.error);
    }

    renderEditable() {
        return <div>
            Max health:
            {this.getInput("health")}
            Lethal damage:
            {this.getInput("lDamage")}
            NonLethal damage:
            {this.getInput("nDamage")}
            Additional health:
            {this.getInput("aHealth")}
            <button onClick={this.save.bind(this)}>S</button>
        </div>
    }

    render() {
        console.log(this.props.allowEdit);
        let editCallback = null;
        if (this.props.allowEdit) editCallback = () => this.setState({edit: true});
        if (this.state.edit) {
            return this.renderEditable();
        } else {
            return <div onDoubleClick={editCallback}>{this.renderHealth()}</div>
        }
    }
}

HealthStatus.propTypes = {
    allowEdit: PropTypes.bool,
    unit: PropTypes.object.isRequired
};