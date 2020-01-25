/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import LoginController from "../logic/LoginController";
import CharacterSaves from "./pages/CharacterSaves";
import CharacterStats from "./pages/CharacterStats";
import CharacterDefense from "./pages/CharacterDefense";
import CharacterOffense from "./pages/CharacterOffense";

export default class CharacterWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: "basic"};
    }

    renderPage() {
        switch (this.state.currentPage) {
            case "basic":
                return <div>
                    <h3>Primary stats</h3>
                    <CharacterStats/>
                </div>;
            case "offense":
                return <div>
                    <h3>Offense</h3>
                    <CharacterOffense/>
                    <h3>Attacks</h3>
                </div>;
            case "defense":
                return <div>
                    <h3>Saves</h3>
                    <CharacterSaves/>
                    <h3>Defense</h3>
                    <CharacterDefense/>
                </div>;
            case "skills":
                return <div>
                    <h3>Skills</h3>
                </div>;
            case "knowledge":
                return <div>
                    <h3>Knowledge</h3>
                </div>;
            case "states":
                return <div>
                    <h3>States</h3>
                </div>;
        }
    }

    renderMenu() {
        const iconClassName = `${rootScss.top_icon}  material-icons`;
        return <div id={rootScss.bottom_menu} className={rootScss.static_element}>
            <select className={rootScss.big_select} onChange={e => this.setState({currentPage: e.target.value})}>
                <option value="basic">Stats</option>
                <option value="offense">Offense</option>
                <option value="defense">Saves</option>
                <option value="skills">Skills</option>
                <option value="knowledge">Knowledge</option>
                <option value="states">States</option>
                <option value="">Feats</option>
                <option value="">Items</option>
            </select>
        </div>;
    }

    render() {
        return <div id={rootScss.character_screen}>
            <h2>{LoginController.getLogin()}</h2>
            {this.renderPage()}
            {this.renderMenu()}
        </div>
    }
}
