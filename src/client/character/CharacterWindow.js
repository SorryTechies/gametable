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
import CharacterSkills from "./pages/CharacterSkills";
import CharacterFeatsList from "./pages/CharacterFeatsList";
import CharacterItemList from "./pages/CharacterItemList";

const MENUS = {
    "basic": <div>
        <h3>Primary stats</h3>
        <CharacterStats/>
    </div>,
    "offense": <div>
        <h3>Offense</h3>
        <CharacterOffense/>
        <h3>Attacks</h3>
    </div>,
    "defense": <div>
        <h3>Saves</h3>
        <CharacterSaves/>
        <h3>Defense</h3>
        <CharacterDefense/>
    </div>,
    "skills": <div>
        <h3>Skills</h3>
        <CharacterSkills/>
    </div>,
    "states": <div>
        <h3>States</h3>
    </div>,
    "feats": <div>
        <h3>States</h3>
        <CharacterFeatsList/>
    </div>,
    "items": <div>
        <h3>Items</h3>
        <CharacterItemList/>
    </div>
};

export default class CharacterWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: "basic"};
    }

    renderMenu() {
        return <div id={rootScss.bottom_menu} className={rootScss.static_element}>
            <select className={rootScss.big_select} onChange={e => this.setState({currentPage: e.target.value})}>
                {Object.keys(MENUS).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
        </div>;
    }

    render() {
        return <div id={rootScss.character_screen}>
            <h2>{LoginController.getLogin()}</h2>
            {MENUS[this.state.currentPage]}
            {this.renderMenu()}
        </div>
    }
}
