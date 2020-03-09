/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";

import root from '../../scss/root.scss';

function isPicture(message) {
    return message.text.startsWith('http');
}

function dateToString(timestamp) {
    return `${timestamp.getHours()}:${timestamp.getMinutes()}`;
}

function getSender(message) {
    return message.sender ? message.sender : "";
}

export default class Message extends React.Component {
    render() {
        const header = <p className={root.whowhen}>{getSender(this.props.message) + ' ' + dateToString(this.props.message.stmp)}</p>;
        if (isPicture(this.props.message)) {
            return <div className={root.message}>
                {header}
                <img src={this.props.message.text}/>
            </div>
        } else {
            return <div className={root.message}>
                {header}
                <p className={root.text}>{this.props.message.text}</p>
            </div>;
        }
    }
}