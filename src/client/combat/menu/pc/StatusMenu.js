/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import rootScss from '../../../../scss/root.scss';
import LoginController from "../../../logic/LoginController";

export default class StatusMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    getStatusTable(buffs) {
        if (!buffs || buffs.length === 0) return null;
        return <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Turns</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {buffs.map(buff => <tr key={buff.name}>
                <th>{buff.name}</th>
                <th>{buff.turns}</th>
                <th>{buff.description}</th>
            </tr>)}
            </tbody>
        </table>
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

    renderDefense() {
        /** @type DefenseObject */
        const defense = this.props.unit.character.defense;
        if (!defense) return;
        return <div>
            <div>{`AC: ${defense.AC} TAC: ${defense.TAC} FFAC: ${defense.FFAC} TFFAC: ${defense.FFTAC}`}</div>
            <div>{`CMD: ${defense.CMD}`}</div>
        </div>
    }

    renderStats() {
        const character = this.props.unit.character;
        if (!character) return;
        return <div>
            {this.renderDefense()}
        </div>
    }

    renderData() {
        /** @type CombatObject */
        const unit = this.props.unit;
        if (!unit || !unit.data) return console.warn("No data found.");
        if (!LoginController.isDM() && !unit.character) return;
        return <div>
            {this.renderHealth()}
            {this.renderStats()}
        </div>
    }

    render() {
        const unit = this.props.unit;
        if (!unit) return null;
        const dmTools = LoginController.isDM() ? <button onClick={this.props.dmCallback}>+</button> : null;
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            <div>{'Initiative: ' + unit.initiative}</div>
            {this.renderData()}
            {this.getStatusTable(unit.buffs)}
            {dmTools}
        </div>
    }
}
