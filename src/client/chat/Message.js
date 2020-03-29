/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";

import root from '../../scss/root.scss';

export default class Message extends React.Component {
    render() {
        /** @type {BrowserChatMessage} */
        const message = this.props.message;
        const color = {color: message.color};
        return <div className={root.message}>
            {<p className={root.whowhen} style={color}>{message.senderName}</p>}
            {
                message.isPicture ?
                    <img src={message.text}/> :
                    <p className={root.text} style={color}>{message.text}</p>
            }
        </div>
    }
}