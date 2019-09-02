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
import GroupWindow from "./group/GroupWindow";
import CombatWindow from "./combat/CombatWindow";
import PopupManager from "./popup/PopupManager";
import BrowserWebSocket from "./logic/ws/BrowserWebSocket";
import StaticController from "./static/StaticController";
import StaticSettings from "./static/StaticSettings";
import StaticClicker from "./static/StaticClicker";
import StaticViewManager from "./popup/StaticViewManager";
import DMConsole from "./dm/DMConsole";
import YoutubePlayer from "./logic/YoutubePlayer";

const root = document.getElementById('root');

let initialized = false;

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', StaticClicker.handleClick);

class Login extends React.Component {
    constructor(pops) {
        super(pops);

        this.state = {
            loginInput: "",
            currentPage: <ChatWindow/>,
            additionMenuBar: null,
            settings: null
        };
    }

    componentDidMount() {
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
                StaticController.init();
                StaticSettings.init();
                this.forceUpdate();
            })
            .catch(e => {
                initialized = true;
                this.forceUpdate();
                console.log(e)
            });
    }

    showSettings() {
        if (this.state.settings) {
            this.setState({settings: null});
        } else {
            this.setState({
                settings: <div className={rootScss.global_popup}>
                    <div>
                        <label>Volume</label>
                        <input type="range" min="0" max="10" defaultValue={StaticSettings.getVolume()} step="1"
                               onChange={event => StaticSettings.setVolume(event.target.value)}
                        />
                    </div>
                    <button onClick={() => {
                        LoginController.logOut();
                        BrowserWebSocket.closeConnection();
                        this.forceUpdate();
                    }}>Logout
                    </button>
                </div>
            });
        }
    }

    renderMain() {
        const iconClassName = `${rootScss.top_icon}  material-icons`;
        return <div>
            <div className={`${rootScss.static_element} ${rootScss.menu}`}>
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <ChatWindow/>})}>chat_bubble</i>
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <RollerWindow/>})}>crop_square</i>
                {LoginController.isDM() ?
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <GroupWindow/>})}>people</i> :
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <CharacterWindow/>})}>person</i>}
                <i className={iconClassName}
                   onClick={() => this.setState({currentPage: <CombatWindow/>})}>map</i>
                {LoginController.isDM() ?
                    <i className={iconClassName}
                       onClick={() => this.setState({currentPage: <DMConsole/>})}>donut_small</i> : null}
                <i className={iconClassName} onClick={this.showSettings.bind(this)}>settings</i>
            </div>
            <div id={rootScss.workspace}>{this.state.currentPage}</div>
            {this.state.settings}
            <PopupManager/>
            <StaticViewManager/>
            <YoutubePlayer/>
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