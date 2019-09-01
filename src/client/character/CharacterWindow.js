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

/**
 * @param {[[]]} rows
 * @param {Function | [Function]} [callbacks]
 * @return {XML}
 */
function generateTable(rows, callbacks) {
    const tr = [];
    for (let i = 0; i < rows.length; i++) {
        const th = [];
        for (let j = 0; j < rows[i].length; j++) {
            let data = rows[i][j];
            if (typeof data === "undefined" || data === null) data = "";
            th.push(<th
                key={i.toString() + '_' + j.toString()}
                className={data.length && data.length > 20 ? rootScss.big_box : null}
                onClick={Array.isArray(callbacks) ? () => callbacks[j](data) : null}
            >{data}</th>);
        }
        tr.push(<tr
            key={i}
            onClick={Array.isArray(callbacks) || !callbacks ? null : () => callbacks(rows[i])}
        >{th}</tr>);
    }
    return <table>
        <tbody>{tr}</tbody>
    </table>;
}

function keyToArray(data, additional) {
    const ans = [];
    for (let key in data) {
        const arr = [key, data[key]];
        if (additional) arr.push(additional[key]);
        ans.push(arr);
    }
    return ans;
}

const GENERATE_STATS = self => generateTable(keyToArray(self.state.character.stats, self.state.character.bonuses),
    (row) => PopupManager.push(new DiceRoller().setBonus(row[2]).roll().toString(row[0])));
const GENERATE_SAVES = self => generateTable(keyToArray(self.state.character.saves),
    (row) => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])));
const GENERATE_ADDITIONAL = self => generateTable(keyToArray(self.state.character.offense),
    (row) => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])));
const GENERATE_DEFENCE = self => generateTable(keyToArray(self.state.character.defense));
const GENERATE_SKILLS = self => generateTable(keyToArray(self.state.character.skills),
    (row) => PopupManager.push(new DiceRoller().setBonus(row[1]).roll().toString(row[0])));

export default class CharacterWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /** @type Character */
            characterData: null,
            character: null
        };
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
            {GENERATE_STATS(this)}
            <h2>Saves</h2>
            {GENERATE_SAVES(this)}
            <h2>Additional</h2>
            {GENERATE_ADDITIONAL(this)}
            <h2>Defense</h2>
            {GENERATE_DEFENCE(this)}
            <h2>Skills</h2>
            {GENERATE_SKILLS(this)}
            {this.renderAbilities()}
            {this.renderFeats()}
            {this.renderSpells()}
            {this.renderItems()}
        </div>
    }
}
