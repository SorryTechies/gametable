/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";

import root from '../../scss/root.scss';

export default class Roller extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }

    roll() {
        this.setState({value: Roller.rollDice(this.props.max)});
    }

    render() {
        return <div className={root.roller}>
            <p>{"D" + this.props.max}</p>
            <p>{this.state.value.toString()}</p>
            <button onClick={() => this.roll()}>ROLL</button>
        </div>
    }

    static rollDice(max) {
        max = max || 20;
        return Math.round(1 + Math.random() * parseInt(max - 1));
    }
}