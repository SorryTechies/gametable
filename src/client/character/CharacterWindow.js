/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import LoginController from "../logic/LoginController";
import PopupManager from "../popup/PopupManager";
import RollInitiative from "../logic/requests/RollInitiative";
import DiceRoller from "../logic/DiceRoller";
import StaticController from "../static/StaticController";
import StaticViewManager from "../popup/StaticViewManager";
import AddSpecialPopup from "./popups/AddSpecialPopup";
import AddItemPopup from "./popups/AddItemPopup";
import AddAbilityPopup from "./popups/AddAbilityPopup";
import AddSpellPopup from "./popups/AddSpellPopup";
import Transformer from "../logic/Transformer";
import CharacterCore from "./CharacterCore";
import ClickableEditableRow from "./ClickableEditableRow";

function keysAsArray(args) {
    const ans = [];
    for (let key in args[0]) {
        if (args[0].hasOwnProperty(key)) {
            ans.push(key);
        }
    }
    return ans;
}

function generateTable(args, type, click, onSave, sort) {
    const keyArray = keysAsArray(args);
    if (sort) {
        keyArray.sort((a, b) => typeof a === "string" ? a.localeCompare(b) : -1);
    }
    return <table>
        <tbody>{keyArray.map(key => <ClickableEditableRow
            args={args}
            key={key}
            name={key}
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
const GENERATE_DEFENSE = (self, save) => generateTable([self.state.character.defense], "number");
const GENERATE_SKILLS = (self, save) => generateTable([self.state.character.skills], "number",
    row => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])), save, true);

export default class CharacterWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /** @type Character */
            characterData: null,
            character: null
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

    renderItems() {
        const character = this.state.characterData;
        let items = null;
        if (character.items && character.items.length > 0) {
            items = generateTable(character.items.map(item => [
                item.name,
                Transformer.insertRollTag(item.description)
            ]))
        }
        return <div><h2>Items</h2>
            <button onClick={() => StaticViewManager.addView({
                title: "Add item",
                obj: <AddItemPopup/>
            })}>+
            </button>
            {items}
        </div>;
    }

    renderFeats() {
        const character = this.state.characterData;
        let feats = null;
        if (character.feats && character.feats.length > 0) {
            feats = generateTable(
                character.feats.map(item => [
                    item.name,
                    Transformer.insertRollTag(item.description)
                ])
            );
        }
        return <div><h2>Specials</h2>
            <button onClick={() => StaticViewManager.addView({
                title: "Add special",
                obj: <AddSpecialPopup/>
            })}>+
            </button>
            {feats}
        </div>;
    }

    renderSpells() {
        const character = this.state.characterData;
        let spells = null;
        if (character.spells && character.spells.length > 0) {
            spells = generateTable(
                character.spells.map(item => [
                    item.name,
                    Transformer.insertRollTag(item.description),
                    item.target,
                    item.range
                ])
            );
        }
        return <div><h2>Spells</h2>
            <button onClick={() => StaticViewManager.addView({
                title: "Add spell",
                obj: <AddSpellPopup/>
            })}>+
            </button>
            {spells}
        </div>;
    }

    renderAbilities() {
        const character = this.state.characterData;
        let abilities = null;
        if (character.abilities && character.abilities.length > 0) {
            abilities = generateTable(
                character.abilities.map(item => [
                    item.name,
                    Transformer.insertRollTag(item.description),
                    item.target,
                    item.range
                ])
            );
        }
        return <div><h2>Abilities</h2>
            <button onClick={() => StaticViewManager.addView({
                title: "Add ability",
                obj: <AddAbilityPopup/>
            })}>+
            </button>
            {abilities}
        </div>;
    }

    render() {
        if (!this.state.characterData) return null;
        return <div id={rootScss.character_screen}>
            <h2>{LoginController.getLogin()}</h2>
            <h3>Primary stats</h3>
            {GENERATE_STATS(this, this.saveFunction)}
            <h3>Saves</h3>
            {GENERATE_SAVES(this, this.saveFunction)}
            <h3>Offense</h3>
            {GENERATE_OFFENSE(this, this.saveFunction)}
            <h3>Defense</h3>
            {GENERATE_DEFENSE(this, this.saveFunction)}
            <h3>Skills</h3>
            {GENERATE_SKILLS(this, this.saveFunction)}
            {this.renderAbilities()}
            {this.renderFeats()}
            {this.renderSpells()}
            {this.renderItems()}
        </div>
    }
}
