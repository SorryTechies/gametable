/**
 * Created by LastBerserk on 26.01.2019.
 */

const TranslationEn = require("../../common/const/TranslationEn");

import * as React from "react";
import Transformer from "../logic/Transformer";
import rootScss from '../../scss/root.scss';
import LoginController from "../logic/LoginController";
import PopupManager from "../popup/PopupManager";
import RollInitiative from "../logic/requests/RollInitiative";
import DiceRoller from "../logic/DiceRoller";
import StaticController from "../static/StaticController";
import CharacterCore from "./CharacterCore";
import ClickableEditableRow from "./ClickableEditableRow";

function generateTable(args, type, click, onSave, sort) {
    const keyArray = Object.keys(args);
    if (sort) keyArray.sort((a, b) => typeof a === "string" ? a.localeCompare(b) : -1);
    return <table>
        <tbody>{keyArray.map(key => <ClickableEditableRow
            args={args}
            key={key}
            name={key}
            displayName={TranslationEn.translate(key)}
            type={type}
            onClick={click}
            onSave={onSave}/>)}</tbody>
    </table>;
}

const GENERATE_STATS = (self, save) => generateTable([self.state.character.bonuses, self.state.character.stats], "number",
    row => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])), save);

const GENERATE_SAVES = (self, save) => generateTable([self.state.character.saves], "number",
    row => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])), save);

const GENERATE_OFFENSE = (self, save) => generateTable([self.state.character.offense], "number",
    row => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])), save);

const GENERATE_DEFENSE = (self, save) => generateTable([self.state.character.defense], "number", null, save);

const GENERATE_SKILLS = (self, save) => generateTable([self.state.character.skills], "number",
    row => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])), save, true);

const GENERATE_ATTACKS = (self, save) => <table>
    <tbody>
    {self.state.character.attacks.map(item => <tr key={item.name}>
        <th>{item.name}</th>
        <th>{Transformer.insertRollTag(item.text, item.name)}</th>
    </tr>)}
    </tbody>
</table>;

export default class CharacterWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** @type Character */
            characterData: null,
            character: null,
            currentPage: "basic"
        };
        this.saveFunction = async () => {
            try {
                await this.state.character.saveToServer();
                this.loadCharacter();
            } catch (e) {
                console.error(e);
            }
        }
    }

    componentDidMount() {
        this.loadCharacter();
    }

    loadCharacter() {
        StaticController.getCharacter()
            .then(character => {
                this.setState({
                    characterData: character,
                    character: new CharacterCore(character)
                })
            })
            .catch(console.error);
    }

    async rollInitiative(row) {
        const diceRoller = new DiceRoller().setBonus(row[1]).roll();
        PopupManager.push(diceRoller.toString(row[0]));
        const request = new RollInitiative();
        await request.send(diceRoller.calculatedResult);
    }

    renderPage() {
        switch (this.state.currentPage) {
            case "basic":
                return <div>
                    <h3>Primary stats</h3>
                    {GENERATE_STATS(this, this.saveFunction)}
                </div>;
            case "offense":
                return <div>
                    <h3>Offense</h3>
                    {GENERATE_OFFENSE(this, this.saveFunction)}
                    <h3>Attacks</h3>
                    {GENERATE_ATTACKS(this)}
                </div>;
            case "defense":
                return <div>
                    <h3>Saves</h3>
                    {GENERATE_SAVES(this, this.saveFunction)}
                    <h3>Defense</h3>
                    {GENERATE_DEFENSE(this, this.saveFunction)}
                </div>;
            case "skills":
                return <div>
                    <h3>Skills</h3>
                    {GENERATE_SKILLS(this, this.saveFunction)}
                </div>;
        }
    }

    renderMenu() {
        const iconClassName = `${rootScss.top_icon}  material-icons`;
        return <div id={rootScss.bottom_menu} className={rootScss.static_element}>
            <i className={iconClassName}
               onClick={() => this.setState({currentPage: "basic"})}>add_box</i>
            <i className={iconClassName}
               onClick={() => this.setState({currentPage: "offense"})}>toys</i>
            <i className={iconClassName}
               onClick={() => this.setState({currentPage: "defense"})}>verified_user</i>
            <i className={iconClassName}
               onClick={() => this.setState({currentPage: "skills"})}>usb</i>
        </div>
    }

    render() {
        if (!this.state.characterData) return null;
        return <div id={rootScss.character_screen}>
            <h2>{LoginController.getLogin()}</h2>
            {this.renderPage()}
            {this.renderMenu()}
        </div>
    }
}
