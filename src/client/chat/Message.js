/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";

import root from '../../scss/root.scss';

export default class Message extends React.Component {
    renderHeader() {
        if (this.props.message.senderName === this.props.previousSender) {
            return null;
        } else {
            return <p className={root.whowhen} style={{color: this.props.message.color}}>
                {this.props.message.senderName}
            </p>;
        }
    }

    renderMessage() {
        if (this.props.message.isPicture) {
            return <img src={this.props.message.text}/>;
        } else {
            const style = {color: this.props.message.color};
            if (!this.props.message.isMessage) {
                style.fontFamily = "Arial, Helvetica, sans-serif";
                style.fontSize = "15px";
                style.fontStyle = "italic";
            }
            return <p className={root.text} style={style}>{this.props.message.text}</p>
        }
    }

    render() {
        /** @type {BrowserChatMessage} */
        const message = this.props.message;
        return <div className={root.message}>
            {this.renderHeader()}
            {this.renderMessage()}
        </div>
    }
}

Message.propTypes = {
    message: PropTypes.object.isRequired,
    previousSender: PropTypes.string
};