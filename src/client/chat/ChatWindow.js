/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";
import Message from "./Message";
import rootScss from '../../scss/root.scss';
import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import StaticController from "../static/StaticController";
import * as WsConstants from "../../common/WsConstants";
import WebSocketMessage from "../../common/logic/WebSocketMessage";

let id = 0;


export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: "",
            to: "ALL",
            buttonDisabled: false
        };

        /** @type Login */
        this.root = this.props.root;
    }

    componentDidMount() {
        StaticController.subscribe({id: WebSocketMessage.TYPE_CHAT, func: this.loadMessages.bind(this)});
        this.loadMessages();
    }

    componentWillUnmount() {
        StaticController.unSubscribe(WebSocketMessage.TYPE_CHAT);
    }

    loadMessages() {
        this.setState({messages: StaticController.getChat()})
    }

    sendMessage() {
        StaticController.sendChatMessage(this.state.input, this.state.to === "ALL" ? [] : this.state.to);
        this.state.input = "";
    }

    render() {
        const participants = StaticController.getParticipants();
        let prevSender = "";
        return <div>
            <div id={rootScss.bottom_menu} className={rootScss.static_element}>
                <form autoComplete="off">
                    <input id={rootScss.chat_input} type="text" value={this.state.input}
                           onChange={event => this.setState({input: event.target.value})}/>
                    {LoginController.isDM() ?
                        <select
                            id={rootScss.chat_select}
                            onChange={event => this.setState({to: event.target.value})}>
                            <option>ALL</option>
                            {Array.isArray(participants) ? participants.map(player => <option
                                key={player._id}>{player.username}</option>) : null}
                        </select> : null}
                    <button
                        id={rootScss.chat_button}
                        disabled={this.state.buttonDisabled}
                        onClick={e => {
                            e.preventDefault();
                            this.setState({buttonDisabled: true});
                            setTimeout(() => this.setState({buttonDisabled: false}), 2000);
                            this.sendMessage();
                        }}>Send
                    </button>
                </form>
            </div>
            {this.state.messages.map(obj => {
                const ui = <Message key={id++} message={obj} previousSender={prevSender}/>;
                prevSender = obj.senderName;
                return ui;
            })}
        </div>
    }
}