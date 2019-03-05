/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";

import root from '../../scss/root.scss';

function isPicture(message) {
    return message.content.startsWith('http');
}

function dateToString(timestamp) {
    return `${timestamp.getHours()}:${timestamp.getMinutes()}`;
}

export default class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const header = <p className={root.whowhen}>{this.props.message.sender + ' ' + dateToString(this.props.message.timestamp)}</p>;
        if (isPicture(this.props.message)) {
            return <div className={root.message}>
                {header}
                <img src={this.props.message.content}/>
            </div>
        } else {
            return <div className={root.message}>
                {header}
                <p className={root.text}>{this.props.message.content}</p>
            </div>;
        }
    }
}