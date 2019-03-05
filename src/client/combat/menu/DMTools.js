/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import rootScss from '../../../scss/root.scss';
import LoginController from "../../logic/LoginController";

export default class DMTools extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            turns: 1
        }
    }

    render() {
        return <div
            className={`${rootScss.static_element} ${rootScss.combat_menu}`}
        >
            Name:
            <input type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
            Turns:
            <input type="number" value={this.state.turns}
                   onChange={event => this.setState({turns: event.target.value})}/>
            <button onClick={this.props.addCallback.bind(null, this.state.name, this.state.turns, "")}>ADD</button>
        </div>
    }
}
