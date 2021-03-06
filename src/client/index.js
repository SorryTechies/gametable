/**
 * Created by LastBerserk on 25.01.2019.
 */

import * as React from "react";
import * as ReactDom from "react-dom";
import LoginController from "./logic/LoginController";
import ChatWindow from "./chat/ChatWindow";
import rootScss from '../scss/root.scss';
import NormalRequest from "./logic/NormalRequest";
import RollerWindow from "./roller/RollerWindow";
import CharacterWindow from "./character/CharacterWindow";
import CombatWindow from "./combat/CombatWindow";
import PopupManager from "./popup/PopupManager";
import BrowserWebSocket from "./logic/ws/BrowserWebSocket";
import StaticController from "./static/StaticController";
import StaticSettings from "./static/StaticSettings";
import StaticClicker from "./static/StaticClicker";
import StaticViewManager from "./popup/StaticViewManager";
import DMConsole from "./dm/DMConsole";
import SettingsWindow from "./settings/SettingsWindow";
import StaticKeyboardController from "./static/StaticKeyboardController";

const root = document.getElementById('root');
const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', StaticClicker.handleClick);

let initialized = false;
class Login extends React.Component {
    constructor(pops) {
        super(pops);
        this.state = {
            loginInput: "",
            currentPage: <ChatWindow/>,
            additionMenuBar: null
        };
    }

    componentDidMount() {
        document.onkeydown  = StaticKeyboardController.onKeyPressed;
        LoginController.checkLoginInDB()
            .then(ans => {
                if (ans) {
                    this.tryToLogin(ans);
                } else {
                    initialized = true;
                    this.forceUpdate();
                }
            }).catch(console.error);
    }

    tryToLogin(username) {
        LoginController.setLogin(username);
        new NormalRequest('/login').send()
            .then(async result => {
                initialized = true;
                LoginController.loginOk(false);
                BrowserWebSocket.init(username);
                await StaticController.init(result);
                StaticSettings.init();
                this.forceUpdate();
            })
            .catch(e => {
                initialized = true;
                this.forceUpdate();
                console.error(e)
            });
    }

    logoutCallback() {
        LoginController.logOut();
        BrowserWebSocket.closeConnection();
        this.setState({currentPage: <ChatWindow/>});
    }

    renderMain() {
        const iconClassName = `${rootScss.top_icon}  material-icons`;
        return <div>
            <div className={`${rootScss.static_element} ${rootScss.menu}`}>
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <ChatWindow/>})}>chat_bubble</i>
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <RollerWindow/>})}>crop_square</i>
                {LoginController.isDM() ? null /*
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <GroupWindow/>})}>people</i> */:
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <CharacterWindow/>})}>person</i>}
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <CombatWindow/>})}>map</i>
                {LoginController.isDM() ?
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <DMConsole/>})}>donut_small</i> : null}
                <i className={iconClassName} onClick={() => this.setState(
                    {currentPage: <SettingsWindow clickCallback={this.logoutCallback.bind(this)}/>})}>settings</i>
            </div>
            <div id={rootScss.workspace}>{this.state.currentPage}</div>
            <PopupManager/>
            <StaticViewManager/>
        </div>
    }

    renderLogin() {
        return <div>
            <h1>Pls LogIn</h1>
            <input type="text" onChange={(event) => this.setState({loginInput: event.target.value})}/>
            <button onClick={() => this.tryToLogin(this.state.loginInput)}>Login</button>
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