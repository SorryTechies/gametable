/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";
import * as ReactDom from "react-dom";
import LoginController from "./logic/LoginController";
import ChatWindow from "./chat/ChatWindow";
import Roller from "./roller/Roller";

const root = document.getElementById('root');

import rootScss from '../scss/root.scss';
import NormalRequest from "./logic/NormalRequest";
import RollerWindow from "./roller/RollerWindow";
import CharacterWindow from "./character/CharacterWindow";
import GroupWindow from "./group/GroupWindow";
import CombatWindow from "./combat/CombatWindow";
import PopupManager from "./popup/PopupManager";
import * as config from "../common/config";
import BrowserWebSocket from "./logic/ws/BrowserWebSocket";

let initialized = false;
let popupIndex = 0;
const MENU_REF = 'menu';

class Login extends React.Component {

    constructor(pops) {
        super(pops);

        this.state = {
            loginInput: "",
            currentPage: <ChatWindow/>,
            additionMenuBar: null,
            popups: []
        };
    }

    createPopup(data) {
        const popups = this.state.popups;
        popups.push(<div key={popupIndex++} className={rootScss.popup}>{data}</div>);
        this.setState({popups: popups});
        setTimeout(() => {
            popups.shift();
            this.setState({popups: popups});
        }, 5000)
    }

    componentDidMount() {
        PopupManager.init(this.createPopup.bind(this));
        LoginController.checkLoginInDB()
            .then(ans => {
                if (ans) {
                    this.tryToLogin(ans);
                } else {
                    initialized = true;
                    this.forceUpdate();
                }
            });
    }

    tryToLogin(username) {
        LoginController.setLogin(username);
        const request = new NormalRequest();
        request.path = '/login';
        request.send()
            .then(result => {
                initialized = true;
                LoginController.loginOk(result.isDM);
                BrowserWebSocket.init(username);
                this.forceUpdate();
            })
            .catch(e => {
                initialized = true;
                this.forceUpdate();
                console.log(e)
            });
    }

    renderMain() {
        return <div>
            <div className={`${rootScss.static_element} ${rootScss.menu}`}>
                <button onClick={() => {
                    this.setState({currentPage: <ChatWindow/>})
                }}>Chat
                </button>
                <button onClick={() => {
                    this.setState({currentPage: <RollerWindow/>})
                }}>Roller
                </button>
                {LoginController.isDM() ?
                    <button onClick={() => {
                        this.setState({currentPage: <GroupWindow/>})
                    }}>Group</button> :
                    <button onClick={() => {
                        this.setState({currentPage: <CharacterWindow/>})
                    }}>Stats</button>}
                <button onClick={() => {
                    this.setState({currentPage: <CombatWindow/>})
                }}>Combat
                </button>
                <img id={rootScss.logout}
                     src="https://img.icons8.com/ios/50/000000/delete-sign.png"
                     onClick={() => {
                         LoginController.logOut();
                         BrowserWebSocket.closeConnection();
                         this.forceUpdate();
                     }}
                />
            </div>
            {this.state.currentPage}
            {this.state.popups}
        </div>
    }

    renderLogin() {
        return <div>
            <h1>Pls LogIn</h1>
            <input type="text" onChange={(event) => this.setState({loginInput: event.target.value})}/>
            <button onClick={() => this.tryToLogin(this.state.loginInput)}>Login
            </button>
            {this.state.popups}
        </div>
    }

    render() {
        if (!initialized) return null;
        if (LoginController.isLogined()) {
            return this.renderMain();
        } else {
            return this.renderLogin();
        }
    }
}

ReactDom.render(<Login/>, root);