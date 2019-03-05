/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import rootScss from '../../../scss/root.scss';
import LoginController from "../../logic/LoginController";

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

    render() {
        const unit = this.props.unit;
        if (!unit) return null;
        const character = unit.character;
        const content = character ? `${unit.name} Damaged: ${character.damage}` : unit.name;
        const dmTools = LoginController.isDM() ? <button onClick={this.props.dmCallback}>+</button> : null;
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            <div>{'Initiative: ' + unit.initiative}</div>
            {content}
            {this.getStatusTable(unit.buffs)}
            {dmTools}
        </div>
    }
}
