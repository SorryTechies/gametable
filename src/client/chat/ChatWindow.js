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

let id = 0;


export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: "",
            players: [],
            to: "ALL",
            buttonDisabled: false
        };

        /** @type Login */
        this.root = this.props.root;
    }

    componentDidMount() {
        StaticController.subscribe({id: WsConstants.STATIC_CHAT, func: this.loadMessages.bind(this)});
        this.loadMessages().catch(console.error);
        if (LoginController.isDM()) this.getParticipants().catch(console.error);
    }

    componentWillUnmount() {
        StaticController.unSubscribe(WsConstants.STATIC_CHAT);
    }

    async getParticipants() {
        let players = await StaticController.getParticipants();
        this.setState({players: players})
    }

    async loadMessages() {
        let messages = await StaticController.getChat();
        messages.forEach(item => item.timestamp = new Date(Date.parse(item.timestamp)));
        messages.sort((item1, item2) => item2.timestamp - item1.timestamp);
        this.setState({messages: messages})
    }

    sendMessage() {
        const request = new NormalRequest();
        request.method = "POST";
        request.path = "/sendMessage";
        request.send({message: this.state.input, to: this.state.to})
            .then(() => this.setState({input: ""}))
            .then(this.loadMessages.bind(this))
            .catch(console.error)
    }

    render() {
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
                            {this.state.players.map(player => <option key={player}>{player}</option>)}
                        </select> : null}
                    <button
                        id={rootScss.chat_button}
                        disabled={this.state.buttonDisabled}
                        onClick={() => {
                            this.setState({buttonDisabled: true});
                            setTimeout(() => this.setState({buttonDisabled: false}), 2000);
                            this.sendMessage();
                        }}>Send
                    </button>
                </form>
            </div>
            {this.state.messages.map(obj => <Message key={id++} message={obj}/>)}
        </div>
    }
}